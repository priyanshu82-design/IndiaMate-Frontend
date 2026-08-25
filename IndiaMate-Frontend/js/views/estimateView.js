// js/views/estimateView.js
import { state } from '../state.js';
import { rateCards, bargainCategories, scamPlaybook, driverTranslationCards } from '../data/mockData.js';

export function viewEstimate() {
  const tab = state.estimatorTab || 'transit';
  const isNight = state.estimatorTimeMode === 'night';
  const rideType = state.estimatorRideType || 'auto';
  const dist = parseFloat(state.estimatorDistance) || 5;

  // 1. Transit Fare Calculator Logic
  const baseRate = rateCards[rideType]?.base || 18;
  const markup = rateCards[rideType]?.privateMarkup || 1.5;
  const surcharge = isNight ? 1.25 : 1.0; // 25% Night Surcharge

  const fairFare = Math.round(baseRate * dist * surcharge);
  const privateFare = Math.round(fairFare * markup);

  const meterCardObj = driverTranslationCards.find(c => c.intent === 'meter');
  const displayDriverCard = meterCardObj 
    ? meterCardObj.text.replace('[FARE]', fairFare) 
    : `भैया, मीटर से चलिए या ₹${fairFare} लीजिए जो उचित सरकारी दर है।`;

  const noDetourCardObj = driverTranslationCards.find(c => c.intent === 'no-detour');
  const displayNoDetour = noDetourCardObj 
    ? noDetourCardObj.text 
    : 'भैया, सीधे गंतव्य पर चलिए। किसी दुकान या बाज़ार में रुकने की आवश्यकता नहीं है।';

  // 2. Bargain Categories HTML
  const bargainHtml = (bargainCategories || []).map(b => `
    <div class="card bargain-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <div style="font-weight:700; color:var(--indigo); margin-bottom:6px; font-size:14px;">🛍️ ${b.item}</div>
      <div class="benchmark-row fake" style="font-size:11.5px; color: var(--madder);">
        <span class="benchmark-label">🗣️ Quoted Price:</span> <span style="text-decoration:line-through;">${b.quoted}</span>
      </div>
      <div class="benchmark-row real" style="font-size:13px; margin:4px 0; color: #1e8449; font-weight: 700;">
        <span class="benchmark-label">✅ Fair Price:</span> <strong>${b.fair}</strong>
      </div>
      <div class="rule-box" style="background: rgba(246, 237, 217, 0.4); padding: 8px 10px; border-radius: 8px; font-size: 11px; margin-top: 8px; border: 1px dashed var(--line);">
        💡 <strong>The "30-40%" Rule:</strong> ${b.rule}
      </div>
    </div>
  `).join('');

  // 3. Scam Playbook HTML
  const scamHtml = (scamPlaybook || []).map(s => `
    <div class="card scam-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border-left: 4px solid var(--madder);">
      <h4 style="color:var(--madder); margin:0 0 4px; font-family:'Fraunces',serif; font-size:16px;">🚨 ${s.title}</h4>
      <p style="font-size:12px; color:var(--indigo-soft); margin:0 0 8px; line-height:1.4;">${s.desc}</p>
      <div class="red-flag-box" style="background: rgba(139, 38, 53, 0.08); color: var(--madder); padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">🚩 Red Flag: ${s.redFlag}</div>
    </div>
  `).join('');

  return `
    <!-- Top Header -->
    <div style="margin-bottom: 12px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">Anti-Scam & Fair Price Hub</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">Know before you go</h2>
      <p class="section-sub" style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Calculate exact transport fares, market bargaining rates, and stay protected from tourist traps.</p>
    </div>

    <!-- 3-in-1 Toggle Pill -->
    <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 4px; display: flex; gap: 4px; margin-bottom: 14px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
      <button class="food-nav-btn ${tab === 'transit' ? 'active' : ''}" data-estimatetab="transit" style="flex: 1; border: none; padding: 10px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${tab === 'transit' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🛺 Transit Fares</button>
      <button class="food-nav-btn ${tab === 'bargain' ? 'active' : ''}" data-estimatetab="bargain" style="flex: 1; border: none; padding: 10px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${tab === 'bargain' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">⚖️ Bargain Meter</button>
      <button class="food-nav-btn ${tab === 'scam' ? 'active' : ''}" data-estimatetab="scam" style="flex: 1; border: none; padding: 10px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${tab === 'scam' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🚩 Scam Radar</button>
    </div>

    <!-- TAB 1: Transit Fare Calculator -->
    ${tab === 'transit' ? `
      <div class="card start-point-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
        <div class="estimator-row" style="display: flex; gap: 10px; margin-bottom: 12px;">
          <div class="estimator-field" style="flex: 1;">
            <label style="font-size: 10px; color: var(--indigo-soft); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 4px;">Ride type</label>
            <select id="rideTypeSelect" style="width: 100%; border: 1px solid var(--line); border-radius: 10px; padding: 10px; font-size: 13px; font-weight: 600; background: var(--turmeric-deep); color: var(--indigo); outline: none;">
              <option value="auto" ${rideType === 'auto' ? 'selected' : ''}>Auto-rickshaw</option>
              <option value="taxi" ${rideType === 'taxi' ? 'selected' : ''}>City Taxi</option>
              <option value="ecab" ${rideType === 'ecab' ? 'selected' : ''}>App E-Cab</option>
            </select>
          </div>
          <div class="estimator-field" style="flex: 1;">
            <label style="font-size: 10px; color: var(--indigo-soft); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 4px;">Distance (km)</label>
            <!-- Fixed Enter Key Event for Distance Input -->
            <input type="number" id="rideDistanceInput" value="${dist}" min="0.5" step="0.5" onkeydown="if(event.key === 'Enter') { state.estimatorDistance = this.value; render(); }" style="width: 100%; border: 1px solid var(--line); border-radius: 10px; padding: 10px; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; background: var(--turmeric-deep); color: var(--indigo); outline: none;">
          </div>
        </div>

        <div class="buffer-toggle-row" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: 10px; margin-top: 4px;">
          <div>
            <span class="buffer-title" style="font-size: 11.5px; font-weight: 700; color: var(--indigo); display: block;">🌙 Night Surcharge (11 PM - 5 AM)</span>
            <p class="buffer-sub" style="font-size: 10px; color: var(--indigo-soft); margin: 2px 0 0 0;">Adds official 25% night travel allowance.</p>
          </div>
          <!-- Updated Switch Button with Active Red Color Styling -->
          <button class="custom-switch ${isNight ? 'on' : 'off'}" id="nightModeToggleBtn" aria-label="Toggle Night Mode" style="width: 48px; height: 26px; border-radius: 999px; background: ${isNight ? 'var(--madder)' : 'var(--line)'}; border: none; position: relative; cursor: pointer; transition: background 0.3s ease;">
            <span style="position: absolute; top: 3px; left: ${isNight ? '24px' : '3px'}; width: 20px; height: 20px; border-radius: 50%; background: var(--paper); transition: left 0.3s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.25);"></span>
          </button>
        </div>
      </div>

      <!-- Fare Comparison Box -->
      <div class="fare-result" style="background: var(--indigo); color: var(--paper); border-radius: 16px; padding: 18px; text-align: center; margin-bottom: 14px; box-shadow: 0 6px 16px rgba(28,40,65,0.15);">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--marigold-light); font-weight: 800; margin-bottom: 4px;">Official Prepaid / Meter Fare</div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 36px; font-weight: 800; color: var(--marigold-light); margin: 4px 0;">₹${fairFare}</div>
        <div style="font-size: 12px; color: rgba(255,255,255,0.8);">vs Private Quote: <strong style="color: #ff6b6b;">₹${privateFare}</strong> (Overpriced)</div>
      </div>

      <button class="btn btn-primary" id="showDriverCardBtn" style="margin-bottom:12px; width:100%; padding: 14px; font-size: 13.5px; border-radius: 12px; font-weight: 800; background: var(--marigold); color: var(--indigo); border: none; cursor: pointer;">
        🗣️ Show Hindi Card to Driver
      </button>

      <!-- Driver Vernacular Modal -->
      <div id="driverModal" class="modal-overlay" style="display: ${state.activeDriverCard ? 'flex' : 'none'}; position: absolute; inset: 0; background: rgba(0,0,0,0.65); z-index: 10000; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px);">
        <div class="modal-box" style="background: var(--paper); width: 100%; max-width: 300px; border-radius: 20px; padding: 20px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <button class="modal-close" id="closeDriverModalBtn" style="position: absolute; top: 14px; right: 14px; background: var(--turmeric-deep); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 14px; color: var(--indigo-soft); display: flex; align-items: center; justify-content: center;">✕</button>
          <div class="modal-stamp" style="font-size: 10px; color: var(--madder); font-weight: 800; text-transform: uppercase; margin-bottom: 10px;">Show to Driver</div>
          <div class="modal-hindi-text" style="font-size: 18px; padding: 16px; margin-top: 6px; background: var(--turmeric); border-radius: 12px; border: 1px solid var(--marigold-light); font-weight: 600; color: var(--indigo);">${displayDriverCard}</div>
          <div class="modal-hindi-text" style="font-size: 12px; background: rgba(246,237,217,0.4); color: var(--indigo-soft); border: 1px dashed var(--line); margin-top: 10px; padding: 10px; border-radius: 8px;">
            ${displayNoDetour}
          </div>
        </div>
      </div>
    ` : ''}

    <!-- TAB 2: Category Bargain Meter -->
    ${tab === 'bargain' ? `
      <div style="background: var(--turmeric-deep); border-radius: 10px; padding: 10px 12px; margin-bottom: 14px; font-size: 11.5px; color: var(--indigo-soft); line-height: 1.4; display: flex; gap: 8px;">
        <span>💡</span>
        <span><strong>Fixed-Price Tags:</strong> Government Emporiums and Malls have fixed prices. Only bargain in street markets!</span>
      </div>
      ${bargainHtml}
    ` : ''}

    <!-- TAB 3: Scam Radar -->
    ${tab === 'scam' ? `
      <div style="background: var(--indigo); color: var(--turmeric); border-radius: 12px; padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
        <div style="font-weight: 800; font-size: 12.5px; color: var(--marigold-light);">📍 Geofence Active: Red Fort Area</div>
        <div style="font-size: 11px; color: rgba(246,237,217,0.85); line-height: 1.3;">Warning: Unauthorized agents falsely claiming the main ticket counter is closed. Ignore them.</div>
      </div>
      
      ${scamHtml}

      <button class="btn btn-return-trigger" id="reportScamBtn" style="width: 100%; margin-top: 8px; padding: 12px; background: var(--madder); color: var(--paper); border: none; border-radius: 12px; font-weight: 800; font-size: 13px; cursor: pointer;">
        🚨 Report Overcharging / Fake Guide
      </button>
    ` : ''}
  `;
}