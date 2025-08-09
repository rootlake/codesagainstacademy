<script lang="ts">
	// Contact form submission logic will eventually go here
	// Could use SvelteKit form actions or an API route
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
	<div class="content-inner">
		<h1>Contact the Creator</h1>
		<p class="description">
			Josh Lake has been teaching Science at Pomfret School (CT) for over 20 years. For 2025, he'll
			move on from Science Department Head to Director of Technological Innovation, helping students
			and campus adults use AI tools ethically and wisely.
		</p>
		<p class="description">
			Reach Josh at <a
				href="mailto:jlake@pomfret.org?subject=Codes%20Against%20Academy%20game"
				class="mailto-link">jlake@pomfret.org</a
			> with any questions or comments!
		</p>
	</div>
	<div class="bottom-elements">
		<img src="{base}/minilogo.png" alt="CAA Logo" class="logo" />
		<span class="category">Contact</span>
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

	/* Desktop card sizing - match game card dimensions */
	@media (min-width: 1024px) {
		.static-content-card {
			width: 400px; /* Fixed width to match game card */
			height: 555px; /* Fixed height to match game card */
			max-width: none; /* Remove max-width constraint */
			aspect-ratio: auto; /* Let fixed dimensions control ratio */
			padding: 40px; /* More padding on desktop */
			border-radius: 25px; /* Larger border radius */
			box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); /* More prominent shadow */
		}
	}
	.content-inner {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		text-align: center;
		overflow: hidden; /* Match home page */
		padding: 0.5rem 0; /* Reduce top padding */
		gap: 0.5rem; /* Reduce gap */
	}
	h1 {
		/* Remove margin-top */
		margin-bottom: 0; /* Adjust spacing with gap */
		font-weight: bold;
		font-size: clamp(20px, 7cqw, 28px); /* Larger title size */
		line-height: 1.2; /* Tighter line height */
		text-align: center; /* Ensure centered */
	}

	/* Desktop text sizing - use more available space */
	@media (min-width: 1024px) {
		h1 {
			font-size: 30px; /* Even larger size to use available space */
		}
	}

	.description {
		font-weight: bold;
		font-size: clamp(16px, 5cqw, 20px); /* Larger description text */
		margin-bottom: 0; /* Adjust spacing with gap */
		line-height: 1.3;
	}

	/* Desktop description sizing - use more available space */
	@media (min-width: 1024px) {
		.description {
			font-size: 21px; /* Even larger size to use available space */
		}
	}

	.mailto-link {
		color: #444444; /* Dark gray */
		text-decoration: underline;
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
