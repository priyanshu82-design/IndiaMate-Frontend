import { state } from './state.js';
import { FOREX_RATES, foodData, walletData } from './data/mockData.js';

// Import Views
import { viewAuth } from './views/authView.js';
import { viewHome } from './views/homeView.js';
import { viewPay } from './views/payView.js';
import { viewFood } from './views/foodView.js';
import { viewCrafts } from './views/craftsView.js';
import { viewSos } from './views/sosView.js';
import { viewEsim } from './views/esimView.js';
import { viewTranslate } from './views/translateView.js';
import { viewEstimate } from './views/estimateView.js';
import { viewItinerary } from './views/itineraryView.js';
import { viewMedical } from './views/medicalView.js';
import { viewProfile } from './views/profileView.js';
import { viewMap } from './views/mapView.js'; // 👈 Full Map View Integration

const viewEl = document.getElementById('view');
const phoneShell = document.getElementById('phoneShell');
const avatarMenuBtn = document.getElementById('avatarMenuBtn');
const backBtn = document.getElementById('backBtn');

const TAB_VIEWS = ['pay', 'food', 'crafts']; 

const sideMenu = document.getElementById('sideMenu');
const sideMenuOverlay = document.getElementById('sideMenuOverlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');

let sosTimerInterval = null;
let cameraStream = null;

// Initial Theme Setup
document.documentElement.setAttribute('data-theme', state.theme || 'light');

export function goTo(viewName) {
  if (!Array.isArray(state.viewHistory)) {
    state.viewHistory = [];
  }
  
  if (state.view && state.view !== 'auth' && state.viewHistory[state.viewHistory.length - 1] !== state.view) {
    state.viewHistory.push(state.view);
  }
  
  state.previousView = state.view;
  state.view = viewName;
  render();
}

export async function render() {
  if (!Array.isArray(state.viewHistory)) {
    state.viewHistory = [];
  }

  const map = {
    auth: () => viewAuth(state.authMode),
    home: () => viewHome(),
    pay: () => viewPay(),
    food: () => viewFood(state.foodCity),
    crafts: () => viewCrafts(),
    sos: () => viewSos(),
    esim: () => viewEsim(),
    translate: () => viewTranslate(),
    estimate: () => viewEstimate(),
    itinerary: () => viewItinerary(),
    medical: () => viewMedical(),
    profile: () => viewProfile(),
    map: () => viewMap() // 👈 Direct Instant Render
  };

  if (viewEl) {
    try {
      const viewFn = map[state.view] || (() => viewHome());
      const viewResult = viewFn();
      viewEl.innerHTML = (viewResult instanceof Promise) ? await viewResult : viewResult;
    } catch (err) {
      console.error('Render error:', err);
      viewEl.innerHTML = '<div style="padding:20px; text-align:center;">Failed to load view.</div>';
    }
    viewEl.scrollTop = 0;
    viewEl.classList.remove('animate-in');
    void viewEl.offsetWidth; 
    viewEl.classList.add('animate-in');
  }

  if (phoneShell) {
    phoneShell.classList.toggle('auth-mode', state.view === 'auth');
  }

  // Active Tab Highlight
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === state.view);
  });

  // Floating pill only on home page
  const pillNav = document.querySelector('.galaxy-pill-nav');
  if (pillNav) {
    pillNav.style.display = (state.view === 'home') ? 'flex' : 'none';
  }
  
  if (viewEl) {
    viewEl.style.paddingBottom = (state.view === 'home') ? '140px' : '80px';
  }

  // Top Bar & Back Button
  const isSecondary = !['home', ...TAB_VIEWS].includes(state.view) && state.view !== 'auth';
  if (backBtn) {
    backBtn.hidden = !isSecondary;
  }
  
  if (state.user && state.view !== 'auth') {
    if (avatarMenuBtn) {
      avatarMenuBtn.hidden = isSecondary; 
      avatarMenuBtn.textContent = state.user.initial || 'T'; 
    }
    
    const sideAvatar = document.getElementById('sideAvatarText');
    const sideName = document.getElementById('sideProfileName');
    const sideUpi = document.getElementById('sideProfileUpi');
    
    if (sideAvatar) sideAvatar.textContent = state.user.initial || 'T';
    if (sideName) sideName.textContent = state.user.name || 'Traveler';
    if (sideUpi) sideUpi.innerHTML = `UPI ID: ${(state.user.email || 'traveler').split('@')[0]}@indiamate <span>📑</span>`;
  } else if (avatarMenuBtn) {
    avatarMenuBtn.hidden = true;
  }

  // Recent Tabs Modal
  const recentModal = document.getElementById('recentModal');
  if (recentModal) {
    recentModal.style.display = state.recentModalOpen ? 'flex' : 'none';
    const historyList = document.getElementById('recentHistoryList');
    if (historyList) {
      if (state.viewHistory.length === 0) {
        historyList.innerHTML = '<div style="font-size:12px; color:var(--indigo-soft); text-align:center; padding:10px;">No recent history yet. Explore the app!</div>';
      } else {
        const recentItems = [...new Set(state.viewHistory)].reverse().slice(0, 10);
        historyList.innerHTML = recentItems.map(v => `
          <div class="history-item" data-historygoto="${v}">
            <span>🕒</span> ${v === 'home' ? 'Home Dashboard' : v.charAt(0).toUpperCase() + v.slice(1) + ' View'}
          </div>
        `).join('');

        historyList.querySelectorAll('.history-item').forEach(item => {
          item.addEventListener('click', () => {
            state.recentModalOpen = false;
            goTo(item.dataset.historygoto);
          });
        });
      }
    }
  }

  bindEvents();
}

