<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentCard, fullDeck, demoModeState, type ScenarioCard } from '$lib/store';
	import scenariosData from '$lib/data/scenarios.json';
	import CurrentCardDisplay from '$lib/components/CurrentCardDisplay.svelte';
	import TierListDisplay from '$lib/components/TierListDisplay.svelte';
	import UnlockCard from '$lib/components/UnlockCard.svelte';
	import { base } from '$app/paths';

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

<!-- Desktop Layout -->
<div class="desktop-layout">
	<div class="desktop-game-container">
		<div class="desktop-left-panel">
			{#if showUnlockCard}
				<div class="desktop-unlock-area">
					<UnlockCard on:unlock={handleUnlock} />
				</div>
			{:else}
				<div class="desktop-card-area">
					<CurrentCardDisplay on:nextCard={nextCard} />
				</div>
				<div class="desktop-nav-area">
					<button class="nav-button desktop-prev" on:click={previousCard} disabled={!canGoPrev}>
						←
					</button>
					<button class="nav-button desktop-next" on:click={nextCard} disabled={!canGoNext}>
						→
					</button>
				</div>
			{/if}
		</div>
		<div class="desktop-right-panel">
			<TierListDisplay />
		</div>
	</div>

	<!-- Desktop Navigation Cards (same as other pages) -->
	<nav class="desktop-navigation-game">
		<div class="desktop-nav-cards">
			<a href="{base}/" class="desktop-nav-card">
				<span class="desktop-nav-title">Home</span>
			</a>
			<a href="{base}/game" class="desktop-nav-card active">
				<span class="desktop-nav-title">Game</span>
			</a>
			<a href="{base}/purchase" class="desktop-nav-card">
				<span class="desktop-nav-title">Purchase</span>
			</a>
			<a href="{base}/contact" class="desktop-nav-card">
				<span class="desktop-nav-title">Contact</span>
			</a>
			<a href="{base}/suggestions" class="desktop-nav-card">
				<span class="desktop-nav-title">Suggest</span>
			</a>
		</div>
	</nav>
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
			display: flex;
			flex-direction: column;
			width: 100%;
			min-height: 100vh; /* Full viewport height */
			height: 100vh; /* Set fixed height for proper flex behavior */
		}

		.desktop-game-container {
			display: flex;
			gap: 2rem;
			align-items: flex-start;
			justify-content: center;
			max-width: 1200px;
			margin: 0 auto;
			padding: 2rem 0; /* Add some vertical padding */
			flex: 1; /* Take up available space */
			min-height: 0; /* Allow shrinking */
		}

		.desktop-left-panel {
			flex: 1;
			max-width: 600px;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.desktop-card-area {
			width: 100%;
		}

		.desktop-nav-area {
			display: flex;
			gap: 1rem;
			justify-content: center;
		}

		.desktop-prev,
		.desktop-next {
			background-color: #666;
			color: white;
			border: none;
			padding: 0.75rem 1.5rem;
			border-radius: 8px;
			cursor: pointer;
			font-size: 1rem;
			font-weight: bold;
			transition: background-color 0.2s;
			width: 60px; /* Narrower width for arrow-only buttons */
			height: auto;
			text-align: center;
		}

		.desktop-prev:hover:not(:disabled),
		.desktop-next:hover:not(:disabled) {
			background-color: #555;
		}

		.desktop-prev:disabled,
		.desktop-next:disabled {
			background-color: #ccc;
			cursor: not-allowed;
			opacity: 0.5;
		}

		.desktop-prev::before,
		.desktop-next::before {
			display: none; /* Hide triangle arrows for desktop buttons */
		}

		.desktop-right-panel {
			flex: 1;
			max-width: 500px;
			display: flex;
			justify-content: center;
		}

		.desktop-unlock-area {
			width: 100%;
			display: flex;
			justify-content: center;
		}

		/* Desktop Navigation Cards (copied from layout) */
		.desktop-navigation-game {
			flex-shrink: 0;
			width: 100%;
			background-color: transparent;
			padding: 0.5rem; /* Reduced padding */
			margin-top: auto; /* Pushes navigation to the bottom */
			padding-bottom: 0; /* Remove bottom padding to push cards lower */
			box-sizing: border-box;
			overflow: visible; /* Allow cards to extend beyond container */
			display: block; /* Ensure it's visible */
			position: relative; /* Ensure proper positioning */
			transform: translateY(40px); /* Push the entire navigation section down */
		}

		.desktop-nav-cards {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			max-width: 800px;
			margin: 0 auto;
			height: 140px; /* Taller to accommodate cards */
			overflow: visible;
		}

		.desktop-nav-card {
			background: linear-gradient(to bottom, #c6c7c9, #888a8c);
			border-radius: 8px;
			padding: 0.5rem 1rem;
			width: 120px;
			height: 166px; /* Scaled from 555px (400:555 ratio maintained) */
			display: flex;
			align-items: flex-start;
			justify-content: center;
			text-decoration: none;
			color: #000;
			font-family: Arial, sans-serif;
			font-weight: bold;
			font-size: 0.875rem;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
			transition:
				transform 0.2s ease,
				box-shadow 0.2s ease,
				z-index 0.2s ease;
			position: absolute;
			border: 1px solid #999;
			transform-origin: bottom center;
			padding-top: 0.75rem;
			margin-bottom: 20px; /* Keep cards visible above bottom */
		}

		/* Fanned card positioning */
		.desktop-nav-card:nth-child(1) { /* Home */
			transform: rotate(-6deg) translateX(-240px);
			z-index: 1;
		}
		
		.desktop-nav-card:nth-child(2) { /* Game */
			transform: rotate(-3deg) translateX(-120px);
			z-index: 2;
		}
		
		.desktop-nav-card:nth-child(3) { /* Purchase */
			transform: rotate(0deg) translateX(0px);
			z-index: 3;
		}
		
		.desktop-nav-card:nth-child(4) { /* Contact */
			transform: rotate(3deg) translateX(120px);
			z-index: 2;
		}
		
		.desktop-nav-card:nth-child(5) { /* Suggest */
			transform: rotate(6deg) translateX(240px);
			z-index: 1;
		}

		/* Hover effects for fanned cards */
		.desktop-nav-card:hover {
			transform: scale(1.1);
			box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
			z-index: 10 !important;
		}

		.desktop-nav-card:nth-child(1):hover { /* Home */
			transform: rotate(-6deg) translateX(-240px) scale(1.1);
		}
		
		.desktop-nav-card:nth-child(2):hover { /* Game */
			transform: rotate(-3deg) translateX(-120px) scale(1.1);
		}
		
		.desktop-nav-card:nth-child(3):hover { /* Purchase */
			transform: rotate(0deg) translateX(0px) scale(1.1);
		}
		
		.desktop-nav-card:nth-child(4):hover { /* Contact */
			transform: rotate(3deg) translateX(120px) scale(1.1);
		}
		
		.desktop-nav-card:nth-child(5):hover { /* Suggest */
			transform: rotate(6deg) translateX(240px) scale(1.1);
		}

		.desktop-nav-card.active {
			background: linear-gradient(to bottom, #c6c7c9, #888a8c);
			color: #000;
			text-shadow: none;
			z-index: 10 !important;
			transform-origin: bottom center;
			margin-bottom: 0px; /* Keep active card visible */
			box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
		}

		/* Active card positioning - stick out from fan */
		.desktop-nav-card:nth-child(1).active { /* Home */
			transform: rotate(-6deg) translateX(-240px) translateY(-20px);
		}
		
		.desktop-nav-card:nth-child(2).active { /* Game */
			transform: rotate(-3deg) translateX(-120px) translateY(-20px);
		}
		
		.desktop-nav-card:nth-child(3).active { /* Purchase */
			transform: rotate(0deg) translateX(0px) translateY(-20px);
		}
		
		.desktop-nav-card:nth-child(4).active { /* Contact */
			transform: rotate(3deg) translateX(120px) translateY(-20px);
		}
		
		.desktop-nav-card:nth-child(5).active { /* Suggest */
			transform: rotate(6deg) translateX(240px) translateY(-20px);
		}

		.desktop-nav-title {
			line-height: 1;
		}
	}
</style> 