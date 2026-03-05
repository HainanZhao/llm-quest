import { GameState } from '../types';
import { levels } from '../data/levels';

const STORAGE_KEY = 'llmQuestProgress';

// Initial state
const initialState: GameState = {
  currentLevel: 0,
  currentQuestion: 0,
  completedLevels: [],
  userAnsweredCorrect: false,
  playerName: ''
};

// Current state (in-memory)
let state: GameState = { ...initialState };

/**
 * Load progress from localStorage
 */
export function loadProgress(): void {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.completedLevels = parsed.completedLevels || [];
      state.playerName = parsed.playerName || '';
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }
}

/**
 * Save progress to localStorage
 */
export function saveProgress(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    completedLevels: state.completedLevels,
    playerName: state.playerName
  }));
}

/**
 * Get current state
 */
export function getState(): GameState {
  return { ...state };
}

/**
 * Update state
 */
export function setState(updates: Partial<GameState>): void {
  state = { ...state, ...updates };
}

/**
 * Check if a level is unlocked
 */
export function isLevelUnlocked(index: number): boolean {
  if (index === 0) return true;
  return state.completedLevels.includes(levels[index - 1].id);
}

/**
 * Check if a level is completed
 */
export function isLevelCompleted(levelId: number): boolean {
  return state.completedLevels.includes(levelId);
}

/**
 * Mark a level as completed
 */
export function completeLevel(levelId: number): void {
  if (!state.completedLevels.includes(levelId)) {
    state.completedLevels.push(levelId);
    saveProgress();
  }
}

/**
 * Reset all progress
 */
export function resetProgress(): void {
  state = { ...initialState };
  localStorage.removeItem(STORAGE_KEY);
}