function bindEvents() {
  if (!viewEl) return;

  // View Navigation
  viewEl.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => goTo(el.dataset.goto));
  });

  // 1. Home Persona Switcher
  if (state.view === 'home') {
    viewEl.querySelectorAll('[data-persona]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.persona = btn.dataset.persona;
        render();
      });
    });
  }

  // 2. Authentication View
  if (state.view === 'auth') {
    const toggleBtn = document.getElementById('toggleAuthMode');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.preventDefault();
        state.authMode = toggleBtn.dataset.mode;
        render();
      };
    }

    const form = document.getElementById('authForm');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const emailEl = document.getElementById('authEmail');
        const passEl = document.getElementById('authPassword');
        const nameField = document.getElementById('authName');

        const email = emailEl ? emailEl.value.trim() : '';
        const password = passEl ? passEl.value.trim() : '';
        const name = nameField ? nameField.value.trim() : email.split('@')[0];

        const endpoint = state.authMode === 'signup' 
          ? 'http://localhost:5000/api/auth/register' 
          : 'http://localhost:5000/api/auth/login';

        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
          });
          const data = await res.json();

          if (res.ok) {
            state.user = { 
              name: data.name || name, 
              email: data.email || email, 
              initial: (data.name || name || 'T').charAt(0).toUpperCase(),
              token: data.token 
            };
            state.view = 'home';
            render();
          } else {
            alert(data.message || 'Authentication failed');
          }
        } catch (err) {
          console.warn('Backend server offline, using local fallback:', err);
          state.user = { 
            name: name || 'Traveler', 
            email: email || 'you@example.com', 
            initial: (name || 'T').charAt(0).toUpperCase() 
          };
          state.view = 'home';
          render();
        }
      };
    }
  }

  // 3. Medical View
  if (state.view === 'medical') {
    viewEl.querySelectorAll('[data-medtab]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.medicalSubTab = btn.dataset.medtab;
        render();
      });
    });

    viewEl.querySelectorAll('[data-medspec]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.medicalSpecialty = btn.dataset.medspec;
        render();
      });
    });

    const medInput = document.getElementById('medicineSearchInput');
    if (medInput) {
      medInput.addEventListener('input', (e) => {
        state.medicineSearchQuery = e.target.value;
      });
    }

    viewEl.querySelectorAll('[data-call]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = `tel:${btn.dataset.call}`;
      });
    });
  }

  // 4. SOS & Emergency View
  if (state.view === 'sos') {
    const triggerLocationAlert = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            await fetch('http://localhost:5000/api/sos/alert', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                latitude, 
                longitude, 
                userId: state.user ? (state.user._id || state.user.id || 'guest') : 'guest',
                message: 'Emergency SOS triggered from UI' 
              })
            });
          } catch (e) {
            console.warn('SOS server dispatch offline');
          }
        });
      }
    };

    document.getElementById('startSosCountdownBtn')?.addEventListener('click', () => {
      state.sosCountdownActive = true;
      state.sosCountdown = 3;
      render();

      sosTimerInterval = setInterval(() => {
        state.sosCountdown -= 1;
        if (state.sosCountdown <= 0) {
          clearInterval(sosTimerInterval);
          state.sosCountdownActive = false;
          state.sosTriggered = true;
          triggerLocationAlert();
        }
        render();
      }, 1000);
    });

    document.getElementById('cancelSosCountdownBtn')?.addEventListener('click', () => {
      if (sosTimerInterval) clearInterval(sosTimerInterval);
      state.sosCountdownActive = false;
      state.sosCountdown = 3;
      render();
    });

    document.getElementById('stopSosBtn')?.addEventListener('click', () => {
      state.sosTriggered = false;
      render();
    });

    document.getElementById('openMedicalCardBtn')?.addEventListener('click', () => {
      state.medicalFlashcardOpen = true;
      render();
    });

    const closeMedCard = () => {
      state.medicalFlashcardOpen = false;
      render();
    };
    document.getElementById('closeMedicalCardBtn')?.addEventListener('click', closeMedCard);
    document.getElementById('dismissMedicalCardBtn')?.addEventListener('click', closeMedCard);

    document.getElementById('toggleDiscreetBtn')?.addEventListener('click', () => {
      state.sosDiscreetMode = !state.sosDiscreetMode;
      alert(state.sosDiscreetMode ? 'Silent Discreet Mode Activated.' : 'Discreet Mode turned off.');
    });

    document.getElementById('createIncidentLogBtn')?.addEventListener('click', () => {
      if (!Array.isArray(state.incidentLogs)) {
        state.incidentLogs = [];
      }
      const log = {
        date: new Date().toLocaleString(),
        location: 'Connaught Place Outer Ring, New Delhi',
        type: 'General Incident Report'
      };
      state.incidentLogs.push(log);
      alert(`Incident Logged at ${log.date}. Saved.`);
    });

    viewEl.querySelectorAll('[data-call]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = `tel:${btn.dataset.call}`;
      });
    });
  }

  // 5. Food View
  if (state.view === 'food') {
    viewEl.querySelectorAll('[data-foodcity]').forEach(chip => {
      chip.addEventListener('click', () => {
        state.foodCity = chip.dataset.foodcity;
        render();
      });
    });

    viewEl.querySelectorAll('[data-fooddiet]').forEach(chip => {
      chip.addEventListener('click', () => {
        state.foodDiet = chip.dataset.fooddiet;
        render();
      });
    });

    viewEl.querySelectorAll('[data-subtab]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.foodSubTab = btn.dataset.subtab;
        render();
      });
    });

    viewEl.querySelectorAll('[data-cardid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = (foodData || []).find(f => f.id === btn.dataset.cardid);
        if (item) {
          state.activeModalCard = item;
          render();
        }
      });
    });

    const closeModal = () => {
      state.activeModalCard = null;
      render();
    };
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('dismissModalBtn')?.addEventListener('click', closeModal);
  }

  // 6. Time-Smart Micro-Itinerary View
  if (state.view === 'itinerary') {
    const saveBtn = document.getElementById('saveItineraryBackendBtn');
    if (saveBtn) {
      saveBtn.onclick = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/itineraries', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.user && state.user.token ? state.user.token : ''}`
            },
            body: JSON.stringify({
              title: 'Micro-Itinerary City Route',
              city: 'Delhi',
              days: [{ dayNumber: 1, activities: [{ time: '10:00 AM', placeName: 'Heritage Tour', costEstimate: 250 }] }],
              totalEstimatedCost: 500
            })
          });
          if (res.ok) {
            alert('Itinerary successfully saved to backend database!');
          } else {
            alert('Please log in first to save your itinerary.');
          }
        } catch (err) {
          console.warn('Backend sync failed:', err);
          alert('Saved locally.');
        }
      };
    }

    viewEl.querySelectorAll('[data-itheme]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.itineraryTheme = btn.dataset.itheme;
        state.itineraryHours = state.itineraryTheme === 'cg' ? 6 : (state.itineraryTheme === 'jaipur' ? 4 : 2);
        render();
      });
    });

    viewEl.querySelectorAll('[data-hours]').forEach(chip => {
      chip.addEventListener('click', () => {
        state.itineraryHours = parseInt(chip.dataset.hours, 10);
        render();
      });
    });

    const hubSelect = document.getElementById('startHubSelect');
    if (hubSelect) {
      hubSelect.addEventListener('change', (e) => {
        state.itineraryStartPoint = e.target.value;
      });
    }

    const bufferBtn = document.getElementById('bufferToggleBtn');
    if (bufferBtn) {
      bufferBtn.addEventListener('click', () => {
        state.itineraryBufferEnabled = !state.itineraryBufferEnabled;
        render();
      });
    }

    viewEl.querySelectorAll('.stop-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const stopId = e.target.dataset.stopid;
        if (!Array.isArray(state.itineraryCompletedStops)) {
          state.itineraryCompletedStops = [];
        }
        if (e.target.checked) {
          if (!state.itineraryCompletedStops.includes(stopId)) {
            state.itineraryCompletedStops.push(stopId);
          }
        } else {
          state.itineraryCompletedStops = state.itineraryCompletedStops.filter(id => id !== stopId);
        }
        render();
      });
    });

    document.getElementById('triggerReturnBtn')?.addEventListener('click', () => {
      state.returnAlertActive = true;
      render();
    });

    const closeReturnModal = () => {
      state.returnAlertActive = false;
      render();
    };
    document.getElementById('closeReturnModalBtn')?.addEventListener('click', closeReturnModal);
    document.getElementById('dismissReturnModalBtn')?.addEventListener('click', closeReturnModal);
  }

  // 7. Crafts View
  if (state.view === 'crafts') {
    viewEl.querySelectorAll('[data-crafttab]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.craftSubTab = btn.dataset.crafttab;
        render();
      });
    });

    viewEl.querySelectorAll('[data-craftcity]').forEach(chip => {
      chip.addEventListener('click', () => {
        state.craftCity = chip.dataset.craftcity;
        render();
      });
    });
  }

  // 8. Payment View
  if (state.view === 'pay') {
    if (!state.wallet) {
      state.wallet = walletData || { balanceINR: 24500, transactions: [] };
    }

    const usdInput = document.getElementById('forexUsdInput');
    const inrOutput = document.getElementById('forexInrOutput');
    if (usdInput && inrOutput) {
      usdInput.oninput = (e) => {
        const rate = Number(usdInput.dataset.rate) || 87.40;
        const val = Number(e.target.value) || 0;
        inrOutput.textContent = `₹${(val * rate).toFixed(2)}`;
      };
    }

    const currencySelect = document.getElementById('currencySelect');
    const forexInput = document.getElementById('forexInput');
    const classicInrOutput = document.getElementById('inrOutput');
    if (currencySelect || forexInput) {
      const calculateForex = () => {
        const curr = currencySelect ? currencySelect.value : 'USD';
        state.selectedCurrency = curr;
        const rate = (FOREX_RATES && FOREX_RATES[curr]) ? FOREX_RATES[curr] : 87.4;
        const val = parseFloat(forexInput?.value) || 0;
        if (classicInrOutput) classicInrOutput.value = '₹' + Math.round(val * rate).toLocaleString('en-IN');
      };
      if (currencySelect) currencySelect.onchange = calculateForex;
      if (forexInput) forexInput.oninput = calculateForex;
      calculateForex();
    }

    const scannerModal = document.getElementById('scannerModal');
    const openScannerBtn = document.getElementById('openScannerModalBtn') || document.getElementById('scanQrBtn');
    const closeScannerBtn = document.getElementById('closeScannerModalBtn');
    const simulateScanBtn = document.getElementById('simulateScanDetectBtn');
    const cameraVideo = document.getElementById('cameraStreamVideo');

    const payModal = document.getElementById('payModal');
    const openTopUpBtn = document.getElementById('openTopUpModalBtn') || document.getElementById('topUpBtn');
    const closePayModalBtn = document.getElementById('closePayModalBtn');
    const livePaymentForm = document.getElementById('livePaymentForm');
    const payMerchantName = document.getElementById('payMerchantName');
    const payAmountInput = document.getElementById('payAmountInput');

    let activePayMode = 'pay';

    if (openScannerBtn && scannerModal) {
      openScannerBtn.onclick = async () => {
        scannerModal.style.display = 'flex';
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (cameraVideo) {
              cameraVideo.srcObject = cameraStream;
              cameraVideo.style.display = 'block';
            }
          } catch {
            console.log('Simulated camera view active.');
          }
        }
      };
    }

    if (closeScannerBtn && scannerModal) {
      closeScannerBtn.onclick = () => {
        if (cameraStream) {
          cameraStream.getTracks().forEach(t => t.stop());
          cameraStream = null;
        }
        scannerModal.style.display = 'none';
      };
    }

    if (simulateScanBtn) {
      simulateScanBtn.onclick = () => {
        if (cameraStream) {
          cameraStream.getTracks().forEach(t => t.stop());
          cameraStream = null;
        }
        if (scannerModal) scannerModal.style.display = 'none';
        activePayMode = 'pay';
        if (payMerchantName) payMerchantName.value = 'Dilli Haat Handicrafts (Verified)';
        if (payAmountInput) payAmountInput.value = '250';
        if (payModal) payModal.style.display = 'flex';
      };
    }

    if (openTopUpBtn && payModal) {
      openTopUpBtn.onclick = () => {
        activePayMode = 'topup';
        const title = document.getElementById('payModalTitle');
        const grp = document.getElementById('merchantFieldGroup');
        const btn = document.getElementById('confirmPaymentBtn');
        if (title) title.textContent = 'Top Up Digital Rupee';
        if (grp) grp.style.display = 'none';
        if (payAmountInput) payAmountInput.value = '2000';
        if (btn) { btn.textContent = 'Add Money to Wallet'; btn.style.background = '#28a745'; }
        payModal.style.display = 'flex';
      };
    }

    if (closePayModalBtn && payModal) {
      closePayModalBtn.onclick = () => { payModal.style.display = 'none'; };
    }

    if (livePaymentForm) {
      livePaymentForm.onsubmit = (e) => {
        e.preventDefault();
        const amount = Number(payAmountInput ? payAmountInput.value : 0);
        if (!amount || amount <= 0) return;

        if (activePayMode === 'pay') {
          if (amount > state.wallet.balanceINR) {
            alert('Insufficient balance');
            return;
          }
          state.wallet.balanceINR -= amount;
          if (!Array.isArray(state.wallet.transactions)) {
            state.wallet.transactions = [];
          }
          state.wallet.transactions.unshift({
            name: (payMerchantName && payMerchantName.value) || 'UPI Merchant',
            meta: 'UPI QR · Just Now',
            amount: -amount
          });
        } else {
          state.wallet.balanceINR += amount;
          if (!Array.isArray(state.wallet.transactions)) {
            state.wallet.transactions = [];
          }
          state.wallet.transactions.unshift({
            name: 'Wallet Top-up',
            meta: 'Bank Transfer · Just Now',
            amount: amount
          });
        }

        if (payModal) payModal.style.display = 'none';
        render();
      };
    }
  }

  // 9. Translator View
  if (state.view === 'translate') {
    const toggleSplitBtn = document.getElementById('toggleSplitBtn');
    if (toggleSplitBtn) {
      toggleSplitBtn.onclick = () => {
        state.translateSplitMode = !state.translateSplitMode;
        render();
      };
    }

    const speedBoostBtn = document.getElementById('speedBoostBtn');
    if (speedBoostBtn) {
      speedBoostBtn.onclick = () => {
        if (state.translateSpeed === 'Normal') state.translateSpeed = 'Loud Boost';
        else if (state.translateSpeed === 'Loud Boost') state.translateSpeed = 'Slow';
        else state.translateSpeed = 'Normal';
        render();
      };
    }

    viewEl.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.translateCategory = btn.dataset.cat;
        render();
      });
    });

    const translateInput = document.getElementById('liveTranslateInput') || document.getElementById('translateInput');
    const translateBtn = document.getElementById('triggerTranslateBtn');
    const speakBtn = document.getElementById('speakPromptBtn');
    const translateOutput = document.getElementById('translateOutput');

    const executeTranslation = async (text) => {
      if (!text || !text.trim()) return;
      state.translateInput = text.trim();
      state.isTranslating = true;
      if (translateInput) translateInput.value = state.translateInput;
      if (translateOutput) translateOutput.textContent = 'Translating...';

      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(state.translateInput)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data[0]) {
            state.translatedText = data[0].map(item => item[0]).join('');
            if (translateOutput) translateOutput.textContent = state.translatedText;
          }
        }
      } catch {
        state.translatedText = 'Translation failed';
        if (translateOutput) translateOutput.textContent = state.translatedText;
      } finally {
        state.isTranslating = false;
      }
    };

    if (translateBtn && translateInput) {
      translateBtn.onclick = () => executeTranslation(translateInput.value);
    }

    document.querySelectorAll('.phrase-chip-card').forEach(card => {
      card.onclick = () => {
        if (card.dataset.eng) {
          executeTranslation(card.dataset.eng);
        } else if (card.dataset.reg && translateOutput) {
          if (translateInput) translateInput.value = card.dataset.eng || '';
          translateOutput.textContent = card.dataset.reg;
        }
      };
    });

    if (speakBtn) {
      speakBtn.onclick = () => {
        const rawText = decodeURIComponent(speakBtn.dataset.speak || state.translatedText || (translateOutput ? translateOutput.textContent : ''));
        if (rawText && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(rawText);
          utterance.lang = 'hi-IN';
          utterance.rate = state.translateSpeed === 'Slow' ? 0.65 : 0.85;
          window.speechSynthesis.speak(utterance);
        }
      };
    }

    document.getElementById('swapLangBtn')?.addEventListener('click', () => {
      if (translateInput && translateOutput) {
        const tmp = translateInput.value;
        translateInput.value = translateOutput.textContent;
        translateOutput.textContent = tmp;
      }
    });

    document.getElementById('ocrScannerBtn')?.addEventListener('click', () => alert("Camera Activated: Scanning signs/menus."));
    document.getElementById('generateSummaryBtn')?.addEventListener('click', () => alert("Transcript Summary Generated & Saved!"));
    document.getElementById('micBtn')?.addEventListener('click', () => alert("Microphone listening..."));
    viewEl.querySelectorAll('.split-mic-btn').forEach(btn => {
      btn.addEventListener('click', () => alert("Split-Screen Mic listening..."));
    });
  }

  // 10. Estimator View
  if (state.view === 'estimate') {
    viewEl.querySelectorAll('[data-estimatetab]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.estimatorTab = btn.dataset.estimatetab;
        render();
      });
    });

    if (state.estimatorTab === 'transit') {
      const typeSelect = document.getElementById('rideTypeSelect');
      const distInput = document.getElementById('rideDistanceInput');

      if (typeSelect) {
        typeSelect.addEventListener('change', (e) => {
          state.estimatorRideType = e.target.value;
          render();
        });
      }
      if (distInput) {
        distInput.addEventListener('input', (e) => {
          state.estimatorDistance = e.target.value;
        });
      }

      document.getElementById('nightModeToggleBtn')?.addEventListener('click', () => {
        state.estimatorTimeMode = state.estimatorTimeMode === 'day' ? 'night' : 'day';
        render();
      });

      document.getElementById('showDriverCardBtn')?.addEventListener('click', () => {
        state.activeDriverCard = true;
        render();
      });
      document.getElementById('closeDriverModalBtn')?.addEventListener('click', () => {
        state.activeDriverCard = false;
        render();
      });
    }

    if (state.estimatorTab === 'scam') {
      document.getElementById('reportScamBtn')?.addEventListener('click', () => alert("Community Scam Report Logged!"));
    }
  }

  // 11. Profile View & Theme Toggle
  if (state.view === 'profile') {
    const toggleThemeAction = () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('indiamate-theme', state.theme);
      render();
    };

    document.getElementById('themeToggle')?.addEventListener('click', toggleThemeAction);
    document.getElementById('profileThemeToggle')?.addEventListener('click', toggleThemeAction);

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      closeDrawer();
      state.user = null;
      state.viewHistory = [];
      state.view = 'auth';
      state.authMode = 'login';
      render();
    });
  }
}

