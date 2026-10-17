<script lang="ts">
	import { base } from '$app/paths';

	/** Live Payment Links (Stripe). */
	const STRIPE = {
		single: 'https://buy.stripe.com/eVq14o80CdK2dvWgRo2Ji00',
		pack10: 'https://buy.stripe.com/5kQ28sa8KbBUeA0at02Ji01'
	};
</script>

<div class="static-content-card">
	<div class="content-inner">
		<h1>Purchase a Real Deck!</h1>
		<p class="description">
			Order your own physical box of <br /><strong>Codes Against Academy</strong>
			here. It's perfect for classrooms, workshops, and discussions, basically an "Engaging
			Faculty Meeting in a Box." The <strong>2026 edition</strong> holds 100 Scenario cards, 7
			Tier List cards, and rules including Spot the AI.
		</p>

		<div class="purchase-options">
			<div class="alternative-label">Pay with card or other:</div>
			<div class="button-grid">
				<a
					href={STRIPE.single}
					target="_blank"
					rel="noopener noreferrer"
					class="payment-button stripe">Stripe</a
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
					href="https://venmo.com/CodesAgainstAcademy?txn=pay&amount=25&note=Card Deck - (include shipping address)"
					target="_blank"
					rel="noopener noreferrer"
					class="payment-button venmo">Venmo</a
				>
				<a
					href="mailto:jlake@pomfret.org?subject=Codes%20Deck%20Order&body=I'm%20sending%20a%20check%20for%20%2425%20(per%20deck)%20to%20you%20at%3A%0A%0AJosh%20Lake%0APomfret%20School%0A398%20Pomfret%20Street%0APomfret%20CT%2006258%0A%0APlease%20send%20my%20deck%20to%3A%0A%5BYour%20Name%20and%20Shipping%20Address%20Here%5D"
					class="payment-button mail">Via Mail</a
				>
			</div>

			<a
				href={STRIPE.pack10}
				target="_blank"
				rel="noopener noreferrer"
				class="pack-button"
			>
				<span class="pack-title">Faculty Meeting in a Box</span>
				<span class="pack-sub">10 Pack · pay for 9 · $225</span>
			</a>

			<a
				href="https://www.amazon.com/dp/B0FD6VKZ9K"
				target="_blank"
				rel="noopener noreferrer"
				class="amazon-button"
			>
				<span class="amazon-text">Buy on Amazon</span>
			</a>
		</div>
	</div>
	<div class="bottom-elements">
		<img src="{base}/minilogo.png" alt="CAA Logo" class="logo" />
		<span class="category">Purchase</span>
	</div>
</div>

<style>
	.static-content-card {
		width: 100%;
		max-width: 320px;
		aspect-ratio: 2.5 / 3.5;
		margin: 0 auto;
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

	@media (min-width: 1024px) {
		.static-content-card {
			width: 400px;
			height: 555px;
			max-width: none;
			aspect-ratio: auto;
			padding: 40px;
			border-radius: 25px;
			box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
		}
	}

	.content-inner {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		text-align: center;
		overflow: hidden;
		padding: 0.1rem 0;
		gap: 0.3rem;
		min-height: 0;
	}

	h1 {
		margin-bottom: 0;
		font-weight: bold;
		font-size: clamp(15px, 5.8cqw, 22px);
		line-height: 1.2;
		text-align: center;
	}

	@media (min-width: 1024px) {
		h1 {
			font-size: 24px;
		}
	}

	.description {
		font-size: clamp(12px, 3.2cqw, 14px);
		line-height: 1.15;
		text-align: center;
		margin-bottom: 0.35rem;
		font-weight: bold;
	}

	@media (min-width: 1024px) {
		.description {
			font-size: 15px;
		}
	}

	.purchase-options {
		display: flex;
		flex-direction: column;
		padding: 0 0.35rem;
		flex-grow: 1;
		justify-content: flex-start;
		gap: 0.35rem;
		min-height: 0;
	}

	.alternative-label {
		text-align: center;
		font-size: 0.75rem;
		color: #555;
		font-style: italic;
	}

	.button-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 0.65rem;
		position: relative;
	}

	.price-circle {
		width: 72px;
		height: 72px;
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
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	}

	.price {
		font-size: 1.65rem;
		font-weight: bold;
		color: black;
		line-height: 1;
		margin-bottom: 2px;
	}

	.each {
		font-size: 0.55rem;
		color: black;
		font-weight: 500;
	}

	@media (min-width: 1024px) {
		.button-grid {
			gap: 1rem;
		}
		.price-circle {
			width: 80px;
			height: 80px;
		}
		.price {
			font-size: 2rem;
		}
		.each {
			font-size: 0.6rem;
		}
	}

	.payment-button {
		background-color: white;
		color: black;
		padding: 0.55rem 0.4rem;
		border: none;
		border-radius: 8px;
		text-decoration: none;
		font-weight: bold;
		font-size: 0.85rem;
		text-align: center;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.28);
		transition: background-color 0.2s, box-shadow 0.15s;
	}

	.payment-button:hover {
		filter: brightness(0.95);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.32);
	}

	.payment-button.stripe {
		background-color: #635bff;
		color: white;
	}

	.payment-button.stripe:hover {
		background-color: #4b45c6;
	}

	.payment-button.venmo {
		background-color: #3d95ce;
		color: white;
	}

	.payment-button.paypal {
		background-color: #ffb800;
		color: #253b80;
	}

	.payment-button.mail {
		background-color: #8b0000;
		color: white;
	}

	.pack-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1rem;
		margin-top: 0.15rem;
		padding: 0.45rem 0.6rem;
		border: none;
		border-radius: 8px;
		text-decoration: none;
		background: #0d9488;
		color: #fff;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.28);
		transition: background-color 0.15s, box-shadow 0.15s;
	}
	.pack-button:hover {
		background: #0f766e;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.32);
	}
	.pack-title {
		font-size: 0.82rem;
		font-weight: 800;
		line-height: 1.2;
		color: #fff;
	}
	.pack-sub {
		font-size: 0.68rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.92);
	}

	.amazon-button {
		display: block;
		background-color: #ff9900;
		color: #232f3e;
		padding: 0.5rem 0.65rem;
		border: none;
		border-radius: 8px;
		text-decoration: none;
		text-align: center;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.28);
		transition: background-color 0.2s, box-shadow 0.15s;
	}
	.amazon-button:hover {
		background-color: #ff8800;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.32);
	}
	.amazon-text {
		font-size: 0.88rem;
		font-weight: bold;
	}

	@media (min-width: 1024px) {
		.payment-button {
			padding: 0.75rem;
			font-size: 0.95rem;
		}
		.pack-button {
			padding: 0.55rem 0.75rem;
		}
		.pack-title {
			font-size: 0.95rem;
		}
		.pack-sub {
			font-size: 0.75rem;
		}
		.amazon-button {
			padding: 0.65rem 0.75rem;
		}
		.amazon-text {
			font-size: 1rem;
		}
	}

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
	}
</style>
