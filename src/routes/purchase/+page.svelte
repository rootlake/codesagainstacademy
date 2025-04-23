<script lang="ts">
	// Purchase logic (e.g., Stripe integration) will eventually go here
</script>

<div class="static-content-card">
    <div class="content-inner">
        <h1>Purchase</h1>
        <p class="description">
            Get your own physical deck of Codes Against Academy cards!
            Perfect for classrooms, workshops, and discussions.
        </p>
         <p class="price">Price: $XX.XX</p> <!-- Placeholder Price -->
        <p>
             <a href="https://codesagainstacademy.com/" target="_blank" rel="noopener noreferrer" class="purchase-button">
                 Order Now (External Link)
             </a>
        </p>
        <p class="small-text">
            <em>(Link will eventually integrate with Stripe or similar)</em>
        </p>
    </div>
    <div class="bottom-elements">
        <img src="/minilogo.png" alt="CAA Logo" class="logo"/>
        <span class="category">Purchase</span>
    </div>
</div>

<style>
    /* Card structure styles (copied from home page) */
    .static-content-card {
        width: 100%;
        max-width: 320px;
        aspect-ratio: 2.5 / 3.5;
        margin: 1rem auto;
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
        justify-content: flex-start; /* Align top */
        text-align: center;
        overflow-y: auto;
        margin-bottom: 5px;
    }
    h1 {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        font-weight: bold;
        font-size: clamp(20px, 7cqw, 32px);
    }
    .description {
        font-weight: bold;
        font-size: clamp(14px, 4cqw, 18px);
        margin-bottom: 1rem;
        line-height: 1.3;
    }

    /* Purchase specific styles */
    .price {
        font-size: clamp(16px, 5cqw, 22px);
        font-weight: bold;
        margin: 1rem 0;
    }
    .purchase-button {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        background-color: #4CAF50; /* Green */
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: clamp(14px, 4.5cqw, 20px);
        margin: 0.5rem 0;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    .purchase-button:hover {
        background-color: #45a049;
    }
    .small-text {
        font-size: clamp(10px, 3cqw, 12px);
        font-weight: normal;
        font-style: italic;
        color: #333;
        margin-top: 1rem;
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