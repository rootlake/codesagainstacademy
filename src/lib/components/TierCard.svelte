<!-- src/lib/components/TierCard.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { base } from '$app/paths';
  import { allTierSelections, currentCard, currentCardTierSelection, type CardTierSelection, tiers, type TierInfo } from '$lib/store';
  import { onDestroy } from 'svelte';

  export let tierId: string = '';
  export let color: string = '#ccc';
  export let description: string | undefined = undefined;

  const dispatch = createEventDispatcher<{ tierSelected: CardTierSelection }>();

  let cardId: string | undefined;
  const unsubscribeCard = currentCard.subscribe((card) => {
    cardId = card?.scenario;
  });

  let isSelected = false;
  let hasDot = false;
  let cardCountForThisTier = 0; // Reactive variable for the count

  const unsubscribeSelections = allTierSelections.subscribe((selections) => {
    if (cardId) {
      // Check if the current card is selected for THIS tier
      const selection = selections.get(cardId);
      isSelected = selection?.tierId === tierId;
      // Check if THIS tier has ANY card selected for it (for the dot)
      hasDot = Array.from(selections.values()).some(sel => sel.tierId === tierId);

      // Calculate the count of cards assigned to this tier
      let count = 0;
      selections.forEach(selection => {
        if (selection.tierId === tierId) {
          count++;
        }
      });
      cardCountForThisTier = count;

    } else {
      isSelected = false;
      hasDot = false;
      cardCountForThisTier = 0; // Reset count if no card is active
    }
  });

  onDestroy(() => {
    unsubscribeCard();
    unsubscribeSelections();
  });

  // Handle tier selection
  function handleTierClick() {
    if (tierId === 'Home' || !cardId) return;

    const currentSelection = $allTierSelections.get(cardId);

    if (currentSelection && currentSelection.tierId === tierId) {
      // Deselect if clicking the currently selected tier
      allTierSelections.update(selections => {
        const newSelections = new Map(selections);
        newSelections.delete(cardId!);
        return newSelections;
      });
      currentCardTierSelection.set(null);
    } else {
      // Select the new tier
      const tierInfo = tiers.find(tier => tier.id === tierId);
      if (tierInfo) {
        const newSelection: CardTierSelection = {
          cardId: cardId!,
          tierId: tierInfo.id,
          tierColor: tierInfo.color,
          tierDescription: tierInfo.description,
          tierShortName: tierInfo.shortName
        };
        allTierSelections.update(selections => {
          const newSelections = new Map(selections);
          newSelections.set(cardId!, newSelection);
          return newSelections;
        });
        currentCardTierSelection.set(newSelection);
        dispatch('tierSelected', newSelection);
      }
    }
  }
</script>

<button
  class="tier-card {tierId !== 'Home' ? 'clickable' : ''}"
  style:--tier-color={color}
  aria-label="Tier {tierId}{description ? ': ' + description : ''}"
  on:click={handleTierClick}
  on:keydown={(e) => e.key === 'Enter' && handleTierClick()}
>
  {#if cardCountForThisTier > 0}
    <div class="indicator-area-top">
      <div class="chits-column">
        {#each Array(Math.min(cardCountForThisTier, 7)) as _, i}
          <div class="chit"></div>
        {/each}
      </div>
      {#if cardCountForThisTier >= 8}
        <span class="plus-sign">+</span>
      {/if}
    </div>
  {/if}

  <div class="circle">
    {#if tierId === 'Home'}
      <a href="{base}/" class="home-link" aria-label="Go to Home page">
        <svg class="home-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </a>
    {:else}
      <span class="letter">{tierId}</span>
      {#if hasDot}
        <!-- OLD: <div class="selection-dot"></div> -->
      {/if}
    {/if}
  </div>
  {#if description}
    <span class="description">{description}</span>
  {/if}

  {#if cardCountForThisTier > 0}
    <div class="card-count">{cardCountForThisTier}</div>
  {/if}

</button>

<style>
  .tier-card {
    /* Reset default button styles */
    background: none; /* Remove default background */
    border: none; /* Remove default border */
    padding: 0; /* Remove default padding */
    margin: 0; /* Remove default margin */
    font: inherit; /* Inherit font styles */
    color: inherit; /* Inherit text color */
    text-align: inherit; /* Inherit text alignment */
    cursor: pointer; /* Ensure cursor is pointer */
    /* Prevent any animations or transitions */
    transition: none !important;
    animation: none !important;
    -webkit-tap-highlight-color: transparent;
    outline: none;

    /* Existing styles to maintain look */
    background-color: var(--tier-color); /* Re-apply background color */
    padding: 0.5rem 0.25rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    /* Set fixed size */
    width: 70px;
    height: 70px;
    position: relative; /* Added for absolute positioning of children */
  }

  .tier-card.clickable {
    cursor: pointer;
    /* Removed hover transitions */
    /* transition: transform 0.1s ease, box-shadow 0.1s ease; */
  }

  .tier-card.clickable:hover {
    /* Remove hover effects */
    /* transform: translateY(-1px); */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
    /* Ensure visibility and opacity are not affected by hover */
    opacity: 1; /* Explicitly set opacity to default */
    visibility: visible; /* Explicitly set visibility to default */
  }

  .tier-card.clickable:active {
    /* transform: translateY(0); */
    /* Remove hover effects */
    /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); */
    /* Ensure visibility and opacity are not affected by hover */
    opacity: 1; /* Explicitly set opacity to default */
    visibility: visible; /* Explicitly set visibility to default */
    color: black; /* Or a color that contrasts well */
    opacity: 1; /* Ensure visibility */
    visibility: visible; /* Ensure visibility */
    /* Add any other desired styling like background or padding */
  }

  .circle {
    background-color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.15rem;
    position: relative;
  }

  .letter {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.8rem;
    color: black;
    line-height: 1;
    position: relative;
  }

  .home-svg {
    width: 24px;
    height: 24px;
    fill: black;
    position: relative;
    top: 1px;
  }

  .description {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.65rem;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-bottom: 0.15rem; /* Restore original margin below description */
  }

  .home-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  .tier-card .card-count { /* Added .tier-card to increase specificity */
    /* Position in bottom right corner */
    position: absolute; /* Use absolute positioning */
    bottom: 2px; /* Small offset from bottom */
    right: 4px; /* Small offset from right */
    transform: none; /* Remove centering transform */
    font-size: 0.6rem;
    font-weight: bold;
    color: black;
    opacity: 1;
    visibility: visible;
    z-index: 2;
    /* Remove any potentially conflicting styling */
  }

  .indicator-area-top {
    position: absolute;
    top: 4px; /* Adjust as needed */
    left: 4px; /* Adjust as needed */
    display: flex;
    flex-direction: column; /* Arrange chits column and plus sign vertically */
    align-items: flex-start; /* Align items to the left */
    }

  .chits-column {
    display: flex;
    flex-direction: column; /* Stack chits vertically */
    gap: 2px; /* Space between vertical chits */
  }

  .chit {
    width: 6px;
    height: 6px;
    background-color: black;
  }

  .plus-sign {
    font-size: 0.8rem;
    font-weight: bold;
    color: black;
    margin-top: -2px; /* Negative margin to pull it up closer to last chit */
    line-height: 1; /* Ensure consistent line height */
    margin-left: -1px; /* Center under the chits (chit width is 6px) */
  }
</style> 