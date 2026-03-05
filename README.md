# LLM Quest: Become an AI Wizard 🧙

An interactive educational game that teaches the fundamentals of Large Language Models through gamified learning.

## 🎮 What is LLM Quest?

LLM Quest is a browser-based learning game where you progress through 9 levels, each covering a key concept in LLMs and AI:

1. **The Spark** - LLM Fundamentals
2. **The Scroll** - Context Window
3. **The Gem** - Tokens & Pricing
4. **The Transformer** - Architecture
5. **The Embedding** - Vector Space
6. **The Protocol** - MCP (Model Context Protocol)
7. **The Master** - Skills & Subagents
8. **The Spellbook** - Prompt Engineering
9. **The Scale** - Scaling Laws

Each level includes educational content followed by quiz questions to test your understanding.

## 🏗️ Project Structure

This codebase has been refactored from a monolithic 60KB HTML file into a modular, maintainable structure:

```
llm-quest/
├── index.html              # Main HTML entry point
├── src/
│   ├── types.ts            # TypeScript type definitions
│   ├── data/
│   │   └── levels.ts       # Level content and questions
│   ├── core/
│   │   ├── game-state.ts   # State management & localStorage
│   │   └── navigation.ts   # Screen transitions & history
│   ├── ui/
│   │   ├── components.ts   # DOM rendering functions
│   │   └── effects.ts      # Confetti & animations
│   └── audio/
│       └── audio.ts        # Sound effects (Web Audio API)
├── styles/
│   └── main.css            # All CSS styles
├── dist/                   # Production build output
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration
└── REFACTORING_PLAN.md     # Documentation of refactoring
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The dev server runs at `http://localhost:3000` with hot module replacement (HMR). Changes to TypeScript files will automatically reload.

## 📦 Module Responsibilities

### `types.ts`
TypeScript interfaces for type safety:
- `Level` - Level structure (id, icon, name, topic, content, questions)
- `Question` - Quiz question structure
- `Option` - Multiple choice option
- `GameState` - Application state

### `data/levels.ts`
All educational content:
- 9 levels with full content
- Quiz questions with explanations
- Easy to add/edit without touching logic

### `core/game-state.ts`
State management:
- Centralized state (current level, progress, completed levels)
- localStorage persistence
- Helper functions (isLevelUnlocked, completeLevel, etc.)

### `core/navigation.ts`
Screen navigation:
- Screen transitions (welcome, levels, intro, game, victory)
- Browser history management (back button support)
- Route handling

### `ui/components.ts`
DOM rendering:
- Level grid generation
- Quiz rendering
- Progress updates
- Victory screen

### `ui/effects.ts`
Visual effects:
- Confetti animation
- Fade in/out transitions
- Victory animations

### `audio/audio.ts`
Sound system:
- Web Audio API initialization
- Sound effects (correct, wrong, level complete, victory, click)
- Tone generation with different waveforms

### `main.css`
All styles:
- CSS variables for theming
- Responsive design
- Animations and transitions
- Screen-specific styles

## 🎯 Key Improvements

### Before Refactoring
- ❌ Single 60KB monolithic file
- ❌ No type safety
- ❌ Mixed concerns (HTML, CSS, JS all together)
- ❌ Difficult to test
- ❌ Hard to maintain and extend
- ❌ No build process

### After Refactoring
- ✅ Modular architecture (9 separate TypeScript files)
- ✅ Full TypeScript type safety
- ✅ Separation of concerns
- ✅ Testable individual modules
- ✅ Easy to maintain and extend
- ✅ Optimized production build (37KB → 12.5KB gzipped)
- ✅ Hot reload during development
- ✅ Clear project structure

## 🛠️ Build Output

Production build generates optimized assets:

```
dist/
├── index.html              # 3.60 KB (1.32 KB gzipped)
└── assets/
    ├── main-*.css          # 7.23 KB (2.14 KB gzipped)
    └── main-*.js           # 37.26 KB (12.53 KB gzipped)
```

Total: ~48KB → ~16KB gzipped (67% reduction)

## 🎨 Customization

### Adding New Levels

Edit `src/data/levels.ts`:

```typescript
{
  id: 10,
  icon: '🚀',
  name: 'The Launch',
  topic: 'Advanced Topics',
  story: 'Your final challenge!',
  content: '<h3>Content here</h3>...',
  questions: [
    {
      q: 'Your question?',
      options: [
        { a: 'A', text: 'Option 1' },
        { a: 'B', text: 'Option 2', correct: true },
        { a: 'C', text: 'Option 3' },
        { a: 'D', text: 'Option 4' }
      ],
      explanation: 'Explanation here'
    }
  ]
}
```

### Changing Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
  --bg-dark: #1a0a2e;
  --bg-card: #2d1b4e;
  --accent-purple: #9b4dca;
  --accent-blue: #00d4ff;
  /* ... */
}
```

### Adding Sound Effects

Edit `src/audio/audio.ts`:

```typescript
export function playNewSound(): void {
  initAudio();
  playTone(440, 0.2, 'sine', 0.3);
}
```

## 🧪 Testing

Individual modules can be unit tested. Example test structure:

```typescript
// src/core/game-state.test.ts
import { completeLevel, isLevelCompleted } from './game-state';

test('completing a level marks it as done', () => {
  completeLevel(1);
  expect(isLevelCompleted(1)).toBe(true);
});
```

## 📝 Development Workflow

1. **Make changes** to TypeScript files in `src/`
2. **Auto-reload** - Dev server updates automatically
3. **Type check** - TypeScript catches errors at compile time
4. **Build** - `npm run build` creates optimized production bundle
5. **Deploy** - Upload `dist/` folder to any static hosting

## 🌐 Deployment

The `dist/` folder contains all production assets and can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Example for GitHub Pages:

```bash
npm run build
gh-pages -d dist
```

## 📚 Learning Resources

Each level teaches real LLM concepts:

- **Transformers** - Attention mechanisms, QKV, causal masking
- **Tokens** - Tokenization, pricing, cost optimization
- **Context** - Window limits, RAG, external memory
- **Embeddings** - Vector space, cosine similarity, semantic search
- **MCP** - Tool use, function calling, agentic AI
- **Prompt Engineering** - System prompts, CoT, few-shot learning
- **Scaling Laws** - Power laws, emergent abilities, Chinchilla

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` to verify
5. Submit a pull request

## 📄 License

MIT License - feel free to use for educational purposes!

---

**Built with ❤️ using TypeScript and Vite**
