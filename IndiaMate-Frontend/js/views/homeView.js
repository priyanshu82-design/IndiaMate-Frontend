// js/views/homeView.js
import { state } from '../state.js';

export function viewHome() {
  const userName = state.user ? state.user.name.split(' ')[0] : 'Traveler';
  const isIntl = state.persona === 'international';

  return `
    <!-- 1. Live GPS Radar & Search (Top Position) -->
    <div class="feature-card" data-goto="map" style="background: var(--paper); border: 1.5px solid var(--marigold); border-radius: 14px; padding: 10px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; box-shadow: 0 3px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(46, 204, 113, 0.15); color: #1e8449; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">
          🛰️
        </div>
        <div>
          <div style="font-size: 12.5px; font-weight: 800; color: var(--indigo); font-family: 'Fraunces', serif;">Live GPS Radar &amp; Search</div>
          <div style="font-size: 10px; color: var(--indigo-soft);">Find nearby safe spots, food &amp; verified crafts</div>
        </div>
      </div>
      <span style="background: var(--turmeric-deep); color: var(--indigo); padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 800; flex-shrink: 0;">
        Open Map ›
      </span>
    </div>

    <!-- 2. Hero Banner (Navy Gradient) -->
    <div class="hero" style="background: linear-gradient(135deg, var(--indigo) 0%, #2A3B5C 100%); color: var(--turmeric); border-radius: 16px; padding: 16px 18px; margin-bottom: 16px; box-shadow: 0 6px 18px rgba(28,40,65,0.18);">
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--marigold-light); font-weight: 800; margin-bottom: 4px;">
        ✨ Namaste, ${userName}
      </div>
      <h1 style="font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; line-height: 1.25; margin: 0 0 6px 0; color: #fff;">
        ${isIntl ? 'Everything you need for India, in one place.' : 'Explore India seamlessly across states.'}
      </h1>
      <p style="font-size: 11.5px; color: rgba(255,255,255,0.85); line-height: 1.4; margin: 0;">
        ${isIntl 
          ? 'Zero-markup UPI wallet, scam-free routes, and verified artisan clusters.' 
          : 'Iconic heritage food, fair transit fare radar, and curated regional plans.'}
      </p>
    </div>

    <!-- 3. Section Label -->
    <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 10px 0;">
      ${isIntl ? '⚡ Foreigner Essentials & Tools' : '⚡ Explorer Dashboard'}
    </p>

    <!-- 4. Feature Cards Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
      
      <!-- Feature: Forex & UPI (Special Highlight for Intl) -->
      <div class="feature-card" data-goto="pay" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; ${isIntl ? 'grid-column: span 2; display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, rgba(232,163,61,0.12) 0%, rgba(255,255,255,0.9) 100%); border: 1.5px solid var(--marigold);' : ''}">
        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(39, 174, 96, 0.12); color: #27ae60; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; ${!isIntl ? 'margin-bottom: 8px;' : ''}">
          💳
        </div>
        <div>
          <h3 style="font-family: 'Fraunces', serif; font-size: 13.5px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">
            ${isIntl ? 'Forex & UPI Wallet' : 'UPI & Travel Wallet'}
          </h3>
          <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">
            ${isIntl ? 'Scan Indian UPI QRs with foreign cards at 0% markup.' : 'Instant digital rupee balance & expense log.'}
          </p>
        </div>
      </div>

      <!-- Feature: Iconic Food -->
      <div class="feature-card" data-goto="food" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(232, 163, 61, 0.15); color: #d35400; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🍲
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">Iconic Food</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Verified heritage eateries & safe dishes.</p>
      </div>

      <!-- Feature: GI-Tag Crafts -->
      <div class="feature-card" data-goto="crafts" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(142, 68, 173, 0.12); color: #8e44ad; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🧵
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">GI Crafts & Silk</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Direct weaver societies & benchmark rates.</p>
      </div>

      <!-- Feature: Smart Itineraries -->
      <div class="feature-card" data-goto="itinerary" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(52, 152, 219, 0.12); color: #2980b9; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🗺️
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">Smart Routes</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Bastar, Jaipur & Delhi micro-itineraries.</p>
      </div>

      <!-- Feature: Fare & Scam Shield -->
      <div class="feature-card" data-goto="estimate" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(243, 156, 18, 0.14); color: #d68910; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🛺
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">Anti-Scam & Fares</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Meter fare calculator & bargaining meter.</p>
      </div>

      <!-- Feature: Live Translator -->
      <div class="feature-card" data-goto="translate" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(26, 188, 156, 0.12); color: #16a085; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🗣️
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">Live Translator</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Two-way voice translator & vernacular cards.</p>
      </div>

      <!-- Feature: Medical & ER -->
      <div class="feature-card" data-goto="medical" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(231, 76, 60, 0.12); color: #c0392b; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🩺
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">Medical & Care</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">NABH doctors & generic medicine decoder.</p>
      </div>

      <!-- Feature: Tourist e-SIM -->
      <div class="feature-card" data-goto="esim" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(52, 73, 94, 0.12); color: #2c3e50; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          📶
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--indigo); margin: 0 0 2px 0;">Tourist e-SIM</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Official Airtel/Jio airport retail plans.</p>
      </div>

      <!-- Feature: 1-Tap SOS Emergency -->
      <div class="feature-card" data-goto="sos" style="background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: 12px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; border-left: 3px solid var(--madder);">
        <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(192, 57, 43, 0.15); color: var(--madder); display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 8px;">
          🚨
        </div>
        <h3 style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: var(--madder); margin: 0 0 2px 0;">1-Tap SOS (112)</h3>
        <p style="font-size: 10.5px; color: var(--indigo-soft); line-height: 1.3; margin: 0;">Instant GPS broadcast to 112 & embassy.</p>
      </div>

    </div>
  `;
}