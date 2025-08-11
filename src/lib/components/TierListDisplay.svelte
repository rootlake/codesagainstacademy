<!-- src/lib/components/TierListDisplay.svelte -->
<script lang="ts">
  import TierCard from './TierCard.svelte';
  import { tiers } from '$lib/store';
  import { allTierSelections, currentCard, currentCardTierSelection, type CardTierSelection } from '$lib/store';
  import { onDestroy } from 'svelte';

  let cardId: string | undefined;
  const unsubscribeCard = currentCard.subscribe((card) => {
    cardId = card?.scenario;
  });

  // Track selections for expanded tier banners
  let selections: Map<string, CardTierSelection> = new Map();
  const unsubscribeSelections = allTierSelections.subscribe((sels) => {
    selections = sels;
  });

  onDestroy(() => {
    unsubscribeCard();
    unsubscribeSelections();
  });

  // Handle tier selection for expanded banners
  function handleExpandedTierClick(tierId: string) {
    if (tierId === 'Home' || !cardId) return;

    const currentSelection = selections.get(cardId);

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
      }
    }
  }
</script>

<!-- Mobile/Small Screen Layout (existing tier buttons) -->
<div class="mobile-tier-list">
  {#each tiers as tier (tier.id)}
    <TierCard
      tierId={tier.id}
      color={tier.color}
      description={tier.shortName}
    />
  {/each}
</div>

<!-- Desktop Layout (expanded tier banners) -->
<div class="expanded-tier-list desktop-tier-list">
  {#each tiers as tier (tier.id)}
    {#if tier.id !== 'Home'}
      <button 
        class="expanded-tier-banner" 
        style:--tier-color={tier.color}
        class:selected={cardId && selections.get(cardId)?.tierId === tier.id}
        on:click={() => handleExpandedTierClick(tier.id)}
      >
        <div class="tier-letter">{tier.id}</div>
        <div class="tier-description">
          {@html tier.description}
        </div>
      </button>
    {/if}
  {/each}
</div>

<style>
  /* Mobile tier list (existing small tier buttons) */
  .mobile-tier-list {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-items: center;
    gap: 0.3rem;
    padding: 0.25rem;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  /* Desktop tier list (expanded banners) */
  .desktop-tier-list {
    display: none;
  }

  /* Desktop layout - show expanded tier list, hide mobile */
  @media (min-width: 1024px) {
    .mobile-tier-list {
      display: none;
    }

    .desktop-tier-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 500px;
    }

    .expanded-tier-banner {
      display: flex;
      align-items: center;
      background-color: var(--tier-color);
      border: none;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      font-family: Arial, sans-serif;
      text-align: left;
      width: 100%;
      min-height: 60px;
    }

    .expanded-tier-banner:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .expanded-tier-banner.selected {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      outline: 3px solid #333;
    }

    .tier-letter {
      background-color: white;
      color: black;
      font-weight: bold;
      font-size: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    .tier-description {
      flex: 1;
      font-size: 1.1rem;
      font-weight: bold;
      color: black;
      line-height: 1.3;
    }

    .tier-description :global(i) {
      font-style: italic;
    }
  }

</style> 