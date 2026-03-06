import '../styles/main.css';
import { loadProgress } from './core/game-state';
import { initNavigation, navigateTo, handleHashChange } from './core/navigation';
import { renderLevelGrid, initGame } from './ui/components';
import { playClickSound } from './audio/audio';

/**
 * Initialize the game
 */
function init(): void {
  // Load saved progress
  loadProgress();
  
  // Initialize game components first (to set up listeners)
  initGame();
  
  // Initialize navigation
  initNavigation();
  
  // Render level grid
  renderLevelGrid();
  
  // Set up global functions for HTML onclick handlers
  (window as any).playClickSound = playClickSound;
  (window as any).showLevels = () => {
    playClickSound();
    navigateTo('levels');
    renderLevelGrid();
  };
  
  // Handle initial route
  handleHashChange();
  
  console.log('LLM Quest initialized!');
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
