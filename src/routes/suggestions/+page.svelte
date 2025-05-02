<script lang="ts">
	// Suggestions form submission logic will eventually go here
	// Could use SvelteKit form actions or an API route
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
    <div class="content-inner">
        <h1>Suggest</h1>
        <p class="description">
            Have an idea for a new scenario card? Let us know!
        </p>
        <form>
            <label for="suggestion">Scenario:</label><br>
            <textarea id="suggestion" name="suggestion" rows="4" placeholder="Enter scenario details..."></textarea><br><br>

            <label for="category">Category (optional):</label><br>
            <input type="text" id="category" name="category" placeholder="Images, Text, Learning..."><br><br>

            <button type="submit">Submit Suggestion</button>
        </form>
    </div>
    <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="CAA Logo" class="logo"/>
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
        padding: 1rem 0; /* Match home page */
        gap: 0.5rem; /* Use gap for spacing */
    }
    h1 {
        /* Remove margin-top */
        margin-bottom: 0; /* Adjust spacing with gap */
        font-weight: bold;
        font-size: clamp(20px, 7cqw, 32px);
    }
    .description {
        font-weight: bold;
        font-size: clamp(14px, 4cqw, 18px);
        margin-bottom: 0; /* Adjust spacing with gap */
        line-height: 1.3;
    }

    /* Form specific styles */
    form {
        margin-top: 0; /* Adjust spacing with gap */
        width: 100%; /* Form takes full width */
        text-align: left;
    }
    label {
        display: block;
        margin-bottom: 0.25rem;
        font-weight: bold;
        font-size: clamp(12px, 3.5cqw, 14px);
    }
    textarea,
    input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 0.5rem; /* Reduced margin */
        border: 1px solid #555;
        border-radius: 4px;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        font-weight: normal;
        font-size: clamp(12px, 3.5cqw, 14px);
    }
    button {
        padding: 0.6rem 1.2rem; /* Slightly smaller button */
        background-color: #444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: clamp(14px, 4cqw, 16px);
        display: block;
        width: 100%;
        margin-top: 0.5rem;
        font-family: Arial, sans-serif;
        font-weight: bold;
    }
    button:hover {
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