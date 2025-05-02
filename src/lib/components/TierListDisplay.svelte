<!-- src/lib/components/TierListDisplay.svelte -->
<script lang="ts">
  import TierCard from './TierCard.svelte';

  interface TierInfo {
    id: string;
    color: string;
    description?: string;
  }

  // Define tier data
  const tiers: TierInfo[] = [
    { id: 'S', color: '#f07171', description: 'Super' },
    { id: 'A', color: '#fdb462', description: 'Excellent' },
    { id: 'B', color: '#fdee73', description: 'Good' },
    { id: 'C', color: '#8bd37e', description: 'Okay' },
    { id: 'D', color: '#8ab9ed', description: 'Not Okay' },
    { id: 'E', color: '#787ABA', description: 'Terrible' },
    { id: 'F', color: '#CA83B8', description: 'Evil' },
    { id: 'Home', color: '#D1D5DB', description: 'Home' },
  ];

  // Dispatcher is no longer needed if not forwarding other events
  // const dispatch = createEventDispatcher();

  // Removed event forwarding functions

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
    grid-template-columns: repeat(4, auto); /* Keep 4 columns */
    justify-items: center;
    gap: 0.3rem; /* Further reduced gap */
    padding: 0.25rem;
    width: 100%;
    max-width: 320px; /* Further reduced max-width based on smaller cards */
    margin: 0 auto;
  }
</style> 