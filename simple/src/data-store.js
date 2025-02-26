// Add this to a new file named data-store.js in your project

// Global data storage
let useCaseDataStore = {};

// Function to generate a unique ID for each use case
function generateUniqueId(useCase) {
  // Create a simple hash from the use case name
  let hash = 0;
  const str = useCase["Use Case"] || "unknown";
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 8);
}

// Store a use case in the data store
function storeUseCaseData(useCase) {
  const id = generateUniqueId(useCase);
  useCaseDataStore[id] = useCase;
  return id;
}

// Retrieve a use case from the data store
function getUseCaseData(id) {
  return useCaseDataStore[id] || null;
}

// Function to save data to localStorage (to persist between pages)
function saveDataToStorage() {
  localStorage.setItem('useCaseDataStore', JSON.stringify(useCaseDataStore));
}

// Function to load data from localStorage
function loadDataFromStorage() {
  const storedData = localStorage.getItem('useCaseDataStore');
  if (storedData) {
    useCaseDataStore = JSON.parse(storedData);
  }
}

// Initialize by loading any existing data
loadDataFromStorage();