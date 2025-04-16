import { writable } from 'svelte/store';

// --- Types ---

export interface ScenarioCard {
  // id: number | string; // Removed - ID not present in JSON
  // type: 'scenario' | 'reaction'; // Removed - Type not present in JSON
  scenario: string; // Changed from 'text' to match JSON
  category?: string; // Optional category field
  // Add any other relevant fields from your scenarios.json
}

// Defines the structure for cards placed in tiers
// Keys will be 'S', 'A', 'B', 'C', 'D', 'E', 'F', 'Pass'
export type TieredCards = Record<string, ScenarioCard[]>;


// --- Stores ---

// Holds all scenario cards loaded from JSON
export const fullDeck = writable<ScenarioCard[]>([]);

// Holds scenario cards available to be drawn
export const availableDeck = writable<ScenarioCard[]>([]);

// The currently active scenario card being discussed/dragged
export const currentCard = writable<ScenarioCard | null>(null);

// Holds the cards assigned to each tier
const initialTiers: TieredCards = {
  'S': [], 'A': [], 'B': [], 'C': [],
  'D': [], 'E': [], 'F': [], 'Pass': []
};
export const tieredCards = writable<TieredCards>(initialTiers);

// Optional: Store for interaction state (e.g., if a card is being dragged)
export const isDraggingCard = writable<boolean>(false); 