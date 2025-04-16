<script lang="ts">
  import { onMount } from 'svelte';
  import { availableDeck, currentCard, fullDeck, type ScenarioCard } from './lib/store';
  // Assuming scenarios.json is correctly placed and Vite handles JSON imports
  import scenariosData from './lib/data/scenarios.json';
  import CurrentCardDisplay from './lib/components/CurrentCardDisplay.svelte'; // Import the new component
  import TierListDisplay from './lib/components/TierListDisplay.svelte'; // Import TierListDisplay
  import logoSrc from '/minilogo.png'; // Import the logo for the header

  // Utility function to shuffle an array (Fisher-Yates)
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  onMount(() => {
    const allCards = scenariosData as ScenarioCard[];
    const scenarioCards = allCards;

    if (scenarioCards.length === 0) {
      console.error("No scenario cards found!");
      return;
    }

    // Set the full deck reference
    fullDeck.set([...scenarioCards]);

    // Shuffle the whole deck first
    const shuffledDeck = shuffleArray([...scenarioCards]);

    // Set the initial card (first from shuffled)
    currentCard.set(shuffledDeck.shift()!); // Remove first card and set it

    // Set the remaining shuffled cards as the available deck
    availableDeck.set(shuffledDeck);

    // Reset current card and tiers if needed (optional)
    // currentCard.set(null);
    // tieredCards.set(initialTiers); // Reset tiers if implementing replayability
  });

  function drawCard() {
    let cardToDraw: ScenarioCard | null = null;
    availableDeck.update((deck: ScenarioCard[]) => {
      if (deck.length > 0) {
        // Draw from the top (or bottom, consistency matters)
        cardToDraw = deck.shift()!; // Use shift() to take from the start, non-null assertion assumes length > 0
      } else {
        // Handle empty deck case (e.g., show message, allow reset)
        console.warn("Deck is empty!");
      }
      return deck; // Return the modified deck to update the store
    });

    if (cardToDraw) {
      currentCard.set(cardToDraw);
    }
  }

  // Reactive statement to log current card for debugging
  $: console.log("Current Card:", $currentCard);
  $: console.log("Available Deck Size:", $availableDeck.length);

</script>

<main class="game-container">
  <!-- Replace H1 with Logo -->
  <div class="logo-header">
    <img src={logoSrc} alt="Codes Against Academy" />
  </div>
  <!-- <h1>Codes Against Academy - Tier List</h1> -->

  <div class="controls">
    <button on:click={drawCard} disabled={$availableDeck.length === 0}>
      Draw Next Card ({$availableDeck.length} left)
    </button>
  </div>

  <div class="card-area">
    <!-- Always display the card component, remove placeholder logic -->
    <CurrentCardDisplay />
    <!-- {#if $currentCard}
      <CurrentCardDisplay />
    {:else if $availableDeck.length > 0}
       Initial state handled by setting currentCard in onMount
    {:else}
      <div class="card-placeholder empty">
         <p>Deck empty!</p>
      </div>
    {/if} -->
  </div>

  <div class="tier-list-area">
    <!-- Use the TierListDisplay component -->
    <TierListDisplay />
    <!-- <p>[Tier List will go here]</p> -->
  </div>

</main>

<style>
  /* --- Global Styles --- */
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%; /* Ensure html also takes height */
  }
  :global(body) {
    /* margin: 0; /* Moved to above reset */
    background: linear-gradient(to bottom, #C7C8CA, #8B8C8F);
    color: #000;
    /* min-height: 100vh; /* Not needed with height: 100% */
    overflow: hidden; /* Prevent scrolling */
  }
  :global(h1) { /* Keep rule but comment out content */
    /* text-align: center; */
    /* color: #222; */
    /* font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; */
    /* font-size: 1.5rem; */
    /* margin-top: 1rem; */
    /* margin-bottom: 0.5rem; */
    /* outline: 1px solid orange; */
  }

  /* --- Component Styles --- */
  .logo-header {
    text-align: center;
    padding: 0.5rem 0;
    /* outline: 1px solid orange; /* Removed */
  }
  .logo-header img {
    height: 30px; /* Adjust logo size as needed */
    width: auto;
    opacity: 0.8;
  }

  .game-container {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100svh;
    box-sizing: border-box;
    /* outline: 2px solid red; /* Removed */
  }

  .controls {
    text-align: center;
    /* outline: 2px solid blue; /* Removed */
    margin-bottom: 0.5rem;
  }

  .controls button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #555;
    color: #fff;
    border: 1px solid #444; /* Added subtle border */
    border-radius: 8px; /* Slightly more rounded */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    transition: background-color 0.2s ease;
  }
  .controls button:hover:not(:disabled) {
    background-color: #666;
  }
  .controls button:disabled {
    background-color: #777;
    border-color: #666;
    cursor: not-allowed;
  }

  .card-area {
    border: none;
    padding: 0.5rem;
    text-align: center;
    /* outline: 2px solid green; /* Removed */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 1rem;
  }

  /* Styles for the placeholder when no card is displayed - NOW UNUSED */
  /*
  .card-placeholder {
    max-width: 300px;
    margin: 0 auto;
    aspect-ratio: 2.5 / 3.5;
    background-color: #BDBDBD;
    border: 1px solid #999;
    border-radius: 20px;
    display: block;
    color: #666;
    font-style: italic;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
    height: 420px;
  }
  .card-placeholder.empty {
    background-color: #A0A0A0;
  }
  .card-placeholder.empty p {
    margin: 0;
  }
  */

  .tier-list-area {
    min-height: 100px;
    text-align: center;
    border: none;
    padding: 0;
    line-height: normal;
    /* outline: 2px solid purple; /* Removed debug outline */
    flex-shrink: 0;
    /* margin-top: auto; /* Removed - let it flow naturally */
  }
  /* Removed tier-list-area p rule */

  /* REMOVED old .current-card-placeholder styles as they are unused */

  /* --- Debug Outlines --- */
  h1 { outline: 1px solid orange; }
  .card-placeholder { outline: 3px dashed lime; } /* Make placeholder outline distinct */
  /* --- End Debug Outlines --- */

</style>
