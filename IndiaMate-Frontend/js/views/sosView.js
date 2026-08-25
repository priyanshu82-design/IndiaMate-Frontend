// js/views/sosView.js
import { state } from '../state.js';
import { internationalSosContacts, domesticSosContacts, userMedicalProfile, safeShelters } from '../data/mockData.js';

export function viewSos() {
  const isIntl = state.persona === 'international';
  
  // Contacts Map
  const contacts = (isIntl ? internationalSosContacts : domesticSosContacts).map(c => `
    <div class="contact-row">
      <div>
        <div class="contact-name">${c.name}</div>
        <div class="contact-sub">${c.sub}</div>
      </div>
      <button class="call-btn" data-call="${c.number}">Call</button>
    </div>
  `).join('');

  // Safe Shelters Map
  const sheltersHtml = safeShelters.map(s => `
    <div class="card" style="padding:10px; margin-bottom:8px; border-left:3px solid var(--madder);">
      <div style="font-weight:700; font-size:12.5px; color:var(--indigo);">${s.name}</div>
      <div style="font-size:11px; color:var(--indigo-soft);">📍 ${s.loc} · ${s.distance}</div>
      <button class="call-btn" style="margin-top:6px; padding:4px 10px; font-size:10.5px;" data-call="${s.phone}">Direct Line (${s.phone})</button>
    </div>
  `).join('');

  return `
    <!-- SOS Hero Section -->
    <div class="sos-hero" style="${state.sosTriggered ? 'background:transparent; padding:0;' : ''}">
      
      <!-- Normal State: SOS Button -->
      ${!state.sosCountdownActive && !state.sosTriggered ? `
        <div class="stamp marigold">Live<br>GPS</div>
        <button class="sos-big-btn" id="startSosCountdownBtn">🚨 Trigger Emergency SOS</button>
        <div class="sos-status">5-sec delay to prevent accidental triggers. Auto-broadcasts GPS &amp; calls help.</div>
      ` : ''}

      <!-- Countdown State: 5 Seconds Cancel Window -->
      ${state.sosCountdownActive ? `
        <div class="stamp marigold">Live<br>GPS</div>
        <div class="sos-countdown-box">
          <div class="countdown-circle">${state.sosCountdown}</div>
          <div style="font-size:13px; font-weight:700; color:var(--turmeric); margin-bottom:8px;">Broadcasting SOS in ${state.sosCountdown}s...</div>
          <button class="btn btn-ghost" id="cancelSosCountdownBtn" style="background:rgba(255,255,255,0.25); width:80%; font-size:14px; padding:12px; font-weight:700;">✕ CANCEL ALARM</button>
        </div>
      ` : ''}

      <!-- TRIGGERED STATE: Emergency UI & Live Transcription -->
      ${state.sosTriggered ? `
        <div class="sos-active-alert" style="background:var(--paper); border:2px solid var(--madder); border-radius:16px; padding:16px; text-align:left;">
          
          <div style="background:var(--madder); color:#fff; padding:10px; border-radius:10px; text-align:center; font-weight:700; margin-bottom:12px; animation: pulse 1.5s infinite;">
            ⚠️ SOS ACTIVATED & TRANSMITTING
          </div>
          
          <div style="font-size:11px; color:var(--indigo-soft); margin-bottom:14px; text-align:center; line-height:1.4;">
            📍 <strong>Live GPS &amp; Alerts Sent To Server:</strong><br>
            ${isIntl ? '3 Relatives, Local Police & Your Embassy' : '3 Relatives, Local Police & Home State Tourism'}
          </div>

          <!-- Dynamic Live Transcription Box -->
          <div class="transcription-container" style="background:#111; color:#0f0; padding:12px; border-radius:12px; height:130px; overflow-y:auto; margin-bottom:16px; font-family:'JetBrains Mono', monospace; font-size:11px; display:flex; flex-direction:column; justify-content:flex-end; border:2px solid #333; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);">
            <div style="color:#aaa; font-size:9px; text-align:center; margin-bottom:8px; text-transform:uppercase;">--- Auto-Call Connected to ${isIntl ? '112 / Embassy' : '112 / State Tourism'} ---</div>
            <div style="opacity:0.6;">[System]: Call recorded &amp; transcribing...</div>
            <div style="margin-top:4px;">Tourist: I need emergency assistance. My live location is attached.</div>
            <div style="margin-top:4px;">Operator: We have received your coordinates. Help is on the way.</div>
            <div class="typing-indicator" style="color:#fff; margin-top:8px; font-weight:700;">Listening for speech... <span style="animation: blink 1s infinite;">_</span></div>
          </div>

          <!-- Quick Action Call Buttons (Domestic vs Foreigner Logic) -->
          <h4 style="margin:0 0 8px; font-size:12px; color:var(--indigo); text-align:center;">Quick Switch Call</h4>
          <div class="sos-quick-actions" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button class="btn btn-primary" style="background:var(--madder); color:#fff; font-size:11px;">📞 Police (112)</button>
            
            ${isIntl ? `
              <button class="btn btn-primary" style="background:var(--indigo); color:#fff; font-size:11px;">📞 Embassy</button>
              <button class="btn btn-primary" style="background:var(--indigo-soft); color:#fff; font-size:11px; grid-column: span 2;">📞 Tourism Police</button>
            ` : `
              <button class="btn btn-primary" style="background:var(--indigo); color:#fff; font-size:11px;">📞 State Tourism</button>
            `}
            
            <button class="btn btn-ghost" style="font-size:11px; grid-column: span ${isIntl ? 2 : 2}; color:var(--indigo-soft); border-color:var(--line);" onclick="alert('Call switched to Relative. Live Transcription is now DISABLED for privacy.')">
              📞 Call Relative (Transcription OFF)
            </button>
          </div>
          
          <button class="btn btn-ghost" id="stopSosBtn" style="margin-top:16px; width:100%; color:var(--madder); border-color:var(--madder); font-weight:700;">🛑 END SOS &amp; DEACTIVATE</button>
        </div>
      ` : ''}
    </div>

    <!-- Normal Helpers (Hidden when SOS is active to clear the screen focus) -->
    ${!state.sosTriggered ? `
      <div class="emergency-action-grid">
        <button class="em-card-btn" id="openMedicalCardBtn">
          <span style="font-size:18px;">🩺</span>
          <span>Medical Flashcard</span>
        </button>
        <button class="em-card-btn ${state.sosDiscreetMode ? 'active' : ''}" id="toggleDiscreetBtn">
          <span style="font-size:18px;">🤫</span>
          <span>${state.sosDiscreetMode ? 'Discreet Mode ON' : 'Silent SOS'}</span>
        </button>
        <button class="em-card-btn" id="createIncidentLogBtn">
          <span style="font-size:18px;">📝</span>
          <span>Log Incident</span>
        </button>
      </div>

      <p class="section-label">${isIntl ? 'Diplomatic & Emergency Lines' : '24x7 Emergency Helplines'}</p>
      <div class="card">${contacts}</div>

      <p class="section-label" style="margin-top:16px;">Nearest Verified Police Booths &amp; ER</p>
      ${sheltersHtml}
    ` : ''}

    <!-- Lockscreen Medical Flashcard Modal -->
    <div id="medicalCardModal" class="modal-overlay" style="display: ${state.medicalFlashcardOpen ? 'flex' : 'none'};">
      <div class="modal-box">
        <button class="modal-close" id="closeMedicalCardBtn">✕</button>
        <div class="modal-stamp" style="color:var(--madder);">EMERGENCY MEDICAL CARD</div>
        <h3 style="font-family:'Fraunces',serif; margin:4px 0 10px;">Vital Tourist Info</h3>
        
        <div class="spec-grid" style="text-align:left; background:var(--turmeric); padding:12px;">
          <div>🩸 <strong>Blood Group:</strong> ${userMedicalProfile.bloodGroup}</div>
          <div style="color:var(--madder); font-weight:700;">⚠️ <strong>Drug Allergies:</strong> ${userMedicalProfile.drugAllergies}</div>
          <div>🫁 <strong>Pre-Existing Condition:</strong> ${userMedicalProfile.conditions}</div>
          <div>📞 <strong>Kin Contact:</strong> ${userMedicalProfile.emergencyContact}</div>
          <div>🛡️ <strong>Insurance:</strong> ${userMedicalProfile.insurancePolicy}</div>
        </div>

        <button class="btn btn-primary" id="dismissMedicalCardBtn" style="margin-top:14px; width:100%;">Close Flashcard</button>
      </div>
    </div>
  `;
}