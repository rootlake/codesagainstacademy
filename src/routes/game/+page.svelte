<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentCard, fullDeck, type ScenarioCard } from '$lib/store';
	import scenariosData from '$lib/data/scenarios.json';
	import CurrentCardDisplay from '$lib/components/CurrentCardDisplay.svelte';
	import TierListDisplay from '$lib/components/TierListDisplay.svelte';

	// --- State --- //
	let history: ScenarioCard[] = []; // Will hold the fully shuffled deck
	let historyIndex = -1;           // Pointer within the history
	let currentCardValue: ScenarioCard | null = null; // Keep track for $isDraggingCard check

	const unsubscribeCurrent = currentCard.subscribe((value: ScenarioCard | null) => {
		currentCardValue = value;
	});

	// Reactive Navigation State - infinite carousel means always enabled
	$: canGoPrev = history.length > 0;
	$: canGoNext = history.length > 0;

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
	});

	// Navigation Functions - updated for infinite carousel
	function nextCard() {
		if (history.length === 0) return;
		
		historyIndex = (historyIndex + 1) % history.length;
		currentCard.set(history[historyIndex]);
	}

	function previousCard() {
		if (history.length === 0) return;
		
		historyIndex = historyIndex === 0 ? history.length - 1 : historyIndex - 1;
		currentCard.set(history[historyIndex]);
	}

	// Cleanup
	onDestroy(() => {
		unsubscribeCurrent();
	});
</script>

<div class="card-area">
	<CurrentCardDisplay />
</div>

<!-- Tier list area sits below the card area -->
<div class="tier-list-area">
	<div class="tier-list-content">
		<div class="nav-container left">
			<button class="nav-button prev" on:click={previousCard}>
				<!-- Triangle added via CSS -->
			</button>
		</div>
		<TierListDisplay />
		<div class="nav-container right">
			<button class="nav-button next" on:click={nextCard}>
				<!-- Triangle added via CSS -->
			</button>
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

	.nav-button:hover {
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
</style> 