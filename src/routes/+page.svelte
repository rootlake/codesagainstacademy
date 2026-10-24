<script lang="ts">
    // Logic for the intro page, if any
    import { base } from '$app/paths';
</script>

<svelte:head>
    <title>Codes Against Academy</title>
    <meta
        name="description"
        content="Codes Against Academy is a deck of 100 scenarios involving AI usage in schools by teachers, students, and administrators."
    />
    <style>
        html, body {
            overflow: auto !important;
            position: static !important;
            height: auto !important;
            min-height: 100% !important;
            touch-action: auto !important;
        }
    </style>
</svelte:head>

<div class="static-content-card">
    <div class="content-inner">
        <p class="description"><strong>Codes Against Academy</strong> is a deck of 100 scenarios involving AI usage in schools by teachers, students, and administrators. Players explore the ethical space surrounding these situations as they discuss and debate where to rate the scenes on a Tier List.</p>
        <img class="deck" src="{base}/3dcardbox.png" alt="The Codes Against Academy deck box" />
        <p class="closing">This deck has helped hundreds of school communities have vital conversations about all the components of our ethical instincts: intention, reaction, individuals vs. groups, and the nature of the technology itself.</p>
        <p class="business-link"><a href="{base}/policies/">Business information</a></p>
    </div>
    <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="Codes Against Academy" class="logo"/>
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
        height: auto;
        aspect-ratio: auto;
    }

    /* Desktop card sizing - match game card width, grow with the writing */
    @media (min-width: 1024px) {
        .static-content-card {
            width: 400px; /* Fixed width to match game card */
            height: auto;
            max-width: none; /* Remove max-width constraint */
            aspect-ratio: auto; /* Let fixed dimensions control ratio */
            padding: 36px 32px; /* More padding on desktop */
            border-radius: 25px; /* Larger border radius */
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); /* More prominent shadow */
        }
    }

    .content-inner {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        padding: 0.35rem 0 0.5rem;
    }

    .description {
        font-weight: bold;
        font-size: 14px;
        line-height: 1.4;
        text-align: left;
        max-width: 100%;
        overflow-wrap: break-word;
        margin: 0;
    }

    .deck {
        width: 118%;
        max-width: none;
        height: auto;
        display: block;
        margin: 0 0 -2.05rem;
        transform: translate(15%, -8%);
        align-self: center;
    }

    .closing {
        font-weight: 500;
        font-size: 13px;
        line-height: 1.4;
        text-align: left;
        margin: 0;
    }

    /* Desktop description sizing - use more available space */
    @media (min-width: 1024px) {
        .description {
            font-size: 16px;
        }
        .closing {
            font-size: 15px;
        }
    }

    .business-link {
        margin: auto 0 0;
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
