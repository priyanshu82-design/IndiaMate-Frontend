// js/views/foodView.js
import { state } from '../state.js';
import { foodData, foodTrails } from '../data/mockData.js';

export function viewFood(activeCity) {
  activeCity = activeCity || state.foodCity || 'All';
  const currentDiet = state.foodDiet || 'All';
  const currentTab = state.foodSubTab || 'outlets';

  const cities = ["All", "Delhi", "Jaipur", "Indore", "Lucknow"];
  const diets = ["All", "Pure Veg", "Jain Friendly", "Vegan", "Halal"];

  // Chips (Super Compact)
  const cityChips = cities.map(c => `
    <button class="chip ${c === activeCity ? 'active' : ''}" data-foodcity="${c}" style="padding: 6px 14px; font-size: 11.5px; font-weight: 700; border-radius: 14px; border: 1px solid var(--line); flex-shrink: 0; cursor: pointer; transition: all 0.2s; ${c === activeCity ? 'background: var(--indigo); color: var(--paper); border-color: var(--indigo);' : 'background: var(--paper); color: var(--indigo);'}">${c}</button>
  `).join('');

  const dietChips = diets.map(d => `
    <button class="diet-chip ${d === currentDiet ? 'active' : ''}" data-fooddiet="${d}" style="padding: 6px 12px; font-size: 11px; font-weight: 700; border-radius: 10px; border: 1px solid var(--line); flex-shrink: 0; cursor: pointer; transition: all 0.2s; ${d === currentDiet ? 'background: var(--madder); color: var(--paper); border-color: var(--madder);' : 'background: var(--paper); color: var(--indigo);'}">${d}</button>
  `).join('');

  const filteredList = foodData.filter(f => {
    const matchCity = activeCity === "All" || f.city === activeCity;
    const matchDiet = currentDiet === "All" || f.dietary.includes(currentDiet);
    return matchCity && matchDiet;
  });

  // ULTRA COMPACT CARDS (Spaces Removed)
  const cardsHtml = filteredList.map(f => `
    <div class="card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 14px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); position: relative;">
      
      <div style="font-size: 8.5px; color: var(--indigo-soft); text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 2px;">${f.est}</div>
      <h3 style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">${f.name}</h3>

      <!-- Location -->
      <div style="display: flex; gap: 6px; margin-bottom: 6px; align-items: flex-start;">
        <span style="font-size: 13px; margin-top: 1px; color: var(--madder);">📍</span>
        <div style="font-size: 12px; color: var(--indigo-soft); line-height: 1.3;">${f.loc} · <strong style="color: var(--indigo);">${f.city}</strong></div>
      </div>

      <!-- Hero Dish -->
      <div style="display: flex; gap: 6px; margin-bottom: 8px; align-items: flex-start;">
        <span style="font-size: 13px; margin-top: 1px;">🌟</span>
        <div style="font-size: 12px; color: var(--indigo-soft); line-height: 1.3;">The Single Best Dish:<br><strong style="color: var(--indigo); font-size: 12.5px;">${f.heroDish}</strong></div>
      </div>

      <!-- Description / Demystifier -->
      <p style="font-size: 11.5px; color: var(--indigo-soft); line-height: 1.4; margin: 0 0 8px 0;">${f.demystifier}</p>

      <!-- Diet & Spice (Tighter Margins) -->
      <div style="font-size: 11px; color: var(--indigo); font-weight: 600; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed var(--line);">
        Diet & Spice: ${f.dietary.join(', ')} · <strong style="color: var(--madder);">${f.spiceLevel}</strong>
      </div>

      <!-- Badges -->
      <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 10px;">
        <div style="flex: 1; background: rgba(46,204,113,0.12); color: #1e8449; padding: 6px 8px; border-radius: 8px; font-size: 9.5px; font-weight: 800; display: flex; align-items: center; gap: 4px; line-height: 1.2;">
          🛡️ ${f.fssaiRating}
        </div>
        <div style="flex: 1; background: rgba(34, 49, 79, 0.08); color: var(--indigo); padding: 6px 8px; border-radius: 8px; font-size: 9.5px; font-weight: 800; display: flex; align-items: center; gap: 4px; line-height: 1.2;">
          💧 ${f.waterSafety.substring(0, 18)}...
        </div>
      </div>

      <!-- Button -->
      <button class="btn btn-primary" data-cardid="${f.id}" style="width: 100%; padding: 10px; font-size: 12px; border-radius: 10px; background: var(--turmeric-deep); color: var(--indigo); font-weight: 800; box-shadow: none; border: 1px solid var(--line);">
        🗣️ Show Hindi Order Card
      </button>
    </div>
  `).join('') || `<div style="text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px;">No iconic outlets found for this combination.</div>`;

  // Compact Trails
  const trailsHtml = foodTrails.filter(t => activeCity === "All" || t.city === activeCity).map(trail => `
    <div class="card" style="border-left: 4px solid var(--marigold); padding: 14px; border-radius: 14px; margin-bottom: 12px; background: var(--paper); box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
        <div style="font-size: 9px; font-weight: 800; color: var(--madder); text-transform: uppercase; letter-spacing: 0.05em;">Self-Guided</div>
        <div style="font-size: 10px; font-weight: 700; color: var(--indigo-soft); background: var(--turmeric-deep); padding: 3px 8px; border-radius: 6px;">⏱️ ${trail.duration.split('·')[0]}</div>
      </div>
      <h3 style="margin: 0 0 6px 0; font-size: 17px; font-family: 'Fraunces', serif; color: var(--indigo); line-height: 1.1;">${trail.title}</h3>
      <div style="background: rgba(246, 237, 217, 0.4); padding: 8px 10px; border-radius: 8px; font-size: 11px; border: 1px dashed var(--line); color: var(--indigo-soft); margin-bottom: 10px; line-height: 1.3;">
        💡 <strong>Safety Tip:</strong> ${trail.safetyNote}
      </div>
      
      <div class="trail-steps" style="display:flex; flex-direction:column; gap:10px;">
        ${trail.stops.map(s => `
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <div style="background: var(--marigold); color: var(--indigo); width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9.5px; font-weight: 800; flex-shrink: 0; margin-top: 1px;">${s.step}</div>
            <div>
              <strong style="font-size: 12.5px; color: var(--indigo); display: block; margin-bottom: 1px;">${s.name}</strong>
              <span style="font-size: 11px; color: var(--indigo-soft);">${s.dish}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('') || `<div style="text-align: center; padding: 20px; color: var(--indigo-soft); font-size: 13px; font-weight: 500; border: 1px dashed var(--line); border-radius: 14px;">No food trails available for this city yet.</div>`;

  return `
    <div style="margin-bottom: 12px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">Curated Iconic Food Guide</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">Eat where the city eats</h2>
      <p class="section-sub" style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Multi-decade legendary eateries, single hero dishes, and FSSAI hygiene-verified safe street food.</p>
    </div>

    <!-- Toggle Pill -->
    <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 4px; display: flex; gap: 4px; margin-bottom: 14px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
      <button class="food-nav-btn ${currentTab === 'outlets' ? 'active' : ''}" data-subtab="outlets" style="flex: 1; border: none; padding: 8px 6px; font-size: 12px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentTab === 'outlets' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🏛️ Legendary Outlets</button>
      <button class="food-nav-btn ${currentTab === 'trails' ? 'active' : ''}" data-subtab="trails" style="flex: 1; border: none; padding: 8px 6px; font-size: 12px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; ${currentTab === 'trails' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🗺️ 1-Hr Food Trails</button>
    </div>

    <!-- City Chips -->
    <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 10px; scrollbar-width: none;">
      ${cityChips}
    </div>

    ${currentTab === 'outlets' ? `
      <!-- Diet Chips -->
      <div style="margin-bottom: 12px;">
        <div style="font-size: 12px; font-weight: 700; color: var(--indigo); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">🥗 Dietary & Allergy Shield:</div>
        <div style="display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;">
          ${dietChips}
        </div>
      </div>

      <div>
        ${cardsHtml}
      </div>
    ` : `
      <div>
        ${trailsHtml}
      </div>
    `}

    <!-- Modal remains the same -->
    <div id="vernacularModal" class="modal-overlay" style="display: ${state.activeModalCard ? 'flex' : 'none'}; position: absolute; inset: 0; background: rgba(0,0,0,0.65); z-index: 10000; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px);">
      <div class="modal-box" style="background: var(--paper); width: 100%; max-width: 300px; border-radius: 20px; padding: 20px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <button class="modal-close" id="closeModalBtn" style="position: absolute; top: 14px; right: 14px; background: var(--turmeric-deep); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 14px; color: var(--indigo-soft); display: flex; align-items: center; justify-content: center;">✕</button>
        
        <div style="font-size: 10px; color: var(--madder); font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Show to Vendor</div>
        
        <div style="background: var(--turmeric); border-radius: 12px; padding: 16px; font-size: 18px; line-height: 1.4; color: var(--indigo); font-weight: 600; border: 1px solid var(--marigold-light); text-align: left; margin-bottom: 14px;">
          ${state.activeModalCard ? state.activeModalCard.vernacularCard : ''}
        </div>
        
        <div style="font-size: 11.5px; color: var(--indigo-soft); text-align: left; line-height: 1.4; background: rgba(246, 237, 217, 0.4); padding: 12px; border-radius: 10px; border: 1px dashed var(--line);">
          <strong style="color: var(--indigo);">English Meaning:</strong><br>
          ${state.activeModalCard ? state.activeModalCard.demystifier : ''}
        </div>
        
        <button class="btn btn-primary" id="dismissModalBtn" style="width: 100%; margin-top: 16px; padding: 14px; border-radius: 12px; background: var(--indigo); color: var(--turmeric); font-weight: 700; font-size: 14px;">Close Card</button>
      </div>
    </div>
  `;
}