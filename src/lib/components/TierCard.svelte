<!-- src/lib/components/TierCard.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { base } from '$app/paths';
	import {
		allTierSelections,
		currentCard,
		currentCardTierSelection,
		type CardTierSelection,
		tiers
	} from '$lib/store';
	import { onDestroy } from 'svelte';

	export let tierId: string = '';
	export let color: string = '#ccc';
	export let description: string | undefined = undefined;
	
	// Ensure color has a fallback value
	$: safeColor = color || '#ccc';

	const dispatch = createEventDispatcher<{ tierSelected: CardTierSelection }>();

	let cardId: string | undefined;
	const unsubscribeCard = currentCard.subscribe((card) => {
		cardId = card?.scenario;
	});

	// Track selection state for potential future features
	let hasDot = false;
	let cardCountForThisTier = 0; // Reactive variable for the count

	const unsubscribeSelections = allTierSelections.subscribe((selections) => {
		if (cardId && tierId) {
			// Check selection state - can be used for future features
			// Check if THIS tier has ANY card selected for it (for the dot)
			hasDot = Array.from(selections.values()).some((sel) => sel?.tierId === tierId);

			// Calculate the count of cards assigned to this tier
			let count = 0;
			selections.forEach((selection) => {
				if (selection?.tierId === tierId) {
					count++;
				}
			});
			cardCountForThisTier = count;
		} else {
			hasDot = false;
			cardCountForThisTier = 0; // Reset count if no card is active
		}
	});

	onDestroy(() => {
		unsubscribeCard();
		unsubscribeSelections();
	});

	// Handle tier selection
	function handleTierClick() {
		if (!cardId) return;

		const currentSelection = $allTierSelections.get(cardId);

		if (currentSelection && currentSelection.tierId === tierId) {
			// Deselect if clicking the currently selected tier
			allTierSelections.update((selections) => {
				const newSelections = new Map(selections);
				newSelections.delete(cardId!);
				return newSelections;
			});
			currentCardTierSelection.set(null);
		} else {
			// Select the new tier
			const tierInfo = tiers.find((tier) => tier.id === tierId);
			if (tierInfo) {
				const newSelection: CardTierSelection = {
					cardId: cardId!,
					tierId: tierInfo.id,
					tierColor: tierInfo.color,
					tierDescription: tierInfo.description,
					tierShortName: tierInfo.shortName
				};
				allTierSelections.update((selections) => {
					const newSelections = new Map(selections);
					newSelections.set(cardId!, newSelection);
					return newSelections;
				});
				currentCardTierSelection.set(newSelection);
				dispatch('tierSelected', newSelection);
			}
		}
	}
</script>

<button
	class="tier-banner"
	style:--tier-color={safeColor}
	aria-label="Tier {tierId}{description ? ': ' + description : ''}"
	on:click={handleTierClick}
	on:keydown={(e) => e.key === 'Enter' && handleTierClick()}
>
	{#if cardCountForThisTier > 0}
		<div class="indicator-area">
			<div class="chits-column">
				<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
				{#each Array(Math.min(cardCountForThisTier, 7)) as _, i (i)}
					<div class="chit"></div>
				{/each}
			</div>
			{#if cardCountForThisTier >= 8}
				<span class="plus-sign">+</span>
			{/if}
		</div>
	{/if}

	<!-- Left tier button replica -->
	<div class="tier-button-replica" style:--tier-color={safeColor}>
		<div class="circle">
			<span class="letter">{tierId}</span>
		</div>
		<span class="tier-name">{tiers.find(t => t.id === tierId)?.shortName || tierId}</span>
	</div>

	<!-- Main banner area with description -->
	<div class="banner-main" style:--tier-color={safeColor}>
		<div class="banner-text">
			{#if description}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html description}
			{:else}
				Tier {tierId}
			{/if}
		</div>
	</div>

	{#if cardCountForThisTier > 0}
		<div class="card-count">{cardCountForThisTier}</div>
	{/if}
</button>

<style>
	.tier-banner {
		/* Reset default button styles */
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		color: inherit;
		text-align: inherit;
		cursor: pointer;
		transition: opacity 0.2s ease;
		-webkit-tap-highlight-color: transparent;
		outline: none;

		/* Banner layout */
		display: flex;
		align-items: center;
		width: 100%;
		height: 65px;
		position: relative;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
		margin-bottom: 0.5rem;
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
		height: 65px;
		box-sizing: border-box;
	}

	.circle {
		background-color: white;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		flex-shrink: 0; /* Prevent squashing */
		min-width: 35px; /* Ensure minimum width */
		min-height: 35px; /* Ensure minimum height */
		aspect-ratio: 1; /* Force 1:1 aspect ratio */
	}

	.letter {
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
		font-size: 1.8rem;
		color: black;
		line-height: 1;
	}


	.tier-name {
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
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		box-sizing: border-box;
	}

	.banner-text {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1rem;
		font-weight: bold;
		color: black;
		text-align: center;
		line-height: 1.2;
		max-width: 300px;
		word-break: break-word;
	}

	.card-count {
		position: absolute;
		bottom: 4px;
		right: 20px; /* More padding from right edge */
		font-size: 0.7rem;
		font-weight: bold;
		color: black;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 2px 6px;
		border-radius: 10px;
		z-index: 10;
	}

	.indicator-area {
		position: absolute;
		top: 4px;
		left: 4px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		z-index: 10;
	}

	.chits-column {
		display: flex;
		flex-direction: column; /* Stack chits vertically */
		gap: 2px; /* Space between vertical chits */
	}

	.chit {
		width: 6px;
		height: 6px;
		background-color: black;
	}

	.plus-sign {
		font-size: 0.8rem;
		font-weight: bold;
		color: black;
		margin-top: -2px; /* Negative margin to pull it up closer to last chit */
		line-height: 1; /* Ensure consistent line height */
		margin-left: -1px; /* Center under the chits (chit width is 6px) */
	}
</style>
