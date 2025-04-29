<!-- src/lib/components/TierCard.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { base } from '$app/paths';

  export let tierId: string = '';
  export let color: string = '#ccc';
  export let description: string | undefined = undefined;
</script>

<div
  class="tier-card"
  style:--tier-color={color}
  aria-label="Tier {tierId}{description ? ': ' + description : ''}"
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
    {/if}
  </div>
  {#if description}
    <span class="description">{description}</span>
  {/if}
</div>

<style>
  .tier-card {
    background-color: var(--tier-color);
    padding: 0.5rem 0.25rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    min-width: 65px;
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
</style> 