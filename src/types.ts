// Type definitions for LLM Quest

export interface Option {
  a: string;
  text: string;
  correct?: boolean;
}

export interface Question {
  q: string;
  options: Option[];
  explanation: string;
}

export interface Level {
  id: number;
  icon: string;
  name: string;
  topic: string;
  story: string;
  content: string;
  illustration?: string;
  questions: Question[];
}

export interface GameState {
  currentLevel: number;
  currentQuestion: number;
  completedLevels: number[];
  userAnsweredCorrect: boolean;
  playerName: string;
  startTime?: number;
}
