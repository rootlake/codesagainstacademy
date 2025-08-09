<script lang="ts">
	// Import any global stores or setup needed for all pages, if necessary
	// logoSrc is now directly used in the template

	// Import page store to access route info
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
</script>

<div class="layout-container">
	<div class="logo-header">
		<a href="{base}/" aria-label="Home">
			<img src="{base}/minilogo.png" alt="Codes Against Academy" />
		</a>
	</div>

	<main class="main-content">
		<!-- The slot tag renders the content of the current page -->
		<slot />
	</main>

	<!-- Persistent Bottom Navigation -->
	<nav class="bottom-navigation">
		<div class="nav-cards-container">
			<a href="{base}/" class="nav-card {$page.route.id === '/' ? 'active' : ''}">
				<span class="nav-card-title">Home</span>
			</a>
			<a href="{base}/game" class="nav-card {$page.route.id === '/game' ? 'active' : ''}">
				<span class="nav-card-title">Game</span>
			</a>
			<a href="{base}/purchase" class="nav-card {$page.route.id === '/purchase' ? 'active' : ''}">
				<span class="nav-card-title">Purchase</span>
			</a>
			<a href="{base}/contact" class="nav-card {$page.route.id === '/contact' ? 'active' : ''}">
				<span class="nav-card-title">Contact</span>
			</a>
			<a
				href="{base}/suggestions"
				class="nav-card {$page.route.id === '/suggestions' ? 'active' : ''}"
			>
				<span class="nav-card-title">Suggest</span>
			</a>
		</div>
	</nav>
</div>

