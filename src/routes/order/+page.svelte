<script lang="ts">
	import { page } from '$app/stores';

	let thanks = $state(false);

	$effect(() => {
		thanks = $page.url.searchParams.get('thanks') === '1';
	});

	/** Live Payment Links. Shipping is a separate Stripe rate, collected at checkout. */
	const orders = [
		{
			id: 'one',
			name: 'Single Deck',
			detail: 'shipping $8',
			amount: '$25',
			href: 'https://buy.stripe.com/eVqdRabcO6hA63ueJg2Ji0q'
		},
		{
			id: 'share',
			name: 'Sharing Pack',
			detail: '3 decks, two to share · shipping $12',
			amount: '$70',
			href: 'https://buy.stripe.com/3cI8wQ1CeaxQgI89oW2Ji0r'
		},
		{
			id: 'dept',
			name: 'Department Pack',
			detail: '5 decks · shipping $16',
			amount: '$115',
			href: 'https://buy.stripe.com/aFa8wQ0ya9tM9fG6cK2Ji0s'
		},
		{
			id: 'faculty',
			name: 'Faculty Meeting Pack',
			detail: '10 decks, 10th is free · shipping $18',
			amount: '$225',
			href: 'https://buy.stripe.com/14A28s0ya9tMeA0dFc2Ji0t',
			deal: true
		}
	];

	const tiers = [
		{ id: 'S', color: '#e07875' },
		{ id: 'A', color: '#f2b770' },
		{ id: 'B', color: '#faef85' },
		{ id: 'C', color: '#9bd187' },
		{ id: 'D', color: '#94b8e8' },
		{ id: 'E', color: '#787ab5' },
		{ id: 'F', color: '#c086b5' }
	];
</script>

<svelte:head>
	<title>Order decks — Codes Against Academy</title>
	<meta
		name="description"
		content="Order Codes Against Academy decks. We mail them to your school."
	/>
</svelte:head>

<div class="sheet">
	{#if thanks}
		<h1>Paid</h1>
		<p class="lead">We’ll mail the decks to the address you entered. Stripe has your receipt.</p>
		<a class="again" href="/order">Order another</a>
	{:else}
		<h1>Order decks</h1>
		<ul class="tiers" aria-hidden="true">
			{#each tiers as tier (tier.id)}
				<li style:background={tier.color}>{tier.id}</li>
			{/each}
		</ul>
		<ul class="orders">
			{#each orders as order (order.id)}
				<li>
					<a class:deal={order.deal} href={order.href}>
						<span class="copy">
							<span class="name">{order.name}</span>
							<span class="detail">{order.detail}</span>
						</span>
						<span class="amount">{order.amount}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
	<p class="mail"><a href="mailto:josh@codesagainstacademy.com">josh@codesagainstacademy.com</a></p>
</div>

<style>
	.sheet {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0 2rem;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		color: #000;
	}

	h1 {
		margin: 0 0 0.9rem;
		font-size: 1.85rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		text-align: center;
	}

	.lead {
		margin: 0.4rem 0 0.9rem;
		text-align: center;
		font-size: 1rem;
		line-height: 1.35;
	}

	.tiers {
		list-style: none;
		display: flex;
		gap: 0.3rem;
		margin: 0 0 1rem;
		padding: 0;
	}

	.tiers li {
		flex: 1;
		height: 1.7rem;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		font-size: 0.85rem;
	}

	.orders {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.orders a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		text-align: left;
		text-decoration: none;
		color: inherit;
		padding: 0.9rem 0.95rem;
		border: 1px solid #6e7073;
		border-radius: 12px;
		background: linear-gradient(to bottom, #d5d6d8, #b4b6b8);
		box-shadow: 0 3px 0 #6e7073;
	}

	.orders a.deal {
		background: #111;
		color: #fff;
		border-color: #111;
		box-shadow: 0 3px 0 #000;
	}

	.orders a:focus-visible {
		outline: 3px solid #000;
		outline-offset: 2px;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.name {
		font-weight: 700;
		font-size: 1.05rem;
		letter-spacing: -0.02em;
	}

	.detail {
		font-size: 0.85rem;
	}

	.amount {
		font-size: 1.55rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		white-space: nowrap;
	}

	.mail {
		margin: 0.9rem 0 0;
		text-align: center;
		font-size: 0.9rem;
		line-height: 1.35;
	}

	.mail a {
		color: inherit;
	}

	.again {
		display: block;
		margin: 0.5rem auto 0;
		width: fit-content;
		min-height: 44px;
		padding: 0.65rem 1.1rem;
		border-radius: 999px;
		border: 1px solid #111;
		background: #fff;
		color: #000;
		text-decoration: none;
		font-weight: 700;
	}

	@media (prefers-reduced-motion: no-preference) {
		.orders a:active {
			transform: translateY(2px);
			box-shadow: 0 1px 0 #6e7073;
		}

		.orders a.deal:active {
			box-shadow: 0 1px 0 #000;
		}
	}
</style>
