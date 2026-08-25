// js/views/esimView.js
import { esimPlans } from '../data/mockData.js';

export function viewEsim() {
  const cards = (esimPlans || []).map((p, idx) => `
    <div class="card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 14px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); position: relative;">
      
      <!-- Top Row: Provider & Price -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div>
          <span style="background: rgba(39, 174, 96, 0.12); color: #1e8449; padding: 3px 8px; border-radius: 6px; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Official Retail Tariff</span>
          <h3 style="font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: var(--indigo); margin: 4px 0 0 0; line-height: 1.2;">${p.provider}</h3>
        </div>
        <div style="text-align: right;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 800; color: var(--madder);">₹${p.priceINR}</div>
          <div style="font-size: 10px; color: var(--indigo-soft); font-weight: 600;">approx. ${p.priceUSD}</div>
        </div>
      </div>

      <!-- Plan Specs Box -->
      <div style="background: var(--turmeric-deep); border-radius: 10px; padding: 10px 12px; margin-bottom: 10px; font-size: 12px; color: var(--indigo); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 10px; color: var(--indigo-soft); text-transform: uppercase; font-weight: 700; display: block;">Data &amp; Validity:</span>
          <strong>${p.data}</strong>
        </div>
        <span style="background: var(--paper); padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; color: var(--indigo); border: 1px solid var(--line);">
          ⚡ 5G / 4G
        </span>
      </div>

      <!-- Location Info -->
      <div style="font-size: 11px; color: var(--indigo-soft); margin-bottom: 10px; line-height: 1.3;">
        📍 <strong>Where to get:</strong> ${p.store}
      </div>

      <!-- Action Button -->
      <button class="btn btn-primary" onclick="alert('Activation Guide: Keep Passport & Visa copy ready for official ${p.provider} KYC counter.')" style="width: 100%; padding: 10px; font-size: 12px; border-radius: 10px; font-weight: 800; background: var(--indigo); color: var(--turmeric); border: none; cursor: pointer;">
        📱 How to Activate &amp; Buy
      </button>
    </div>
  `).join('');

  return `
    <!-- Top Header -->
    <div style="margin-bottom: 12px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">Connectivity &amp; Telecom</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">Verified Tourist eSIMs</h2>
      <p class="section-sub" style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Official telecom rates for travelers. Avoid paying 3x–4x inflated prices at unauthorized airport kiosks.</p>
    </div>

    <!-- Quick Tip Banner -->
    <div style="background: var(--turmeric-deep); border-radius: 12px; padding: 10px 12px; margin-bottom: 14px; font-size: 11px; color: var(--indigo-soft); line-height: 1.4; display: flex; gap: 8px; border: 1px dashed var(--line);">
      <span style="font-size: 15px;">💡</span>
      <span><strong>Safety Tip:</strong> Buy directly from brand kiosks (Airtel / Jio) inside T3 arrivals or use instant in-app digital profiles.</span>
    </div>

    <!-- Plans List -->
    <div style="margin-bottom: 16px;">
      ${cards}
    </div>

    <!-- 3-Step Compact Activation Guide -->
    <div class="card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 14px; margin-bottom: 10px;">
      <div style="font-size: 10px; font-weight: 800; color: var(--indigo-soft); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
        ⚡ 3-Step Indian SIM KYC Requirements:
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; color: var(--indigo);">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="background: var(--turmeric-deep); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; flex-shrink: 0;">1</span>
          <span>Original Passport &amp; Valid Indian Visa/e-Visa.</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="background: var(--turmeric-deep); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; flex-shrink: 0;">2</span>
          <span>Live photo taken at official counter (takes 2 mins).</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="background: var(--turmeric-deep); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; flex-shrink: 0;">3</span>
          <span>Scan eSIM QR code — activated within 15–30 mins.</span>
        </div>
      </div>
    </div>
  `;
}