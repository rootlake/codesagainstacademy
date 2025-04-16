<!-- src/lib/components/TierListDisplay.svelte -->
<script lang="ts">
  import TierCard from './TierCard.svelte';

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
    // Add Pass/Discard placeholder
    { id: 'P', color: '#D1D5DB', description: 'Pass' }, // Example gray
  ];
</script>

<div class="tier-list-container">
  {#each tiers as tier (tier.id)}
    <TierCard
      tierId={tier.id}
      color={tier.color}
      description={tier.description}
    />
  {/each}
</div>

<style>
  .tier-list-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    /* max-width: calc(4 * 90px + 3 * 0.75rem); /* Removed max-width */
    margin: 0 auto;
    /* Parent (.tier-list-area) uses text-align: center to center this grid */
  }
</style> 