<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentCard, fullDeck, type ScenarioCard } from '$lib/store';
	import scenariosData from '$lib/data/scenarios.json';
	import CurrentCardDisplay from '$lib/components/CurrentCardDisplay.svelte';
	import TierListDisplay from '$lib/components/TierListDisplay.svelte';
	import { base } from '$app/paths';

	// --- State --- //
	let history: ScenarioCard[] = []; // Will hold the fully shuffled deck
	let historyIndex = -1;           // Pointer within the history
	let currentCardValue: ScenarioCard | null = null; // Keep track for $isDraggingCard check

	const unsubscribeCurrent = currentCard.subscribe((value: ScenarioCard | null) => {
		currentCardValue = value;
	});

	// Reactive Navigation State
	$: canGoPrev = historyIndex > 0;
	$: canGoNext = historyIndex < history.length - 1;

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

	// Navigation Functions
	function nextCard() {
		if (canGoNext) {
			historyIndex++;
			currentCard.set(history[historyIndex]);
		}
	}

	function previousCard() {
		if (canGoPrev) {
			historyIndex--;
			currentCard.set(history[historyIndex]);
		}
	}

	// Cleanup
	onDestroy(() => {
		unsubscribeCurrent();
	});
</script>

<!-- Removed outer .game-container and .logo-header -->
<!-- These elements are now direct children of the layout's main-content slot -->
<div class="card-area">
	<CurrentCardDisplay />
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

<!-- Home button for game page -->
<div class="home-button-container">
	<a href="{base}/" class="home-button">
		<img src="{base}/minilogo.png" alt="Home" class="home-icon" />
		<span class="home-label">Home</span>
	</a>
</div>

<style>
	/* Styles specific to the game page elements */
	/* Removed .game-container, .logo-header as they are in layout */

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
		/* outline: 1px dashed white; /* Optional debug */
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
	.nav-button:disabled {
		cursor: not-allowed;
		opacity: 0.3;
	}
	/* Change triangle color when disabled */
	.nav-button.prev:disabled::before {
		border-color: transparent rgba(0,0,0,0.2) transparent transparent;
	}
	.nav-button.next:disabled::before {
		border-color: transparent transparent transparent rgba(0,0,0,0.2);
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
		margin-top: 0.5rem; /* Add small space above card */
		/* outline: 2px solid orange; /* DEBUG removed */
	}

	.tier-list-area {
		text-align: center;
		border: none;
		padding: 0;
		line-height: normal;
		flex-shrink: 0;
		width: 100%;
		box-sizing: border-box;
		margin-top: 0.75rem; /* Reduced space above the tier list */
		display: flex;
		align-items: center;
		justify-content: center;
		/* outline: 2px solid purple; /* DEBUG removed */
	}

	.tier-list-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
		max-width: 400px;
		box-sizing: border-box;
		flex-grow: 1;
	}

	.nav-container {
		flex: 0 0 auto;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Home button styles */
	.home-button-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 100;
	}

	.home-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: #000;
		background-color: #D1D5DB;
		padding: 10px;
		border-radius: 50%;
		box-shadow: 0 2px 5px rgba(0,0,0,0.2);
		transition: background-color 0.2s ease;
	}

	.home-button:hover {
		background-color: #BCC0C4;
	}

	.home-icon {
		width: 24px;
		height: 24px;
		opacity: 0.8;
	}

	.home-label {
		font-size: 12px;
		font-weight: bold;
		margin-top: 5px;
	}
</style> 