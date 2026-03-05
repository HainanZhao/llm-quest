// Audio context (lazy initialization)
let audioCtx: AudioContext | null = null;

/**
 * Initialize audio context
 */
export function initAudio(): void {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
}

/**
 * Play a tone
 */
export function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
): void {
  if (!audioCtx) return;
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);
}

/**
 * Play correct answer sound
 */
export function playCorrectSound(): void {
  initAudio();
  playTone(523.25, 0.15, 'sine', 0.25);
  setTimeout(() => playTone(659.25, 0.15, 'sine', 0.25), 100);
  setTimeout(() => playTone(783.99, 0.25, 'sine', 0.25), 200);
}

/**
 * Play wrong answer sound
 */
export function playWrongSound(): void {
  initAudio();
  playTone(200, 0.3, 'sawtooth', 0.15);
}

/**
 * Play level complete sound
 */
export function playLevelCompleteSound(): void {
  initAudio();
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, 'sine', 0.2), i * 120);
  });
}

/**
 * Play victory sound
 */
export function playVictorySound(): void {
  initAudio();
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.4, 'sine', 0.2), i * 150);
  });
  
  // Final chord
  setTimeout(() => {
    playTone(523.25, 0.8, 'sine', 0.15);
    playTone(659.25, 0.8, 'sine', 0.15);
    playTone(783.99, 0.8, 'sine', 0.15);
  }, 900);
}

/**
 * Play click sound
 */
export function playClickSound(): void {
  initAudio();
  playTone(800, 0.05, 'square', 0.08);
}
