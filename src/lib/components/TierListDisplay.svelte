<!-- src/lib/components/TierListDisplay.svelte -->
<script lang="ts">
  import { tieredCards, hoveringTier } from '../store';
  import { onMount } from 'svelte';

  interface TierInfo {
    id: string;
    color: string;
    description?: string;
  }

  // Define tier data (colors sampled from image)
  const tiers: TierInfo[] = [
    { id: 'S', color: '#f07171', description: 'Super' },
    { id: 'A', color: '#fdb462', description: 'Excellent' },
    { id: 'B', color: '#fdee73', description: 'Good' },
    { id: 'C', color: '#8bd37e', description: 'Okay' },
    { id: 'D', color: '#8ab9ed', description: 'Not Okay' },
    { id: 'E', color: '#787ABA', description: 'Terrible' },
    { id: 'F', color: '#CA83B8', description: 'Evil' },
    // Changed Menu to Home
    { id: 'Home', color: '#D1D5DB', description: 'Home' }, // Example gray
  ];

  function handleDragOver(event) {
    event.preventDefault(); // Required to allow dropping
  }

  function handleDrop(event, tier) {
    // Handle the drop event (card moved to tier)
    const cardData = event.dataTransfer.getData('text/plain');
    // Update tieredCards store
    tieredCards.update((cards) => {
      if (tier in cards) {
        cards[tier].push(cardData);
      }
      return cards;
    });
    //Change the card to a chit
    //Remove the big card
    console.log(`Card dropped on tier: ${tier}`);
  }

  function handleDragEnter(event, tier) {
    // Add hover effect
    hoveringTier.set(tier);
    event.currentTarget.classList.add('tier-hover');
  }

  function handleDragLeave(event) {
    // Remove hover effect
    hoveringTier.set('');
    event.currentTarget.classList.remove('tier-hover');
  }
</script>

<div class="tier-list-container" >
  <div class="popup-container">
    {#if $hoveringTier} {$hoveringTier} {/if}
  </div>
  {#each tiers as tier}
    <div class="tier-container" on:dragover={handleDragOver} on:drop={(event) => handleDrop(event, tier.id)} on:dragenter={(event) => handleDragEnter(event, tier.id)} on:dragleave={handleDragLeave}>
        <p>{tier.id}</p>
    </div>
  {/each}
</div>

<style>
  .tier-list-container {
    display: grid;
    grid-template-columns: repeat(4, auto); /* Keep 4 columns */
    justify-items: center;
    gap: 0.3rem; /* Further reduced gap */
    padding: 0.25rem;
    width: 100%;
    max-width: 300px; /* Further reduced max-width based on smaller cards */
    margin: 0 auto;
  }
  .popup-container {
    position: absolute;
    top: -4rem;
    left: 0;
    background-color: #333;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    z-index: 5;
    width: 100px;
    text-align: center;
  }
  .tier-container {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
    text-align: center;
  }
  .tier-hover {
    box-shadow: 0 0 10px 2px #f0f;
  }
</style>