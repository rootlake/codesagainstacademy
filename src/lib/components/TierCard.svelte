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

  const unsubscribeSelections = allTierSelections.subscribe((selections) => {
    if (cardId) {
      // Check if the current card is selected for THIS tier
      const selection = selections.get(cardId);
      isSelected = selection?.tierId === tierId;
      // Check if THIS tier has ANY card selected for it (for the dot)
      hasDot = Array.from(selections.values()).some(sel => sel.tierId === tierId);
    } else {
      isSelected = false;
      hasDot = false;
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
        <div class="selection-dot"></div>
      {/if}
    {/if}
  </div>
  {#if description}
    <span class="description">{description}</span>
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
  }

  .tier-card.clickable {
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }

  .tier-card.clickable:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .tier-card.clickable:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
  }

  .home-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  .selection-dot {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #333;
    border: 1px solid white;
  }
</style> 