<script lang="ts">
  // Keep only necessary imports and logic
  import { currentCard, type ScenarioCard } from '../store';
  import { onDestroy } from 'svelte';
  import logoSrc from '/minilogo.png';

  // Remove props
  // export let onNext: () => void = () => {};
  // export let onPrev: () => void = () => {};
  // export let canGoNext: boolean = true;
  // export let canGoPrev: boolean = false;

  let card: ScenarioCard | null = null;
  const unsubscribe = currentCard.subscribe(value => { card = value; });
  onDestroy(unsubscribe);

  // Placeholder for footer content later
  // Need to get CAClogo.png back into the project (e.g., in /static or /src/assets)
  // const logoSrc = '/CAClogo.png'; // Example path if in /static

</script>

{#if card}
  <!-- Removed card-wrapper -->
  <!-- Main card element -->
  <div class="card-front">
    <div class="text-container">
      <p>{card.scenario}</p>
    </div>
    <div class="bottom-elements">
      <img src={logoSrc} alt="Codes Against Academy Logo" class="logo"/>
      <span class="category">{card.category}</span>
    </div>
  </div>
  <!-- Removed buttons -->
{/if}

<style>
  /* Removed .card-wrapper styles */
  /* Removed .nav-button, .prev, .next styles */

  .card-front {
    width: 100%; /* Fill container width */
    aspect-ratio: 2.5 / 3.5; /* Enforce aspect ratio */
    margin: 0 auto;
    background: linear-gradient(to bottom, #C6C7C9, #888A8C);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: Arial, sans-serif;
    font-weight: bold;
    color: #000;
    overflow: hidden;
    max-width: 320px; /* Reduced max width */
    container-type: inline-size;
  }

  .text-container {
    flex: 1;
    margin-bottom: 5px; /* Reduced gutter significantly */
    overflow: hidden;
    /* Ensure text aligns top-left */
    text-align: left;
    display: flex; /* To align paragraph */
    align-items: flex-start;
    /* outline: 1px solid yellow; */
  }

  .text-container p {
    margin: 0;
    width: 100%;
    word-wrap: break-word;
    font-size: clamp(16px, 8cqw, 32px); /* Final increase to clamp values */
    line-height: 1.3;
    color: #000;
    /* Remove any inherited bolding if needed, already on parent */
    /* font-weight: normal; */
  }

  .bottom-elements {
    height: 20px; /* Reduced footer height further */
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 1px solid #aaa;
    padding-top: 2px; /* Reduced padding */
    margin-top: 3px; /* Reduced margin */
    /* outline: 1px solid magenta; */
  }

  .logo {
    /* Scale relative to card (container) width */
    height: clamp(12px, 2.5cqw, 18px); /* Example: scale with container, limited range */
    width: auto;
    opacity: 0.8;
    display: block;
  }

  .category {
    font-size: clamp(11px, 2vw, 14px); /* Slightly smaller category text */
    color: #000;
    font-style: italic; /* Original style */
    font-weight: normal; /* Original weight */
  }

  /* --- Remove styles specific to drag/interaction for now --- */
  /* cursor: grab; */
  /* user-select: none; */
  /* -webkit-user-select: none; */
  /* touch-action: none; */
  /* container-type: inline-size; */

</style> 