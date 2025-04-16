<script lang="ts">
  import { currentCard, type ScenarioCard } from '../store'; // Use relative path for store
  import { onDestroy } from 'svelte';
  import logoSrc from '/minilogo.png'; // Import the logo

  let card: ScenarioCard | null = null;

  // Subscribe to the store and update local variable
  const unsubscribe = currentCard.subscribe(value => {
    card = value;
  });

  // Unsubscribe when component is destroyed to prevent memory leaks
  onDestroy(unsubscribe);

  // Placeholder for footer content later
  // Need to get CAClogo.png back into the project (e.g., in /static or /src/assets)
  // const logoSrc = '/CAClogo.png'; // Example path if in /static

</script>

{#if card}
  <!-- Renamed outer div to mimic .card-front structure -->
  <div class="card-front">
    <!-- Added text-container div -->
    <div class="text-container">
      <p>{card.scenario}</p>
    </div>
    <!-- Renamed footer div to mimic .bottom-elements -->
    <div class="bottom-elements">
      <img src={logoSrc} alt="Codes Against Academy Logo" class="logo"/>
      <span class="category">{card.category}</span>
    </div>
  </div>
{/if}

<style>
  /* --- Debug Outlines --- Removed */
  /*
  .card-front { outline: 2px dotted cyan; }
  .text-container { outline: 1px solid yellow; }
  .bottom-elements { outline: 1px solid magenta; }
  */
  /* --- End Debug Outlines --- */

  .card-front {
    /* --- Dimensions (from original .card) --- */
    width: 300px;
    height: 420px;
    /* --- Background & Appearance (from original .card-front) --- */
    background: linear-gradient(to bottom, #C6C7C9, #888A8C); /* Original gradient */
    border-radius: 10px; /* Original rounding */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Original shadow */
    /* --- Layout (from original .card-front) --- */
    padding: 15px; /* Reduced padding */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative; /* Needed for absolute positioning of footer */
    margin: 0 auto; /* Center the card */
    /* --- Font (from original .card-front) --- */
    font-family: Arial, sans-serif; /* Original font */
    font-weight: bold;
    color: #000;
    /* --- Remove Svelte defaults if needed --- */
    overflow: hidden; /* Added from original */
  }

  .text-container {
    flex: 1;
    margin-bottom: 5px; /* Reduced gutter significantly */
    overflow: hidden;
    /* Ensure text aligns top-left */
    text-align: left;
    display: flex; /* To align paragraph */
    align-items: flex-start;
  }

  .text-container p {
    margin: 0;
    width: 100%;
    word-wrap: break-word;
    font-size: clamp(14px, 3.5vw, 22px); /* Slightly smaller font size range */
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
  }

  .logo {
    height: 16px; /* Slightly smaller logo */
    width: auto;
    opacity: 0.8; /* Original opacity */
    display: block; /* Ensure proper rendering */
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