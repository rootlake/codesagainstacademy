<script lang="ts">
	// Purchase logic (e.g., Stripe integration) will eventually go here
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
    <div class="content-inner">
        <h1>Purchase a Real Deck!</h1>
        <p class="description">
            Get your own physical box of Codes Against Academy here.
            <br>It's perfect for classrooms, workshops, and discussions, basically an "Engaging Faculty Meeting in a Box."
            The deck contains 75 Scenario cards, 25 Reaction cards, the colorful Tier List, and instructions for all three game modes.
        </p>
         
        <p>
             <a href="https://www.shop.pomfretschool.org/new-products-73/p/codes-against-academy" target="_blank" rel="noopener noreferrer" class="purchase-button">
                $25 (shipping included)
             </a>
        </p>
        <p class="small-text">
            <em>Ships from Pomfret School Store</em>
        </p>
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
        font-weight: bold;
        font-size: clamp(18px, 4.2cqw, 18px);
        margin-bottom: 0;
        line-height: 1.25;
        text-align: center;
    }

    /* Purchase specific styles */
    .purchase-button {
        display: inline-block;
        padding: 0.6rem 1.2rem; /* Slightly smaller */
        background-color: #4CAF50; /* Green */
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: clamp(14px, 4.5cqw, 18px); /* Slightly smaller */
        margin: 0.25rem 0; /* Reduce margin */
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    .purchase-button:hover {
        background-color: #45a049;
    }
    .small-text {
        font-size: clamp(14px, 3cqw, 12px);
        font-weight: normal;
        font-style: italic;
        color: #333;
        margin-top: -1rem; /* Reduce margin */
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