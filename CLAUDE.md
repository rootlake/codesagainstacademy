# CLAUDE.md - Project Context

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current Project State

**Codes Against Academy** - A responsive SvelteKit web application with dual desktop/mobile interfaces.

### CRITICAL CONTEXT: Mobile Version is COMPLETE ✅
**DO NOT MODIFY MOBILE INTERFACE** - The mobile version is fully working and should remain untouched:
- Small card display at top
- Navigation arrows beside tier grid  
- 4x2 tier button grid (S,A,B,C / D,E,F,Home)
- All functionality preserved and working correctly
- Uses CSS media queries: `display: block` by default, `display: none` on desktop (1024px+)

### Desktop Version Status: IN PROGRESS 🔧
**Desktop layout issues to resolve**:
- Missing navigation cards at bottom (they exist in HTML but not displaying)
- Layout needs proper flex structure to push nav cards to bottom
- Current desktop layout uses side-by-side: card left, expanded tier list right
- Expanded tier list is working correctly with full descriptions

## Desktop Implementation Details

### Current Desktop Game Page Structure:
```html
<div class="desktop-layout">           <!-- flex column, full height -->
  <div class="desktop-game-container"> <!-- flex grow, side-by-side content -->
    <div class="desktop-left-panel">   <!-- card + nav buttons -->
    <div class="desktop-right-panel">  <!-- expanded tier list -->
  </div>
  <nav class="desktop-navigation-game"><!-- fanned nav cards at bottom -->
</div>
```

### Desktop Components Working:
- ✅ Large card display (400x555px)
- ✅ Previous/Next buttons below card
- ✅ Expanded tier banners with full descriptions
- ✅ Tier selection functionality
- ✅ Side-by-side layout (card left, tier list right)

### Desktop Components NOT Working:
- ❌ Navigation cards not visible at bottom
- ❌ Layout doesn't push nav cards to bottom properly

### Key Files Modified:
- `src/routes/game/+page.svelte` - Dual layout system with responsive CSS
- `src/lib/components/TierListDisplay.svelte` - Mobile/desktop tier list variants
- `src/lib/components/UnlockCard.svelte` - Desktop sizing to match game card
- `src/lib/components/CurrentCardDisplay.svelte` - Desktop card sizing

## Development Commands

**Development Server**
```bash
npm run dev -- --host
```
- Desktop: http://localhost:5174/game
- Mobile: http://192.168.1.34:5174/game

**Build & Deploy**
```bash
npm run build    # Production build
npm run preview  # Test production build
npm run lint     # ESLint and Prettier
npm run format   # Auto-format
npm run check    # TypeScript/Svelte checks
```

## Architecture Overview

### Responsive Strategy
- **Mobile-first approach**: Default styles for mobile
- **Desktop enhancement**: `@media (min-width: 1024px)` for desktop
- **Separate layouts**: Mobile and desktop use different HTML structures
- **CSS classes**: `.mobile-layout` and `.desktop-layout` with media query toggles

### State Management
- Svelte stores for game state (currentCard, allTierSelections, etc.)
- Demo mode with unlock functionality
- Tier selection tracking across both layouts

### Component Architecture
- `TierListDisplay.svelte`: Dual implementation (mobile buttons, desktop banners)
- `CurrentCardDisplay.svelte`: Responsive card sizing
- `UnlockCard.svelte`: Matches main card size on desktop
- `TierCard.svelte`: Small tier buttons for mobile

## Immediate Next Steps

When returning to work:
1. **Focus only on desktop layout issues**
2. **Fix navigation cards positioning at bottom**
3. **Ensure desktop flex layout pushes nav to bottom**
4. **Test desktop version without affecting mobile**
5. **Verify both versions work independently**

## Warning: Do Not Break Mobile! 🚨
The mobile version is production-ready. Any changes should:
- Use `@media (min-width: 1024px)` for desktop-only styles
- Preserve existing mobile CSS and functionality  
- Test both layouts separately
- Never modify mobile-specific code unless explicitly needed

## Recent Progress
- ✅ Implemented side-by-side desktop layout
- ✅ Created expanded tier list with full descriptions  
- ✅ Added desktop card sizing (400x555px)
- ✅ Restored Home button to mobile tier list
- 🔧 Navigation cards exist but not displaying on desktop
- 🔧 Desktop layout needs proper flex structure

---

## Project Structure Reminder

**Routes:**
- `/` - Home page
- `/game` - Main game interface (dual mobile/desktop)
- `/contact`, `/purchase`, `/suggestions` - Static pages

**Key Components:**
- `CurrentCardDisplay` - Main game card
- `TierListDisplay` - Tier ranking interface (dual implementation)
- `TierCard` - Individual tier buttons
- `UnlockCard` - Demo unlock interface

**State:**
- `fullDeck` - All scenario cards
- `currentCard` - Active scenario
- `allTierSelections` - Tier assignments
- `demoModeState` - Demo/unlock state