import { levels } from '../data/levels';
import type { Question } from '../types';
import { isLevelUnlocked, isLevelCompleted, completeLevel } from '../core/game-state';
import { navigateTo } from '../core/navigation';
import { showConfetti, triggerVictory } from './effects';
import { playCorrectSound, playWrongSound, playLevelCompleteSound, playVictorySound } from '../audio/audio';

let currentLevelIndex = 0;
let currentQuestionIndex = 0;

/**
 * Render level selection grid
 */
export function renderLevelGrid(): void {
  const grid = document.getElementById('levelGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  levels.forEach((level, index) => {
    const card = document.createElement('div');
    card.className = 'level-card';
    
    if (isLevelCompleted(level.id)) {
      card.classList.add('completed');
    }
    
    if (!isLevelUnlocked(index)) {
      card.classList.add('locked');
    }
    
    card.innerHTML = `
      <div class="level-icon">${level.icon}</div>
      <div class="level-name">${level.name}</div>
      <div class="level-topic">${level.topic}</div>
    `;
    
    if (!card.classList.contains('locked')) {
      card.onclick = () => startLevel(index);
    }
    
    grid.appendChild(card);
  });
}

/**
 * Start a level (show intro screen)
 */
export function startLevel(index: number): void {
  currentLevelIndex = index;
  currentQuestionIndex = 0;
  
  const level = levels[index];
  
  // Show intro screen using central navigation
  navigateTo('intro', true, level.id);
  
  // Update progress
  const progress = (index / levels.length) * 100;
  const progressFill = document.getElementById('introProgressFill');
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }
  
  // Update level info
  document.getElementById('introLevelBadge')!.textContent = level.icon;
  document.getElementById('introLevelTitle')!.textContent = level.name;
  document.getElementById('introLevelTopic')!.textContent = level.topic;
  document.getElementById('introContentBox')!.innerHTML = level.content;
  
  // Update illustration
  const illustrationContainer = document.getElementById('introIllustration');
  if (illustrationContainer) {
    illustrationContainer.innerHTML = level.illustration || '';
  }
  
  // Also update game screen for when we navigate to it
  document.getElementById('levelBadge')!.textContent = level.icon;
  document.getElementById('levelTitle')!.textContent = level.name;
  document.getElementById('levelTopic')!.textContent = level.topic;
  const gameProgress = document.getElementById('progressFill');
  if (gameProgress) {
    gameProgress.style.width = progress + '%';
  }
}

/**
 * Start quiz from intro
 */
export function startQuiz(): void {
  const level = levels[currentLevelIndex];
  // Use central navigation to handle screen switching and history state
  navigateTo('game', true, level.id);
  
  showQuestion();
}

/**
 * Show current question
 */
export function showQuestion(): void {
  const level = levels[currentLevelIndex];
  const question = level.questions[currentQuestionIndex];
  
  document.getElementById('quizProgress')!.textContent = 
    `Question ${currentQuestionIndex + 1}/${level.questions.length}`;
  
  const quizContent = document.getElementById('quizContent');
  if (!quizContent) return;
  
  quizContent.innerHTML = `
    <div class="question">${question.q}</div>
    <div class="options">
      ${question.options.map((opt, i) => `
        <div class="option" data-correct="${opt.correct}" data-index="${i}">
          <span class="option-letter">${opt.a})</span>${opt.text}
        </div>
      `).join('')}
    </div>
    <div class="explanation" id="explanation">
      <strong>💡 ${question.explanation}</strong>
    </div>
    <div class="quiz-actions" id="quizActions" style="display:none">
      <button class="btn btn-primary" id="retryBtn">Continue</button>
    </div>
  `;
  
  // Add click handlers
  quizContent.querySelectorAll('.option').forEach(opt => {
    (opt as HTMLElement).onclick = () => selectOption(opt as HTMLElement);
  });
}

/**
 * Handle option selection
 */
export function selectOption(optionEl: HTMLElement): void {
  const correct = optionEl.dataset.correct === 'true';
  const options = document.querySelectorAll('.option') as NodeListOf<HTMLElement>;
  
  // Disable all options
  options.forEach(opt => opt.style.pointerEvents = 'none');
  
  if (correct) {
    optionEl.classList.add('correct');
    showConfetti();
    playCorrectSound();
  } else {
    optionEl.classList.add('wrong');
    playWrongSound();
    // Show correct answer
    options.forEach(opt => {
      if (opt.dataset.correct === 'true') {
        opt.classList.add('correct');
      }
    });
  }
  
  const explanation = document.getElementById('explanation');
  if (explanation) {
    explanation.classList.add('show');
  }
  
  const quizActions = document.getElementById('quizActions');
  if (quizActions) {
    quizActions.style.display = 'flex';
  }
  
  const retryBtn = document.getElementById('retryBtn');
  if (retryBtn) {
    if (!correct) {
      retryBtn.textContent = 'Try Again';
      retryBtn.classList.remove('btn-primary');
      retryBtn.classList.add('btn-retry');
      retryBtn.onclick = () => retryQuestion();
    } else if (currentQuestionIndex < levels[currentLevelIndex].questions.length - 1) {
      retryBtn.textContent = 'Next Question';
      retryBtn.classList.add('btn-primary');
      retryBtn.classList.remove('btn-retry');
      retryBtn.onclick = () => nextQuestion();
    } else {
      retryBtn.textContent = 'Level Complete! ✨';
      retryBtn.classList.add('btn-primary');
      retryBtn.classList.remove('btn-retry');
      retryBtn.onclick = () => completeLevelFlow();
    }
  }
}

/**
 * Retry question (after wrong answer)
 */
function retryQuestion(): void {
  currentQuestionIndex = 0;
  showQuestion();
}

/**
 * Move to next question
 */
function nextQuestion(): void {
  currentQuestionIndex++;
  showQuestion();
}

/**
 * Complete level flow
 */
function completeLevelFlow(): void {
  const level = levels[currentLevelIndex];
  completeLevel(level.id);
  playLevelCompleteSound();
  
  if (currentLevelIndex >= levels.length - 1) {
    // All levels complete!
    showVictory();
  } else {
    // Go to next level
    currentLevelIndex++;
    currentQuestionIndex = 0;
    startLevel(currentLevelIndex);
  }
}

/**
 * Show victory screen
 */
export function showVictory(): void {
  const now = new Date();
  const timestamp = now.toLocaleString();
  
  document.getElementById('completionTime')!.textContent = 'Completed: ' + timestamp;
  
  // Show victory screen using central navigation
  navigateTo('victory');
  
  // Trigger effects
  setTimeout(() => triggerVictory(), 10);
  
  playVictorySound();
}

/**
 * Initialize game (exposed for global access)
 */
export function initGame(): void {
  // Expose functions globally for HTML onclick handlers
  (window as any).startLevel = startLevel;
  (window as any).startQuiz = startQuiz;
  (window as any).renderLevelGrid = renderLevelGrid;

  // Listen for navigation events from the router
  window.addEventListener('levelNavigate', (e: any) => {
    const { screen, levelId } = e.detail;
    const levelIndex = levels.findIndex(l => l.id === levelId);
    if (levelIndex !== -1) {
      if (screen === 'intro') {
        startLevel(levelIndex);
      } else if (screen === 'game') {
        currentLevelIndex = levelIndex;
        currentQuestionIndex = 0;
        showQuestion();
      }
    }
  });
}