// Drawer Handlers
const openDrawer = () => {
  sideMenu?.classList.add('active');
  sideMenuOverlay?.classList.add('active');
};
const closeDrawer = () => {
  sideMenu?.classList.remove('active');
  sideMenuOverlay?.classList.remove('active');
};

avatarMenuBtn?.addEventListener('click', openDrawer);
closeMenuBtn?.addEventListener('click', closeDrawer);
sideMenuOverlay?.addEventListener('click', closeDrawer);

document.getElementById('menuLogoutBtn')?.addEventListener('click', () => {
  closeDrawer();
  state.user = null;
  state.viewHistory = [];
  state.view = 'auth';
  state.authMode = 'login';
  render();
});

sideMenu?.querySelectorAll('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => {
    closeDrawer();
    goTo(btn.dataset.goto);
  });
});

// Floating Tab Pill Clicks
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (state.user) goTo(tab.dataset.view);
  });
});

// Android System Navigation Buttons
document.getElementById('sysRecentBtn')?.addEventListener('click', () => {
  if (state.user) {
    state.recentModalOpen = true;
    render();
  }
});

document.getElementById('closeRecentBtn')?.addEventListener('click', () => {
  state.recentModalOpen = false;
  render();
});

document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
  state.viewHistory = [];
  state.recentModalOpen = false;
  render();
});

document.getElementById('sysHomeBtn')?.addEventListener('click', () => {
  if (state.user) goTo('home');
});

document.getElementById('sysBackBtn')?.addEventListener('click', () => {
  if (state.user) {
    if (Array.isArray(state.viewHistory) && state.viewHistory.length > 0) {
      const lastView = state.viewHistory.pop();
      state.view = lastView;
      render();
    } else {
      goTo('home');
    }
  }
});

// Appbar Back & SOS
document.getElementById('sosBtn')?.addEventListener('click', () => {
  if (state.user) goTo('sos');
});

backBtn?.addEventListener('click', () => {
  if (Array.isArray(state.viewHistory) && state.viewHistory.length > 0) {
    state.view = state.viewHistory.pop();
    render();
  } else { 
    goTo('home');
  }
});

// Global Persona Switcher Handler
window.switchTravelPersona = function(mode) {
  state.persona = mode;
  if (typeof render === 'function') {
    render();
  }
};

// Expose global navigation helpers
window.goTo = goTo;
window.render = render;

// Mount Application
render();