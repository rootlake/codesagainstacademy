<script lang="ts">
	// Purchase logic (e.g., Stripe integration) will eventually go here
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
	<div class="content-inner">
		<h1>Purchase a Real Deck!</h1>
		<p class="description">
			Order your own physical box of <br /><strong>Codes Against Academy</strong>
			here. It's perfect for classrooms, workshops, and discussions, basically an "Engaging Faculty Meeting
			in a Box." The deck contains 75 Scenario cards, 25 Reaction cards, the colorful Tier List, and
			instructions for all three game modes.
		</p>

		<!-- Purchase buttons will go here -->
		<div class="purchase-options">
			<!-- Primary Amazon option -->
			<div class="primary-purchase">
				<a
					href="https://www.amazon.com/dp/B0FD6VKZ9K"
					target="_blank"
					rel="noopener noreferrer"
					class="amazon-button"
				>
					<span class="amazon-text">📦 Buy on Amazon</span>
				</a>
			</div>

			<!-- Alternative payment methods -->
			<div class="alternative-label">Or pay directly:</div>
			<div class="button-grid">
				<a
					href="https://venmo.com/CodesAgainstAcademy?txn=pay&amount=25&note=Card Deck - (include shipping address)"
					target="_blank"
					rel="noopener noreferrer"
					class="payment-button venmo">Venmo</a
				>
				<a
					href="https://paypal.me/JoshuaLake/25"
					target="_blank"
					rel="noopener noreferrer"
					class="payment-button paypal">PayPal</a
				>
				<div class="price-circle">
					<span class="price">$25</span>
					<span class="each">EACH</span>
				</div>
				<a
					href="https://cash.app/$rootlake"
					target="_blank"
					rel="noopener noreferrer"
					class="payment-button cashapp">Cash App</a
				>
				<a
					href="mailto:jlake@pomfret.org?subject=Codes%20Deck%20Order&body=I'm%20sending%20a%20check%20for%20%2425%20(per%20deck)%20to%20you%20at%3A%0A%0AJosh%20Lake%0APomfret%20School%0A398%20Pomfret%20Street%0APomfret%20CT%2006258%0A%0APlease%20send%20my%20deck%20to%3A%0A%5BYour%20Name%20and%20Shipping%20Address%20Here%5D"
					class="payment-button mail">Via Mail</a
				>
			</div>
		</div>
	</div>
	<div class="bottom-elements">
		<img src="{base}/minilogo.png" alt="CAA Logo" class="logo" />
		<span class="category">Purchase</span>
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
		padding: 0.2rem 0; /* Further reduce top padding */
		gap: 0.4rem; /* Keep reduced gap */
	}
	h1 {
		margin-bottom: 0; /* Adjust spacing with gap */
		font-weight: bold;
		font-size: clamp(16px, 6cqw, 24px); /* Match home page title size */
		line-height: 1.3; /* Match home page line-height */
		text-align: center; /* Ensure centered */
	}

	/* Desktop text sizing - smaller for fixed card size */
	@media (min-width: 1024px) {
		h1 {
			font-size: 18px; /* Fixed size for 400px card */
		}
	}

	.description {
		font-size: clamp(13px, 3.2cqw, 14px); /* Further reduced to fit content */
		margin-bottom: 0;
		line-height: 1.2;
		text-align: center;
		margin-bottom: 0.75rem; /* Slightly reduced space before buttons */
	}

	/* Desktop description sizing - smaller for fixed card size */
	@media (min-width: 1024px) {
		.description {
			font-size: 14px; /* Fixed size for 400px card */
		}
	}

	/* Purchase specific styles */
	.purchase-options {
		display: flex;
		flex-direction: column;
		padding: 0 0.5rem;
		flex-grow: 1;
		justify-content: flex-start;
		gap: 0.25rem;
	}

	.button-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 1rem;
		position: relative;
	}

	.price-circle {
		width: 80px;
		height: 80px;
		background-color: white;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}

	.price {
		font-size: 2rem;
		font-weight: bold;
		color: black;
		line-height: 1;
		margin-bottom: 2px;
	}

	.each {
		font-size: 0.6rem;
		color: black;
		font-weight: 500;
	}

	/* Primary Amazon button */
	.primary-purchase {
		margin-bottom: 0.75rem;
	}

	.amazon-button {
		display: block;
		background-color: #ff9900;
		color: #232f3e;
		padding: 0.7rem;
		border-radius: 8px;
		text-decoration: none;
		text-align: center;
		transition: background-color 0.2s;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.amazon-button:hover {
		background-color: #ff8800;
	}

	.amazon-text {
		font-size: 1rem;
		font-weight: bold;
	}

	.alternative-label {
		text-align: center;
		font-size: 0.8rem;
		color: #555;
		margin-bottom: 0.5rem;
		font-style: italic;
	}

	.payment-button {
		background-color: white;
		color: black;
		padding: 0.8rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: bold;
		text-align: center;
		transition: background-color 0.2s;
	}

	.payment-button:hover {
		background-color: #f0f0f0;
	}

	.payment-button.venmo {
		background-color: #3d95ce;
		color: white;
	}

	.payment-button.venmo:hover {
		background-color: #3788bd;
	}

	.payment-button.paypal {
		background-color: #ffb800;
		color: #253b80;
		font-weight: 700;
	}

	.payment-button.paypal:hover {
		background-color: #f2ae00;
	}

	.payment-button.cashapp {
		background-color: #00d632;
		color: white;
	}

	.payment-button.cashapp:hover {
		background-color: #00c02e;
	}

	.payment-button.mail {
		background-color: #8b0000;
		color: white;
	}

	.payment-button.mail:hover {
		background-color: #700000;
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
