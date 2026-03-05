# LLM Quest Refactoring Plan

## Current State
- Single 60KB monolithic `index.html` file
- All CSS, HTML, and JavaScript in one file
- No module system, no build process
- Difficult to maintain and extend

## Proposed Structure
```
llm-quest/
├── index.html              # Main entry point (minimal)
├── src/
│   ├── types.ts            # TypeScript interfaces
│   ├── data/
│   │   └── levels.ts       # Level data (questions, content)
│   ├── core/
│   │   ├── game-state.ts   # State management, localStorage
│   │   └── navigation.ts   # Screen transitions, history
│   ├── ui/
│   │   ├── components.ts   # DOM rendering functions
│   │   └── effects.ts      # Confetti, animations
│   └── audio/
│       └── audio.ts        # Sound effects (Web Audio API)
├── styles/
│   └── main.css            # Extracted CSS
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration
└── package.json            # Dependencies and scripts
```

## Module Responsibilities

### 1. types.ts
- TypeScript interfaces for Level, Question, Option, GameState
- Provides type safety across the codebase

### 2. data/levels.ts
- All level data (content, questions, answers)
- Easy to add/edit levels without touching logic

### 3. core/game-state.ts
- Centralized state management
- localStorage persistence (load/save progress)
- State update notifications

### 4. core/navigation.ts
- Screen transitions (welcome, levels, intro, game, victory)
- Browser history management (back button support)
- Route handling

### 5. ui/components.ts
- DOM rendering functions for each screen
- Level card generation
- Quiz rendering
- Progress bar updates

### 6. ui/effects.ts
- Confetti animation
- CSS animation triggers
- Visual feedback

### 7. audio/audio.ts
- Web Audio API initialization
- Sound effects (correct, wrong, level complete, victory, click)
- Tone generation

## Benefits

1. **Maintainability**: Each module has a single responsibility
2. **Type Safety**: TypeScript catches errors at compile time
3. **Testability**: Individual modules can be unit tested
4. **Extensibility**: Easy to add new levels, features, or screens
5. **Bundle Size**: Vite optimizes and minifies for production
6. **Developer Experience**: IDE autocomplete, better error messages

## Build Process

```bash
npm install      # Install dependencies
npm run dev      # Start dev server with hot reload
npm run build    # Production build (optimized, minified)
npm run preview  # Preview production build
```

## Migration Strategy

1. Extract CSS to separate file
2. Create TypeScript types
3. Extract level data
4. Split JS into modules
5. Set up Vite build
6. Test thoroughly
7. Update index.html to use bundled output

## Next Steps

- [x] Create directory structure
- [x] Create package.json
- [x] Create TypeScript types
- [ ] Create all module files
- [ ] Create tsconfig.json
- [ ] Create vite.config.ts
- [ ] Create main.ts entry point
- [ ] Update index.html
- [ ] Test build process
- [ ] Verify all features work
