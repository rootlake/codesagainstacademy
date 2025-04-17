<!-- src/lib/components/TierCard.svelte -->
<script lang="ts">
  export let tierId: string = '';
  export let color: string = '#ccc'; // Default color
  export let description: string | undefined = undefined;
</script>

<div class="tier-card" style:--tier-color={color}>
  <div class="circle">
    {#if tierId === 'Home'}
      <svg class="home-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    {:else}
      <span class="letter">{tierId}</span>
    {/if}
  </div>
  {#if description}
    <span class="description">{description}</span>
  {/if}
</div>

<style>
  .tier-card {
    background-color: var(--tier-color);
    padding: 0.5rem 0.25rem; /* Reduced padding */
    border-radius: 6px; /* Slightly less rounding */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem; /* Reduced gap */
    min-width: 65px; /* Reduced min-width */
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  }

  .circle {
    background-color: white;
    width: 35px; /* Reduced circle size */
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.15rem; /* Reduced space */
  }

  .letter {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.8rem; /* Base letter size */
    color: black;
    line-height: 1;
    /* Add base positioning */
    position: relative;
  }

  /* Remove .home-symbol styles */

  /* Add styles for the SVG */
  .home-svg {
    width: 24px; /* Adjust size as needed */
    height: 24px; /* Adjust size as needed */
    fill: black; /* Ensure solid black */
    /* Vertical alignment might be slightly off, adjust if needed */
    position: relative;
    top: 1px; /* Example nudge */
  }

  .description {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.65rem; /* Reduced description size */
    font-weight: bold;
    color: black;
    text-align: center;
  }
</style> 