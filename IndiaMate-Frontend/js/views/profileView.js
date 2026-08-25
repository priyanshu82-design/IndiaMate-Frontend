// js/views/profileView.js
import { state } from '../state.js';
import { walletData } from '../data/mockData.js';

export function viewProfile() {
  const user = state.user || { name: 'Raj', email: 'parmanand98765sahu@gmail.com', initial: 'R' };
  const phone = user.phone || '+91 98765 43210'; 
  
  if (!state.savedPlans) state.savedPlans = [];
  
  // 1. Identity Docs State
  if (!state.vaultDocs) {
    state.vaultDocs = [
      { id: 'doc-1', title: 'Aadhaar Card', type: 'ID Number', value: 'XXXX-XXXX-4829', date: '24/08/2026' },
      { id: 'doc-2', title: 'Passport (Front)', type: 'ID Number', value: 'Z8492018', date: '24/08/2026' }
    ];
  }

  // 2. Tickets & Bookings State
  if (!state.ticketDocs) {
    state.ticketDocs = [
      { id: 'tkt-1', title: 'IRCTC Train Ticket (NDLS - JAT)', type: 'PNR / Booking', value: 'PNR: 2458910243', date: '24/08/2026' }
    ];
  }

  // 3. Emergency Relative Contacts State
  if (!state.emergencyContacts) {
    state.emergencyContacts = [
      { id: 'ec-1', name: 'Family / Home', relation: 'Parent', phone: '+91 98765 00001', priority: '1' },
      { id: 'ec-2', name: 'Brother / Friend', relation: 'Sibling', phone: '+91 98765 00002', priority: '2' }
    ];
  }

  // --- Plan Handlers ---
  window.goToPlanCreation = () => {
    if (typeof window.goTo === 'function') {
      window.goTo('itinerary');
    } else {
      state.view = 'itinerary';
      if (typeof window.render === 'function') window.render();
    }
  };

  window.toggleCoveredStop = (planIndex, stopKey) => {
    const plan = state.savedPlans[planIndex];
    if (!plan) return;
    if (!plan.coveredIds) plan.coveredIds = [];
    
    if (plan.coveredIds.includes(stopKey)) {
      plan.coveredIds = plan.coveredIds.filter(id => id !== stopKey);
    } else {
      plan.coveredIds.push(stopKey);
    }
    window.refreshProfileView();
  };

  window.deleteSavedPlan = (planIndex) => {
    if (confirm('Are you sure you want to delete this travel plan?')) {
      state.savedPlans.splice(planIndex, 1);
      window.refreshProfileView();
    }
  };

  // --- Identity Vault Handlers ---
  window.openDocVaultModal = () => {
    const modal = document.getElementById('vaultModal');
    if (modal) modal.style.display = 'flex';
  };
  window.closeDocVaultModal = () => {
    const modal = document.getElementById('vaultModal');
    if (modal) modal.style.display = 'none';
  };

  window.handleDocFileUpload = (event, inputType) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const docName = prompt("Enter a label for this Document:", file.name.split('.')[0]);
      if (docName) {
        state.vaultDocs.unshift({
          id: 'doc-' + Date.now(),
          title: docName,
          type: inputType === 'camera' ? 'Camera' : 'File',
          value: file.name,
          previewUrl: e.target.result,
          date: new Date().toLocaleDateString()
        });
        window.refreshProfileView();
      }
    };
    reader.readAsDataURL(file);
  };

  window.addDocByNumber = () => {
    const docType = document.getElementById('newDocType')?.value || 'Aadhaar Card';
    const docNumber = document.getElementById('newDocNumber')?.value?.trim();
    if (!docNumber) return alert('Please enter ID number.');

    state.vaultDocs.unshift({
      id: 'doc-' + Date.now(),
      title: docType,
      type: 'ID Number',
      value: docNumber,
      date: new Date().toLocaleDateString()
    });
    window.refreshProfileView();
  };

  window.deleteVaultDoc = (docId) => {
    if (confirm('Delete this document?')) {
      state.vaultDocs = state.vaultDocs.filter(d => d.id !== docId);
      window.refreshProfileView();
    }
  };

  // --- Tickets Vault Handlers ---
  window.openTicketsModal = () => {
    const modal = document.getElementById('ticketsModal');
    if (modal) modal.style.display = 'flex';
  };
  window.closeTicketsModal = () => {
    const modal = document.getElementById('ticketsModal');
    if (modal) modal.style.display = 'none';
  };

  window.handleTicketUpload = (event, inputType) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const tktName = prompt("Enter Booking Label (e.g. Flight to Delhi, Hotel Booking):", file.name.split('.')[0]);
      if (tktName) {
        state.ticketDocs.unshift({
          id: 'tkt-' + Date.now(),
          title: tktName,
          type: inputType === 'camera' ? 'Camera Capture' : 'Ticket File',
          value: file.name,
          previewUrl: e.target.result,
          date: new Date().toLocaleDateString()
        });
        window.refreshProfileView();
      }
    };
    reader.readAsDataURL(file);
  };

  window.addTicketByNumber = () => {
    const tktType = document.getElementById('newTicketType')?.value || 'Train Ticket';
    const pnrNumber = document.getElementById('newTicketNumber')?.value?.trim();
    if (!pnrNumber) return alert('Please enter PNR / Booking ID.');

    state.ticketDocs.unshift({
      id: 'tkt-' + Date.now(),
      title: tktType,
      type: 'PNR / Reference',
      value: pnrNumber,
      date: new Date().toLocaleDateString()
    });
    window.refreshProfileView();
  };

  window.deleteTicketDoc = (tktId) => {
    if (confirm('Delete this ticket?')) {
      state.ticketDocs = state.ticketDocs.filter(t => t.id !== tktId);
      window.refreshProfileView();
    }
  };

  // --- Emergency Relative Contact Handlers ---
  window.addEmergencyContact = () => {
    const name = document.getElementById('newContactName')?.value?.trim();
    const relation = document.getElementById('newContactRelation')?.value || 'Family';
    const phoneNum = document.getElementById('newContactPhone')?.value?.trim();
    const priority = document.getElementById('newContactPriority')?.value || '1';

    if (!name || !phoneNum) {
      return alert('Please enter Contact Name and Phone Number.');
    }

    state.emergencyContacts.push({
      id: 'ec-' + Date.now(),
      name,
      relation,
      phone: phoneNum,
      priority
    });

    // Auto sort by Priority
    state.emergencyContacts.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
    window.refreshProfileView();
  };

  window.deleteEmergencyContact = (cId) => {
    if (confirm('Delete this emergency contact?')) {
      state.emergencyContacts = state.emergencyContacts.filter(c => c.id !== cId);
      window.refreshProfileView();
    }
  };

  window.refreshProfileView = () => {
    if (typeof window.render === 'function') {
      window.render();
    } else {
      const viewEl = document.getElementById('view');
      if (viewEl) viewEl.innerHTML = viewProfile();
    }
  };

  // Render Saved Plans
  const plansHtml = state.savedPlans.length > 0 
    ? state.savedPlans.map((plan, pIdx) => {
        const stops = plan.stops || [];
        const covered = plan.coveredIds || [];
        const isComplete = stops.length > 0 && covered.length === stops.length;

        const stopsListHtml = stops.map((s, sIdx) => {
          const stopKey = s.id || s.name || `stop-${sIdx}`;
          const isDone = covered.includes(stopKey);
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed var(--line); font-size: 12px;">
              <span style="color: var(--indigo); font-weight: ${isDone ? '500' : '700'}; text-decoration: ${isDone ? 'line-through' : 'none'}; opacity: ${isDone ? '0.55' : '1'};">
                ${s.name} <span style="font-size: 10.5px; color: var(--indigo-soft); font-weight: normal;">(${s.timeSpent || '45 mins'})</span>
              </span>
              <button onclick="window.toggleCoveredStop(${pIdx}, '${stopKey}')" style="background: ${isDone ? '#27ae60' : 'var(--turmeric-deep)'}; color: ${isDone ? '#fff' : 'var(--indigo)'}; border: 1px solid ${isDone ? '#27ae60' : 'var(--line)'}; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; transition: all 0.2s;">
                ${isDone ? '✓ Covered' : 'Mark Covered'}
              </button>
            </div>
          `;
        }).join('');

        return `
          <div style="background: var(--turmeric); border-radius: 16px; padding: 16px; margin-bottom: 14px; border: 1.5px solid ${isComplete ? '#27ae60' : 'var(--line)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span style="font-weight: 800; color: var(--indigo); font-size: 15px; font-family: 'Fraunces', serif;">${plan.title}</span>
                <div style="font-size: 11px; color: var(--indigo-soft); margin-top: 2px;">📍 Hub: <strong>${plan.hub}</strong> · Saved: ${plan.date}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 10.5px; background: ${isComplete ? '#27ae60' : 'var(--marigold)'}; color: ${isComplete ? '#fff' : 'var(--indigo)'}; padding: 4px 8px; border-radius: 6px; font-weight: 800;">
                  ${isComplete ? 'Completed 🎉' : `${covered.length}/${stops.length} Visited`}
                </span>
                <button onclick="window.deleteSavedPlan(${pIdx})" title="Delete Plan" style="background: rgba(192, 57, 43, 0.12); color: var(--madder); border: none; width: 26px; height: 26px; border-radius: 6px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;">
                  🗑️
                </button>
              </div>
            </div>
            
            <div style="background: var(--paper); border-radius: 10px; padding: 10px 12px; margin-top: 10px;">
              <div style="font-size: 9.5px; text-transform: uppercase; font-weight: 800; color: var(--indigo-soft); margin-bottom: 4px;">Places to Cover:</div>
              ${stopsListHtml}
            </div>
          </div>
        `;
      }).join('')
    : `<div style="text-align: center; padding: 24px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1.5px dashed var(--line); border-radius: 14px;">No saved plans yet. Generate and save one from 'My Plan'.</div>`;

  // Render Docs List
  const docsListHtml = (state.vaultDocs || []).map(d => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--turmeric-deep); border-radius: 12px; margin-bottom: 8px; border: 1px solid var(--line);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="font-size: 20px;">${d.previewUrl ? '🖼️' : '🪪'}</div>
        <div>
          <div style="font-size: 13px; font-weight: 800; color: var(--indigo);">${d.title}</div>
          <div style="font-size: 11px; font-family: monospace; color: var(--indigo-soft);">${d.value}</div>
        </div>
      </div>
      <button onclick="window.deleteVaultDoc('${d.id}')" style="background: rgba(192, 57, 43, 0.12); color: var(--madder); border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 700;">
        🗑️
      </button>
    </div>
  `).join('');

  // Render Tickets List
  const ticketsListHtml = (state.ticketDocs || []).map(t => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--turmeric-deep); border-radius: 12px; margin-bottom: 8px; border: 1px solid var(--line);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="font-size: 20px;">${t.previewUrl ? '🎫' : '📄'}</div>
        <div>
          <div style="font-size: 13px; font-weight: 800; color: var(--indigo);">${t.title}</div>
          <div style="font-size: 11px; font-family: monospace; color: var(--indigo-soft);">${t.value}</div>
        </div>
      </div>
      <button onclick="window.deleteTicketDoc('${t.id}')" style="background: rgba(192, 57, 43, 0.12); color: var(--madder); border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 700;">
        🗑️
      </button>
    </div>
  `).join('');

  // Render Emergency Contacts List
  const contactsListHtml = (state.emergencyContacts || []).map(c => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--turmeric-deep); border-radius: 12px; margin-bottom: 8px; border: 1px solid var(--line);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: ${c.priority === '1' ? 'var(--madder)' : 'var(--indigo)'}; color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800;">
          P${c.priority}
        </div>
        <div>
          <div style="font-size: 13px; font-weight: 800; color: var(--indigo);">${c.name} <span style="font-size:10px; font-weight:normal; color:var(--indigo-soft);">(${c.relation})</span></div>
          <div style="font-size: 11.5px; font-family: monospace; color: var(--indigo-soft);">${c.phone}</div>
        </div>
      </div>
      <div style="display: flex; gap: 6px;">
        <a href="tel:${c.phone}" style="background: #27ae60; color: #fff; text-decoration: none; padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 2px;">
          📞 Call
        </a>
        <button onclick="window.deleteEmergencyContact('${c.id}')" style="background: rgba(192, 57, 43, 0.12); color: var(--madder); border: none; padding: 6px 8px; border-radius: 6px; cursor: pointer; font-size: 11px;">
          🗑️
        </button>
      </div>
    </div>
  `).join('');

  return `
    <!-- Top Header Profile -->
    <div style="text-align: center; margin-bottom: 20px; padding-top: 6px;">
      <div class="profile-avatar" style="width: 72px; height: 72px; font-size: 28px; margin: 0 auto 10px; background: var(--madder); color: var(--paper); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-weight: 700;">
        ${user.initial}
      </div>
      <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--indigo);">
        ${user.name}
      </div>
      <div style="font-size: 11.5px; color: var(--indigo-soft); margin-top: 2px; font-weight: 500;">
        ${phone} <span style="color:var(--line); margin: 0 4px;">|</span> ${user.email}
      </div>
    </div>

    <!-- 1. SAVED ITINERARIES & TRACKING -->
    <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">🗺️ My Saved Plans &amp; Tracking</p>
    <div class="card" style="padding: 16px; border-radius: 20px; margin-bottom: 22px;">
      ${plansHtml}
      <button class="btn btn-ghost" data-goto="itinerary" onclick="if(window.goTo) window.goTo('itinerary');" style="width: 100%; margin-top: 6px; border: 1.5px dashed var(--indigo-soft); color: var(--indigo); background: transparent; font-weight: 700; font-size: 12.5px; padding: 12px; border-radius: 12px; cursor: pointer;">
        + Create New Plan
      </button>
    </div>

    <!-- 2. DIGITAL TRAVEL VAULT -->
    <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 8px; text-transform: uppercase;">Digital Travel Vault</p>
    <div class="card" style="padding: 16px; border-radius: 20px; margin-bottom: 22px;">
      
      <!-- Identity Documents -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0 12px; cursor: pointer;" onclick="window.openDocVaultModal()">
        <div>
          <div style="font-size:13.5px; font-weight:700; color:var(--indigo); margin-bottom:2px;">🪪 Identity Documents (${state.vaultDocs.length})</div>
          <div style="font-size:11.5px; color:var(--indigo-soft);">Manage Aadhaar, Passport, Visa &amp; Govt IDs</div>
        </div>
        <span style="color:var(--indigo-soft); font-size: 18px;">›</span>
      </div>

      <!-- Tickets & Bookings -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0 4px; border-top: 1px solid var(--line); cursor: pointer;" onclick="window.openTicketsModal()">
        <div>
          <div style="font-size:13.5px; font-weight:700; color:var(--indigo); margin-bottom:2px;">🎫 My Tickets &amp; Bookings (${state.ticketDocs.length})</div>
          <div style="font-size:11.5px; color:var(--indigo-soft);">Browse ticket photos, PDFs &amp; PNR Numbers</div>
        </div>
        <span style="color:var(--indigo-soft); font-size: 18px;">›</span>
      </div>
    </div>

    <!-- 3. EMERGENCY RELATIVE CONTACTS & PRIORITY -->
    <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 8px; text-transform: uppercase;">🚨 Emergency Contacts &amp; Call Priority</p>
    <div class="card" style="padding: 16px; border-radius: 20px; margin-bottom: 22px;">
      
      <!-- Contacts List -->
      <div style="margin-bottom: 12px;">
        ${contactsListHtml.length > 0 ? contactsListHtml : '<div style="text-align:center; font-size:12px; color:var(--indigo-soft); padding:10px;">No emergency contacts added yet.</div>'}
      </div>

      <!-- Add Relative Contact Form -->
      <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 12px; border: 1px dashed var(--line);">
        <div style="font-size: 10.5px; font-weight: 800; color: var(--indigo); text-transform: uppercase; margin-bottom: 8px;">+ Add Relative / Emergency Contact</div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
          <input type="text" id="newContactName" placeholder="Name (e.g. Papa)" style="padding: 8px 10px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; background: var(--paper);" />
          <select id="newContactRelation" style="padding: 8px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; background: var(--paper);">
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Spouse">Spouse</option>
            <option value="Friend">Friend</option>
            <option value="Guardian">Guardian</option>
          </select>
        </div>

        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          <input type="tel" id="newContactPhone" placeholder="Mobile Number (+91...)" style="flex: 2; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; background: var(--paper);" />
          <select id="newContactPriority" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; background: var(--paper);">
            <option value="1">Priority 1 🔴</option>
            <option value="2">Priority 2 🟠</option>
            <option value="3">Priority 3 🟡</option>
          </select>
        </div>

        <button onclick="window.addEmergencyContact()" style="width: 100%; background: var(--indigo); color: var(--paper); border: none; padding: 9px; border-radius: 8px; font-size: 12px; font-weight: 800; cursor: pointer;">
          Save Contact
        </button>
      </div>
    </div>

    <!-- 4. WALLET & PAYMENTS SUMMARY -->
    <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 8px; text-transform: uppercase;">Wallet &amp; Payments</p>
    <div class="card" style="padding: 16px; border-radius: 20px; margin-bottom: 24px; display:flex; gap:10px; border: 1px solid var(--line);">
      <div style="flex:1; background:var(--turmeric-deep); border-radius:12px; padding:12px 6px; text-align:center;">
        <div style="font-family:'JetBrains Mono',monospace; font-weight:800; font-size:15px; color:var(--indigo); margin-bottom:3px;">₹${walletData.balanceINR.toLocaleString('en-IN')}</div>
        <div style="font-size:9px; font-weight:700; color:var(--indigo-soft); text-transform:uppercase;">Balance</div>
      </div>
      <div style="flex:1; background:var(--turmeric-deep); border-radius:12px; padding:12px 6px; text-align:center;">
        <div style="font-family:'JetBrains Mono',monospace; font-weight:800; font-size:15px; color:var(--indigo); margin-bottom:3px;">${walletData.transactions.length}</div>
        <div style="font-size:9px; font-weight:700; color:var(--indigo-soft); text-transform:uppercase;">Txns</div>
      </div>
      <div style="flex:1; background:rgba(46, 204, 113, 0.12); border-radius:12px; padding:12px 6px; text-align:center;">
        <div style="font-weight:800; font-size:13.5px; color:#1e8449; margin-bottom:3px;">Active</div>
        <div style="font-size:9px; font-weight:700; color:#1e8449; text-transform:uppercase;">UPI Status</div>
      </div>
    </div>

    <!-- MODAL 1: IDENTITY DOCUMENTS VAULT -->
    <div id="vaultModal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 10000; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px);">
      <div style="background: var(--paper); width: 100%; max-width: 360px; max-height: 85vh; overflow-y: auto; border-radius: 20px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-family: 'Fraunces', serif; font-size: 18px; color: var(--indigo); margin: 0;">🪪 Identity Vault</h3>
          <button onclick="window.closeDocVaultModal()" style="background: var(--turmeric-deep); border: none; border-radius: 50%; width: 28px; height: 28px; font-size: 14px; cursor: pointer; font-weight: 700;">✕</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <label style="background: var(--indigo); color: var(--paper); padding: 10px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; text-align: center; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
            📸 Take Photo
            <input type="file" accept="image/*" capture="environment" style="display: none;" onchange="window.handleDocFileUpload(event, 'camera')" />
          </label>
          <label style="background: var(--marigold); color: var(--indigo); padding: 10px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; text-align: center; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
            📁 Browse File
            <input type="file" accept="image/*,.pdf" style="display: none;" onchange="window.handleDocFileUpload(event, 'file')" />
          </label>
        </div>

        <div style="background: var(--turmeric); border-radius: 12px; padding: 12px; margin-bottom: 16px; border: 1px dashed var(--line);">
          <div style="font-size: 10.5px; font-weight: 800; color: var(--indigo); text-transform: uppercase; margin-bottom: 6px;">🔢 Or Add by ID Number:</div>
          <select id="newDocType" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; margin-bottom: 6px; background: var(--paper);">
            <option value="Aadhaar Card">Aadhaar Card</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
            <option value="Voter ID">Voter ID</option>
          </select>
          <div style="display: flex; gap: 6px;">
            <input type="text" id="newDocNumber" placeholder="Enter ID Number..." style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; background: var(--paper);" />
            <button onclick="window.addDocByNumber()" style="background: var(--madder); color: #fff; border: none; padding: 0 12px; border-radius: 8px; font-size: 11.5px; font-weight: 700; cursor: pointer;">Add</button>
          </div>
        </div>

        <div style="font-size: 10px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; margin-bottom: 8px;">Saved Documents:</div>
        <div>
          ${docsListHtml.length > 0 ? docsListHtml : '<div style="text-align:center; font-size:12px; color:var(--indigo-soft); padding:10px;">No documents saved yet.</div>'}
        </div>
      </div>
    </div>

    <!-- MODAL 2: TICKETS & BOOKINGS VAULT -->
    <div id="ticketsModal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 10000; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px);">
      <div style="background: var(--paper); width: 100%; max-width: 360px; max-height: 85vh; overflow-y: auto; border-radius: 20px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-family: 'Fraunces', serif; font-size: 18px; color: var(--indigo); margin: 0;">🎫 Tickets &amp; Bookings</h3>
          <button onclick="window.closeTicketsModal()" style="background: var(--turmeric-deep); border: none; border-radius: 50%; width: 28px; height: 28px; font-size: 14px; cursor: pointer; font-weight: 700;">✕</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <label style="background: var(--indigo); color: var(--paper); padding: 10px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; text-align: center; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
            📸 Snap Ticket
            <input type="file" accept="image/*" capture="environment" style="display: none;" onchange="window.handleTicketUpload(event, 'camera')" />
          </label>
          <label style="background: var(--marigold); color: var(--indigo); padding: 10px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; text-align: center; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
            📁 Browse Ticket
            <input type="file" accept="image/*,.pdf" style="display: none;" onchange="window.handleTicketUpload(event, 'file')" />
          </label>
        </div>

        <div style="background: var(--turmeric); border-radius: 12px; padding: 12px; margin-bottom: 16px; border: 1px dashed var(--line);">
          <div style="font-size: 10.5px; font-weight: 800; color: var(--indigo); text-transform: uppercase; margin-bottom: 6px;">🔢 Or Add PNR / Booking ID:</div>
          <select id="newTicketType" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; margin-bottom: 6px; background: var(--paper);">
            <option value="Train Ticket (IRCTC)">Train Ticket (IRCTC)</option>
            <option value="Flight Boarding Pass">Flight Boarding Pass</option>
            <option value="Hotel Booking Voucher">Hotel Booking Voucher</option>
            <option value="Bus / Cab Booking">Bus / Cab Booking</option>
          </select>
          <div style="display: flex; gap: 6px;">
            <input type="text" id="newTicketNumber" placeholder="Enter PNR / Booking ID..." style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--line); font-size: 12px; background: var(--paper);" />
            <button onclick="window.addTicketByNumber()" style="background: var(--madder); color: #fff; border: none; padding: 0 12px; border-radius: 8px; font-size: 11.5px; font-weight: 700; cursor: pointer;">Add</button>
          </div>
        </div>

        <div style="font-size: 10px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; margin-bottom: 8px;">Stored Tickets:</div>
        <div>
          ${ticketsListHtml.length > 0 ? ticketsListHtml : '<div style="text-align:center; font-size:12px; color:var(--indigo-soft); padding:10px;">No tickets uploaded yet.</div>'}
        </div>
      </div>
    </div>
  `;
}