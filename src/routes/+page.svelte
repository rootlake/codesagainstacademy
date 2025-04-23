<script lang="ts">
    // Logic for the intro page, if any
</script>

<div class="static-content-card">
    <div class="content-inner">
        <!-- Removed H1, using logo header from layout -->
        <h2>AI and Ethics in Education<br>A Game & Discussion Starter</h2>

        <p class="description">
            This is the companion site for a physical deck of Scenario cards centered around the use of AI tools in high school and other educational settings. It allows groups to collaboratively unpack and analyze the ethical considerations when using (or choosing to avoid) these powerful new technology tools.
        </p>

        <img src="/3dcardbox.png" alt="Codes Against Academy 3D Box" class="box-image" />

        <!-- Navigation links removed, handled by footer nav -->
    </div>
    <div class="bottom-elements">
        <img src="/minilogo.png" alt="CAA Logo" class="logo"/>
        <!-- Category removed or set appropriately -->
        <!-- <span class="category">Home</span> -->
    </div>
</div>

<style>
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
        /* Justify content towards top */
        justify-content: flex-start;
        text-align: center;
        overflow-y: auto;
        margin-bottom: 5px;
    }

    h2 {
        margin-top: 0.5rem; /* Add some space below logo */
        margin-bottom: 1rem;
        font-weight: bold;
        font-size: clamp(16px, 5cqw, 24px); /* Adjust size */
        line-height: 1.2;
    }

    .description {
        font-weight: bold;
        font-size: clamp(12px, 3.5cqw, 16px); /* Adjust size */
        margin-bottom: 1rem;
        text-align: left; /* Align description left */
        line-height: 1.4;
    }

    .box-image {
        display: block;
        width: 80%; /* Adjust size as needed */
        max-width: 200px;
        height: auto;
        margin: 1rem auto; /* Center image and add spacing */
    }

    /* Navigation styles removed */

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
    /* Category style removed as it's not used here */
    /* .category { ... } */
</style>
