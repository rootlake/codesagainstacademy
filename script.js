// Cache DOM elements
const card = document.querySelector('.card');
const frontCard = document.querySelector('.card-front');
const frontText = frontCard.querySelector('p');
const categoryText = frontCard.querySelector('.category');
const settingsButton = document.querySelector('.settings-button');
const settingsCard = document.querySelector('.settings-card');
const mainCard = document.querySelector('.main-card');
const closeButton = document.querySelector('.close-button');

let scenarios = [];
let usedScenarios = new Set();
let isShowingBack = true;
let currentRotation = 180;  // Start showing back (180°)
let isSettingsVisible = false;

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

// Add settings handling functions
function showSettings() {
    if (isSettingsVisible) return;
    
    // Create and add overlay
    const overlay = document.createElement('div');
    overlay.className = 'settings-overlay';
    document.body.appendChild(overlay);
    overlay.style.display = 'block';
    
    // Start the fade in
    setTimeout(() => {
        overlay.classList.add('visible');
    }, 50);

    if (isShowingBack) {
        // If we're starting from the back, go straight to settings
        const settingsContent = document.querySelector('.settings-content');
        settingsContent.style.display = 'block';
        
        currentRotation += 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        
        // Show settings content when card is face-down
        setTimeout(() => {
            settingsContent.classList.add('visible');
        }, 400);
    } else {
        // First flip to back
        currentRotation += 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;

        // After reaching the back, prepare settings content
        setTimeout(() => {
            const settingsContent = document.querySelector('.settings-content');
            settingsContent.style.display = 'block';
            
            // Start the second flip
            currentRotation += 180;
            card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
            
            // Show settings content when card is face-down
            setTimeout(() => {
                settingsContent.classList.add('visible');
            }, 400);
        }, 800);
    }
    
    isSettingsVisible = true;
    
    // Add click outside listener
    overlay.addEventListener('click', hideSettings);
}

function hideSettings() {
    if (!isSettingsVisible) return;
    
    // Hide settings content immediately
    const settingsContent = document.querySelector('.settings-content');
    settingsContent.classList.remove('visible');
    
    // Fade out overlay
    const overlay = document.querySelector('.settings-overlay');
    overlay.classList.remove('visible');
    
    // First flip to back
    currentRotation += 180;
    card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;

    // After reaching the back, clean up and return to previous state
    setTimeout(() => {
        settingsContent.style.display = 'none';
        
        currentRotation += 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        
        // Remove overlay after animation
        setTimeout(() => {
            overlay.remove();
            isSettingsVisible = false;
        }, 400);
    }, 800);
    
    saveSettings();
}

function saveSettings() {
    const flip360 = document.getElementById('flip360').checked;
    const flipBack = document.getElementById('flipBack').checked;
    
    // If neither is checked, default to flip360
    if (!flip360 && !flipBack) {
        document.getElementById('flip360').checked = true;
    }
    
    // Save to localStorage
    localStorage.setItem('cardSettings', JSON.stringify({ 
        flip360: document.getElementById('flip360').checked,
        flipBack: document.getElementById('flipBack').checked
    }));
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('cardSettings')) || { flip360: true, flipBack: false };
    document.getElementById('flip360').checked = settings.flip360;
    document.getElementById('flipBack').checked = settings.flipBack;
}

// Add event listeners
settingsButton.addEventListener('click', showSettings);
closeButton.addEventListener('click', hideSettings);

// Load settings on startup
loadSettings();

// Update the flip logic to use settings
document.querySelector('.next-card-button').addEventListener('click', async function(e) {
    if (isSettingsVisible) {
        e.preventDefault();
        return;
    }
    if (card.classList.contains('animating')) return;
    card.classList.add('animating');

    const settings = JSON.parse(localStorage.getItem('cardSettings')) || { flip360: true, flipBack: false };

    if (isShowingBack) {
        // First flip: back to front
        currentRotation += 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        isShowingBack = false;
    } else if (settings.flip360) {
        // Full 360 flip with new content
        const nextScenario = getRandomScenario();
        currentRotation += 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        
        setTimeout(() => {
            updateCard(frontCard, nextScenario);
            currentRotation += 180;
            card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        }, 400);
    } else if (settings.flipBack) {
        // Flip to back
        currentRotation += 180;
        card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
        isShowingBack = true;
    }
});

// Keep the transitionend listener
card.addEventListener('transitionend', function() {
    this.classList.remove('animating');
});

// Update initialization
loadScenarios().then(() => {
    const randomScenario = getRandomScenario();
    updateCard(frontCard, randomScenario);
    
    // Ensure we start showing the back
    currentRotation = 180;
    card.querySelector('.card-inner').style.transform = `rotateY(${currentRotation}deg)`;
    
    // Handle initial text visibility
    frontText.style.opacity = '0';
    setTimeout(() => {
        frontText.style.opacity = '1';
    }, 100);
}).catch(console.error); 

// Add checkbox mutual exclusivity
document.querySelectorAll('.setting-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Uncheck other checkbox
            document.querySelectorAll('.setting-option input[type="checkbox"]').forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        } else {
            // If unchecking, check the other box
            const otherCheckbox = document.querySelector('.setting-option input[type="checkbox"]:not(:checked)');
            if (otherCheckbox) {
                otherCheckbox.checked = true;
            } else {
                // If trying to uncheck when it's the only one checked, keep it checked
                this.checked = true;
            }
        }
        saveSettings();
    });
}); 