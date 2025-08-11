<script lang="ts">
    import { base } from '$app/paths';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{
        unlock: void;
    }>();

    let unlockCode = '';
    let showCodeInput = false;
    let errorMessage = '';

    function handleUnlock() {
        if (unlockCode === '0theHumanity') {
            errorMessage = '';
            dispatch('unlock');
        } else {
            errorMessage = 'Invalid unlock code. Please try again.';
        }
    }
</script>

<div class="card-front">
    <div class="text-container">
        <div class="content">
            <h2>Thanks for trying Codes Against Academy!</h2>
            <p class="message">
                Unlock all 75 scenario cards to fully explore the wide range of relevant AI discussions.
            </p>
            <p class="support">
                I created this app and pay for server time, so help me keep it running with a small donation ($5 recommended, but I'll be happy with anything, thank you!).
            </p>
            <div class="payment-options">
                <a href="https://venmo.com/CodesAgainstAcademy?txn=pay&amount=5&note=Full Digital Deck" target="_blank" rel="noopener noreferrer" class="payment-button venmo">Venmo</a>
                <a href="https://paypal.me/JoshuaLake/5" target="_blank" rel="noopener noreferrer" class="payment-button paypal">PayPal</a>
                <a href="https://cash.app/$rootlake" target="_blank" rel="noopener noreferrer" class="payment-button cashapp">Cash App</a>
            </div>
            <p class="student-note">
                If the cost is prohibitive or you're a student, send me an email at <a href="mailto:jlake@pomfret.org" class="email-link">jlake@pomfret.org</a> to request an unlock code.
            </p>
            {#if !showCodeInput}
                <button class="code-button" on:click={() => showCodeInput = true}>
                    Enter Code
                </button>
            {:else}
                <div class="code-input-container">
                    <input 
                        type="text" 
                        bind:value={unlockCode} 
                        placeholder="Enter your unlock code"
                        class="code-input"
                        on:keydown={(e) => e.key === 'Enter' && handleUnlock()}
                    />
                    <button class="submit-button" on:click={handleUnlock}>
                        Unlock
                    </button>
                </div>
                {#if errorMessage}
                    <p class="error-message">{errorMessage}</p>
                {/if}
            {/if}
        </div>
    </div>
    <div class="bottom-elements">
        <img src="{base}/minilogo.png" alt="CAA Logo" class="logo"/>
        <span class="category">Unlock Full Version</span>
    </div>
</div>

<style>
    .card-front {
        width: 100%;
        aspect-ratio: 2.5 / 3.5;
        margin: 0 auto;
        background: linear-gradient(to bottom, #C6C7C9, #888A8C);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: relative;
        font-family: Arial, sans-serif;
        color: #000;
        overflow: hidden;
        max-width: 320px;
        container-type: inline-size;
    }

    /* Desktop card sizing - match main game card dimensions */
    @media (min-width: 1024px) {
        .card-front {
            width: 400px; /* Fixed width to match main game card */
            height: 555px; /* Fixed height to match main game card */
            max-width: none; /* Remove max-width constraint */
            aspect-ratio: auto; /* Let fixed dimensions control ratio */
            padding: 40px; /* More padding on desktop */
            border-radius: 25px; /* Larger border radius */
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); /* More prominent shadow */
        }
    }

    .text-container {
        flex: 1;
        margin-bottom: 5px;
        overflow: hidden;
        text-align: left;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        height: 100%;
    }

    h2 {
        font-size: clamp(20px, 6cqw, 24px);
        margin: 0;
        text-align: center;
        line-height: 1.2;
    }

    /* Desktop text sizing - larger for desktop cards */
    @media (min-width: 1024px) {
        h2 {
            font-size: 28px; /* Larger size for desktop card */
        }
    }

    .message {
        font-size: clamp(16px, 4cqw, 16px);
        margin: 0;
        line-height: 1.3;
        font-weight: bold;
    }

    /* Desktop message sizing */
    @media (min-width: 1024px) {
        .message {
            font-size: 20px; /* Larger size for desktop card */
        }
    }

    .support {
        font-size: clamp(13px, 3.8cqw, 15px);
        margin: 0;
        line-height: 1.3;
    }

    /* Desktop support text sizing */
    @media (min-width: 1024px) {
        .support {
            font-size: 17px; /* Larger size for desktop card */
        }
    }

    .payment-options {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }

    .payment-button {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        font-size: clamp(12px, 3.5cqw, 14px);
        transition: opacity 0.2s;
    }

    .payment-button:hover {
        opacity: 0.9;
    }

    .venmo {
        background-color: #3D95CE;
        color: white;
    }

    .paypal {
        background-color: #FFB800;
        color: #253B80;
    }

    .cashapp {
        background-color: #00D632;
        color: white;
    }

    .student-note {
        font-size: clamp(13px, 3.5cqw, 14px);
        margin: 0;
        line-height: 1.3;
        text-align: center;
    }

    .email-link {
        color: #000;
        text-decoration: underline;
    }

    .code-button {
        background-color: #444;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        font-size: clamp(12px, 3.5cqw, 14px);
        margin: 0 auto;
        display: block;
        transition: background-color 0.2s;
    }

    .code-button:hover {
        background-color: #333;
    }

    .code-input-container {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .code-input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: clamp(12px, 3.5cqw, 14px);
        font-family: Arial, sans-serif;
    }

    .code-input:focus {
        outline: none;
        border-color: #444;
    }

    .submit-button {
        background-color: #444;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        font-size: clamp(12px, 3.5cqw, 14px);
    }

    .submit-button:hover {
        background-color: #333;
    }

    .bottom-elements {
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-top: 1px solid #aaa;
        padding-top: 2px;
        margin-top: 3px;
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

    .error-message {
        color: #d32f2f;
        font-size: clamp(12px, 3.5cqw, 14px);
        margin: 0.5rem 0 0;
        text-align: center;
    }
</style> 