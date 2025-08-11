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
        {#if $page.route.id !== '/game'}
            <!-- Mobile Navigation -->
            <div class="nav-area mobile-nav">
                <NavigationMenu />
            </div>
        {/if}
    </main>

    <!-- Footer area (empty for now, pushed down) -->
    <footer class="footer-area">
        <!-- The game page provides its own tier list in this space -->
        <!-- This ensures the space is occupied consistently -->
    </footer>

    <!-- Desktop Navigation (only visible on wide screens) -->
    {#if $page.route.id !== '/game'}
        <nav class="desktop-navigation">
            <div class="desktop-nav-cards">
                <a href="{base}/" class="desktop-nav-card {$page.route.id === '/' ? 'active' : ''}">
                    <span class="desktop-nav-title">Home</span>
                </a>
                <a href="{base}/game" class="desktop-nav-card {$page.route.id === '/game' ? 'active' : ''}">
                    <span class="desktop-nav-title">Game</span>
                </a>
                <a href="{base}/purchase" class="desktop-nav-card {$page.route.id === '/purchase' ? 'active' : ''}">
                    <span class="desktop-nav-title">Purchase</span>
                </a>
                <a href="{base}/contact" class="desktop-nav-card {$page.route.id === '/contact' ? 'active' : ''}">
                    <span class="desktop-nav-title">Contact</span>
                </a>
                <a href="{base}/suggestions" class="desktop-nav-card {$page.route.id === '/suggestions' ? 'active' : ''}">
                    <span class="desktop-nav-title">Suggest</span>
                </a>
            </div>
        </nav>
    {/if}
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
		background: linear-gradient(to bottom, #8B8C8F, #C7C8CA);
		color: #000;
        height: 100vh; /* Fallback */
        height: 100svh; /* Use small viewport height */
        overflow: hidden; /* Prevent body scroll if content fits */
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
        min-height: 100vh; /* Minimum height but allow content to expand */
        min-height: 100svh; /* Use small viewport height */
        height: auto; /* Allow content to determine height */
    }

    @media (min-width: 768px) {
        .layout-container {
            max-width: var(--desktop-max-width, 1200px); /* Desktop: much wider */
            padding: 0 2rem;
            min-height: 100vh; /* Minimum height but allow content to expand */
            height: auto; /* Allow content to determine height */
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
        overflow: visible; /* Allow game navigation to be visible */
    }

    /* --- Navigation Area (inside main-content) --- */
    .nav-area {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.75rem; /* Space above nav */
        padding-top: 0.5rem;
        box-sizing: border-box;
    }

    /* --- Footer Area --- */
    .footer-area {
        flex-shrink: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: auto; /* Pushes footer to the bottom */
        padding-bottom: max(1rem, env(safe-area-inset-bottom));
        box-sizing: border-box;
    }

    /* --- Mobile Navigation (visible by default) --- */
    .mobile-nav {
        display: block;
    }

    /* --- Desktop Navigation (hidden by default) --- */
    .desktop-navigation {
        display: none;
    }

    /* Desktop-specific styles */
    @media (min-width: 1024px) {
        /* Hide mobile navigation on desktop */
        .mobile-nav {
            display: none;
        }

        /* Show desktop navigation */
        .desktop-navigation {
            display: block;
            flex-shrink: 0;
            width: 100%;
            background-color: transparent;
            padding: 0.5rem; /* Reduced padding */
            margin-top: auto; /* Pushes navigation to the bottom */
            padding-bottom: 0; /* Remove bottom padding to push cards lower */
            box-sizing: border-box;
            overflow: visible; /* Allow cards to extend beyond container */
            transform: translateY(40px); /* Push the entire navigation section down */
        }

        .desktop-nav-cards {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            max-width: 800px;
            margin: 0 auto;
            height: 120px; /* Taller to accommodate extended cards */
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
