<script lang="ts">
    // Logic for the intro page, if any
    import { base } from '$app/paths';
</script>

<div class="static-content-card">
    <div class="content-inner">
        <div class="title">AI & Ethics in Education:
A Discussion Game</div>

        <div class="description">This is the companion site for a physical deck of Scenario cards centered around the use of AI tools in high school and other educational settings. It allows groups to collaboratively unpack and analyze the ethical considerations when using (or choosing to avoid) these powerful new technology tools.</div>
    </div>
    <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="CAA Logo" class="logo"/>
        <!-- Category removed or set appropriately -->
        <!-- <span class="category">Home</span> -->
    </div>
</div>


<style>
    .static-content-card {
        width: 100%;
        max-width: 320px;
        aspect-ratio: 2.5 / 3.5;
        margin: 0 auto;
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
        gap: 1rem;
        padding: 1rem 0;
    }

    .title {
        font-weight: bold;
        font-size: clamp(16px, 6cqw, 24px);
        line-height: 1.3;
        text-align: center;
        white-space: pre-wrap;
        max-width: 100%;
    }

    .description {
        font-weight: bold;
        font-size: clamp(18px, 4cqw, 16px);
        line-height: 1.4;
        text-align: left;
        max-width: 100%;
        overflow-wrap: break-word;
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

</style>
