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
		<TierCard tierId={tier.id} color={tier.color} description={tier.description} />
	{/each}
</div>

<style>
	.tier-list-container {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.25rem;
		width: 100%;
		max-width: 320px;
		margin: 0 auto;
	}

	/* Desktop layout adjustments */
	@media (min-width: 1024px) {
		.tier-list-container {
			max-width: 500px; /* Larger on desktop for banner format */
			gap: 0.5rem;
			padding: 0.5rem;
			margin: 0 auto 0 0; /* Align to left, leave space on right for shadows */
			padding-right: 3rem; /* Extra padding to prevent shadow cutoff */
			padding-left: 0.5rem; /* Reduced padding to move closer to card */
		}
	}
</style>
