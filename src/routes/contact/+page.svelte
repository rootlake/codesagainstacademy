<script lang="ts">
	// Contact form submission logic will eventually go here
	// Could use SvelteKit form actions or an API route
	import { base } from '$app/paths';
</script>

<div class="static-content-card">
    <div class="content-inner">
        <h1>Contact the Creator</h1>
        <p class="description">
            Josh Lake has been teaching Science at Pomfret School (CT) for over 20 years. For 2025, he'll move on from Science Department Head to Director of Technological Innovation, helping students and campus adults use AI tools ethically and wisely.
        </p>
        <p class="description">
            Reach Josh at <a href="mailto:jlake@pomfret.org?subject=Codes%20Against%20Academy%20game" class="mailto-link">jlake@pomfret.org</a> with any questions or comments!
        </p>
        
    </div>
     <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="CAA Logo" class="logo"/>
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
        padding: 0.5rem 0; /* Reduce top padding */
        gap: 0.5rem; /* Reduce gap */
    }
    h1 {
        /* Remove margin-top */
        margin-bottom: 0; /* Adjust spacing with gap */
        font-weight: bold;
        font-size: clamp(16px, 6cqw, 24px); /* Match home page title size */
        line-height: 1.3; /* Match home page line-height */
        text-align: center; /* Ensure centered */
    }
    .description {
        font-weight: bold;
        font-size: clamp(18px, 4cqw, 18px);
        margin-bottom: 0; /* Adjust spacing with gap */
        line-height: 1.3;
    }

    .mailto-link {
        color: #444444; /* Dark gray */
        text-decoration: underline;
    }

    /* Form specific styles */
    form {
        margin-top: 0; /* Rely on gap */
        width: 100%;
        text-align: left;
    }
    label {
        display: block;
        margin-bottom: 0.1rem; /* Reduce space */
        font-weight: bold;
        font-size: clamp(12px, 3.5cqw, 14px);
    }
    textarea,
    input[type="text"],
    input[type="email"] {
        width: 100%;
        padding: 0.4rem; /* Reduce padding */
        margin-bottom: 0.25rem; /* Reduce space */
        border: 1px solid #555;
        border-radius: 4px;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        font-weight: normal;
        font-size: clamp(12px, 3.5cqw, 14px);
    }
    /* Specific height for message textarea */
    textarea#message {
        height: 60px; /* Reduce height */
        resize: vertical;
    }
    button {
        padding: 0.5rem 1rem; /* Reduce padding */
        background-color: #444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: clamp(13px, 4cqw, 15px); /* Reduce font size */
        display: block;
        width: 100%;
        margin-top: 0.25rem; /* Reduce space */
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