<!-- src/lib/components/TierListDisplay.svelte -->
<script lang="ts">
  import TierCard from './TierCard.svelte';
  import { tiers } from '$lib/store';

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