<style>
	/* --- Global Styles --- */
	:global(html) {
		/* CSS Custom Properties from constants */
		--mobile-max-width: 320px;
		--desktop-max-width: 1200px;
		--card-max-width: 420px;
		--nav-button-size: 40px;
		--circle-size: 35px;
		--standard-gap: 10px;
		--primary-black: #000;
		--primary-white: #fff;
		--background-gray: #d1d5db;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	:global(body) {
		background: linear-gradient(to bottom, #8b8c8f, #c7c8ca);
		color: #000;
		position: relative;
	}

	/* Mobile-specific body constraints */
	@media (max-width: 1023px) {
		:global(body) {
			height: 100vh; /* Fallback */
			height: 100svh; /* Use small viewport height */
			overflow: hidden; /* Prevent body scroll if content fits */
		}
	}

	/* Desktop-specific body constraints */
	@media (min-width: 1024px) {
		:global(body) {
			height: 100vh;
			overflow: hidden; /* Prevent scrolling on desktop too */
		}
	}

	/* --- Layout Container (replaces old .game-container) --- */
	.layout-container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		padding: 0;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		justify-content: flex-start; /* Align items to the top */
		align-items: center; /* Center items horizontally */

		/* Mobile: constrained width and height */
		max-width: var(--mobile-max-width, 320px);
		height: 100vh; /* Fixed height to prevent scrolling */
		height: 100svh; /* Use small viewport height */
		overflow: hidden; /* Prevent internal scrolling */
	}

	@media (min-width: 768px) {
		.layout-container {
			max-width: var(--desktop-max-width, 1200px); /* Desktop: much wider */
			padding: 0 2rem;
			height: 100vh; /* Fixed height on desktop too */
			overflow: hidden; /* Prevent scrolling on desktop */
		}
	}

	/* --- Logo Header --- */
	.logo-header {
		text-align: center;
		flex-shrink: 0; /* Prevent shrinking */
		margin-bottom: 0.75rem;
		width: 100%;
		max-width: 320px; /* Max width consistent with card */
		box-sizing: border-box;
		padding-top: max(0.5rem, env(safe-area-inset-top));
	}

	@media (min-width: 1024px) {
		.logo-header {
			max-width: 100%;
			margin-bottom: 1rem;
		}
	}
	.logo-header img {
		width: 100%;
		height: auto;
		max-height: 40px;
		opacity: 0.8;
		display: block;
	}

	.logo-header a {
		display: inline-block; /* Ensure anchor behaves correctly */
		line-height: 0; /* Prevent extra space below image */
	}

	/* --- Main Content Area --- */
	.main-content {
		flex-grow: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: max(0.5rem, env(safe-area-inset-left));
		padding-right: max(0.5rem, env(safe-area-inset-right));
		box-sizing: border-box;
	}

	/* --- Bottom Navigation --- */
	.bottom-navigation {
		flex-shrink: 0;
		width: 100%;
		background-color: transparent;
		padding: 0.75rem;
		margin-top: auto; /* Pushes navigation to the bottom */
		padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
		box-sizing: border-box;
		overflow: visible; /* Allow cards to extend beyond container */
	}

	.nav-cards-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		max-width: 800px;
		margin: 0 auto;
		height: 120px; /* Taller to accommodate extended cards */
		overflow: visible;
	}

	.nav-card {
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
		margin-bottom: -80px; /* Extend cards below the visible area */
	}

	/* Fanned card positioning */
	.nav-card:nth-child(1) { /* Home */
		transform: rotate(-6deg) translateX(-240px);
		z-index: 1;
	}
	
	.nav-card:nth-child(2) { /* Game */
		transform: rotate(-3deg) translateX(-120px);
		z-index: 2;
	}
	
	.nav-card:nth-child(3) { /* Purchase */
		transform: rotate(0deg) translateX(0px);
		z-index: 3;
	}
	
	.nav-card:nth-child(4) { /* Contact */
		transform: rotate(3deg) translateX(120px);
		z-index: 2;
	}
	
	.nav-card:nth-child(5) { /* Suggest */
		transform: rotate(6deg) translateX(240px);
		z-index: 1;
	}

	/* Hover effects for fanned cards */
	.nav-card:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
		z-index: 10 !important;
	}

	.nav-card:nth-child(1):hover { /* Home */
		transform: rotate(-6deg) translateX(-240px) scale(1.1);
	}
	
	.nav-card:nth-child(2):hover { /* Game */
		transform: rotate(-3deg) translateX(-120px) scale(1.1);
	}
	
	.nav-card:nth-child(3):hover { /* Purchase */
		transform: rotate(0deg) translateX(0px) scale(1.1);
	}
	
	.nav-card:nth-child(4):hover { /* Contact */
		transform: rotate(3deg) translateX(120px) scale(1.1);
	}
	
	.nav-card:nth-child(5):hover { /* Suggest */
		transform: rotate(6deg) translateX(240px) scale(1.1);
	}

	.nav-card.active {
		background: linear-gradient(to bottom, #c6c7c9, #888a8c);
		color: #000;
		text-shadow: none;
		z-index: 10 !important;
		transform-origin: bottom center;
		margin-bottom: -60px; /* Pull up slightly to stick out more */
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
	}

	/* Active card positioning - stick out from fan */
	.nav-card:nth-child(1).active { /* Home */
		transform: rotate(-6deg) translateX(-240px) translateY(-20px);
	}
	
	.nav-card:nth-child(2).active { /* Game */
		transform: rotate(-3deg) translateX(-120px) translateY(-20px);
	}
	
	.nav-card:nth-child(3).active { /* Purchase */
		transform: rotate(0deg) translateX(0px) translateY(-20px);
	}
	
	.nav-card:nth-child(4).active { /* Contact */
		transform: rotate(3deg) translateX(120px) translateY(-20px);
	}
	
	.nav-card:nth-child(5).active { /* Suggest */
		transform: rotate(6deg) translateX(240px) translateY(-20px);
	}

	.nav-card-title {
		line-height: 1;
	}

	/* Mobile adjustments */
	@media (max-width: 480px) {
		.nav-cards-container {
			gap: 0.25rem;
		}

		.nav-card {
			min-width: 60px;
			font-size: 0.75rem;
			padding: 0.375rem 0.75rem;
		}
	}

	/* Desktop adjustments */
	@media (min-width: 1024px) {
		.bottom-navigation {
			padding: 1rem;
		}

		.nav-card {
			min-width: 100px;
			font-size: 1rem;
		}
	}
</style>
