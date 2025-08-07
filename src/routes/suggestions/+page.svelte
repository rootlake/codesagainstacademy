<script lang="ts">
	// Suggestions form submission logic will eventually go here
	// Could use SvelteKit form actions or an API route
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
	<div class="content-inner">
		<h1>Suggest a Scenario</h1>
		<p class="description">
			Played the game and found it lacking? Suggest new scenarios here! Bonus points for ones based
			on true stories...
		</p>
		<a
			href="https://forms.gle/dgFGX7wuV9sz3t8Z7"
			class="form-link-button"
			target="_blank"
			rel="noopener noreferrer"
		>
			Open Suggestion Form
		</a>
	</div>
	<div class="bottom-elements">
		<img src="{base}/minilogo.png" alt="CAA Logo" class="logo" />
		<!-- <img src="/minilogo.png" alt="CAA Logo" class="logo"/> -->
		<!-- Temporary path removed -->
		<span class="category">Suggest</span>
	</div>
</div>

<style>
	/* Card structure styles (copied from home page) */
	.static-content-card {
		width: 100%;
		max-width: 320px;
		aspect-ratio: 2.5 / 3.5;
		margin: 0 auto; /* Use 0 margin like home */
		background: linear-gradient(to bottom, #c6c7c9, #888a8c);
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		color: #000;
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		padding: 15px;
		box-sizing: border-box;
		overflow: hidden;
	}
	.content-inner {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		text-align: center;
		overflow: hidden; /* Match home page */
		padding: 0.5rem 0; /* Reduce top padding */
		gap: 1rem; /* Increase gap slightly */
	}
	h1 {
		/* Remove margin-top */
		margin-bottom: 0; /* Adjust spacing with gap */
		font-weight: bold;
		font-size: clamp(16px, 6cqw, 24px); /* Match home page title size */
		line-height: 1.3; /* Match home page line-height */
		text-align: center; /* Ensure centered */
	}
	.description {
		font-weight: bold;
		font-size: clamp(18px, 4cqw, 18px);
		margin-bottom: 0; /* Adjust spacing with gap */
		line-height: 1.3;
	}

	/* Style for the link button */
	.form-link-button {
		display: inline-block;
		padding: 0.6rem 1.2rem;
		background-color: #444;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: clamp(14px, 4cqw, 16px);
		font-family: Arial, sans-serif;
		font-weight: bold;
		margin: auto 0 0.5rem; /* Push to bottom with margin */
		transition: background-color 0.2s ease;
	}

	.form-link-button:hover {
		background-color: #222;
	}

	/* Footer styles (copied from home page) */
	.bottom-elements {
		height: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-top: 1px solid #aaa;
		padding-top: 2px;
		margin-top: auto;
		flex-shrink: 0;
	}
	.logo {
		height: clamp(12px, 2.5cqw, 18px);
		width: auto;
		opacity: 0.8;
		display: block;
	}
	.category {
		font-size: clamp(11px, 2vw, 14px);
		color: #000;
		font-style: italic;
		font-weight: normal;
	}
</style>
