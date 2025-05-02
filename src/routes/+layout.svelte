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
            <div class="nav-area">
                <NavigationMenu />
            </div>
        {/if}
    </main>

    <!-- Footer area (empty for now, pushed down) -->
    <footer class="footer-area">
        <!-- The game page provides its own tier list in this space -->
        <!-- This ensures the space is occupied consistently -->
    </footer>
</div>

<style>
	/* --- Global Styles --- */
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

    /* --- Layout Container (replaces old .game-container) --- */
    .layout-container {
        width: 100%;
        /* Use min-height to allow content to determine height */
        min-height: 100vh; /* Fallback */
        min-height: 100svh;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        padding: 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: flex-start; /* Align items to the top */
        align-items: center; /* Center items horizontally */
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

</style>
