# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development Server**

```bash
npm run dev
```

Start the Vite development server for local development.

**Build**

```bash
npm run build
```

Creates a production build using Vite and the static adapter for GitHub Pages deployment.

**Preview Build**

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

**Linting & Formatting**

```bash
npm run lint      # Run ESLint and Prettier checks
npm run format    # Auto-format code with Prettier
npm run check     # TypeScript and Svelte checks
```

## Project Architecture

### Core Technologies

- **SvelteKit** with TypeScript for the application framework
- **Vite** for build tooling and development server
- **TailwindCSS v4** for styling (via @tailwindcss/vite plugin)
- Static adapter configuration for GitHub Pages deployment

### Application Structure

This is an educational game application built around scenario cards for AI ethics discussions. The core architecture follows SvelteKit conventions:

**Routes Structure:**

- `/` - Home page with game introduction
- `/game` - Main game interface with card display and tier ranking
- `/contact`, `/purchase`, `/suggestions` - Static informational pages

**Component Hierarchy:**

- `+layout.svelte` provides the main app shell with logo header and navigation
- Game page orchestrates the core interaction between `CurrentCardDisplay` and `TierListDisplay`
- Navigation is conditionally hidden on the game page to maximize card display space

### State Management Pattern

The application uses Svelte's built-in stores for state management:

**Primary Stores:**

- `fullDeck` - Complete scenario dataset loaded from JSON
- `currentCard` - Active scenario being displayed/discussed
- `currentCardTierSelection` - Tier assignment for current card
- `allTierSelections` - Map tracking all card-tier assignments
- `demoModeState` - Demo/unlock state management

**Data Flow:**

1. Scenarios loaded from `src/lib/data/scenarios.json` on game mount
2. Deck is shuffled and stored in component history
3. Navigation functions update stores which trigger reactive UI updates
4. Tier selections persist in Map structure for session tracking

### Game Logic Implementation

The game implements an infinite carousel pattern:

- Cards are shuffled once on mount into a `history` array
- Navigation uses modulo arithmetic for infinite looping
- Current position tracked via `historyIndex`
- Stores are updated reactively as user navigates

### Tier System

Seven-tier ranking system (S-F plus Home) with:

- Color-coded tiers defined in store.ts
- Tier descriptions for ethical evaluation context
- Interactive tier selection with visual feedback
- Session-based tier assignment tracking

### Static Asset Configuration

- Images and icons in `/static` directory
- Configured for GitHub Pages deployment with empty base path
- Static adapter outputs to `/build` directory
- SVG icons for navigation elements

## Key Patterns & Conventions

**File Organization:**

- Components in `src/lib/components/`
- Shared state in `src/lib/store.ts`
- Static data in `src/lib/data/`
- Route-specific logic stays in page components

**TypeScript Interfaces:**
All major data structures are typed (ScenarioCard, TierInfo, CardTierSelection) and exported from store.ts.

**Styling Approach:**

- Scoped component styles in `<style>` blocks
- Global styles in `app.css` and layout component
- TailwindCSS classes for utility styling
- Mobile-first responsive design with safe area insets

**Component Communication:**

- Props for parent-to-child data flow
- Stores for shared state across components
- Event dispatching for child-to-parent communication

## Demo/Unlock System

The application includes a demo mode with unlock functionality:

- Tracks cards viewed via `demoModeState.cardsViewed`
- Shows unlock prompt after 5 cards viewed
- Navigation blocked until unlocked in demo mode
- LocalStorage integration for persistence
