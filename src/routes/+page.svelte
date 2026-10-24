<script lang="ts">
    // Logic for the intro page, if any
    import { base } from '$app/paths';
</script>

<svelte:head>
    <title>Codes Against Academy</title>
    <meta
        name="description"
        content="Codes Against Academy is a physical AI-ethics card deck for schools, sold by Joshua Lake. Single deck $25. Faculty Meeting Pack $225."
    />
</svelte:head>

<div class="static-content-card">
    <div class="content-inner">
        <h1 class="title">Codes Against Academy</h1>
        <div class="kicker">AI &amp; Ethics in Education: A Discussion Game</div>

        <div class="description">This is the companion site for a physical deck of scenario cards about AI in school. Groups sort the cards and talk through the ethics of using these tools, or leaving them alone.</div>
    </div>
    <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="Codes Against Academy" class="logo"/>
    </div>
</div>

<p class="business-link"><a href="{base}/policies/">Business information</a></p>


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

    /* Desktop card sizing - match game card dimensions */
    @media (min-width: 1024px) {
        .static-content-card {
            width: 400px; /* Fixed width to match game card */
            height: 555px; /* Fixed height to match game card */
            max-width: none; /* Remove max-width constraint */
            aspect-ratio: auto; /* Let fixed dimensions control ratio */
            padding: 40px; /* More padding on desktop */
            border-radius: 25px; /* Larger border radius */
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); /* More prominent shadow */
        }
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
        line-height: 1.2;
        text-align: center;
        margin: 0;
        max-width: 100%;
    }

    .kicker {
        font-weight: bold;
        font-size: clamp(13px, 3.6cqw, 15px);
        line-height: 1.3;
        text-align: center;
    }

    /* Desktop text sizing - use more available space */
    @media (min-width: 1024px) {
        .title {
            font-size: 28px; /* Even larger size to use available space */
        }
        .kicker {
            font-size: 16px;
        }
    }

    .description {
        font-weight: bold;
        font-size: clamp(14px, 3.6cqw, 15px);
        line-height: 1.35;
        text-align: left;
        max-width: 100%;
        overflow-wrap: break-word;
    }

    /* Desktop description sizing - use more available space */
    @media (min-width: 1024px) {
        .description {
            font-size: 18px; /* Much larger size to use available space */
        }
    }

    .business-link {
        margin: 0.65rem 0 0;
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 0.8rem;
    }

    .business-link a {
        color: #1a1a1a;
        font-weight: 700;
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
