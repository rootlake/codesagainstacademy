<script lang="ts">
  import { onMount } from 'svelte';
  import { availableDeck, currentCard, fullDeck, type ScenarioCard } from './lib/store';
  // Assuming scenarios.json is correctly placed and Vite handles JSON imports
  import scenariosData from './lib/data/scenarios.json';
  import CurrentCardDisplay from './lib/components/CurrentCardDisplay.svelte'; // Import the new component

  // Utility function to shuffle an array (Fisher-Yates)
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  onMount(() => {
    // Type assertion might be needed depending on JSON structure and TS config
    const allCards = scenariosData as ScenarioCard[];

    // Filter only scenario cards - REMOVED as all cards are scenarios in this file
    // const scenarioCards = allCards.filter(card => card.type === 'scenario');
    const scenarioCards = allCards; // Use all cards directly

    // Set the full deck (useful for reference or reset later)
    fullDeck.set(scenarioCards);

    // Shuffle and set the available deck
    availableDeck.set(shuffleArray([...scenarioCards]));

    // Reset current card and tiers if needed (optional)
    currentCard.set(null);
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
  <h1>Codes Against Academy - Tier List</h1>

  <div class="controls">
    <button on:click={drawCard} disabled={$availableDeck.length === 0}>
      Draw Scenario Card ({$availableDeck.length} left)
    </button>
  </div>

  <div class="card-area">
    {#if $currentCard}
      <!-- Use the component instead of the placeholder -->
      <CurrentCardDisplay />
      <!-- <div class="current-card-placeholder">
        <h2>Current Scenario</h2>
        <p>{$currentCard.scenario}</p>
      </div> -->
    {:else if $availableDeck.length > 0}
      <p>Click "Draw Scenario Card" to start.</p>
	{:else}
	  <p>Deck empty!</p>
	{/if}
  </div>

  <div class="tier-list-area">
    <!-- Placeholder for TierListContainer component -->
    <p>[Tier List will go here]</p>
  </div>

</main>

<style>
  .game-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Updated font */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .controls {
    text-align: center;
  }

  .controls button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #555; /* Darker button */
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Match font */
  }
  .controls button:disabled {
    background-color: #777;
    cursor: not-allowed;
  }

  /* Remove placeholder borders */
  .card-area,
  .tier-list-area {
	border: none; /* Remove border */
	padding: 0; /* Remove padding */
	text-align: center;
  }

  .current-card-placeholder {
    background: linear-gradient(to bottom, #E0E0E0, #B0B0B0); /* Light gray gradient */
    border: 1px solid #999; /* Slightly darker border */
    border-radius: 20px; /* Significant rounding */
    padding: 2rem; /* More padding */
    color: #000; /* Black text */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Bold sans-serif */
    font-weight: bold;
    min-height: 300px; /* Give it more height */
    display: flex; /* Use flexbox for layout */
    flex-direction: column; /* Stack content vertically */
    justify-content: center; /* Center text vertically */
    text-align: center; /* Center text horizontally */
    box-shadow: 3px 3px 8px rgba(0,0,0,0.2); /* Subtle shadow */
    /* Make text visible on gradient */
    text-shadow: 1px 1px 1px rgba(255,255,255,0.5); /* Subtle light shadow for readability */
  }
  .current-card-placeholder h2 {
    color: #222; /* Darker heading inside card */
    margin-bottom: 1rem;
  }

  .tier-list-area {
    min-height: 100px;
  }

  /* Basic reset/global styles */
  :global(body) {
    margin: 0;
    background: linear-gradient(to bottom, #D3D3D3, #A9A9A9); /* Outer background gradient */
    color: #000; /* Default text black for now */
    min-height: 100vh; /* Ensure gradient covers full height */
  }
  :global(h1) {
    text-align: center;
    color: #222;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.5rem; /* Reduced font size significantly */
    margin-top: 1rem; /* Added some margin */
    margin-bottom: 0.5rem;
  }
</style>
