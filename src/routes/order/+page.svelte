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
			href: 'https://buy.stripe.com/14A28s0ya9tMeA0dFc2Ji0t'
		}
	];

	const venmo =
		'https://venmo.com/CodesAgainstAcademy?txn=pay&note=Codes%20decks%20%E2%80%94%20pack%20and%20shipping%20address';
	const paypal = 'https://paypal.me/JoshuaLake';

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
	<title>Order Codes Decks — Codes Against Academy</title>
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
		<h1>Order Codes Decks</h1>
		<p class="stripe">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 214" role="img" aria-label="Stripe">
				<path
					fill="#635BFF"
					d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"
				/>
			</svg>
		</p>
		<ul class="tiers" aria-hidden="true">
			{#each tiers as tier (tier.id)}
				<li style:background={tier.color}>{tier.id}</li>
			{/each}
		</ul>
		<ul class="orders">
			{#each orders as order (order.id)}
				<li>
					<a href={order.href}>
						<span class="copy">
							<span class="name">{order.name}</span>
							<span class="detail">{order.detail}</span>
						</span>
						<span class="amount">{order.amount}</span>
					</a>
				</li>
			{/each}
		</ul>
		<div class="methods">
			<a class="method venmo" href={venmo} target="_blank" rel="noopener noreferrer">Venmo</a>
			<a class="method paypal" href={paypal} target="_blank" rel="noopener noreferrer">PayPal</a>
		</div>
		<p class="hint">On Venmo or PayPal, name the pack and a mailing address.</p>
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
		margin: 0 0 0.45rem;
		font-size: 1.65rem;
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
		padding: 0.4rem 0.15rem;
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
		border: 1px solid #8e9092;
		border-radius: 12px;
		background: linear-gradient(to bottom, #b8b9bb, #c8c9cb);
		box-shadow: 0 3px 0 #8e9092;
	}

	.orders li:nth-child(2) a {
		border-color: #96989a;
		background: linear-gradient(to bottom, #c0c1c3, #d0d1d3);
		box-shadow: 0 3px 0 #96989a;
	}

	.orders li:nth-child(3) a {
		border-color: #9ea0a2;
		background: linear-gradient(to bottom, #c8c9cb, #d8d9db);
		box-shadow: 0 3px 0 #9ea0a2;
	}

	.orders li:nth-child(4) a {
		border-color: #a6a8aa;
		background: linear-gradient(to bottom, #d0d1d3, #e0e1e3);
		box-shadow:
			0 0 14px 3px rgba(255, 255, 255, 0.55),
			0 3px 0 #a6a8aa;
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

	.methods {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.55rem;
		margin-top: 0.85rem;
	}

	.stripe {
		display: flex;
		justify-content: center;
		margin: 0 0 0.85rem;
	}

	.stripe svg {
		height: 28px;
		width: auto;
	}

	.method {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 700;
		font-size: 1rem;
	}

	.method:focus-visible {
		outline: 3px solid #000;
		outline-offset: 2px;
	}

	.venmo {
		background: #3d95ce;
		color: #fff;
		box-shadow: 0 3px 0 #2a6f99;
	}

	.paypal {
		background: #ffc439;
		color: #111;
		box-shadow: 0 3px 0 #c69216;
	}

	.hint {
		margin: 0.65rem 0 0;
		text-align: center;
		font-size: 0.85rem;
		line-height: 1.35;
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
			box-shadow: 0 1px 0 #8e9092;
		}

		.orders li:nth-child(2) a:active {
			box-shadow: 0 1px 0 #96989a;
		}

		.orders li:nth-child(3) a:active {
			box-shadow: 0 1px 0 #9ea0a2;
		}

		.orders li:nth-child(4) a:active {
			box-shadow:
				0 0 10px 2px rgba(255, 255, 255, 0.4),
				0 1px 0 #a6a8aa;
		}

		.method:active {
			transform: translateY(2px);
		}

		.venmo:active {
			box-shadow: 0 1px 0 #2a6f99;
		}

		.paypal:active {
			box-shadow: 0 1px 0 #c69216;
		}
	}
</style>
