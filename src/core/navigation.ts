type Screen = 'welcome' | 'levels' | 'intro' | 'game' | 'victory';

type ScreenCallbacks = {
  onScreenChange?: (screen: Screen) => void;
};

let currentScreen: Screen = 'welcome';
let currentLevelId: number | null = null;
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
export function navigateTo(screen: Screen, pushHistory = true, levelId: number | null = null): void {
  currentScreen = screen;
  currentLevelId = levelId;
  
  // Hide all screens
  const screens: Screen[] = ['welcome', 'levels', 'intro', 'game', 'victory'];
  screens.forEach(s => {
    document.getElementById(s)?.classList.remove('show');
  });
  
  // Show target screen
  const targetEl = document.getElementById(screen);
  if (targetEl) {
    targetEl.classList.add('show');
  }
  
  // Update history
  if (pushHistory) {
    updateHistory(screen, levelId);
  }
  
  // Notify callbacks
  callbacks.onScreenChange?.(screen);
}

/**
 * Update browser history
 */
function updateHistory(screen: Screen, levelId: number | null = null): void {
  const state = { screen, levelId };
  let hash = '#';
  
  switch (screen) {
    case 'levels':
      hash = '#levels';
      break;
    case 'intro':
      hash = levelId ? `#level-${levelId}` : '#levels';
      break;
    case 'game':
      hash = levelId ? `#quiz-${levelId}` : '#game';
      break;
    case 'victory':
      hash = '#victory';
      break;
  }
  
  history.pushState(state, '', hash);
}

/**
 * Handle browser back button
 */
export function handlePopState(event: PopStateEvent): void {
  const state = event.state as { screen?: Screen, levelId?: number | null } | null;
  
  // If we have state from history API, use it
  if (state?.screen) {
    // If it's a level/quiz, we need to trigger the level start logic which is in components.ts
    // but navigateTo is the low-level switcher. 
    // For now, we'll just navigate. The main.ts init logic will handle the initial hash load.
    navigateTo(state.screen, false, state.levelId);
    
    // If we are navigating to intro/game, we need to ensure the level is loaded
    if ((state.screen === 'intro' || state.screen === 'game') && state.levelId) {
      // Trigger a custom event or check if we can call startLevel from here
      // To keep it simple, we'll let the global window handlers deal with it if needed
      // or rely on the user clicking. But for POPSTATE, we should ideally re-render.
      const event = new CustomEvent('levelNavigate', { detail: { screen: state.screen, levelId: state.levelId } });
      window.dispatchEvent(event);
    }
  } else {
    // Fallback to hash parsing if no state
    handleHashChange();
  }
}

/**
 * Parse current hash and navigate
 */
export function handleHashChange(): void {
  const hash = window.location.hash;
  
  if (hash.startsWith('#level-')) {
    const id = parseInt(hash.replace('#level-', ''));
    if (!isNaN(id)) {
      const event = new CustomEvent('levelNavigate', { detail: { screen: 'intro', levelId: id } });
      window.dispatchEvent(event);
      return;
    }
  }
  
  if (hash.startsWith('#quiz-')) {
    const id = parseInt(hash.replace('#quiz-', ''));
    if (!isNaN(id)) {
      const event = new CustomEvent('levelNavigate', { detail: { screen: 'game', levelId: id } });
      window.dispatchEvent(event);
      return;
    }
  }
  
  switch (hash) {
    case '#levels':
      navigateTo('levels', false);
      break;
    case '#victory':
      navigateTo('victory', false);
      break;
    default:
      navigateTo('welcome', false);
  }
}

/**
 * Initialize navigation with history support
 */
export function initNavigation(): void {
  window.addEventListener('popstate', handlePopState);
  // Also handle direct hash changes without history state
  window.addEventListener('hashchange', handleHashChange);
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
