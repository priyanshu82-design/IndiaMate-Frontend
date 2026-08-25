// js/views/mapView.js
import { state } from '../state.js';

// Preloaded verified spots (Delhi, Chhattisgarh, Jaipur)
const mapSpots = [
  // Delhi
  { name: "India Gate", category: "heritage", city: "Delhi", lat: 28.6129, lng: 77.2295, desc: "National historic monument" },
  { name: "Karim's Eatery", category: "food", city: "Delhi", lat: 28.6507, lng: 77.2334, desc: "Est. 1913 • Iconic Mughlai dishes" },
  { name: "Dilli Haat Handicraft", category: "craft", city: "Delhi", lat: 28.5733, lng: 77.2081, desc: "Verified artisan cooperatives" },
  { name: "AIIMS Emergency Care", category: "er", city: "Delhi", lat: 28.5672, lng: 77.2100, desc: "24x7 Multi-speciality Emergency" },
  
  // Chhattisgarh / Bastar
  { name: "Chitrakote Waterfalls", category: "heritage", city: "Bastar", lat: 19.2023, lng: 81.7056, desc: "Niagara of India (Indravati River)" },
  { name: "Kutumsar Caves", category: "heritage", city: "Bastar", lat: 18.8824, lng: 81.9482, desc: "330m deep limestone cave structure" },
  { name: "Tirathgarh Waterfalls", category: "heritage", city: "Bastar", lat: 18.9142, lng: 81.8647, desc: "Multi-tiered cascades in Kanger Valley" },
  { name: "Maa Danteshwari Temple", category: "heritage", city: "Dantewada", lat: 18.8950, lng: 81.3524, desc: "Ancient 14th-century Shaktipeeth" },

  // Jaipur
  { name: "Hawa Mahal", category: "heritage", city: "Jaipur", lat: 26.9239, lng: 75.8267, desc: "Iconic Palace of Winds" },
  { name: "Amer Fort", category: "heritage", city: "Jaipur", lat: 26.9855, lng: 75.8513, desc: "Hilltop UNESCO World Heritage Fort" }
];

let mapInstance = null;
let activeMarkers = [];
let userGpsMarker = null;

export function viewMap() {
  setTimeout(initLiveMap, 100);

  return `
    <!-- Top Header -->
    <div style="margin-bottom: 8px;">
      <p class="section-label" style="font-size: 9.5px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 2px 0;">Live Navigation &amp; Radar</p>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 21px; font-weight: 700; color: var(--indigo); margin: 0; line-height: 1.1;">Real-Time GPS Map</h2>
        <span id="gpsStatusPill" style="background: rgba(34, 49, 79, 0.08); color: var(--indigo); padding: 3px 8px; border-radius: 6px; font-size: 9.5px; font-weight: 800;">
          📡 Acquiring Live GPS...
        </span>
      </div>
    </div>

    <!-- Live Search & Recenter Bar -->
    <div style="display: flex; gap: 6px; margin-bottom: 8px;">
      <input type="text" id="mapSearchInput" placeholder="🔍 Search place (e.g. Chitrakote, Hawa Mahal)..." style="flex: 1; border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; font-family: 'Work Sans', sans-serif; font-size: 12px; font-weight: 500; background: var(--turmeric-deep); color: var(--indigo); outline: none;" onkeydown="if(event.key === 'Enter') { window.runMapSearch(); }" />
      
      <button onclick="window.runMapSearch()" style="background: var(--indigo); color: var(--paper); border: none; padding: 0 12px; border-radius: 10px; font-weight: 700; font-size: 11.5px; cursor: pointer; flex-shrink: 0;">
        Search
      </button>
      
      <button onclick="window.requestLiveLocation(true)" title="My Live Location" style="background: var(--marigold); color: var(--indigo); border: none; width: 34px; height: 34px; border-radius: 10px; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(240, 165, 53, 0.3);">
        🎯
      </button>
    </div>

    <!-- Leaflet Interactive Canvas -->
    <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1.5px solid var(--line); box-shadow: 0 4px 12px rgba(0,0,0,0.05); height: 370px; width: 100%; background: #e5e3df;">
      <div id="leafletMapCanvas" style="width: 100%; height: 100%; z-index: 1;"></div>
    </div>

    <!-- Quick Location Chips -->
    <div style="display: flex; gap: 6px; overflow-x: auto; padding-top: 8px; scrollbar-width: none;">
      <button class="chip active" onclick="window.requestLiveLocation(true)" style="padding: 5px 10px; font-size: 11px; font-weight: 700; border-radius: 10px;">🎯 My GPS</button>
      <button class="chip" onclick="window.flyToSpot(28.6129, 77.2295, 14, 'Delhi')" style="padding: 5px 10px; font-size: 11px; font-weight: 700; border-radius: 10px;">🏛️ Delhi</button>
      <button class="chip" onclick="window.flyToSpot(19.2023, 81.7056, 13, 'Chitrakote Falls')" style="padding: 5px 10px; font-size: 11px; font-weight: 700; border-radius: 10px;">🌴 Bastar (CG)</button>
      <button class="chip" onclick="window.flyToSpot(26.9239, 75.8267, 14, 'Jaipur')" style="padding: 5px 10px; font-size: 11px; font-weight: 700; border-radius: 10px;">🏰 Jaipur</button>
    </div>

    <!-- Category Filter Chips -->
    <div style="display: flex; gap: 6px; overflow-x: auto; padding-top: 6px; scrollbar-width: none;">
      <button class="chip" onclick="window.filterSpots('all')" style="padding: 4px 8px; font-size: 10.5px; font-weight: 700; border-radius: 8px;">All Spots</button>
      <button class="chip" onclick="window.filterSpots('heritage')" style="padding: 4px 8px; font-size: 10.5px; font-weight: 700; border-radius: 8px;">🏛️ Heritage</button>
      <button class="chip" onclick="window.filterSpots('food')" style="padding: 4px 8px; font-size: 10.5px; font-weight: 700; border-radius: 8px;">🍲 Food</button>
      <button class="chip" onclick="window.filterSpots('craft')" style="padding: 4px 8px; font-size: 10.5px; font-weight: 700; border-radius: 8px;">🧵 Crafts</button>
      <button class="chip" onclick="window.filterSpots('er')" style="padding: 4px 8px; font-size: 10.5px; font-weight: 700; border-radius: 8px;">🚨 ER</button>
    </div>
  `;
}

