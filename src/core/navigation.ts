type Screen = 'welcome' | 'levels' | 'intro' | 'game' | 'victory';

type ScreenCallbacks = {
  onScreenChange?: (screen: Screen) => void;
};

let currentScreen: Screen = 'welcome';
let callbacks: ScreenCallbacks = {};

/**
 * Set screen change callback
 */
export function onScreenChange(callback: (screen: Screen) => void): void {
  callbacks.onScreenChange = callback;
}

/**
 * Get current screen
 */
export function getCurrentScreen(): Screen {
  return currentScreen;
}

/**
 * Navigate to a screen
 */
export function navigateTo(screen: Screen, pushHistory = true): void {
  currentScreen = screen;
  
  // Hide all screens
  document.getElementById('welcome')?.classList.add('hidden');
  document.getElementById('levels')?.classList.add('hidden');
  document.getElementById('intro')?.classList.add('hidden');
  document.getElementById('game')?.classList.add('hidden');
  document.getElementById('victory')?.classList.add('hidden');
  
  // Show target screen
  const targetEl = document.getElementById(screen);
  if (targetEl) {
    targetEl.classList.remove('hidden');
    targetEl.style.display = 'block';
  }
  
  // Update history
  if (pushHistory) {
    updateHistory(screen);
  }
  
  // Notify callbacks
  callbacks.onScreenChange?.(screen);
}

/**
 * Update browser history
 */
function updateHistory(screen: Screen): void {
  const state = { screen };
  switch (screen) {
    case 'levels':
      history.pushState(state, '', '#levels');
      break;
    case 'game':
    case 'intro':
      history.pushState(state, '', '#game');
      break;
    default:
      history.pushState(state, '', '#');
  }
}

/**
 * Handle browser back button
 */
export function handlePopState(event: PopStateEvent): void {
  const state = event.state as { screen?: Screen } | null;
  if (state?.screen) {
    navigateTo(state.screen, false);
  } else {
    navigateTo('welcome', false);
  }
}

/**
 * Initialize navigation with history support
 */
export function initNavigation(): void {
  window.addEventListener('popstate', handlePopState);
}

/**
 * Go back to levels screen
 */
export function goToLevels(): void {
  navigateTo('levels');
}

/**
 * Go back to welcome screen
 */
export function goToWelcome(): void {
  navigateTo('welcome');
}
