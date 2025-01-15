// Cache DOM elements
const card = document.querySelector('.card');
const frontCard = document.querySelector('.card-front');
const frontText = frontCard.querySelector('p');
const categoryText = frontCard.querySelector('.category');
const toggleButton = document.querySelector('.toggle-button');
const modeLabel = document.querySelector('.mode-label');

let scenarios = [];
let usedScenarios = new Set();  // Track used scenarios
let isShowingBack = true;
let is360Mode = true;  // Start in 360 mode

// Add rotation tracking
let currentRotation = 180;  // Start showing back (180°)

// Load scenarios
async function loadScenarios() {
    try {
        const response = await fetch('scenarios.json');
        if (!response.ok) throw new Error('Failed to load scenarios');
        scenarios = await response.json();
    } catch (error) {
        console.error('Error loading scenarios:', error);
        // Could add user-facing error handling here
    }
}

// Get random scenario avoiding repeats
function getRandomScenario() {
    if (usedScenarios.size >= scenarios.length) {
        usedScenarios.clear();  // Reset when all scenarios have been used
    }
    
    let randomScenario;
    do {
        randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    } while (usedScenarios.has(randomScenario.scenario));
    
    usedScenarios.add(randomScenario.scenario);
    return randomScenario;
}

// Function to measure and scale text
function scaleText(element, text) {
    const container = element.parentElement;
    element.style.fontSize = '20px'; // Start with smaller initial font
    element.textContent = text;
    
    // Reduce font size until text fits
    while (
        (element.scrollHeight > container.clientHeight || 
         element.scrollWidth > container.clientWidth) &&
        parseInt(element.style.fontSize) > 12
    ) {
        element.style.fontSize = (parseInt(element.style.fontSize) - 1) + 'px';
    }
    
    // Round down to nearest even number
    const currentSize = parseInt(element.style.fontSize);
    element.style.fontSize = (currentSize - (currentSize % 2)) + 'px';
}

function updateCard(element, scenario) {
    const textElement = element.querySelector('p');
    scaleText(textElement, scenario.scenario);
    
    const categoryElement = element.querySelector('.category');
    categoryElement.textContent = scenario.category;
}

function showModeLabel(text) {
    modeLabel.textContent = text;
    modeLabel.classList.add('visible');
    setTimeout(() => {
        modeLabel.classList.remove('visible');
    }, 2000);  // Hide after 2 seconds
}

// Add toggle functionality
toggleButton.addEventListener('click', () => {
    is360Mode = !is360Mode;
    toggleButton.classList.toggle('mode-360');
    toggleButton.querySelector('.mode-text').textContent = is360Mode ? '↻' : '⟲';
    
    // Show appropriate label with updated text
    showModeLabel(is360Mode ? 'NEW SCENARIO MODE' : 'FLIP OVER MODE');
    
    // Reset to initial state when switching modes
    if (is360Mode) {
        currentRotation = 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        card.classList.remove('flipped-left');
    } else {
        card.querySelector('.card-inner').style.transform = '';
        if (!isShowingBack) {
            card.classList.add('flipped-left');
        }
    }
});

// Handle card flip
async function handleCardFlip() {
    if (card.classList.contains('animating')) return;
    card.classList.add('animating');

    if (is360Mode) {
        if (isShowingBack) {
            // First flip: back to front
            currentRotation += 180;
            card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        } else {
            // Start continuous flip animation
            const nextScenario = getRandomScenario();
            
            // Start the flip
            currentRotation += 180;
            card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
            
            // Update content mid-flip
            setTimeout(() => {
                updateCard(frontCard, nextScenario);
                currentRotation += 180;
                card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
            }, 400);
            
            return;
        }
    } else {
        // 180 mode: use original class-based flipping
        if (isShowingBack) {
            card.classList.add('flipped-left');
        } else {
            card.classList.remove('flipped-left');
            await new Promise(resolve => setTimeout(resolve, 800));
            const randomScenario = getRandomScenario();
            updateCard(frontCard, randomScenario);
        }
    }

    isShowingBack = !isShowingBack;
}

// Event listeners for both click and touch
card.addEventListener('click', handleCardFlip);
card.addEventListener('touchend', (e) => {
    e.preventDefault();  // Prevent double-firing on mobile
    handleCardFlip();
});

card.addEventListener('transitionend', function() {
    this.classList.remove('animating');
});

// Initialize
loadScenarios().then(() => {
    // Start with 360 mode UI
    toggleButton.classList.add('mode-360');
    toggleButton.querySelector('.mode-text').textContent = '↻';
    
    // Prepare first scenario but don't show it yet
    const randomScenario = getRandomScenario();
    updateCard(frontCard, randomScenario);
    
    // Ensure we start showing the back
    currentRotation = 180;
    card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
    
    // Hide the "HELLO" text
    frontText.style.opacity = '0';
    // Show the text only when we flip to it
    setTimeout(() => {
        frontText.style.opacity = '1';
    }, 100);
    showModeLabel('NEW SCENARIO MODE');
}).catch(console.error); 