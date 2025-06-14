<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentCard, fullDeck, demoModeState, type ScenarioCard } from '$lib/store';
	import scenariosData from '$lib/data/scenarios.json';
	import CurrentCardDisplay from '$lib/components/CurrentCardDisplay.svelte';
	import TierListDisplay from '$lib/components/TierListDisplay.svelte';
	import UnlockCard from '$lib/components/UnlockCard.svelte';

	// --- State --- //
	let history: ScenarioCard[] = []; // Will hold the fully shuffled deck
	let historyIndex = -1;           // Pointer within the history
	let currentCardValue: ScenarioCard | null = null; // Keep track for $isDraggingCard check
	let showUnlockCard = false;
	let demoState = { cardsViewed: 0, isUnlocked: false };

	const unsubscribeCurrent = currentCard.subscribe((value: ScenarioCard | null) => { 
		currentCardValue = value;
	});

	const unsubscribeDemo = demoModeState.subscribe(value => {
		demoState = value;
		console.log('Demo state updated:', value);
		console.log('Cards viewed:', value.cardsViewed);
		console.log('Is unlocked:', value.isUnlocked);
		showUnlockCard = value.cardsViewed >= 5 && !value.isUnlocked;
		console.log('Show unlock card:', showUnlockCard);
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
		console.log('Cleared localStorage');

		const allCards = scenariosData as ScenarioCard[];
		if (allCards.length === 0) {
			console.error("No scenario cards found!");
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
		
		// Initialize with fresh state
		demoModeState.set({ cardsViewed: 0, isUnlocked: false });
		console.log('Initialized fresh demo state');
	});

	// Navigation Functions
	function nextCard() {
		if (history.length === 0) return;
		if (showUnlockCard && !demoState.isUnlocked) return;
		
		historyIndex = (historyIndex + 1) % history.length;
		currentCard.set(history[historyIndex]);
		
		if (!demoState.isUnlocked) {
			const newCardsViewed = demoState.cardsViewed + 1;
			console.log('Incrementing cards viewed to:', newCardsViewed);
			demoModeState.update(state => ({
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
		console.log('Handling unlock...');
		demoModeState.update(state => {
			console.log('Current state before unlock:', state);
			const newState = {
				...state,
				isUnlocked: true,
				cardsViewed: 0
			};
			console.log('New state after unlock:', newState);
			return newState;
		});
		showUnlockCard = false;
	}

	// Cleanup
	onDestroy(() => {
		unsubscribeCurrent();
		unsubscribeDemo();
	});
</script>

<div class="card-area">
	{#if showUnlockCard}
		<UnlockCard on:unlock={handleUnlock} />
	{:else}
		<CurrentCardDisplay on:nextCard={nextCard} />
	{/if}
</div>

<!-- Tier list area sits below the card area -->
<div class="tier-list-area">
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
	<div class="demo-banner">
		Demo Mode ({5 - demoState.cardsViewed} cards remaining)
	</div>
{/if}

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
	.nav-button::before { /* Common styles for triangle pseudo-elements */
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-style: solid;
		/* Default border color, overridden below */
		border-color: transparent black transparent transparent;
	}
	.nav-button.prev::before {
		border-width: 10px 12px 10px 0; /* h, right-w, h, left-w */
		border-color: transparent black transparent transparent;
		transform: translate(-50%, -50%);
	}
	.nav-button.next::before {
		border-width: 10px 0 10px 12px; /* h, right-w, h, left-w */
		border-color: transparent transparent transparent black;
		transform: translate(-50%, -50%);
	}

	.nav-button:hover:not(:disabled) {
		opacity: 1.0;
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
</style> 