<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Business information — Codes Against Academy</title>
	<meta
		name="description"
		content="Codes Against Academy, operated by Joshua Lake, sells a physical AI-ethics card deck for schools. The full digital companion unlocks with a donation (suggested $5)."
	/>
	<style>
		html,
		body {
			overflow: auto !important;
			position: static !important;
			width: 100% !important;
			height: auto !important;
			min-height: 100% !important;
			touch-action: auto !important;
		}
	</style>
</svelte:head>

<article class="sheet">
	<p class="eyebrow">Codes Against Academy</p>
	<h1>Business information</h1>
	<p class="lede">
		<strong>Codes Against Academy</strong> is a physical card game about AI and ethics in schools,
		operated by <strong>Joshua Lake</strong> in Pomfret, Connecticut. This page is the public
		record of what we sell and how orders, refunds, and cancellations work.
	</p>

	<section>
		<h2>What we sell</h2>
		<p>
			The product is the physical deck: a printed discussion game for faculty meetings, classrooms,
			and workshops. The site lets you try a sample of the digital companion. The full digital
			companion can be unlocked with a donation (suggested: $5). That donation is a tip to keep the
			site running, not a separate product, and there is no subscription.
		</p>
		<ul>
			<li>
				<strong>Single deck — $25.</strong> 2026 edition. 100 scenario cards, 7 tier cards (S
				through F), and rules, including Spot the AI. Sold on the
				<a href="{base}/purchase/">purchase page</a> as “Codes Against Academy — Single Deck.”
			</li>
			<li>
				<strong>Faculty Meeting Pack — $225.</strong> Ten of the same decks. You pay for nine at
				the $25 list price and the tenth deck is free. Sold on the purchase page as “Codes
				Against Academy — Faculty Meeting Pack (10).”
			</li>
			<li>
				<strong>In person — $21 by card, $20 cash.</strong> Conference and faculty-visit price
				for one deck. Not offered on the website.
			</li>
			<li>
				<strong>Amazon.</strong> The same deck is listed on Amazon. Amazon’s price, shipping, and
				returns apply to those orders, not the terms below.
			</li>
		</ul>
	</section>

	<section>
		<h2>Customer service</h2>
		<p>Questions about an order, a damaged deck, or a school invoice:</p>
		<address>
			Joshua Lake<br />
			Codes Against Academy<br />
			398 Pomfret Street<br />
			Pomfret, CT 06258<br />
			United States<br />
			<a href="mailto:josh@codesagainstacademy.com">josh@codesagainstacademy.com</a>
		</address>
		<p>
			Email is the way to reach us. We aim to reply within two business days. You can also use the
			<a href="{base}/contact/">contact page</a>.
		</p>
	</section>

	<section>
		<h2>Shipping</h2>
		<p>Shipping is calculated at the time of order.</p>
	</section>

	<section>
		<h2>Returns</h2>
		<p>
			Email <a href="mailto:josh@codesagainstacademy.com">josh@codesagainstacademy.com</a> within 30 days of delivery if
			you want to send a deck back. Wait for a reply before you ship anything.
		</p>
		<ul>
			<li>
				<strong>Unopened decks</strong> can be returned within 30 days of delivery for a refund of
				the deck price. You pay return shipping.
			</li>
			<li>
				<strong>Damaged, defective, or wrong items</strong> are replaced or refunded in full,
				including the shipping you paid. Email within 7 days of delivery and include a photo.
			</li>
			<li>
				<strong>Opened decks</strong> that were used in a meeting or class are not returnable,
				unless they arrived damaged or defective.
			</li>
		</ul>
		<p>Return packages go to the Pomfret address above, after we confirm the return by email.</p>
	</section>

	<section>
		<h2>Refunds and disputes</h2>
		<p>
			Approved refunds go back to the original payment method: the card you used at checkout,
			PayPal, Venmo, or a check. We send the refund within 5 business days of approving it. Card
			refunds then follow your bank’s posting time.
		</p>
		<p>
			If something is wrong with an order, email us before you file a dispute with your card
			issuer. If a dispute is opened, we respond through the payment processor with the order
			record, the shipping details, and this policy.
		</p>
	</section>

	<section>
		<h2>Cancellation</h2>
		<p>
			There is nothing to cancel on a schedule. Deck orders are not subscriptions, and neither is the
			digital donation. You can cancel a deck order for a full refund any time before it ships.
			Email <a href="mailto:josh@codesagainstacademy.com">josh@codesagainstacademy.com</a> with your
			name and the amount you paid. After the deck ships, the return policy above applies.
		</p>
	</section>

	<section>
		<h2>Promotions</h2>
		<p>
			The only public offer is the Faculty Meeting Pack: ten decks for $225, which is nine decks
			at the $25 list price plus one deck free. The free deck ships in the same box. It is not
			cash, not store credit, and not a code you can reuse. It applies only to that ten-deck pack.
		</p>
		<p>
			Any other discount is written on a specific invoice and applies only to that invoice. Offers
			do not combine unless the invoice says they do.
		</p>
	</section>

	<p class="updated">Updated October 24, 2026.</p>
</article>

<style>
	.sheet {
		width: 100%;
		max-width: 40rem;
		margin: 0 auto 2rem;
		padding: 1.35rem 1.2rem 1.5rem;
		box-sizing: border-box;
		background: linear-gradient(to bottom, #d5d6d8, #b4b6b8);
		border-radius: 16px;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.28);
		color: #111;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		text-align: left;
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0 0 0.75rem;
		font-size: 1.65rem;
		line-height: 1.15;
		font-weight: 800;
	}

	.lede,
	p,
	li {
		font-size: 0.98rem;
		line-height: 1.45;
	}

	.lede {
		margin: 0 0 1.25rem;
	}

	section {
		margin: 0 0 1.15rem;
		padding-top: 0.85rem;
		border-top: 1px solid #8d8f91;
	}

	h2 {
		margin: 0 0 0.4rem;
		font-size: 1.05rem;
		line-height: 1.2;
	}

	p {
		margin: 0 0 0.65rem;
	}

	ul {
		margin: 0 0 0.65rem;
		padding-left: 1.15rem;
	}

	li {
		margin: 0 0 0.45rem;
	}

	li:last-child,
	p:last-child {
		margin-bottom: 0;
	}

	address {
		margin: 0 0 0.65rem;
		font-style: normal;
		font-size: 0.98rem;
		line-height: 1.45;
	}

	a {
		color: #1a1a1a;
		font-weight: 700;
	}

	.updated {
		margin: 0.4rem 0 0;
		font-size: 0.8rem;
		font-style: italic;
		color: #333;
	}

	@media (min-width: 768px) {
		.sheet {
			padding: 2rem 2.1rem 1.75rem;
			border-radius: 22px;
		}

		h1 {
			font-size: 2rem;
		}
	}
</style>
