// js/views/itineraryView.js
import { state } from '../state.js';
import { transitStartingPoints, microItineraryData } from '../data/mockData.js';

export function viewItinerary() {
  const currentTheme = state.itineraryTheme || 'triad';
  const hours = state.itineraryHours || 6;
  
  if (!state.savedPlans) state.savedPlans = [];

  const regionalPlans = {
    cg: {
      6: {
        title: "Bastar Waterfalls & Caves Loop (6 Hrs)",
        effectiveTime: "5 hrs (+ 1 hr travel buffer)",
        weatherAdvice: "🌊 चित्रकोट जलप्रपात और कुटमसर की underground गुफाओं का अद्भुत सफर।",
        stops: [
          { id: "cg-1", type: "Natural Wonder", name: "Chitrakote Waterfalls (Jagdalpur)", timeSpent: "2.5 hrs", queueTime: "No queue", openStatus: "🟢 Open 24x7", climateTag: "Breezy & Scenic", transitToNext: "Drive 38 km to Kutumsar", legFare: "₹600 Cab" },
          { id: "cg-2", type: "Cave Exploration", name: "Kutumsar Underground Caves", timeSpent: "2 hrs", queueTime: "10 min ticket", openStatus: "🟢 Open till 5 PM", climateTag: "Limestone Formations", transitToNext: "Return to City Hub", legFare: "₹400 Auto" }
        ]
      },
      8: {
        title: "Bastar Tribal Heritage & Tirathgarh Loop (8 Hrs)",
        effectiveTime: "7 hrs (+ 1 hr buffer)",
        weatherAdvice: "🌿 तीरथगढ़ फॉल्स, दंतेश्वरी मंदिर और बस्तर आर्ट्स का पूरा दिन।",
        stops: [
          { id: "cg-3", type: "Divine Heritage", name: "Maa Danteshwari Temple (Dantewada)", timeSpent: "2.5 hrs", queueTime: "15 min darshan", openStatus: "🟢 Open", climateTag: "Sacred Shrines", transitToNext: "Drive to Tirathgarh", legFare: "₹800 Cab" },
          { id: "cg-4", type: "Waterfalls & Nature", name: "Tirathgarh Multi-tier Waterfalls", timeSpent: "2.5 hrs", queueTime: "Normal entry", openStatus: "🟢 Open", climateTag: "Forest Canopy", transitToNext: "Drive to Local Market", legFare: "₹500 Cab" },
          { id: "cg-5", type: "Tribal Crafts", name: "Bastar Dhokra & Terracotta Market", timeSpent: "1.5 hrs", queueTime: "No wait", openStatus: "🟢 Open", climateTag: "Artisan Studios", transitToNext: "Return to Hub", legFare: "₹100" }
        ]
      },
      12: {
        title: "Ultimate Bastar Maha-Explorer (12 Hrs)",
        effectiveTime: "10 hrs (+ 2 hr buffer)",
        weatherAdvice: "🎒 चित्रकोट, तीरथगढ़, कुटमसर और दंतेवाड़ा का महा-टूर!",
        stops: [
          { id: "cg-6", type: "Morning Waterfall", name: "Chitrakote Sunrise & Boating", timeSpent: "3 hrs", queueTime: "No wait", openStatus: "🟢 Open", climateTag: "Morning Mist", transitToNext: "Drive to Tirathgarh Falls", legFare: "₹700 Cab" },
          { id: "cg-7", type: "Afternoon Nature", name: "Tirathgarh Falls & Kanger Valley", timeSpent: "3 hrs", queueTime: "Normal entry", openStatus: "🟢 Open", climateTag: "Shaded Forest", transitToNext: "Drive to Dantewada", legFare: "₹900 Cab" },
          { id: "cg-8", type: "Evening Heritage", name: "Maa Danteshwari Temple & Darshan", timeSpent: "3 hrs", queueTime: "20 min", openStatus: "🟢 Open", climateTag: "Temple Courtyard", transitToNext: "Return trip to Hub", legFare: "₹600 Cab" }
        ]
      }
    },
    jaipur: {
      4: {
        title: "Pink City Heritage & Hawa Mahal (4 Hrs)",
        effectiveTime: "3.5 hrs (+ 30 min buffer)",
        weatherAdvice: "🏰 हवा महल, सिटी पैलेस और जौहरी बाजार का रॉयल टूर।",
        stops: [
          { id: "jp-1", type: "Iconic Landmark", name: "Hawa Mahal & Sireh Deori Bazaar", timeSpent: "1.5 hrs", queueTime: "10 min queue", openStatus: "🟢 Open", climateTag: "Historic Architecture", transitToNext: "Walk 500m to City Palace", legFare: "₹0 (Walking)" },
          { id: "jp-2", type: "Royal Palace", name: "City Palace & Museum", timeSpent: "2 hrs", queueTime: "Fast-track QR", openStatus: "🟢 Open", climateTag: "Royal Courtyards", transitToNext: "Return to Hub", legFare: "₹100 Auto" }
        ]
      },
      8: {
        title: "Jaipur Forts & Amer Palace Grand Tour (8 Hrs)",
        effectiveTime: "7 hrs (+ 1 hr buffer)",
        weatherAdvice: "👑 आमेर किला, जयगढ़ और जलमहल का भव्य दिन।",
        stops: [
          { id: "jp-3", type: "Hilltop Fort", name: "Amer Fort & Sheesh Mahal", timeSpent: "3 hrs", queueTime: "20 min entry", openStatus: "🟢 Open", climateTag: "Scenic Hills", transitToNext: "Drive to Jal Mahal", legFare: "₹300 Cab" },
          { id: "jp-4", type: "Scenic Lake", name: "Jal Mahal Palace Viewpoint", timeSpent: "1 hr", queueTime: "Open view", openStatus: "🟢 Open 24x7", climateTag: "Lake Breeze", transitToNext: "Drive to Nahargarh Fort", legFare: "₹250 Cab" },
          { id: "jp-5", type: "Sunset Viewpoint", name: "Nahargarh Sunset Point", timeSpent: "2 hrs", queueTime: "10 min", openStatus: "🟢 Open till 10 PM", climateTag: "Panoramic City View", transitToNext: "Return to Hotel/Hub", legFare: "₹400 Cab" }
        ]
      }
    }
  };

  let currentPlan;
  if (currentTheme === 'cg') {
    currentPlan = regionalPlans.cg[hours] || regionalPlans.cg[6];
  } else if (currentTheme === 'jaipur') {
    currentPlan = regionalPlans.jaipur[hours] || regionalPlans.jaipur[8];
  } else {
    currentPlan = microItineraryData[currentTheme]?.[hours] || microItineraryData.triad[2];
  }

  const startHubOptions = transitStartingPoints.map(p => `
    <option value="${p.id}" ${state.itineraryStartPoint === p.id ? 'selected' : ''}>📍 ${p.name}</option>
  `).join('');

  const hourOptions = currentTheme === 'cg' ? [6, 8, 12] : (currentTheme === 'jaipur' ? [4, 8] : [2, 4, 6]);
  const hourChips = hourOptions.map(h => `
    <button class="chip ${h === hours ? 'active' : ''}" data-hours="${h}" style="padding: 10px 16px; font-size: 13.5px; border-radius: 12px; font-weight: 700;">${h} Hrs</button>
  `).join('');

  const stopsHtml = (currentPlan?.stops || []).map((stop, idx) => {
    return `
      <div class="card" style="margin-bottom: 14px; border-left: 5px solid var(--marigold); padding: 18px; border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
          <div style="font-size: 10.5px; font-weight: 800; color: var(--madder); text-transform: uppercase; letter-spacing: 0.05em;">Step ${idx + 1} • ${stop.type}</div>
          <div style="font-size: 11.5px; font-weight: 700; color: var(--indigo-soft); background: var(--turmeric-deep); padding: 4px 8px; border-radius: 8px;">⏱️ ${stop.timeSpent}</div>
        </div>
        <h3 style="margin: 0 0 12px 0; font-size: 18px; font-family: 'Fraunces', serif; color: var(--indigo);">${stop.name}</h3>
        
        <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
          <span style="background: rgba(46,204,113,0.12); color: #1e8449; padding: 5px 10px; border-radius: 8px; font-size: 11px; font-weight: 700;">${stop.openStatus}</span>
          <span style="background: var(--turmeric-deep); color: var(--indigo); padding: 5px 10px; border-radius: 8px; font-size: 11px; font-weight: 700;">👥 ${stop.queueTime}</span>
        </div>
        
        <div style="background: rgba(246, 237, 217, 0.4); padding: 12px; border-radius: 10px; font-size: 12px; border: 1px dashed var(--line);">
          <strong>Next Stop:</strong> ${stop.transitToNext} <br>
          <span style="color: var(--indigo-soft); margin-top:6px; display:inline-block;">Est. Travel Fare: <strong style="color:var(--indigo);">${stop.legFare}</strong></span>
        </div>
      </div>
    `;
  }).join('');

  // Global save function with full stops data included
  window.saveLocalPlan = () => {
     const planToSave = {
        title: currentPlan.title,
        hub: state.itineraryStartPoint || 'NDLS',
        hours: hours,
        date: new Date().toLocaleDateString(),
        stops: currentPlan.stops,
        coveredIds: []
     };
     if(!state.savedPlans) state.savedPlans = [];
     state.savedPlans.push(planToSave);
     alert('✅ Plan successfully saved! View and track it in your Profile section.');
  };

  return `
    <div style="background: var(--paper); border: 1px solid var(--line); border-radius: 20px; padding: 20px; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">Smart Itinerary Planner</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">Design Your Day</h2>
      <p class="section-sub" style="font-size: 12.5px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Explore Delhi, Chhattisgarh (Bastar), Jaipur, or Foodie trails with optimized routes.</p>
    </div>

    <!-- Restored Foodie Tab along with Delhi, CG and Jaipur -->
    <div style="background: var(--turmeric-deep); border-radius: 16px; padding: 6px; display: flex; gap: 4px; margin-bottom: 18px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.03);">
      <button class="food-nav-btn ${currentTheme === 'triad' ? 'active' : ''}" data-itheme="triad" style="flex: 1; border: none; padding: 10px 2px; font-size: 10.5px; font-weight: 800; border-radius: 12px; cursor: pointer; transition: all 0.2s; ${currentTheme === 'triad' ? 'background: var(--indigo); color: var(--paper);' : 'background: transparent; color: var(--indigo-soft);'}">🏛️ Delhi</button>
      
      <button class="food-nav-btn ${currentTheme === 'cg' ? 'active' : ''}" data-itheme="cg" style="flex: 1; border: none; padding: 10px 2px; font-size: 10.5px; font-weight: 800; border-radius: 12px; cursor: pointer; transition: all 0.2s; ${currentTheme === 'cg' ? 'background: var(--madder); color: var(--paper);' : 'background: transparent; color: var(--indigo-soft);'}">🌴 Chhattisgarh</button>
      
      <button class="food-nav-btn ${currentTheme === 'jaipur' ? 'active' : ''}" data-itheme="jaipur" style="flex: 1; border: none; padding: 10px 2px; font-size: 10.5px; font-weight: 800; border-radius: 12px; cursor: pointer; transition: all 0.2s; ${currentTheme === 'jaipur' ? 'background: var(--marigold); color: var(--indigo);' : 'background: transparent; color: var(--indigo-soft);'}">🏰 Jaipur</button>

      <button class="food-nav-btn ${currentTheme === 'foodie' ? 'active' : ''}" data-itheme="foodie" style="flex: 1; border: none; padding: 10px 2px; font-size: 10.5px; font-weight: 800; border-radius: 12px; cursor: pointer; transition: all 0.2s; ${currentTheme === 'foodie' ? 'background: #27ae60; color: var(--paper);' : 'background: transparent; color: var(--indigo-soft);'}">🍲 Foodie</button>
    </div>

    <div class="card" style="padding: 16px; margin-bottom: 16px; border-radius: 16px;">
      <label style="font-size: 10.5px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; display: block; margin-bottom: 6px;">Starting Point (Hub)</label>
      <select id="startHubSelect" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--turmeric-deep); font-size: 13.5px; font-weight: 700; color: var(--indigo); outline: none;">
        ${startHubOptions}
      </select>
    </div>

    <label style="font-size: 10.5px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; margin-left: 4px; display: block; margin-bottom: 8px;">Select Duration</label>
    <div class="chip-row" style="margin-bottom: 20px;">
      ${hourChips}
    </div>

    <div class="hero" style="padding: 22px 20px; background: linear-gradient(135deg, var(--indigo), #2E3F63); border-radius: 18px; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(28,40,65,0.2);">
      <div style="font-size: 10px; color: var(--marigold-light); text-transform: uppercase; font-weight: 800; margin-bottom: 6px; letter-spacing: 0.1em;">Generated Route</div>
      <h1 style="font-size: 22px; margin: 0 0 8px 0; color: var(--paper); line-height: 1.2;">${currentPlan?.title || 'Custom Route'}</h1>
      <p style="font-size: 12.5px; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.4;">${currentPlan?.weatherAdvice || 'Optimized for local travel.'}</p>
    </div>

    <div style="margin-bottom: 24px;">
      ${stopsHtml}
    </div>

    <button class="btn btn-primary" onclick="window.saveLocalPlan()" style="width: 100%; padding: 14px; font-size: 14px; border-radius: 14px; margin-bottom: 12px; box-shadow: 0 6px 16px rgba(240, 165, 53, 0.3); font-weight: 800;">
      💾 Save Plan to Profile
    </button>
  `;
}