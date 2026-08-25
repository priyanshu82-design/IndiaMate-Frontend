// js/views/translateView.js
import { state } from '../state.js';
import { translationLanguages, categorizedPhrases } from '../data/mockData.js';

export function viewTranslate() {
  const isSplit = state.translateSplitMode;
  const speed = state.translateSpeed || 'Normal';
  const activeCat = state.translateCategory || 'transport';
  const currentPrompt = state.translateInput || '';
  const currentTranslation = state.translatedText || '';

  const langOptions1 = translationLanguages.map(l => `<option value="${l}" ${l === 'English' ? 'selected' : ''}>${l}</option>`).join('');
  const langOptions2 = translationLanguages.map(l => `<option value="${l}" ${l === 'Hindi (हिंदी)' ? 'selected' : ''}>${l}</option>`).join('');

  const phrases = categorizedPhrases[activeCat] || [];
  const phraseHtml = phrases.map(p => `
    <div class="phrase-chip-card" style="background: var(--paper); border: 1px solid var(--line); padding: 10px 12px; border-radius: 12px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.02);" onclick="
      document.getElementById('liveTranslateInput').value = '${p.text}';
      window.runLiveTranslation();
    ">
      <div class="phrase-eng" style="font-size: 11.5px; color: var(--indigo-soft); font-weight: 600; margin-bottom: 2px;">${p.text}</div>
      <div class="phrase-reg" style="font-size: 15px; color: var(--madder); font-weight: 700; font-family: 'Fraunces', serif;">${p.hi}</div>
    </div>
  `).join('');

  // Global Handlers
  if (!window.runLiveTranslation) {
    window.runLiveTranslation = async () => {
      const inputEl = document.getElementById('liveTranslateInput');
      const outputEl = document.getElementById('translateOutput');
      const text = inputEl ? inputEl.value : '';
      if (!text || !text.trim()) return;

      if (outputEl) outputEl.textContent = 'Translating...';
      
      const fromLang = document.getElementById('langSelectFrom')?.value || 'English';
      const toLang = document.getElementById('langSelectTo')?.value || 'Hindi (हिंदी)';
      const getCode = (val) => val.includes('Hindi') ? 'hi' : 'en';
      
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${getCode(fromLang)}&tl=${getCode(toLang)}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (outputEl) outputEl.textContent = data[0].map(item => item[0]).join('');
        }
      } catch {
        if (outputEl) outputEl.textContent = 'Network Error. Check Internet.';
      }
    };

    window.runLiveSpeech = () => {
      const text = document.getElementById('translateOutput')?.textContent;
      const toLang = document.getElementById('langSelectTo')?.value || 'Hindi';
      const langCode = toLang.includes('Hindi') ? 'hi-IN' : 'en-US';
      
      if (text && text !== 'Translation will appear here...' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode;
        utterance.rate = state.translateSpeed === 'Slow' ? 0.65 : 0.85;
        window.speechSynthesis.speak(utterance);
      }
    };

    window.swapLanguages = () => {
      const fromSel = document.getElementById('langSelectFrom');
      const toSel = document.getElementById('langSelectTo');
      if (fromSel && toSel) {
        const temp = fromSel.value;
        fromSel.value = toSel.value;
        toSel.value = temp;
      }
      
      const inputEl = document.getElementById('liveTranslateInput');
      const outputEl = document.getElementById('translateOutput');
      if (inputEl && outputEl) {
        const tempText = inputEl.value;
        inputEl.value = outputEl.textContent !== 'Translation will appear here...' ? outputEl.textContent : '';
        outputEl.textContent = tempText || 'Translation will appear here...';
      }
    };
  }

  return `
    <!-- 1. Header (Compact) -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
      <div>
        <p class="section-label" style="font-size: 9px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 2px 0;">Voice &amp; Text Matrix</p>
        <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 21px; font-weight: 700; color: var(--indigo); margin: 0; line-height: 1.1;">Smart Translator</h2>
      </div>
      <button class="btn-toggle-split" id="toggleSplitBtn" style="background: var(--indigo); color: var(--paper); border: none; padding: 6px 10px; border-radius: 8px; font-size: 10.5px; font-weight: 700; cursor: pointer;">
        🪟 ${isSplit ? 'Standard' : 'Split-Screen'}
      </button>
    </div>

    <!-- 2. Visual Lens OCR Banner (Ultra-Compact) -->
    <div class="ocr-banner-card" id="ocrScannerBtn" style="display: flex; align-items: center; gap: 10px; background: rgba(240, 165, 53, 0.12); border: 1px dashed var(--marigold); padding: 8px 12px; border-radius: 12px; margin-bottom: 10px; cursor: pointer;">
      <div style="font-size: 18px;">📷</div>
      <div>
        <h4 style="margin:0; color:var(--indigo); font-size: 12.5px; font-weight: 700;">Visual Lens &amp; Menu OCR</h4>
        <p style="margin:0; font-size:10px; color:var(--indigo-soft); line-height: 1.2;">Scan street signs or decode handwritten menus.</p>
      </div>
    </div>

    ${isSplit ? `
      <!-- Split Screen Mode UI -->
      <div class="split-screen-container" style="display: flex; flex-direction: column; height: 420px; border: 1.5px solid var(--indigo); border-radius: 16px; overflow: hidden;">
        <div class="split-half tourist-half" style="flex: 1; background: var(--paper); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 14px; position: relative;">
          <select class="split-lang-select" style="padding: 4px 8px; border-radius: 6px; border: 1px solid var(--line); font-size: 11px; font-weight: 600;">${langOptions1}</select>
          <div class="split-text" style="font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--indigo); margin: auto 0;">How much does this cost?</div>
          <button class="split-mic-btn tourist" style="background: var(--indigo); color: var(--paper); border: none; padding: 8px 16px; border-radius: 999px; font-size: 11.5px; font-weight: 700;">🎙️ Speak</button>
        </div>
        <div class="split-divider" style="height: 3px; background: var(--indigo); position: relative; display: flex; justify-content: center; align-items: center;">
          <button class="btn-audio-boost" id="speedBoostBtn" style="position: absolute; background: var(--marigold); color: var(--indigo); border: 1.5px solid var(--indigo); padding: 2px 8px; border-radius: 999px; font-size: 9px; font-weight: 700;">🔊 ${speed}</button>
        </div>
        <div class="split-half local-half" style="flex: 1; background: var(--turmeric-deep); transform: rotate(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 14px; position: relative;">
          <button class="split-mic-btn local" style="background: var(--madder); color: var(--paper); border: none; padding: 8px 16px; border-radius: 999px; font-size: 11.5px; font-weight: 700;">🎙️ बोलें</button>
          <div class="split-text" style="font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--madder); margin: auto 0;">यह कितने का है?</div>
          <select class="split-lang-select" style="padding: 4px 8px; border-radius: 6px; border: 1px solid var(--line); font-size: 11px; font-weight: 600;">${langOptions2}</select>
        </div>
      </div>
    ` : `
      <!-- 3. Language Selector Row -->
      <div class="lang-row" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <select id="langSelectFrom" style="flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; font-weight: 600; color: var(--indigo); outline: none; background: var(--paper); cursor: pointer;">${langOptions1}</select>
        <button id="customSwapBtn" onclick="window.swapLanguages()" style="background: var(--paper); border: 1px solid var(--line); border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--indigo); cursor: pointer; flex-shrink: 0;">⇄</button>
        <select id="langSelectTo" style="flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; font-weight: 600; color: var(--indigo); outline: none; background: var(--paper); cursor: pointer;">${langOptions2}</select>
      </div>

      <!-- 4. Input Box -->
      <div class="translate-box input" style="padding: 10px 12px; background: var(--turmeric-deep); border-radius: 14px; margin-bottom: 8px; position: relative;">
        <textarea id="liveTranslateInput" placeholder="Type or tap the mic to speak..." onkeydown="if(event.key === 'Enter') { event.preventDefault(); window.runLiveTranslation(); }" style="width: 100%; border: none; background: transparent; resize: none; font-family: 'Work Sans', sans-serif; font-size: 13.5px; font-weight: 500; color: var(--indigo); outline: none; min-height: 44px;">${currentPrompt}</textarea>
        
        <div style="display: flex; justify-content: flex-end; margin-top: 2px;">
          <button onclick="window.runLiveTranslation()" style="background: var(--indigo); color: var(--paper); border: none; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 11.5px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
            Translate ✨
          </button>
        </div>
      </div>

      <!-- 5. Output Box -->
      <div class="card" style="margin-bottom: 10px; padding: 12px 14px; background: var(--paper); border: 1.5px solid var(--indigo); border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
          <div style="flex: 1;">
            <span style="font-size: 9px; font-weight: 800; color: var(--madder); letter-spacing: 0.05em; text-transform: uppercase;">Translation</span>
            <div id="translateOutput" style="font-size: 18px; font-weight: 700; font-family: 'Fraunces', serif; color: var(--indigo); margin-top: 4px; line-height: 1.25;">
              ${currentTranslation || 'Translation will appear here...'}
            </div>
          </div>
          <button onclick="window.runLiveSpeech()" style="background: var(--marigold); color: var(--indigo); border: none; border-radius: 50%; width: 36px; height: 36px; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(240, 165, 53, 0.3);">
            🔊
          </button>
        </div>
      </div>

      <!-- 6. Action Row -->
      <div style="display:flex; gap:8px; margin-bottom:10px;">
        <button class="mic-btn" id="micBtn" style="flex:2; background: var(--indigo); color: var(--paper); border: none; border-radius: 10px; padding: 10px; font-weight: 700; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          🎙 Tap to speak
        </button>
        <button class="btn btn-ghost" id="speedBoostBtn" style="flex:1; background: var(--turmeric-deep); color: var(--indigo); border: 1px solid var(--line); border-radius: 10px; padding: 10px; font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 4px;">
          🔊 ${speed}
        </button>
      </div>

      <!-- 7. Summary Box -->
      <div class="summary-btn-box" id="generateSummaryBtn" style="background: var(--turmeric-deep); padding: 8px 10px; border-radius: 10px; text-align: center; font-size: 11px; font-weight: 700; color: var(--indigo); cursor: pointer; margin-bottom: 14px; border: 1px dashed var(--line);">
        📝 Generate Audio-to-Text Police/Doctor Summary
      </div>

      <!-- 8. Offline Phrasebook -->
      <p class="section-label" style="font-size: 9.5px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 6px 0;">Ready-to-Use Offline Phrasebook</p>
      
      <div style="background: var(--turmeric-deep); border-radius: 10px; padding: 3px; display: flex; gap: 3px; margin-bottom: 10px;">
        <button class="food-nav-btn ${activeCat === 'transport' ? 'active' : ''}" data-cat="transport" style="flex: 1; border: none; padding: 6px 3px; font-size: 10.5px; font-weight: 700; border-radius: 8px; cursor: pointer; ${activeCat === 'transport' ? 'background: var(--indigo); color: var(--paper);' : 'background: transparent; color: var(--indigo-soft);'}">🛺 Transport</button>
        <button class="food-nav-btn ${activeCat === 'food' ? 'active' : ''}" data-cat="food" style="flex: 1; border: none; padding: 6px 3px; font-size: 10.5px; font-weight: 700; border-radius: 8px; cursor: pointer; ${activeCat === 'food' ? 'background: var(--indigo); color: var(--paper);' : 'background: transparent; color: var(--indigo-soft);'}">🍛 Food &amp; Diet</button>
        <button class="food-nav-btn ${activeCat === 'emergency' ? 'active' : ''}" data-cat="emergency" style="flex: 1; border: none; padding: 6px 3px; font-size: 10.5px; font-weight: 700; border-radius: 8px; cursor: pointer; ${activeCat === 'emergency' ? 'background: var(--indigo); color: var(--paper);' : 'background: transparent; color: var(--indigo-soft);'}">🚨 Emergency</button>
      </div>

      <div class="phrase-grid" style="display: flex; flex-direction: column; gap: 8px;">
        ${phraseHtml}
      </div>
    `}
  `;
}