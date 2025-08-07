<!-- src/lib/components/TierBanner.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CardTierSelection } from '$lib/store';

	export let selection: CardTierSelection;

	const dispatch = createEventDispatcher<{
		close: void;
		nextCard: void;
	}>();

	function handleClose() {
		dispatch('close');
	}

	function handleNext() {
		dispatch('nextCard');
	}

	// Removed tierNames mapping as shortName is now in selection
</script>

<div class="tier-banner-container">
	<!-- Left tier button replica -->
	<div class="tier-button-replica" style:--tier-color={selection.tierColor}>
		<div class="circle">
			<span class="letter">{selection.tierId}</span>
		</div>
		<span class="description-small">{selection.tierShortName}</span>
	</div>

	<!-- Main banner area -->
	<div class="banner-main" style:--tier-color={selection.tierColor}>
		<!-- Centered text -->
		<div class="banner-text">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html selection.tierDescription}
		</div>

		<!-- Right button container -->
		<div class="right-buttons">
			<!-- Close button (top right) -->
			<button class="close-button" on:click={handleClose} aria-label="Remove tier selection">
				×
			</button>

			<!-- Next arrow (bottom right) -->
			<button class="next-button" on:click={handleNext} aria-label="Next card">
				<svg
					id="Layer_1"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 13.5529 22.1189"
				>
					<defs>
						<style>
							.cls-1 {
								fill: currentColor; /* Use currentColor so it inherits the button's text color */
							}
						</style>
					</defs>
					<polygon class="cls-1" points="0 0 13.5529 11.0595 0 22.1189 0 0" />
				</svg>
			</button>
		</div>
	</div>
</div>

<style>
	.tier-banner-container {
		position: absolute;
		bottom: 40px; /* Move up from 35px */
		left: 0;
		right: 0;
		display: flex;
		z-index: 10;
		height: 65px; /* Match tier button height */
		filter: drop-shadow(0 3px 1px rgba(0, 0, 0, 0.5)); /* Darker, sharper shadow */
	}

	/* Replica of tier button on the left */
	.tier-button-replica {
		background-color: var(--tier-color);
		padding: 0.5rem 0.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		min-width: 65px;
		flex-shrink: 0;
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
	}

	.description-small {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 0.65rem;
		font-weight: bold;
		color: black;
		text-align: center;
	}

	/* Main banner area */
	.banner-main {
		background-color: var(--tier-color);
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center; /* Center content */
		padding: 0.5rem 10px; /* Adjusted right padding */
	}

	.banner-text {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1.1rem;
		font-weight: bold;
		color: black;
		text-align: center;
		line-height: 1.2;
		flex-grow: 0;
		flex-shrink: 1;
		max-width: 220px;
		word-break: break-word;
		margin: 0; /* Remove auto margins */
		margin-left: -40px; /* Add left margin for spacing */
	}

	.right-buttons {
		position: absolute; /* Keep absolute positioning relative to banner-main */
		top: 0;
		bottom: 0;
		right: 0;
		display: flex;
		flex-direction: column; /* Stack buttons vertically */
		justify-content: space-between; /* Space out buttons vertically to edges */
		align-items: flex-end; /* Align buttons to the right */
		width: 40px; /* Maintain fixed width */
		padding: 8px 4px; /* Adjust padding */
		gap: 8px; /* Add space between stacked buttons */
	}

	.close-button {
		background-color: transparent;
		border: none;
		width: 20px;
		height: 20px;
		cursor: pointer;
		padding: 0;
		opacity: 0.8;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.1s ease;
		font-size: 16px;
		font-weight: bold;
		color: black;
		line-height: 1;
	}

	.close-button:hover {
		opacity: 1;
	}

	.next-button {
		background-color: transparent;
		border: 0;
		width: 20px;
		height: 20px;
		cursor: pointer;
		padding: 0;
		opacity: 0.8;
		transition: opacity 0.1s ease;
		/* Original positioning/margin */
		margin-left: 1rem;
		/* Flexbox for centering */
		display: flex;
		justify-content: center;
		align-items: center;
		color: black !important; /* Force black color */
	}

	/* Style for the embedded SVG */
	.next-button svg {
		width: 75%; /* Make the SVG fill the button width */
		height: 75%; /* Make the SVG fill the button height */
		fill: black !important; /* Force black fill color */
		color: black !important; /* Force black color */
		/* The flexbox styles on .next-button will center the SVG */
	}
</style>
