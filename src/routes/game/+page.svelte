<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentCard, fullDeck, demoModeState, type ScenarioCard } from '$lib/store';
	import scenariosData from '$lib/data/scenarios.json';
	import CurrentCardDisplay from '$lib/components/CurrentCardDisplay.svelte';
	import TierListDisplay from '$lib/components/TierListDisplay.svelte';
	import UnlockCard from '$lib/components/UnlockCard.svelte';

	// --- State --- //
	let history: ScenarioCard[] = []; // Will hold the fully shuffled deck
	let historyIndex = -1; // Pointer within the history
	// Track current card state for potential future features
	let showUnlockCard = false;
	let demoState = { cardsViewed: 0, isUnlocked: false };

	const unsubscribeCurrent = currentCard.subscribe(() => {
		// Current card subscription for potential future features
	});

	const unsubscribeDemo = demoModeState.subscribe((value) => {
		demoState = value;
		showUnlockCard = value.cardsViewed >= 5 && !value.isUnlocked;
	});

	// Reactive Navigation State
	$: canGoPrev = history.length > 0 && (!showUnlockCard || demoState.isUnlocked);
	$: canGoNext = history.length > 0 && (!showUnlockCard || demoState.isUnlocked);

	// Utility
	function shuffleArray<T>(array: T[]): T[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// Lifecycle
	onMount(() => {
		// Clear all localStorage data for testing
		localStorage.removeItem('caa_unlock_status');
		localStorage.removeItem('caa_cards_viewed');

		const allCards = scenariosData as ScenarioCard[];
		if (allCards.length === 0) {
			console.error('No scenario cards found!');
			return;
		}

		// Set the full deck reference
		fullDeck.set([...allCards]);

		// Create the full navigation history by shuffling ALL cards
		history = shuffleArray([...allCards]);

		// Start at a random index
		historyIndex = Math.floor(Math.random() * history.length);

		// Set the initial current card
		currentCard.set(history[historyIndex]);

		// Initialize with fresh state - start in demo mode
		demoModeState.set({ cardsViewed: 0, isUnlocked: false });
	});

	// Navigation Functions
	function nextCard() {
		if (history.length === 0) return;
		if (showUnlockCard && !demoState.isUnlocked) return;

		historyIndex = (historyIndex + 1) % history.length;
		currentCard.set(history[historyIndex]);

		if (!demoState.isUnlocked) {
			const newCardsViewed = demoState.cardsViewed + 1;
			demoModeState.update((state) => ({
				...state,
				cardsViewed: newCardsViewed
			}));
		}
	}

	function previousCard() {
		if (history.length === 0) return;
		if (showUnlockCard && !demoState.isUnlocked) return;

		historyIndex = historyIndex === 0 ? history.length - 1 : historyIndex - 1;
		currentCard.set(history[historyIndex]);
	}

	function handleUnlock() {
		demoModeState.update((state) => ({
			...state,
			isUnlocked: true,
			cardsViewed: 0
		}));
		showUnlockCard = false;
		showUnlockCard = false;
	}

	// Cleanup
	onDestroy(() => {
		unsubscribeCurrent();
		unsubscribeDemo();
	});
</script>

<!-- Mobile Layout -->
<div class="card-area mobile-layout">
	{#if showUnlockCard}
		<UnlockCard on:unlock={handleUnlock} />
	{:else}
		<CurrentCardDisplay on:nextCard={nextCard} />
	{/if}
</div>

<!-- Mobile tier list area sits below the card area -->
<div class="tier-list-area mobile-layout">
	<div class="tier-list-content">
		<div class="nav-container left">
			<button class="nav-button prev" on:click={previousCard} disabled={!canGoPrev}>
				<!-- Triangle added via CSS -->
			</button>
		</div>
		<TierListDisplay />
		<div class="nav-container right">
			<button class="nav-button next" on:click={nextCard} disabled={!canGoNext}>
				<!-- Triangle added via CSS -->
			</button>
		</div>
	</div>
</div>

{#if !demoState.isUnlocked}
	<div class="demo-banner mobile-layout">
		Demo Mode ({5 - demoState.cardsViewed} cards remaining)
	</div>
{/if}

<!-- Desktop Layout -->
<div class="desktop-layout">
	{#if !demoState.isUnlocked}
		<div class="demo-banner">
			Demo Mode ({5 - demoState.cardsViewed} cards remaining)
		</div>
	{/if}
	<div class="desktop-game-container">
		<div class="desktop-left-panel">
			{#if showUnlockCard}
				<UnlockCard on:unlock={handleUnlock} />
			{:else}
				<div class="desktop-card-container">
					<!-- Left navigation button -->
					<button
						class="nav-button desktop-side-nav desktop-prev"
						on:click={previousCard}
						disabled={!canGoPrev}
					>
						<span class="nav-arrow">‹</span>
					</button>

					<!-- Card in center -->
					<div class="desktop-card-area">
						<CurrentCardDisplay on:nextCard={nextCard} />
					</div>

					<!-- Right navigation button -->
					<button
						class="nav-button desktop-side-nav desktop-next"
						on:click={nextCard}
						disabled={!canGoNext}
					>
						<span class="nav-arrow">›</span>
					</button>
				</div>
			{/if}
		</div>
		<div class="desktop-right-panel">
			<TierListDisplay />
		</div>
	</div>
</div>

<style>
	/* --- Nav Button Styles (using CSS triangles) --- */
	.nav-button {
		background-color: transparent;
		border: none;
		width: 40px; /* Button clickable area width */
		height: 40px; /* Button clickable area height */
		cursor: pointer;
		padding: 0; /* Remove padding, using pseudo-element */
		opacity: 0.7;
		position: relative; /* For pseudo-element positioning */
		touch-action: manipulation; /* Prevent double-tap zoom */
	}
	.nav-button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
	/* Remove triangle pseudo-elements */

	.nav-button:hover:not(:disabled) {
		opacity: 1;
	}

	.card-area {
		border: none;
		padding: 0;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.tier-list-area {
		text-align: center;
		border: none;
		padding: 0;
		line-height: normal;
		flex-shrink: 0;
		width: 100%;
		box-sizing: border-box;
		margin-top: 0.75rem; /* Standard space above */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tier-list-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
		max-width: 420px; /* 320px tier list + 2 * (40px arrow + 10px gap) */
		box-sizing: border-box;
	}

	.nav-container {
		flex: 0 0 auto;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.demo-banner {
		background-color: #444;
		color: white;
		padding: 0.25rem;
		border-radius: 4px;
		margin-top: 0.75rem;
		font-family: Arial, sans-serif;
		font-weight: bold;
		font-size: 0.8rem;
		width: 100%;
		max-width: 420px;
		text-align: center;
		box-sizing: border-box;
	}

	/* Desktop demo banner styling */
	@media (min-width: 1024px) {
		.demo-banner {
			font-size: 1.2rem;
			padding: 0.75rem 2rem;
			border-radius: 10px;
			margin: 0 auto 1rem auto; /* Reduced bottom margin */
			max-width: 500px; /* Wider on desktop */
			background-color: #333;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		}
	}

	/* Responsive Layout Controls */
	.mobile-layout {
		display: block;
	}

	.desktop-layout {
		display: none;
	}

	/* Desktop Layout (1024px and up) */
	@media (min-width: 1024px) {
		.mobile-layout {
			display: none;
		}

		.desktop-layout {
			display: block;
			width: 100%;
			min-height: 60vh; /* Ensure minimum height */
			height: auto; /* Allow content to determine height */
		}

		.desktop-game-container {
			display: flex;
			gap: 1rem; /* Reduced gap to bring tier list closer */
			align-items: flex-start;
			justify-content: center;
			max-width: 1200px;
			margin: 0 auto;
			padding: 0.5rem 0; /* Reduced padding */
			height: auto; /* Remove fixed height calculation */
		}

		.desktop-left-panel {
			flex: 2; /* Take more space */
			max-width: 700px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
		}

		.desktop-card-container {
			display: flex;
			align-items: center;
			gap: 1rem;
			width: 100%;
			justify-content: center;
		}

		.desktop-card-area {
			flex: 0 0 auto;
		}

		.desktop-side-nav {
			background-color: #666;
			color: white;
			border: none;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2rem;
			font-weight: bold;
			transition: background-color 0.2s;
			flex-shrink: 0;
		}

		.nav-arrow {
			line-height: 1;
			font-family: Arial, sans-serif;
		}

		.desktop-side-nav:hover:not(:disabled) {
			background-color: #555;
		}

		.desktop-side-nav:disabled {
			background-color: #ccc;
			cursor: not-allowed;
			opacity: 0.5;
		}

		.desktop-right-panel {
			flex: 1;
			max-width: 500px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			overflow-y: auto;
		}
	}
</style>
