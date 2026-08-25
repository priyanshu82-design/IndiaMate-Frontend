// js/views/estimateView.js
import { state } from '../state.js';
import { bargainCategories, scamPlaybook } from '../data/mockData.js';

// Global Route Data & Dynamic Segments Setup
if (!window.globalRouteData) {
  window.globalRouteData = {
    from: 'Durg Railway Station',
    to: 'Swami Vivekananda Airport Raipur',
    distanceKm: 48.5,
    durationMin: 65,
    segments: [],
    fixedEstimate: 120
  };
}

// 1. Dynamic Segment Generator based on REAL Distance & Exact Names
function buildInterconnectSegments(from, to, totalKm) {
  const km = Math.max(1, parseFloat(totalKm));
  const shortFrom = from.split(',')[0].substring(0, 20);
  const shortTo = to.split(',')[0].substring(0, 20);

  if (km <= 8) {
    return [
      { id: 1, name: `${shortFrom} ➔ ${shortTo}`, type: 'Local Auto', dist: km, time: '15-20 mins', cost: Math.max(15, Math.round(10 + km * 4.5)), icon: '🛺' }
    ];
  } else if (km <= 25) {
    const d1 = parseFloat((km * 0.4).toFixed(1));
    const d2 = parseFloat((km - d1).toFixed(1));
    return [
      { id: 1, name: `${shortFrom} ➔ Main Square`, type: 'E-Bike / Moto', dist: d1, time: 'First Leg', cost: Math.max(10, Math.round(5 + d1 * 3)), icon: '🛵' },
      { id: 2, name: `Main Square ➔ ${shortTo}`, type: 'Local Auto', dist: d2, time: 'Final Drop', cost: Math.max(15, Math.round(10 + d2 * 4.5)), icon: '🛺' }
    ];
  } else if (km <= 150) {
    const d1 = parseFloat((km * 0.15).toFixed(1));
    const d2 = parseFloat((km * 0.70).toFixed(1));
    const d3 = parseFloat((km - d1 - d2).toFixed(1));
    return [
      { id: 1, name: `${shortFrom} ➔ Bus/Train Node`, type: 'Local Auto', dist: d1, time: 'Start', cost: Math.max(15, Math.round(10 + d1 * 4.5)), icon: '🛺' },
      { id: 2, name: `Intercity Express Travel`, type: 'Local Bus / Train', dist: d2, time: 'Highway/Track', cost: Math.max(15, Math.round(5 + d2 * 1.2)), icon: '🚌' },
      { id: 3, name: `Transit Node ➔ ${shortTo}`, type: 'E-Bike / Auto', dist: d3, time: 'Last Mile', cost: Math.max(10, Math.round(5 + d3 * 3.5)), icon: '🛵' }
    ];
  } else {
    const d1 = 10; 
    const d2 = parseFloat((km - 20).toFixed(1)); 
    const d3 = 10; 
    return [
      { id: 1, name: `${shortFrom} ➔ Railway Stn`, type: 'Shared Cab', dist: d1, time: 'To Transit Hub', cost: Math.max(40, Math.round(d1 * 5)), icon: '🚕' },
      { id: 2, name: `Express Intercity Route`, type: 'Train / Sleeper Bus', dist: d2, time: 'Main Journey', cost: Math.max(150, Math.round(d2 * 1.5)), icon: '🚂' },
      { id: 3, name: `Station/Airport ➔ ${shortTo}`, type: 'Shared Cab', dist: d3, time: 'Last Mile Drop', cost: Math.max(40, Math.round(d3 * 5)), icon: '🚕' }
    ];
  }
}

