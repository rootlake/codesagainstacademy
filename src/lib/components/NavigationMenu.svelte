<script lang="ts">
	// Component logic, if needed in the future
	import { base } from '$app/paths';
</script>

<nav class="bottom-nav">
	<a href="{base}/game" class="nav-item">
		<div class="circle">
			<img src="{base}/icon_play.png" alt="" class="icon-img" />
		</div>
		<span class="label">Play</span>
	</a>
	<a href="{base}/purchase" class="nav-item">
		<div class="circle">
			<span class="icon-text">$</span>
		</div>
		<span class="label">Purchase</span>
	</a>
	<a href="{base}/contact" class="nav-item">
		<div class="circle">
			<img src="{base}/icon_contact.png" alt="" class="icon-img" />
		</div>
		<span class="label">Contact</span>
	</a>
	<a href="{base}/suggestions" class="nav-item">
		<div class="circle">
			<img src="{base}/icon_suggest.png" alt="" class="icon-img" />
		</div>
		<span class="label">Suggest</span>
	</a>
</nav>

<style>
	.bottom-nav {
		display: grid; /* Use grid */
		grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
		/* justify-content removed (grid handles distribution) */
		align-items: start; /* Align items to top */
		width: 100%;
		max-width: 320px; /* Match TierListDisplay max-width */
		margin: 0 auto;
		padding: 0.25rem;
		box-sizing: border-box;
		gap: 0.3rem; /* Match TierListDisplay gap */
	}

	/* Style like TierCard */
	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; /* Vertically center content */
		text-decoration: none;
		color: #000;
		font-family: Arial, sans-serif;
		font-size: 0.65rem; /* Match tier card description size */
		gap: 0.15rem; /* Match tier card gap */
		/* padding: 0.5rem 0.25rem; /* Removed padding */
		border-radius: 6px; /* Match tier card radius */
		transition: background-color 0.2s ease;
		/* flex removed */
		/* min-width removed */
		background-color: #d1d5db; /* Default background (like Home tier) */
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15); /* Match tier card shadow */
		border: none;
		cursor: pointer;
		/* Set fixed size to match tier cards */
		width: 70px;
		height: 70px;
	}

	.nav-item:hover {
		background-color: #bcc0c4; /* Slightly darker hover */
	}

	/* Circle like TierCard */
	.circle {
		background-color: white;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0.15rem;
		pointer-events: none; /* Prevent interfering with link */
	}

	.icon-img {
		width: 24px; /* Match home SVG size */
		height: 24px;
		object-fit: contain;
		display: block; /* Ensure image is block */
	}

	.icon-text {
		font-size: 1.8rem;
		line-height: 1;
		font-weight: bold;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial, Helvetica, sans-serif; /* Match tier letter font */
		position: relative; /* For potential fine-tuning */
	}

	.label {
		font-weight: bold;
		text-align: center;
		pointer-events: none;
	}
</style>
