<script lang="ts">
	// Keep only necessary imports and logic
	import { createEventDispatcher } from 'svelte';
	import {
		currentCard,
		currentCardTierSelection,
		allTierSelections,
		type ScenarioCard,
		tiers,
		demoModeState
	} from '$lib/store';
	import { onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import TierBanner from './TierBanner.svelte';

	const dispatch = createEventDispatcher<{
		nextCard: void;
	}>();

	// Remove props
	// export let onNext: () => void = () => {};
	// export let onPrev: () => void = () => {};
	// export let canGoNext: boolean = true;
	// export let canGoPrev: boolean = false;

	let card: ScenarioCard | null = null;
	const unsubscribeCard = currentCard.subscribe((value: ScenarioCard | null) => {
		card = value;
		// When card changes, check if it has an existing tier selection
		if (value) {
			const existingSelection = $allTierSelections.get(value.scenario);
			if (existingSelection) {
				// Find the full tier info to get the short name
				const tierInfo = tiers.find((tier) => tier.id === existingSelection.tierId);
				currentCardTierSelection.set({
					...existingSelection,
					tierShortName: tierInfo?.shortName // Add short name
				});
			} else {
				currentCardTierSelection.set(null);
			}
		}
	});

	// Subscribe to current card tier selection
	let currentSelection = $currentCardTierSelection;
	const unsubscribeSelection = currentCardTierSelection.subscribe((value) => {
		currentSelection = value;
	});

	let showThankYou = false;
	let isThankYouLeaving = false;

	// Subscribe to demo mode state to show thank you message
	const unsubscribeDemo = demoModeState.subscribe((value) => {
		if (value.isUnlocked) {
			isThankYouLeaving = false;
			showThankYou = true;
			setTimeout(() => {
				isThankYouLeaving = true;
				setTimeout(() => {
					showThankYou = false;
					isThankYouLeaving = false;
				}, 300); // Match animation duration
			}, 2000);
		}
	});

	onDestroy(() => {
		unsubscribeCard();
		unsubscribeSelection();
		unsubscribeDemo();
	});

	// Handle tier banner events
	function handleBannerClose() {
		if (card && currentSelection) {
			// Remove from global selections
			allTierSelections.update((selections) => {
				const newSelections = new Map(selections);
				newSelections.delete(card!.scenario);
				return newSelections;
			});

			// Clear current selection
			currentCardTierSelection.set(null);
		}
	}

	function handleBannerNext() {
		dispatch('nextCard');
	}

	// Placeholder for footer content later
	// Need to get CAClogo.png back into the project (e.g., in /static or /src/assets)
	// const logoSrc = '/CAClogo.png'; // Example path if in /static
</script>

{#if card}
	<!-- Removed card-wrapper -->
	<!-- Main card element -->
	<div class="card-front" role="button" tabindex="0" aria-label="Scenario card: {card.scenario}">
		{#if currentSelection}
			<TierBanner
				selection={currentSelection}
				on:close={handleBannerClose}
				on:nextCard={handleBannerNext}
			/>
		{/if}

		<div class="text-container">
			<p>{card.scenario}</p>
		</div>
		{#if showThankYou}
			<div class="thank-you-banner" class:leaving={isThankYouLeaving}>
				Thank you for supporting Codes Against Academy!
			</div>
		{/if}
		<div class="bottom-elements">
			<img src="{base}/minilogo.png" alt="Codes Against Academy Logo" class="logo" />
			<span class="category">{card.category}</span>
		</div>
	</div>
	<!-- Removed buttons -->
{/if}

<style>
	/* Removed .card-wrapper styles */
	/* Removed .nav-button, .prev, .next styles */

	.card-front {
		width: 100%;
		aspect-ratio: 2.5 / 3.5;
		margin: 0 auto;
		/* Restore simple gradient background */
		background: linear-gradient(to bottom, #c6c7c9, #888a8c);
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		position: relative;
		font-family: Arial, sans-serif;
		font-weight: bold;
		color: #000;
		overflow: hidden;
		max-width: 320px;
		container-type: inline-size;
		transition:
			transform 0.15s ease-out,
			opacity 0.15s ease-out;
		user-select: none;
		-webkit-user-select: none;
	}

	/* Desktop card sizing */
	@media (min-width: 1024px) {
		.card-front {
			max-width: 650px; /* Even larger on desktop to match mockup */
			max-height: 75vh; /* Take most of the viewport height */
			min-height: 550px; /* Larger minimum height */
			padding: 40px; /* More padding on desktop */
			border-radius: 25px; /* Larger border radius */
			box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); /* More prominent shadow */
		}
	}

	/* Remove pseudo-element for background image */
	/* .card-front::before { ... } */

	.text-container {
		flex: 1;
		margin-bottom: 5px; /* Back to original mobile margin */
		overflow: hidden;
		/* Ensure text aligns top-left */
		text-align: left;
		display: flex; /* To align paragraph */
		align-items: flex-start;
		/* outline: 1px solid yellow; */
	}

	.text-container p {
		margin: 0;
		width: 100%;
		word-wrap: break-word;
		font-size: clamp(16px, 8cqw, 32px); /* Back to mobile sizing */
		line-height: 1.3;
		color: #000;
		/* position: relative; /* No longer needed */
		/* z-index: 1; /* No longer needed */
	}

	/* Desktop text sizing - keep mobile sizing exactly */
	@media (min-width: 1024px) {
		.text-container p {
			font-size: clamp(16px, 8cqw, 32px); /* Use exact mobile sizing */
			line-height: 1.3;
			font-weight: bold;
		}
	}

	.bottom-elements {
		height: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-top: 1px solid #aaa;
		padding-top: 2px; /* Back to original mobile padding */
		margin-top: 3px; /* Back to original mobile margin */
		/* outline: 1px solid magenta; */
	}

	.logo {
		/* Scale relative to card (container) width */
		height: clamp(12px, 2.5cqw, 18px); /* Example: scale with container, limited range */
		width: auto;
		opacity: 0.8;
		display: block;
	}

	.category {
		font-size: clamp(11px, 2vw, 14px); /* Slightly smaller category text */
		color: #000;
		font-style: italic; /* Original style */
		font-weight: normal; /* Original weight */
	}

	/* --- Remove styles specific to drag/interaction for now --- */
	/* cursor: grab; */
	/* user-select: none; */
	/* -webkit-user-select: none; */
	/* touch-action: none; */
	/* container-type: inline-size; */

	.thank-you-banner {
		position: absolute;
		bottom: 30px; /* Space for bottom elements */
		left: 15px;
		right: 15px;
		background-color: #4caf50;
		color: white;
		padding: 0.75rem;
		font-family: Arial, sans-serif;
		font-weight: bold;
		font-size: clamp(14px, 4cqw, 16px);
		text-align: center;
		border-radius: 6px;
		animation: slideUp 0.3s ease-out forwards;
		z-index: 10;
	}

	.thank-you-banner.leaving {
		animation: slideDown 0.3s ease-in forwards;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideDown {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(100%);
		}
	}
</style>