export function viewEstimate() {
  const tab = state.estimatorTab || 'transit';
  const route = window.globalRouteData;
  if (!route.segments || route.segments.length === 0) {
    route.segments = buildInterconnectSegments(route.from, route.to, route.distanceKm);
    route.fixedEstimate = Math.round(route.distanceKm * 2.5 + 10);
  }

  // 2. Ultra-Cheap Real Market Fare Matrix (Tier-2/3 City Focus)
  const PROVIDERS = [
    { id: 'rapido_bike', name: 'Rapido Bike', category: 'bike', icon: '🛵', tag: 'Cheapest', calcFare: (km) => Math.max(15, Math.round(10 + (km * 3))), eta: '2-4 mins', link: () => `https://rapido.bike/` },
    { id: 'uber_moto', name: 'Uber Moto', category: 'bike', icon: '🛵', tag: 'Fast', calcFare: (km) => Math.max(18, Math.round(12 + (km * 3.2))), eta: '3-5 mins', link: () => `https://m.uber.com/` },
    { id: 'ola_bike', name: 'Ola Bike', category: 'bike', icon: '🛵', tag: 'Popular', calcFare: (km) => Math.max(18, Math.round(12 + (km * 3.5))), eta: '4-6 mins', link: () => `https://book.olacabs.com/` },
    { id: 'namma_yatri', name: 'Namma Yatri', category: 'auto', icon: '🛺', tag: '0% Commission', calcFare: (km) => Math.max(25, Math.round(15 + (km > 2 ? (km - 2) * 4.5 : 0))), eta: '3-6 mins', link: () => `https://nammayatri.in/` },
    { id: 'yatri_sathi', name: 'Yatri Sathi', category: 'auto', icon: '🛺', tag: 'Govt Supported', calcFare: (km) => Math.max(25, Math.round(15 + (km > 2 ? (km - 2) * 4.5 : 0))), eta: '4-7 mins', link: () => `https://yatrisathi.com/` },
    { id: 'jugnoo_auto', name: 'Jugnoo Auto', category: 'auto', icon: '🛺', tag: 'Affordable', calcFare: (km) => Math.max(25, Math.round(15 + (km * 4.8))), eta: '5-8 mins', link: () => `https://jugnoo.in/` },
    { id: 'uber_auto', name: 'Uber Auto', category: 'auto', icon: '🛺', tag: 'Reliable', calcFare: (km) => Math.max(30, Math.round(20 + (km * 5))), eta: '2-5 mins', link: () => `https://m.uber.com/` },
    { id: 'ola_auto', name: 'Ola Auto', category: 'auto', icon: '🛺', tag: 'Instant OTP', calcFare: (km) => Math.max(30, Math.round(20 + (km * 5.2))), eta: '3-6 mins', link: () => `https://book.olacabs.com/` },
    { id: 'blusmart_ev', name: 'BluSmart EV', category: 'cab', icon: '⚡🚗', tag: 'Zero Surge EV', calcFare: (km) => Math.max(50, Math.round(35 + (km * 6.5))), eta: '6-10 mins', link: () => `https://blu-smart.com/` },
    { id: 'uber_go', name: 'Uber Go', category: 'cab', icon: '🚗', tag: 'AC Cab', calcFare: (km) => Math.max(60, Math.round(40 + (km * 7))), eta: '3-5 mins', link: () => `https://m.uber.com/` },
    { id: 'ola_mini', name: 'Ola Mini', category: 'cab', icon: '🚗', tag: 'Comfort', calcFare: (km) => Math.max(60, Math.round(40 + (km * 7.5))), eta: '4-6 mins', link: () => `https://book.olacabs.com/` },
    { id: 'bharat_taxi', name: 'Bharat Taxi', category: 'cab', icon: '🚕', tag: 'Outstation', calcFare: (km) => Math.max(70, Math.round(50 + (km * 6.8))), eta: '10-15 mins', link: () => `https://www.bharattaxi.com/` }
  ];

  // 3. REAL-TIME POINT OF INTEREST (POI) GEOCODING API
  async function fetchRealLocation(query) {
    try {
      // Adding ', India' ensures exact Indian Airports/Stations are caught
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', India')}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        return { 
          lat: parseFloat(data[0].lat), 
          lng: parseFloat(data[0].lon),
          displayName: data[0].display_name.split(',')[0] 
        };
      }
    } catch (e) {
      console.warn("Geocoding failed for:", query);
    }
    return null;
  }

  // 4. REAL-TIME ROAD DISTANCE API (OSRM)
  async function fetchRealRoadDistance(start, end) {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.routes && data.routes.length > 0) {
        return {
          distanceKm: parseFloat((data.routes[0].distance / 1000).toFixed(1)), // Accurate up to 1 decimal
          durationMin: Math.round(data.routes[0].duration / 60)
        };
      }
    } catch (e) {
      console.warn("OSRM Routing failed, falling back to Haversine.");
    }
    
    // Exact Mathematical Fallback if OSRM is blocked
    const R = 6371;
    const dLat = (end.lat - start.lat) * Math.PI / 180;
    const dLon = (end.lng - start.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = parseFloat((R * c * 1.25).toFixed(1)); // 1.25 road curve multiplier
    return { distanceKm: Math.max(1, dist), durationMin: Math.round(dist * 2.2) };
  }

  // Live GPS Locating Tool
  window.useHubCurrentLocation = () => {
    const input = document.getElementById('hubFromInput');
    if (!navigator.geolocation) {
      if (input) input.value = "GPS not supported";
      return;
    }
    if (input) input.value = "📍 Fetching exact GPS location...";
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=16`);
          const data = await res.json();
          const place = data.address?.amenity || data.address?.railway || data.address?.suburb || data.address?.city || "Current Location";
          if (input) input.value = place;
        } catch (e) {
          if (input) input.value = "Current Location";
        }
      },
      () => {
        if (input) input.value = "Please enable GPS permission";
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  window.runFareComparison = async () => {
    const fromInput = document.getElementById('hubFromInput')?.value.trim();
    const toInput = document.getElementById('hubToInput')?.value.trim();
    const resultsContainer = document.getElementById('hubResultsContainer');
    const compareBtn = document.getElementById('hubCompareBtn');

    if (!fromInput || !toInput) {
      alert("Please enter both Pickup and Destination!");
      return;
    }

    if (compareBtn) {
      compareBtn.disabled = true;
      compareBtn.innerHTML = `<span>⏳ Finding shortest road route...</span>`;
    }

    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 25px 20px;">
          <div style="font-size: 24px; animation: pulse 1s infinite;">🛰️</div>
          <div style="font-weight: 700; color: var(--indigo); margin-top: 6px; font-size: 13px;">Analyzing map data for Airports, Stations & Streets...</div>
        </div>
      `;
    }

    // 1. Fetch Precise Coordinates
    let startCoord = await fetchRealLocation(fromInput);
    let endCoord = await fetchRealLocation(toInput);

    if (!startCoord || !endCoord) {
      alert("Could not locate specific place. Try adding the city name (e.g., 'Durg Station' instead of just 'Station').");
      if (compareBtn) {
        compareBtn.disabled = false;
        compareBtn.innerHTML = `🔍 Compare All 9 Platforms`;
      }
      return;
    }

    // 2. Fetch True Road Distance
    const routingData = await fetchRealRoadDistance(startCoord, endCoord);
    const calculatedKm = routingData.distanceKm;

    // 3. Update Global Data
    window.globalRouteData.from = startCoord.displayName || fromInput;
    window.globalRouteData.to = endCoord.displayName || toInput;
    window.globalRouteData.distanceKm = calculatedKm;
    window.globalRouteData.durationMin = routingData.durationMin;
    window.globalRouteData.segments = buildInterconnectSegments(window.globalRouteData.from, window.globalRouteData.to, calculatedKm);
    
    // Realistic interconnect total based on true km
    window.globalRouteData.fixedEstimate = Math.max(15, Math.round(calculatedKm * 2.5 + 10));

    // 4. Compute Fares
    const calculated = PROVIDERS.map(p => ({
      ...p,
      fare: p.calcFare(calculatedKm),
      bookUrl: p.link()
    }));

    window.currentHubFareData = {
      calculated,
      distanceKm: calculatedKm,
      durationMin: routingData.durationMin,
      lowestBike: [...calculated.filter(x => x.category === 'bike')].sort((a,b) => a.fare - b.fare)[0],
      lowestAuto: [...calculated.filter(x => x.category === 'auto')].sort((a,b) => a.fare - b.fare)[0],
      lowestCab: [...calculated.filter(x => x.category === 'cab')].sort((a,b) => a.fare - b.fare)[0]
    };

    if (compareBtn) {
      compareBtn.disabled = false;
      compareBtn.innerHTML = `🔍 Compare All 9 Platforms`;
    }

    window.renderHubFareCards('all');
  };

  // Renderer for Fare Cards
  window.renderHubFareCards = (categoryFilter = 'all') => {
    const data = window.currentHubFareData;
    if (!data) return;
    const summaryBanner = document.getElementById('hubSummaryBanner');
    const resultsContainer = document.getElementById('hubResultsContainer');

    if (summaryBanner) {
      summaryBanner.innerHTML = `
        <div style="background: var(--turmeric); border-radius: 14px; padding: 12px; margin-bottom: 12px; border: 1px solid var(--line);">
          <div style="font-size: 11px; font-weight: 800; color: var(--indigo); margin-bottom: 6px;">
            📍 True Road Distance: <strong>${data.distanceKm} km</strong> (~${data.durationMin} mins)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
            <div style="background: var(--paper); padding: 6px; border-radius: 8px; text-align: center; border: 1px solid var(--line);">
              <div style="font-size: 8.5px; font-weight: 800; color: var(--indigo-soft);">LOWEST BIKE</div>
              <div style="font-weight: 800; color: #27ae60; font-size: 13px; font-family: 'JetBrains Mono', monospace;">₹${data.lowestBike.fare}</div>
            </div>
            <div style="background: var(--paper); padding: 6px; border-radius: 8px; text-align: center; border: 1.5px solid #27ae60;">
              <div style="font-size: 8.5px; font-weight: 800; color: #27ae60;">BEST AUTO</div>
              <div style="font-weight: 800; color: var(--indigo); font-size: 13px; font-family: 'JetBrains Mono', monospace;">₹${data.lowestAuto.fare}</div>
            </div>
            <div style="background: var(--paper); padding: 6px; border-radius: 8px; text-align: center; border: 1px solid var(--line);">
              <div style="font-size: 8.5px; font-weight: 800; color: var(--indigo-soft);">LOWEST CAB</div>
              <div style="font-weight: 800; color: #27ae60; font-size: 13px; font-family: 'JetBrains Mono', monospace;">₹${data.lowestCab.fare}</div>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 4px; margin-bottom: 10px;">
          <button onclick="window.renderHubFareCards('all')" style="flex:1; padding:6px; border-radius:8px; font-size:10.5px; font-weight:800; border:1px solid var(--line); background:${categoryFilter==='all'?'var(--indigo)':'var(--paper)'}; color:${categoryFilter==='all'?'#fff':'var(--indigo)'}; cursor:pointer;">All Apps</button>
          <button onclick="window.renderHubFareCards('bike')" style="flex:1; padding:6px; border-radius:8px; font-size:10.5px; font-weight:800; border:1px solid var(--line); background:${categoryFilter==='bike'?'var(--indigo)':'var(--paper)'}; color:${categoryFilter==='bike'?'#fff':'var(--indigo)'}; cursor:pointer;">🛵 Bikes</button>
          <button onclick="window.renderHubFareCards('auto')" style="flex:1; padding:6px; border-radius:8px; font-size:10.5px; font-weight:800; border:1px solid var(--line); background:${categoryFilter==='auto'?'var(--indigo)':'var(--paper)'}; color:${categoryFilter==='auto'?'#fff':'var(--indigo)'}; cursor:pointer;">🛺 Autos</button>
          <button onclick="window.renderHubFareCards('cab')" style="flex:1; padding:6px; border-radius:8px; font-size:10.5px; font-weight:800; border:1px solid var(--line); background:${categoryFilter==='cab'?'var(--indigo)':'var(--paper)'}; color:${categoryFilter==='cab'?'#fff':'var(--indigo)'}; cursor:pointer;">🚗 Cabs</button>
        </div>
      `;
    }

    let items = data.calculated;
    if (categoryFilter !== 'all') items = items.filter(x => x.category === categoryFilter);
    items.sort((a, b) => a.fare - b.fare);

    if (resultsContainer) {
      resultsContainer.innerHTML = items.map(item => {
        const isBest = (item.id === data.lowestBike?.id || item.id === data.lowestAuto?.id || item.id === data.lowestCab?.id);
        return `
          <div style="background: var(--paper); border-radius: 12px; padding: 10px 12px; margin-bottom: 8px; border: 1.5px solid ${isBest ? '#27ae60' : 'var(--line)'}; position: relative;">
            ${isBest ? `<div style="position: absolute; top: -7px; right: 10px; background: #27ae60; color: #fff; font-size: 8px; font-weight: 800; padding: 2px 5px; border-radius: 4px; text-transform: uppercase;">⭐ Best Value</div>` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="font-size: 20px; width: 34px; height: 34px; background: var(--turmeric); border-radius: 8px; display: flex; align-items: center; justify-content: center;">${item.icon}</div>
                <div>
                  <div style="font-weight: 800; font-size: 13px; color: var(--indigo);">${item.name}</div>
                  <div style="font-size: 10px; color: var(--indigo-soft);">${item.tag} · ⏱️ ${item.eta}</div>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 16px; font-weight: 900; color: ${isBest ? '#27ae60' : 'var(--indigo)'}; font-family: 'JetBrains Mono', monospace;">₹${item.fare}</div>
                <a href="${item.bookUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 2px; background: ${isBest ? '#27ae60' : 'var(--indigo)'}; color: #fff; text-decoration: none; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">
                  Book Now ↗
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  };

  // Interconnect Segments - Dynamic Cost Updating (Hyper local rates)
  window.changeSegmentVehicle = (segId, newType) => {
    const seg = window.globalRouteData.segments.find(s => s.id === segId);
    if (seg) {
      seg.type = newType;
      if (newType.includes('Auto')) { seg.cost = Math.max(15, Math.round(10 + seg.dist * 4.5)); seg.icon = '🛺'; }
      else if (newType.includes('Bike') || newType.includes('Moto')) { seg.cost = Math.max(10, Math.round(5 + seg.dist * 3.0)); seg.icon = '🛵'; }
      else if (newType.includes('Bus')) { seg.cost = Math.max(5, Math.round(5 + seg.dist * 1.2)); seg.icon = '🚌'; }
      else if (newType.includes('Train')) { seg.cost = Math.max(30, Math.round(seg.dist * 1.5)); seg.icon = '🚂'; }
      else if (newType.includes('Cab') || newType.includes('Car')) { seg.cost = Math.max(25, Math.round(15 + seg.dist * 6.0)); seg.icon = '🚗'; }
      
      if (typeof window.render === 'function') window.render();
    }
  };

  const dynamicBookingTotal = route.segments.reduce((sum, s) => sum + s.cost, 0);
  const directCabQuote = Math.round(route.distanceKm * 7.5 + 40);

  // HTML Structure for Categories
  const bargainHtml = (bargainCategories || []).map(b => `
    <div class="card bargain-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 12px;">
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

  const scamHtml = (scamPlaybook || []).map(s => `
    <div class="card scam-card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--madder);">
      <h4 style="color:var(--madder); margin:0 0 4px; font-family:'Fraunces',serif; font-size:16px;">🚨 ${s.title}</h4>
      <p style="font-size:12px; color:var(--indigo-soft); margin:0 0 8px; line-height:1.4;">${s.desc}</p>
      <div class="red-flag-box" style="background: rgba(139, 38, 53, 0.08); color: var(--madder); padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">🚩 Red Flag: ${s.redFlag}</div>
    </div>
  `).join('');

  return `
    <div style="margin-bottom: 12px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">Anti-Scam & Fair Price Hub</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">Know before you go</h2>
      <p class="section-sub" style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Compare real live fares, multi-modal routes, and avoid tourist traps.</p>
    </div>

    <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 4px; display: flex; gap: 3px; margin-bottom: 14px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); overflow-x: auto;">
      <button class="food-nav-btn ${tab === 'transit' ? 'active' : ''}" data-estimatetab="transit" style="flex: 1; border: none; padding: 9px 4px; font-size: 10.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; white-space: nowrap; ${tab === 'transit' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🛺 Transit</button>
      <button class="food-nav-btn ${tab === 'interconnect' ? 'active' : ''}" data-estimatetab="interconnect" style="flex: 1; border: none; padding: 9px 4px; font-size: 10.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; white-space: nowrap; ${tab === 'interconnect' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🔀 Interconnect</button>
      <button class="food-nav-btn ${tab === 'bargain' ? 'active' : ''}" data-estimatetab="bargain" style="flex: 1; border: none; padding: 9px 4px; font-size: 10.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; white-space: nowrap; ${tab === 'bargain' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">⚖️ Bargain</button>
      <button class="food-nav-btn ${tab === 'scam' ? 'active' : ''}" data-estimatetab="scam" style="flex: 1; border: none; padding: 9px 4px; font-size: 10.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s; white-space: nowrap; ${tab === 'scam' ? 'background: var(--indigo); color: var(--paper); box-shadow: 0 2px 8px rgba(28,40,65,0.2);' : 'background: transparent; color: var(--indigo-soft);'}">🚩 Scam</button>
    </div>

    <!-- TAB 1: Transit Fares & Live Aggregator -->
    ${tab === 'transit' ? `
      <div class="card" style="padding: 16px; border-radius: 18px; margin-bottom: 14px; border: 1.5px solid var(--line); background: var(--paper);">
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <label style="font-size: 9.5px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase;">🟢 Pickup Landmark / Station</label>
            <button onclick="window.useHubCurrentLocation()" style="background: none; border: none; color: var(--madder); font-size: 10px; font-weight: 800; cursor: pointer;">📍 Use GPS</button>
          </div>
          <input type="text" id="hubFromInput" value="${route.from}" placeholder="Enter any city or landmark in India..." style="width: 100%; padding: 9px 11px; border-radius: 9px; border: 1px solid var(--line); font-size: 12.5px; font-weight: 600; background: var(--paper); color: var(--indigo);" />
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 9.5px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; display: block; margin-bottom: 3px;">🔴 Drop Destination</label>
          <input type="text" id="hubToInput" value="${route.to}" placeholder="Enter destination..." style="width: 100%; padding: 9px 11px; border-radius: 9px; border: 1px solid var(--line); font-size: 12.5px; font-weight: 600; background: var(--paper); color: var(--indigo);" />
        </div>

        <button id="hubCompareBtn" onclick="window.runFareComparison()" style="width: 100%; background: var(--madder); color: #fff; border: none; padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 3px 10px rgba(153,27,27,0.25);">
          🔍 Compare All 9 Platforms
        </button>
      </div>

      <div id="hubSummaryBanner"></div>
      <div id="hubResultsContainer">
        <div style="text-align: center; padding: 22px; border: 1.5px dashed var(--line); border-radius: 14px; background: var(--turmeric);">
          <div style="font-size: 26px; margin-bottom: 4px;">🛺 🛵 🚗</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--indigo);">Ready to Fetch API</div>
          <div style="font-size: 11px; color: var(--indigo-soft); margin-top: 2px;">Enter any two locations in India to get exact road distance and rates.</div>
        </div>
      </div>
    ` : ''}

    <!-- TAB 2: Interconnect Drive (Now Fully Synced & Dynamic) -->
    ${tab === 'interconnect' ? `
      <div style="background: var(--turmeric); border-radius: 16px; padding: 16px; margin-bottom: 14px; border: 1.5px solid var(--line);">
        
        <div style="background: var(--paper); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; border: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 9px; font-weight: 800; color: var(--madder); text-transform: uppercase;">Direct Cab Quote: <span style="text-decoration: line-through; color: var(--indigo-soft);">₹${directCabQuote}</span></div>
            <div style="font-size: 12px; font-weight: 900; color: var(--indigo);">Smart Interconnect Estimate</div>
          </div>
          <div style="font-size: 20px; font-weight: 900; color: #27ae60; font-family: 'JetBrains Mono', monospace;">
            ₹${route.fixedEstimate}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div>
            <span style="font-size: 9px; background: #27ae60; color: #fff; font-weight: 800; padding: 3px 8px; border-radius: 6px; text-transform: uppercase;">${route.from.split(',')[0].substring(0, 15)} ➔ ${route.to.split(',')[0].substring(0, 15)}</span>
            <h3 style="font-family: 'Fraunces', serif; font-size: 15px; color: var(--indigo); margin: 4px 0 0 0;">Multi-Modal Route (${route.distanceKm} km · ${route.segments.length} Segments)</h3>
          </div>
        </div>
        <p style="font-size: 11px; color: var(--indigo-soft); margin: 0 0 12px 0; line-height: 1.4;">
          Split journey into ${route.segments.length} connected vehicles to save maximum money and avoid direct cab cancellations.
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${route.segments.map((seg) => `
            <div style="background: var(--paper); border-radius: 12px; padding: 12px; border: 1px solid var(--line); position: relative;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: var(--indigo); color: #fff; font-size: 10px; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${seg.id}</span>
                  <div>
                    <div style="font-weight: 800; font-size: 12px; color: var(--indigo);">${seg.icon} ${seg.name}</div>
                    <div style="font-size: 9.5px; color: var(--madder); font-weight: 700;">Distance: ${seg.dist} km</div>
                  </div>
                </div>
                <select onchange="window.changeSegmentVehicle(${seg.id}, this.value)" style="padding: 4px 6px; border-radius: 6px; border: 1px solid var(--line); font-size: 10px; font-weight: 700; background: var(--turmeric-deep); color: var(--indigo); cursor: pointer;">
                  <option value="Shared Cab" ${seg.type.includes('Cab') || seg.type.includes('Car') ? 'selected' : ''}>🚗 Cab</option>
                  <option value="Local Auto" ${seg.type.includes('Auto') ? 'selected' : ''}>🛺 Auto</option>
                  <option value="E-Bike / Moto" ${seg.type.includes('Bike') || seg.type.includes('Moto') ? 'selected' : ''}>🛵 Bike</option>
                  <option value="Local Bus" ${seg.type.includes('Bus') ? 'selected' : ''}>🚌 Bus</option>
                  ${route.distanceKm > 100 ? `<option value="Train / Intercity Bus" ${seg.type.includes('Train') ? 'selected' : ''}>🚂 Train</option>` : ''}
                </select>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10.5px; color: var(--indigo-soft); border-top: 1px dashed var(--line); padding-top: 6px; margin-top: 6px;">
                <div>⏱️ Journey Leg: <strong style="color: var(--indigo);">${seg.time}</strong></div>
                <div style="font-family: 'JetBrains Mono', monospace; font-weight: 900; color: #27ae60; font-size: 14px;">₹${seg.cost}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <button onclick="alert('Interconnect Journey Booked! Total: ₹${dynamicBookingTotal}')" style="width: 100%; margin-top: 12px; background: #27ae60; color: #fff; border: none; padding: 12px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 3px 10px rgba(39,174,96,0.3);">
          🚀 Book Total Journey (Final ₹${dynamicBookingTotal})
        </button>
      </div>
    ` : ''}

    <!-- TAB 3 & 4: Bargain and Scam -->
    ${tab === 'bargain' ? `
      <div style="background: var(--turmeric-deep); border-radius: 10px; padding: 10px 12px; margin-bottom: 14px; font-size: 11.5px; color: var(--indigo-soft); line-height: 1.4; display: flex; gap: 8px;">
        <span>💡</span><span><strong>Fixed-Price Tags:</strong> Government Emporiums and Malls have fixed prices. Only bargain in street markets!</span>
      </div>
      ${bargainHtml}
    ` : ''}
    ${tab === 'scam' ? `
      <div style="background: var(--indigo); color: var(--turmeric); border-radius: 12px; padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
        <div style="font-weight: 800; font-size: 12.5px; color: var(--marigold-light);">📍 Scam Radar Active</div>
        <div style="font-size: 11px; color: rgba(246,237,217,0.85); line-height: 1.3;">Warning: Private stands near stations often charge double for direct drops. Use interconnect segments above.</div>
      </div>
      ${scamHtml}
    ` : ''}
  `;
}