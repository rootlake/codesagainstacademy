<script lang="ts">
	// Purchase logic (e.g., Stripe integration) will eventually go here
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
    <div class="content-inner">
        <h1>Purchase a Real Deck!</h1>
        <p class="description">
            Get your own physical box of <strong>Codes Against Academy</strong>
            here. It's perfect for classrooms, workshops, and discussions, basically an "Engaging Faculty Meeting in a Box."
            The deck contains 75 Scenario cards, 25 Reaction cards, the colorful Tier List, and instructions for all three game modes.
        </p>
         
        <!-- Purchase buttons will go here -->
        <div class="purchase-options">
            <div class="button-grid">
                <a href="https://venmo.com/CodesAgainstAcademy?txn=pay&amount=20&note=Card+Deck+-+(include+your+name+and+mailing+address+or+email+here)" target="_blank" rel="noopener noreferrer" class="payment-button venmo">Venmo</a>
                <a href="https://paypal.me/JoshuaLake/20" target="_blank" rel="noopener noreferrer" class="payment-button paypal">PayPal</a>
                <div class="price-circle">
                    <span class="price">$20</span>
                </div>
                <a href="https://cash.app/$rootlake" target="_blank" rel="noopener noreferrer" class="payment-button cashapp">Cash App</a>
                <a href="mailto:jlake@pomfret.org?subject=Codes%20Deck%20Order&body=I'm%20sending%20a%20check%20for%20%2420%20(per%20deck)%20to%20you%20at%3A%0A%0AJosh%20Lake%0APomfret%20School%0A398%20Pomfret%20Street%0APomfret%20CT%2006258%0A%0APlease%20send%20my%20deck%20to%3A%0A%5BYour%20Name%20and%20Shipping%20Address%20Here%5D" class="payment-button mail">Via Mail</a>
            </div>
        </div>
    </div>
    <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="CAA Logo" class="logo"/>
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
        background: linear-gradient(to bottom, #C6C7C9, #888A8C);
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
    .description {
        font-size: clamp(14px, 3.8cqw, 16px); /* Reduced from 18px */
        margin-bottom: 0;
        line-height: 1.25;
        text-align: center;
        margin-bottom: 1rem; /* Add space before buttons */
    }

    /* Purchase specific styles */
    .purchase-options {
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        flex-grow: 1;
        justify-content: center;
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
        background-color: #3D95CE;
        color: white;
    }

    .payment-button.venmo:hover {
        background-color: #3788BD;
    }

    .payment-button.paypal {
        background-color: #FFB800;
        color: #253B80;
        font-weight: 700;
    }

    .payment-button.paypal:hover {
        background-color: #F2AE00;
    }

    .payment-button.cashapp {
        background-color: #00D632;
        color: white;
    }

    .payment-button.cashapp:hover {
        background-color: #00C02E;
    }

    .payment-button.mail {
        background-color: #8B0000;
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