/**
 * Show confetti animation
 */
export function showConfetti(count: number = 50): void {
  const container = document.getElementById('confetti');
  if (!container) return;
  
  container.innerHTML = '';
  
  const colors = ['#9b4dca', '#00d4ff', '#ff6b35', '#00ff88', '#ffd700'];
  
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (2 + Math.random()) + 's';
    container.appendChild(piece);
  }
  
  // Clean up after animation
  setTimeout(() => {
    container.innerHTML = '';
  }, 3500);
}

/**
 * Trigger victory animations
 */
export function triggerVictory(): void {
  const victoryEl = document.getElementById('victory');
  if (victoryEl) {
    victoryEl.classList.add('show');
  }
  
  // Multiple confetti bursts
  showConfetti(150);
  setTimeout(() => showConfetti(100), 500);
  setTimeout(() => showConfetti(100), 1000);
}

/**
 * Fade out an element
 */
export function fadeOut(element: HTMLElement, duration: number = 500): Promise<void> {
  return new Promise((resolve) => {
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'scale(0.95)';
    element.style.pointerEvents = 'none';
    
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
}

/**
 * Fade in an element
 */
export function fadeIn(element: HTMLElement, duration: number = 400): Promise<void> {
  return new Promise((resolve) => {
    element.style.display = 'block';
    element.style.opacity = '0';
    
    // Force reflow
    element.offsetHeight;
    
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
    
    setTimeout(resolve, duration);
  });
}
