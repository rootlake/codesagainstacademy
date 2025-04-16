<!-- src/lib/components/TierCard.svelte -->
<script lang="ts">
  export let tierId: string = '';
  export let color: string = '#ccc'; // Default color
  export let description: string | undefined = undefined;
</script>

<div class="tier-card" style:--tier-color={color}>
  <div class="circle">
    <span class="letter">{tierId}</span>
  </div>
  {#if description}
    <span class="description">{description}</span>
  {/if}
</div>

<style>
  .tier-card {
    background-color: var(--tier-color);
    padding: 0.75rem 0.5rem; /* Padding top/bottom and left/right */
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem; /* Space between circle and description */
    min-width: 80px; /* Ensure minimum width */
    box-shadow: 2px 2px 5px rgba(0,0,0,0.15);
  }

  .circle {
    background-color: white;
    width: 50px; /* Adjust size as needed */
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.25rem; /* Space below circle */
  }

  .letter {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 2.5rem; /* Large letter */
    color: black;
    line-height: 1; /* Prevent extra vertical space */
  }

  .description {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.75rem;
    font-weight: bold;
    color: black;
    text-align: center;
  }
</style> 