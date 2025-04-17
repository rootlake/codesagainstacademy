<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentCard, fullDeck, type ScenarioCard } from './lib/store';
  import scenariosData from './lib/data/scenarios.json';
  import CurrentCardDisplay from './lib/components/CurrentCardDisplay.svelte';
  import TierListDisplay from './lib/components/TierListDisplay.svelte';
  import logoSrc from '/minilogo.png';

  // --- State --- //
  let history: ScenarioCard[] = []; // Will hold the fully shuffled deck
  let historyIndex = -1;           // Pointer within the history
  let currentCardValue: ScenarioCard | null = null;

  const unsubscribeCurrent = currentCard.subscribe(value => {
    currentCardValue = value;
  });

  // --- Reactive Navigation State --- //
  $: canGoPrev = historyIndex > 0;
  $: canGoNext = historyIndex < history.length - 1;

  // --- Utility --- //
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // --- Lifecycle --- //
  onMount(() => {
    const allCards = scenariosData as ScenarioCard[];
    if (allCards.length === 0) {
      console.error("No scenario cards found!");
      return;
    }

    // Set the full deck reference
    fullDeck.set([...allCards]);

    // Create the full navigation history by shuffling ALL cards
    history = shuffleArray([...allCards]);

    // Start at a random index
    historyIndex = Math.floor(Math.random() * history.length);

    // Set the initial current card
    currentCard.set(history[historyIndex]);

    // availableDeck is no longer used
    // availableDeck.set([]);
  });

  // --- Navigation Functions --- //
  function nextCard() {
    if (canGoNext) {
      historyIndex++;
      currentCard.set(history[historyIndex]);
    }
  }

  function previousCard() {
    if (canGoPrev) {
      historyIndex--;
      currentCard.set(history[historyIndex]);
    }
  }

  // --- Cleanup --- //
  onDestroy(unsubscribeCurrent);

</script>

<main class="game-container">
  <div class="logo-header">
    <img src={logoSrc} alt="Codes Against Academy" />
  </div>

  <div class="card-area">
    <CurrentCardDisplay />
  </div>

  <div class="tier-list-area">
    <div class="tier-list-content">
      <div class="nav-container left">
        <button class="nav-button prev" on:click={previousCard} disabled={!canGoPrev}>
          <!-- Triangle added via CSS -->
        </button>
      </div>
      <TierListDisplay />
      <div class="nav-container right">
        <button class="nav-button next" on:click={nextCard} disabled={!canGoNext}>
          <!-- Triangle added via CSS -->
        </button>
      </div>
    </div>
  </div>

  <!-- <div class="controls"> -->
    <!-- Controls were here, likely removed temporarily, can add back if needed -->
  <!-- </div> -->

</main>

<style>
  /* Minimal global reset */
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%; /* Explicitly set width */
    overflow: hidden; /* Prevent body scroll */
  }

  :global(body) {
    /* Reversed gradient: Dark top to Light bottom */
    background: linear-gradient(to bottom, #8B8C8F, #C7C8CA);
    color: #000;
    overflow: hidden;
    position: relative;
  }

  .test-container {
    width: 100%;
    height: 100vh; /* Fallback */
    height: 100svh; /* Target small viewport height */
    padding: 0;
    margin: 0;
    background-color: red;
    box-sizing: border-box;
    /* Add some content styling for visibility */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
  }

  /* --- Nav Button Styles (using CSS triangles) --- */
  .nav-button {
    background-color: transparent;
    border: none;
    width: 40px; /* Button clickable area width */
    height: 40px; /* Button clickable area height */
    cursor: pointer;
    padding: 0; /* Remove padding, using pseudo-element */
    opacity: 0.7;
    position: relative; /* For pseudo-element positioning */
    touch-action: manipulation; /* Prevent double-tap zoom */
    /* outline: 1px dashed white; /* Optional debug */
  }
  .nav-button::before { /* Common styles for triangle pseudo-elements */
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    /* Default border color, overridden below */
    border-color: transparent black transparent transparent;
  }
  .nav-button.prev::before {
    border-width: 10px 12px 10px 0; /* h, right-w, h, left-w */
    border-color: transparent black transparent transparent;
    transform: translate(-50%, -50%);
  }
  .nav-button.next::before {
    border-width: 10px 0 10px 12px; /* h, right-w, h, left-w */
    border-color: transparent transparent transparent black;
    transform: translate(-50%, -50%);
  }

  .nav-button:hover:not(:disabled) {
    opacity: 1.0;
  }
  .nav-button:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
  /* Change triangle color when disabled */
  .nav-button.prev:disabled::before {
    border-color: transparent rgba(0,0,0,0.2) transparent transparent;
  }
  .nav-button.next:disabled::before {
    border-color: transparent transparent transparent rgba(0,0,0,0.2);
  }

  .logo-header {
    text-align: center;
    /* padding: 0; Removed padding - handled inside */
    flex-shrink: 0;
    margin-bottom: 0.75rem; /* Slightly reduced space below logo */
    width: 100%;
    max-width: 320px; /* Match card max-width */
    margin-left: auto; /* Center the container */
    margin-right: auto;
    box-sizing: border-box;
    padding-top: max(0.5rem, env(safe-area-inset-top));
    /* padding-left/right removed, handled by centering */
  }
  .logo-header img {
    /* height: clamp(20px, 4vw, 40px); /* Removed clamp */
    width: 100%; /* Fill the container width */
    height: auto; /* Maintain aspect ratio */
    max-height: 40px; /* Add max-height constraint */
    opacity: 0.8;
    display: block;
    /* margin: 0 auto; /* No longer needed, container centered */
  }

  .game-container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 0; /* Remove padding, handled by children now */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100svh;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
  }

  .card-area {
    border: none;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    /* margin-bottom removed */
    width: 100%;
    padding-left: max(0.5rem, env(safe-area-inset-left));
    padding-right: max(0.5rem, env(safe-area-inset-right));
    box-sizing: border-box;
    margin-top: 0.5rem; /* Add small space above card */
  }

  /* .nav-row removed as buttons moved */

  .nav-container {
    flex: 0 0 auto;
    width: 40px; /* Keep explicit width */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tier-list-area {
    text-align: center;
    border: none;
    padding: 0; /* Remove padding, handled by content wrapper */
    line-height: normal;
    flex-shrink: 0;
    width: 100%;
    box-sizing: border-box;
    margin-top: auto; /* Push to bottom */
    /* padding-bottom: max(0.5rem, env(safe-area-inset-bottom)); /* Moved to content */
  }

  .tier-list-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding-left: max(0.5rem, env(safe-area-inset-left));
    padding-right: max(0.5rem, env(safe-area-inset-right));
    padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
    padding-top: 0.25rem; /* Reduced space above tier list */
    box-sizing: border-box;
  }

  /* Target TierListDisplay component if needed */
  :global(app-tier-list-display) { /* Check actual tag name */
    flex-grow: 0; /* Don't let it grow */
    flex-shrink: 1; /* Allow shrinking if needed */
  }

  /* .controls commented out in template */

</style>
