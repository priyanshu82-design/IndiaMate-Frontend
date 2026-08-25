// js/views/craftsView.js
import { state } from '../state.js';
import { craftData, craftTrails, shippingRadar } from '../data/mockData.js';

export function viewCrafts() {
  const activeCity = state.craftCity || 'All';
  const currentTab = state.craftSubTab || 'catalog';
  
  const cities = ["All", "Jaipur", "Varanasi", "Delhi", "Srinagar"];

  const cityChips = cities.map(c => `
    <button class="chip ${c === activeCity ? 'active' : ''}" data-craftcity="${c}" style="padding: 6px 14px; font-size: 11.5px; font-weight: 700; border-radius: 14px; border: 1px solid var(--line); flex-shrink: 0; cursor: pointer; transition: all 0.2s; ${c === activeCity ? 'background: var(--indigo); color: var(--paper); border-color: var(--indigo);' : 'background: var(--paper); color: var(--indigo);'}">${c}</button>
  `).join('');

  // 1. Catalog Cards (Ultra-Compact)
  const filteredCrafts = craftData.filter(c => activeCity === "All" || c.city === activeCity);
  const catalogHtml = filteredCrafts.map(c => `
    <div class="card craft-search-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 14px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); position: relative;">
      
      <div style="font-size: 8.5px; color: var(--indigo-soft); text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 4px;">GI Tagged</div>
      <h3 style="font-family: 'Fraunces', serif; font-size: 19px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">${c.name}</h3>

      <div style="font-size: 11.5px; color: var(--indigo-soft); margin-bottom: 10px; line-height: 1.3;">
        🏛️ ${c.type} · <strong style="color: var(--indigo);">${c.city}, ${c.state}</strong>
      </div>

      <div style="background: var(--turmeric-deep); border-radius: 10px; padding: 10px; margin-bottom: 10px; font-size: 11.5px; color: var(--indigo-soft);">
        <div style="color: var(--indigo); margin-bottom: 2px; line-height: 1.3;">Certified Product:<br><strong style="font-size: 12.5px;">${c.item}</strong></div>
        <div style="margin-top: 4px;">📍 ${c.address} <span style="opacity:0.8;">(${c.distance})</span></div>
      </div>

      <div style="border: 1px dashed var(--line); border-radius: 10px; padding: 10px; margin-bottom: 10px; font-size: 11px;">
        <div style="color: #1e7e34; font-weight: 700; margin-bottom: 2px; font-size: 11.5px;">✅ Fair-Price: ${c.authenticPriceRange}</div>
        <div style="color: var(--madder); line-height: 1.2;">${c.fakePriceWarning}</div>
      </div>

      <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
        <span style="background: rgba(34, 49, 79, 0.08); color: var(--indigo); padding: 4px 6px; border-radius: 6px; font-size: 9.5px; font-weight: 700;">🛡️ ${c.govtAssurance.substring(0, 25)}...</span>
        <span style="background: rgba(139, 38, 53, 0.08); color: var(--madder); padding: 4px 6px; border-radius: 6px; font-size: 9.5px; font-weight: 700;">🚫 No Middlemen</span>
      </div>

      <button class="btn btn-primary" onclick="alert('Routing to verified artisan cluster: ${c.address}')" style="width: 100%; padding: 10px; font-size: 12px; border-radius: 10px; font-weight: 800; background: var(--indigo); color: var(--turmeric); box-shadow: none;">
        🧭 Navigate to Artisan
      </button>
    </div>
  `).join('') || `<div style="text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px;">No verified artisan clusters found.</div>`;

  // 2. Craft Trails (Compact)
  const filteredTrails = craftTrails.filter(t => activeCity === "All" || t.city === activeCity);
  const trailsHtml = filteredTrails.map(trail => `
    <div class="card craft-search-card" style="border-left: 4px solid var(--marigold); padding: 14px; border-radius: 14px; margin-bottom: 12px; background: var(--paper); box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
        <div style="font-size: 9px; font-weight: 800; color: var(--madder); text-transform: uppercase; letter-spacing: 0.05em;">Live Demo</div>
        <div style="font-size: 10px; font-weight: 700; color: var(--indigo-soft); background: var(--turmeric-deep); padding: 3px 8px; border-radius: 6px;">⏱️ ${trail.duration.split('·')[0]}</div>
      </div>
      <h3 style="margin: 0 0 6px 0; font-size: 17px; font-family: 'Fraunces', serif; color: var(--indigo); line-height: 1.1;">${trail.title}</h3>
      <div style="background: rgba(246, 237, 217, 0.4); padding: 8px 10px; border-radius: 8px; font-size: 11px; border: 1px dashed var(--line); color: var(--indigo-soft); margin-bottom: 10px; line-height: 1.3;">
        💡 <strong>Highlight:</strong> ${trail.highlight}
      </div>
      
      <div class="trail-steps" style="display:flex; flex-direction:column; gap:10px;">
        ${trail.steps.map(s => `
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <div style="background: var(--marigold); color: var(--indigo); width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9.5px; font-weight: 800; flex-shrink: 0; margin-top: 1px;">${s.step}</div>
            <div>
              <strong style="font-size: 12.5px; color: var(--indigo); display: block; margin-bottom: 1px;">${s.name}</strong>
              <span style="font-size: 11px; color: var(--indigo-soft);">${s.desc}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('') || `<div style="text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px;">No craft trails available.</div>`;

  // 3. Verified Shipping Radar (Compact)
  const shippingHtml = shippingRadar.map(s => `
    <div class="card craft-search-card" style="border-left: 4px solid var(--indigo); padding: 14px; border-radius: 14px; margin-bottom: 12px; background: var(--paper); box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
        <div style="font-size: 9px; font-weight: 800; color: var(--madder); text-transform: uppercase; letter-spacing: 0.05em;">EMS Verified</div>
        <div style="font-size: 10px; font-weight: 700; color: var(--indigo-soft); background: var(--turmeric-deep); padding: 3px 8px; border-radius: 6px;">📦 ${s.type.substring(0, 18)}..</div>
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 15px; font-family: 'Fraunces', serif; color: var(--indigo); line-height: 1.2;">${s.provider}</h3>
      
      <div style="font-size: 11px; color: var(--indigo-soft); margin-bottom: 4px; line-height: 1.4;">📍 <strong>Coverage:</strong> ${s.loc}</div>
      <div style="font-size: 11px; color: var(--indigo); margin-bottom: 10px; line-height: 1.4;">✨ <strong>Best for:</strong> ${s.bestFor}</div>
      
      <div style="background: var(--turmeric-deep); padding: 8px; border-radius: 8px; font-size: 11px; color: var(--indigo); font-family: 'JetBrains Mono', monospace; font-weight: 700; margin-bottom: 8px; text-align: center; border: 1px dashed var(--line);">
        ${s.rates}
      </div>
      
      <div style="font-size: 10.5px; color: var(--indigo-soft); font-style: italic; line-height: 1.3;">🛡️ ${s.packingService}</div>
    </div>
  `).join('');

  return `
    <!-- Top Headers (Reduced Size & Tight Spacing) -->
    <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">Authentic GI-Tag & Handloom</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--indigo); margin: 0; line-height: 1.1;">Buy the real thing</h2>
      <p class="section-sub" style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Direct routes to verified weaver societies, price benchmark comparison, and safe shipping.</p>
    </div>

    <!-- NEW: Live Search Bar -->
    <div style="margin-bottom: 14px;">
      <input type="text" id="liveCraftSearch" placeholder="🔍 Search pottery, silk, pashmina..." style="width: 100%; border: none; border-radius: 12px; padding: 12px 14px; font-family: 'Work Sans', sans-serif; font-size: 13.5px; font-weight: 500; background: var(--turmeric-deep); color: var(--indigo); outline: none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);" oninput="
        const q = this.value.toLowerCase();
        let count = 0;
        document.querySelectorAll('.craft-search-card').forEach(card => {
          if (card.innerText.toLowerCase().includes(q)) {
            card.style.display = 'block';
            count++;
          } else {
            card.style.display = 'none';
          }
        });
        document.getElementById('noCraftFoundMsg').style.display = count === 0 ? 'block' : 'none';
      ">
    </div>

    <!-- Toggle Pill -->
    <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 4px; display: flex; gap: 4px; margin-bottom: 14px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
      <button class="food-nav-btn ${currentTab === 'catalog' ? 'active' : ''}" data-crafttab="catalog" style="flex: 1; border: none; padding: 8px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentTab === 'catalog' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">◈ Clusters & Prices</button>
      <button class="food-nav-btn ${currentTab === 'trails' ? 'active' : ''}" data-crafttab="trails" style="flex: 1; border: none; padding: 8px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentTab === 'trails' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🗺️ Craft Walks</button>
      <button class="food-nav-btn ${currentTab === 'shipping' ? 'active' : ''}" data-crafttab="shipping" style="flex: 1; border: none; padding: 8px 6px; font-size: 11.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentTab === 'shipping' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">📦 Safe Shipping</button>
    </div>

    <!-- City Chips -->
    ${currentTab !== 'shipping' ? `
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 10px; scrollbar-width: none;">
        ${cityChips}
      </div>
    ` : ''}

    <div id="noCraftFoundMsg" style="display: none; text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px; margin-bottom: 14px;">No match found. Try searching for 'Silk', 'Pottery', or 'Pashmina'.</div>

    <!-- Content Switching -->
    ${currentTab === 'catalog' ? catalogHtml : ''}
    ${currentTab === 'trails' ? trailsHtml : ''}
    ${currentTab === 'shipping' ? `
      <div style="background: var(--turmeric-deep); border-radius: 10px; padding: 10px 12px; margin-bottom: 14px; font-size: 11px; color: var(--indigo-soft); line-height: 1.4; display: flex; gap: 8px;">
        <span style="font-size: 14px;">💡</span>
        <span>Never ship fragile handicrafts or carpets through unregistered street agents. Always use verified India Post EMS or official DHL/FedEx crating counters.</span>
      </div>
      ${shippingHtml}
    ` : ''}
  `;
}