// js/views/payView.js
import { state } from '../state.js';

export async function viewPay() {
  let exchangeRate = 87.40;
  try {
    // Live API for Forex
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      exchangeRate = Number(data.rates.INR.toFixed(2));
    }
  } catch (e) {
    console.warn('Using baseline forex rate:', e);
  }

  if (!state.wallet) {
    state.wallet = {
      balanceINR: 12480,
      linkedCard: "Visa •• 4417 (US)",
      transactions: [
        { name: "Auto ride — Connaught Place", meta: "UPI • Today, 10:12 AM", amount: -140 },
        { name: "Wallet top-up (Forex)", meta: "Visa card conversion • Today, 9:02 AM", amount: 5000 },
        { name: "Apollo 24x7 Pharmacy", meta: "UPI • Today, 8:15 AM", amount: -320 }
      ]
    };
  }

  // Compact Transaction List
  const txList = (state.wallet.transactions || []).map(t => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px dashed var(--line);">
      <div>
        <div style="font-weight: 700; font-size: 13px; color: var(--indigo); margin-bottom: 2px;">${t.name}</div>
        <div style="font-size: 10.5px; color: var(--indigo-soft);">${t.meta}</div>
      </div>
      <div style="font-family: 'JetBrains Mono', monospace; font-weight: 800; font-size: 14.5px; color: ${t.amount < 0 ? 'var(--madder)' : '#1e8449'};">
        ${t.amount < 0 ? '' : '+'}₹${Math.abs(t.amount).toLocaleString('en-IN')}
      </div>
    </div>
  `).join('');

  return `
    <div style="margin-bottom: 16px;">
      <p class="section-label" style="font-size: 10px; color: var(--madder); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0;">UPI & Travel Forex</p>
      <h2 class="section-title" style="font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: var(--indigo); margin: 0 0 6px 0; line-height: 1.1;">Digital Travel Wallet</h2>
      <p class="section-sub" style="font-size: 12px; color: var(--indigo-soft); line-height: 1.4; margin: 0;">Scan any Indian merchant QR code directly with zero foreign markups.</p>
    </div>

    <!-- MAIN WALLET CARD (Dark Blue, Compact) -->
    <div class="card" style="background: var(--indigo); color: var(--paper); border-radius: 18px; padding: 18px; margin-bottom: 14px; box-shadow: 0 6px 16px rgba(28, 40, 65, 0.15); position: relative; border: none;">
      
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <div>
          <div style="font-size: 10px; color: var(--marigold-light); font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 4px;">UPI Digital Rupee Balance</div>
          <h1 id="liveWalletBalance" style="font-family: 'JetBrains Mono', monospace; font-size: 32px; font-weight: 800; color: #fff; margin: 0; line-height: 1;">₹${state.wallet.balanceINR.toLocaleString('en-IN')}</h1>
        </div>
        <span style="background: rgba(74, 222, 128, 0.15); color: #4ade80; padding: 4px 10px; border-radius: 8px; font-size: 10.5px; font-weight: 800;">Active UPI</span>
      </div>
      
      <div style="font-size: 11.5px; color: rgba(255,255,255,0.7); margin-bottom: 16px; font-weight: 500;">Linked: ${state.wallet.linkedCard}</div>

      <div style="display: flex; gap: 10px; margin-bottom: 12px;">
        <button id="openScannerModalBtn" style="flex: 1; background: var(--madder); color: #fff; border: none; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 13.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; box-shadow: 0 4px 10px rgba(139, 38, 53, 0.3);">
          📷 Scan UPI QR
        </button>
        <button id="openTopUpModalBtn" style="flex: 1; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); padding: 12px; border-radius: 12px; font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background 0.2s;">
          + Top Up
        </button>
      </div>

      <!-- ADDED EXTRA VALUE HERE -->
      <div style="text-align: center; font-size: 9.5px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">
        🛡️ Bank-grade secure • Zero Forex Markup
      </div>
    </div>

    <!-- LIVE CURRENCY CONVERTER -->
    <div class="card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <h3 style="margin: 0 0 14px 0; font-size: 16px; font-family: 'Fraunces', serif; color: var(--indigo);">Live Currency Converter</h3>
      
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="flex: 1;">
          <label style="font-size: 10.5px; color: var(--indigo-soft); font-weight: 700; display: block; margin-bottom: 6px;">Send (USD)</label>
          <input type="number" id="forexUsdInput" value="50" min="1" data-rate="${exchangeRate}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--line); font-size: 15px; font-weight: 800; font-family: 'JetBrains Mono', monospace; background: var(--turmeric-deep); color: var(--indigo); outline: none;" />
        </div>
        <div style="color: var(--madder); padding-top: 20px; font-weight: 800; font-size: 16px;">→</div>
        <div style="flex: 1;">
          <label style="font-size: 10.5px; color: var(--indigo-soft); font-weight: 700; display: block; margin-bottom: 6px;">Receive (INR)</label>
          <div id="forexInrOutput" style="width: 100%; padding: 12px; border-radius: 10px; background: var(--turmeric-deep); font-size: 15px; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: var(--indigo); border: 1px solid transparent; display: flex; align-items: center;">
            ₹${(50 * exchangeRate).toFixed(2)}
          </div>
        </div>
      </div>
      
      <!-- ADDED EXTRA VALUE HERE -->
      <div style="margin-top: 14px; font-size: 11px; font-weight: 800; color: #1e8449; display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 8px; height: 8px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 6px #4ade80;"></span>
        Live API Rate: 1 USD = ₹${exchangeRate} INR
      </div>
    </div>

    <!-- RECENT TRANSACTIONS -->
    <div class="card" style="background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 16px; margin-bottom: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-family: 'Fraunces', serif; color: var(--indigo);">Recent Payment Activity</h3>
      <div id="txContainer">
        ${txList.length > 0 ? txList : '<p style="font-size: 12px; color: var(--indigo-soft);">No transactions recorded yet.</p>'}
      </div>
    </div>

    <!-- SCANNER MODAL (Compact Hidden code) -->
    <div id="scannerModal" style="display: none; position: absolute; inset: 0; background: #000; z-index: 9999; flex-direction: column; justify-content: space-between; padding: 24px 16px; border-radius: 30px;">
      <div style="display: flex; justify-content: space-between; align-items: center; color: #fff; z-index: 10;">
        <span style="font-weight: 600; font-size: 1rem;">📷 Scan Any UPI QR Code</span>
        <button id="closeScannerModalBtn" style="background: rgba(255,255,255,0.2); border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">✕</button>
      </div>

      <div style="position: relative; width: 240px; height: 240px; margin: auto; border: 3px solid #0070f3; border-radius: 20px; overflow: hidden; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
        <video id="cameraStreamVideo" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover; display: none;"></video>
        <div id="scannerPlaceholder" style="text-align: center; color: #aaa; padding: 10px;">
          <div style="font-size: 3rem; margin-bottom: 6px;">📱</div>
          <span style="font-size: 0.8rem;">Point camera at merchant QR</span>
        </div>
        <div style="position: absolute; left: 0; right: 0; height: 2px; background: var(--madder); box-shadow: 0 0 10px var(--madder); animation: scanLineAnim 2s infinite ease-in-out;"></div>
      </div>

      <div style="text-align: center; color: #fff; z-index: 10;">
        <p style="font-size: 0.85rem; opacity: 0.8; margin-bottom: 12px;">Supports BharatPe, Paytm, GPay & PhonePe</p>
        <button id="simulateScanDetectBtn" style="width: 100%; background: #28a745; color: #fff; border: none; padding: 14px; border-radius: 12px; font-weight: bold; font-size: 1rem; cursor: pointer;">
          ⚡ Simulate Scan: "Dilli Haat Crafts (₹250)"
        </button>
      </div>
    </div>

    <!-- PAY MODAL (Compact Hidden code) -->
    <div id="payModal" style="display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.65); z-index: 10000; align-items: center; justify-content: center; padding: 16px; border-radius: 30px; backdrop-filter: blur(4px);">
      <div style="background: var(--paper); width: 100%; max-width: 320px; border-radius: 20px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 id="payModalTitle" style="margin: 0; font-size: 18px; font-family: 'Fraunces', serif; color: var(--indigo);">UPI Instant Pay</h3>
          <button id="closePayModalBtn" style="background: var(--turmeric-deep); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: var(--indigo-soft); display: flex; align-items: center; justify-content: center;">✕</button>
        </div>
        
        <form id="livePaymentForm" style="display: flex; flex-direction: column; gap: 12px;">
          <div id="merchantFieldGroup">
            <label style="font-size: 11px; font-weight: 700; color: var(--indigo-soft); text-transform: uppercase; margin-bottom: 6px; display: block;">Recipient Merchant</label>
            <input type="text" id="payMerchantName" value="Dilli Haat Handicrafts" required style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--line); font-size: 14px; font-weight: 600; background: var(--turmeric-deep); color: var(--indigo); outline: none;" />
          </div>
          <div>
            <label style="font-size: 11px; font-weight: 700; color: var(--indigo-soft); text-transform: uppercase; margin-bottom: 6px; display: block;">Amount (INR ₹)</label>
            <input type="number" id="payAmountInput" min="1" value="250" max="${state.wallet.balanceINR}" required style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--line); font-size: 18px; font-family: 'JetBrains Mono', monospace; font-weight: 800; background: var(--turmeric-deep); color: var(--indigo); outline: none;" />
          </div>
          <button type="submit" id="confirmPaymentBtn" style="background: var(--madder); color: #fff; border: none; padding: 14px; border-radius: 12px; font-weight: 800; font-size: 14px; cursor: pointer; margin-top: 10px; box-shadow: 0 4px 10px rgba(139, 38, 53, 0.3);">
            Confirm & Pay ₹
          </button>
        </form>
      </div>
    </div>
  `;
}