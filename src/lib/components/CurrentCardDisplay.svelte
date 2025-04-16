<script lang="ts">
  import { currentCard, type ScenarioCard } from '../store'; // Use relative path for store
  import { onDestroy } from 'svelte';

  let card: ScenarioCard | null = null;

  // Subscribe to the store and update local variable
  const unsubscribe = currentCard.subscribe(value => {
    card = value;
  });

  // Unsubscribe when component is destroyed to prevent memory leaks
  onDestroy(unsubscribe);

  // Placeholder for footer content later
  // Need to get CAClogo.png back into the project (e.g., in /static or /src/assets)
  // const logoSrc = '/CAClogo.png'; // Example path if in /static

</script>

{#if card}
  <div class="card-display">
    <div class="card-content">
      <p>{card.scenario}</p>
    </div>
    <div class="card-footer">
      <!-- <img src={logoSrc} alt="Codes Against Academy Logo" class="footer-logo"/> -->
      <span class="footer-logo-placeholder">[Logo]</span>
      <span class="footer-title">CODES ag<span class="against">a</span>inst academy</span>
      <span class="footer-category">{card.category}</span>
    </div>
  </div>
{/if}

<style>
  .card-display {
    background: linear-gradient(to bottom, #F0F0F0, #C8C8C8); /* Slightly lighter gradient */
    border: 1px solid #888; /* Slightly darker border */
    border-radius: 20px;
    padding: 1.5rem;
    color: #000;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: bold;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.3); /* Stronger shadow */
    text-shadow: 1px 1px 1px rgba(255,255,255,0.5);
    position: relative;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
  }

  .card-content {
    flex-grow: 1; /* Allow content to take available space */
    display: flex;
    align-items: center; /* Center text vertically */
    justify-content: center;
    padding-bottom: 1rem; /* Space above footer */
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Times New Roman', Times, serif; /* Serif font for footer */
    font-weight: normal; /* Normal weight for footer */
    font-size: 0.9rem;
    color: #333; /* Darker footer text */
    text-shadow: none; /* Remove text shadow from footer */
    border-top: 1px solid #aaa; /* Separator line */
    padding-top: 0.5rem;
    margin-top: 1rem; /* Space between content and footer */
  }

  .footer-logo-placeholder {
    /* Style the logo placeholder */
    font-style: italic;
    color: #666;
  }
  /*
  .footer-logo {
     height: 20px;
     width: auto;
  }
  */

  .footer-title {
    /* Specific styling if needed */
  }
  .against {
    /* Style the 'a' in against if needed, e.g., different font/style */
     font-family: sans-serif; /* Or specific font */
     display: inline-block;
     transform: rotate(-15deg); /* Example rotation */
  }

  .footer-category {
    /* Specific styling if needed */
  }

</style> 