function loadLeafletAssets() {
  return new Promise((resolve) => {
    if (window.L) return resolve(window.L);

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.id = 'leaflet-js';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve(window.L);
    document.head.appendChild(script);
  });
}

async function initLiveMap() {
  const container = document.getElementById('leafletMapCanvas');
  if (!container) return;

  const L = await loadLeafletAssets();

  if (mapInstance) {
    try { mapInstance.remove(); } catch(e) {}
    mapInstance = null;
  }

  // Default coordinates (Delhi)
  mapInstance = L.map('leafletMapCanvas', { zoomControl: false }).setView([28.6139, 77.2090], 12);

  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(mapInstance);

  setTimeout(() => { if (mapInstance) mapInstance.invalidateSize(); }, 150);

  // Pre-populate verified spots
  renderPins(L);

  // Auto-trigger live GPS location on launch
  window.requestLiveLocation(true);

  // Global Handlers
  window.flyToSpot = (lat, lng, zoom, name) => {
    if (!mapInstance) return;
    mapInstance.flyTo([lat, lng], zoom, { animate: true, duration: 1 });
    const statusPill = document.getElementById('gpsStatusPill');
    if (statusPill) statusPill.textContent = `📍 ${name}`;
  };

  window.runMapSearch = async () => {
    const query = document.getElementById('mapSearchInput')?.value;
    if (!query || !query.trim()) return;

    const statusPill = document.getElementById('gpsStatusPill');
    if (statusPill) statusPill.textContent = '🔍 Searching...';

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=1`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          L.marker([lat, lon]).addTo(mapInstance)
            .bindPopup(`<strong style="color:var(--indigo); font-size:12px;">📍 ${data[0].display_name.split(',')[0]}</strong><br/><span style="font-size:10px; color:#555;">${data[0].display_name}</span>`)
            .openPopup();

          mapInstance.flyTo([lat, lon], 14, { animate: true });
          if (statusPill) statusPill.textContent = '🟢 Located';
        } else {
          alert('Location not found. Try searching another landmark or city.');
          if (statusPill) statusPill.textContent = '🟢 Map Ready';
        }
      }
    } catch {
      alert('Search failed. Check your internet connection.');
    }
  };

  window.filterSpots = (cat) => {
    activeMarkers.forEach(({ marker, category }) => {
      if (cat === 'all' || category === cat) {
        marker.addTo(mapInstance);
      } else {
        mapInstance.removeLayer(marker);
      }
    });
  };
}

function renderPins(L) {
  activeMarkers = [];
  mapSpots.forEach(p => {
    const marker = L.marker([p.lat, p.lng]).addTo(mapInstance);
    marker.bindPopup(`
      <div style="font-family:'Work Sans',sans-serif; padding:2px;">
        <strong style="color:var(--indigo); font-size:12px;">${p.name}</strong><br/>
        <span style="font-size:9.5px; color:var(--madder); font-weight:700; text-transform:uppercase;">${p.category} · ${p.city}</span>
        <p style="margin:3px 0 0 0; font-size:10.5px; color:#444;">${p.desc}</p>
      </div>
    `);
    activeMarkers.push({ marker, category: p.category });
  });
}

window.requestLiveLocation = (fly = true) => {
  const statusPill = document.getElementById('gpsStatusPill');

  if (!navigator.geolocation) {
    if (statusPill) statusPill.textContent = '⚠️ GPS Unsupported';
    return;
  }

  if (statusPill) statusPill.textContent = '📡 Locating GPS...';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const L = window.L;
      if (!L || !mapInstance) return;

      if (userGpsMarker) mapInstance.removeLayer(userGpsMarker);

      userGpsMarker = L.circleMarker([latitude, longitude], {
        radius: 9,
        fillColor: '#8B2635',
        color: '#ffffff',
        weight: 3,
        fillOpacity: 1
      }).addTo(mapInstance).bindPopup('<strong style="color:#8B2635;">📍 You Are Here (Live Location)</strong>').openPopup();

      if (fly) {
        mapInstance.flyTo([latitude, longitude], 15, { animate: true, duration: 1 });
      }

      if (statusPill) {
        statusPill.textContent = '🟢 GPS Locked';
        statusPill.style.background = 'rgba(46, 204, 113, 0.15)';
        statusPill.style.color = '#1e8449';
      }
    },
    (err) => {
      if (statusPill) {
        statusPill.textContent = '📍 GPS Off (Default View)';
        statusPill.style.background = 'rgba(231, 76, 60, 0.15)';
        statusPill.style.color = '#c0392b';
      }
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};