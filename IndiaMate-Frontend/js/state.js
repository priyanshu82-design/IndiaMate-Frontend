export const state = {
  view: 'auth',
  authMode: 'login',
  user: null,
  persona: 'international',
  selectedCurrency: 'USD',
  theme: localStorage.getItem('indiamate-theme') || 'light',

  // --- Food Guide State ---
  foodCity: 'All',
  foodDiet: 'All',
  foodSubTab: 'outlets',
  activeModalCard: null,

  // --- Crafts & GI Radar State ---
  craftCity: 'All',
  craftSubTab: 'catalog',

  // --- Micro-Itinerary State ---
  itineraryTheme: 'triad',
  itineraryHours: 2,
  itineraryStartPoint: 'NDLS',
  itineraryBufferEnabled: true,
  itineraryCompletedStops: [],
  returnAlertActive: false,

  // --- Medical State ---
  medicalSubTab: 'doctors',       // 'doctors' | 'medicine' | 'insurance'
  medicalSpecialty: 'All',        // 'All' | 'General Physician' | 'Gastroenterologist' | 'Orthopedic' | 'Dentist'
  medicalSearchQuery: '',
  medicineSearchQuery: '',

  // --- SOS & Safety State ---
  sosCountdown: 3,
  sosCountdownActive: false,
  sosTriggered: false,
  sosDiscreetMode: false,
  medicalFlashcardOpen: false,
  incidentLogs: [],

  // --- Translation State ---
  translateSplitMode: false,
  translateSpeed: 'Normal',       // 'Slow' | 'Normal' | 'Boost'
  translateCategory: 'transport', // 'transport' | 'food' | 'emergency'

  // --- Estimator & Anti-Scam State ---
  estimatorTab: 'transit',        // 'transit' | 'bargain' | 'scam'
  estimatorTimeMode: 'day',       // 'day' | 'night'
  estimatorRideType: 'auto',
  estimatorDistance: 5,
  activeDriverCard: null,

  // --- NEW: History Tracking for Recent (|||) Button ---
  viewHistory: [],
  recentModalOpen: false,
  previousView: 'home'
};