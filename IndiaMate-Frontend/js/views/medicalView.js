// js/views/medicalView.js
import { state } from '../state.js';
import { doctorData, globalMedicineMap } from '../data/mockData.js';

export function viewMedical() {
  const currentSubTab = state.medicalSubTab || 'doctors';
  const activeSpec = state.medicalSpecialty || 'All';
  const specs = ["All", "General Physician", "Gastroenterologist", "Orthopedic", "Dentist"];

  const specChips = specs.map(s => `
    <button class="diet-chip ${s === activeSpec ? 'active' : ''}" data-medspec="${s}" style="padding: 6px 14px; font-size: 11.5px; font-weight: 700; border-radius: 12px; border: 1px solid var(--line); flex-shrink: 0; cursor: pointer; transition: all 0.2s; ${s === activeSpec ? 'background: var(--madder); color: var(--paper); border-color: var(--madder);' : 'background: var(--paper); color: var(--indigo);'}">${s}</button>
  `).join('');

  // 1. Doctors List (Compact & Premium)
  const filteredDoctors = doctorData.filter(d => {
    const matchSpec = activeSpec === 'All' || d.spec.includes(activeSpec);
    return matchSpec;
  });

  const doctorCardsHtml = filteredDoctors.map(d => `
    <div class="card doctor-full-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border-left: 4px solid var(--indigo);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
        <span style="background: rgba(34, 49, 79, 0.08); color: var(--indigo); padding: 4px 8px; border-radius: 6px; font-size: 9px; font-weight: 800; text-transform: uppercase;">${d.accreditation.includes('JCI') ? 'JCI / NABH' : 'NABH'}</span>
        <div style="font-size: 11px; color: var(--madder); font-weight: 700;">🩺 ${d.spec}</div>
      </div>

      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--indigo); margin:0 0 8px 0;">${d.name}</h3>

      <div style="background: var(--turmeric-deep); padding: 10px; border-radius: 10px; margin-bottom: 12px; font-size: 12px; color: var(--indigo-soft);">
        <div style="color: var(--indigo); font-weight: 600; margin-bottom: 4px;">📍 ${d.hospital}</div>
        🗣️ Languages: <strong>${d.languages.join(', ')}</strong> · 📏 ${d.distance}
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
        ${d.cashless ? '<span style="background: rgba(34, 49, 79, 0.08); color: var(--indigo); padding: 5px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">🛡️ Cashless Insurance</span>' : ''}
        ${d.available24x7 ? '<span style="background: rgba(46,204,113,0.15); color: #1e8449; padding: 5px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">⚡ 24x7 ER</span>' : ''}
      </div>

      <button class="call-btn" style="width:100%; padding:12px; font-size: 12.5px; border-radius: 12px; font-weight: 800; background: var(--indigo); color: var(--turmeric); border: none; cursor: pointer;" data-call="${d.phone}">
        📞 Call Doctor Desk
      </button>
    </div>
  `).join('') || `<div style="text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px;">No doctors found for this specialty.</div>`;

  // 2. Global Medicine Salt Mapper (Live Filterable)
  const medicineCardsHtml = globalMedicineMap.map(m => `
    <div class="card medicine-map-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div>
          <div style="font-size: 9.5px; text-transform: uppercase; font-weight: 800; color: var(--indigo-soft); letter-spacing: 0.05em; margin-bottom: 4px;">Search Term / Brand Name:</div>
          <h4 style="font-family: 'Fraunces', serif; font-size: 16px; margin: 0; color: var(--madder); line-height: 1.2;">${m.globalBrand}</h4>
        </div>
        <span style="background: rgba(34, 49, 79, 0.08); color: var(--indigo); padding: 4px 8px; border-radius: 6px; font-size: 9px; font-weight: 800; text-transform: uppercase;">${m.otc.includes('Over') ? 'OTC / Safe' : 'Prescrip'}</span>
      </div>

      <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 14px; margin-top: 12px;">
        <div style="font-size: 9.5px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">In Indian Pharmacy Equivalent:</div>
        <div style="font-size: 15px; font-weight: 800; color: var(--indigo); margin-bottom: 8px;">${m.indianSalt}</div>
        <div style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin-bottom: 6px;">✨ <strong style="color: var(--indigo);">For:</strong> ${m.use}</div>
        <div style="font-size: 11.5px; color: #1e8449; font-weight: 700;">💊 Dosage Tip: <span style="font-weight: 500;">${m.dosage}</span></div>
      </div>
    </div>
  `).join('');

  return `
    <div style="margin-bottom: 16px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">Medical Support & Doctor Directory</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 30px; font-weight: 700; color: var(--indigo); margin: 0 0 8px 0; line-height: 1.1;">Verified Care & Medicines</h2>
      <p class="section-sub" style="font-size: 13px; color: var(--indigo-soft); line-height: 1.45; margin: 0;">English-speaking doctors, NABH/JCI accredited hospitals, and Global-to-Indian generic medicine mapper.</p>
    </div>

    <!-- Ambulance Banner -->
    <div style="background: linear-gradient(135deg, #A82E3F 0%, #822230 100%); border-radius: 16px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; box-shadow: 0 6px 16px rgba(168, 46, 63, 0.25);">
      <div style="flex: 1;">
        <div style="font-weight: 800; font-size: 14px; color: #fff; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">🚨 Need Immediate Ambulance?</div>
        <div style="font-size: 10.5px; color: rgba(255,255,255,0.85); line-height: 1.3;">Govt. Free 108 Emergency Ambulance Network</div>
      </div>
      <button style="background: var(--marigold); color: var(--indigo); font-weight: 800; font-size: 12.5px; padding: 10px 14px; border-radius: 12px; border: none; cursor: pointer; text-align: center; line-height: 1.2; flex-shrink: 0;" onclick="window.location.href='tel:108'">
        Call<br>108
      </button>
    </div>

    <!-- Toggle Pill -->
    <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 4px; display: flex; gap: 4px; margin-bottom: 18px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
      <button class="food-nav-btn ${currentSubTab === 'doctors' ? 'active' : ''}" data-medtab="doctors" style="flex: 1; border: none; padding: 10px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentSubTab === 'doctors' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🩺 Doctors & ER</button>
      <button class="food-nav-btn ${currentSubTab === 'medicine' ? 'active' : ''}" data-medtab="medicine" style="flex: 1; border: none; padding: 10px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentSubTab === 'medicine' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">💊 Global Salt Decoder</button>
      <button class="food-nav-btn ${currentSubTab === 'insurance' ? 'active' : ''}" data-medtab="insurance" style="flex: 1; border: none; padding: 10px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentSubTab === 'insurance' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🛡️ Insurance Safe</button>
    </div>

    ${currentSubTab === 'doctors' ? `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 13.5px; font-weight: 700; color: var(--indigo); margin-bottom: 8px;">Filter by Medical Specialty:</div>
        <div style="display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;">
          ${specChips}
        </div>
      </div>
      <div>${doctorCardsHtml}</div>
    ` : ''}

    ${currentSubTab === 'medicine' ? `
      <div class="card" style="background: var(--paper); border-radius: 16px; padding: 16px; margin-bottom: 16px; border: 1px solid var(--line); box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
        <label style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: var(--indigo); letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Search Medicine / Symptom:</label>
        
        <!-- Live Instant Search Input -->
        <input type="text" id="liveMedSearch" placeholder="e.g. Fever, Headache, Diarrhea..." style="width: 100%; border: none; border-radius: 10px; padding: 14px; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 500; background: var(--turmeric-deep); color: var(--indigo); outline: none;" oninput="
          const q = this.value.toLowerCase();
          let count = 0;
          document.querySelectorAll('.medicine-map-card').forEach(card => {
            if (card.innerText.toLowerCase().includes(q)) {
              card.style.display = 'block';
              count++;
            } else {
              card.style.display = 'none';
            }
          });
          document.getElementById('noMedFoundMsg').style.display = count === 0 ? 'block' : 'none';
        ">
      </div>
      
      <div id="noMedFoundMsg" style="display: none; text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px; margin-bottom: 14px;">No exact match found. Try a common symptom like 'Fever' or 'Pain'.</div>
      <div>${medicineCardsHtml}</div>
    ` : ''}

    ${currentSubTab === 'insurance' ? `
      <div class="card" style="background: var(--paper); border-radius: 16px; padding: 16px; border: 1px solid var(--line); box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
        <div style="font-size: 9.5px; font-weight: 800; color: var(--madder); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Insurance Safe</div>
        <h3 style="font-family:'Fraunces',serif; font-size:22px; color:var(--indigo); margin:0 0 8px 0;">Digital Medical Invoice Safe</h3>
        <p style="font-size: 12.5px; color: var(--indigo-soft); line-height: 1.45; margin: 0 0 16px 0;">Snap and store prescriptions & pharmacy receipts to guarantee 100% cashless insurance claim reimbursement.</p>
        
        <button class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 13.5px; border-radius: 12px; background: var(--indigo); color: var(--turmeric); font-weight: 800; margin-bottom: 14px; border: none; cursor: pointer;" onclick="alert('Camera triggered: Upload doctor prescription / pharmacy bill for insurance claim.')">
          📷 Scan & Save Prescription / Bill
        </button>
        <div style="background: rgba(246, 237, 217, 0.4); padding: 12px; border-radius: 10px; font-size: 11.5px; border: 1px dashed var(--line); color: var(--indigo-soft); line-height: 1.4;">
          💡 <strong>Tip:</strong> Max & Fortis hospitals accept direct cashless settlement with Allianz, Bupa, Cigna & WorldNomads travel policies.
        </div>
      </div>
    ` : ''}
  `;
}