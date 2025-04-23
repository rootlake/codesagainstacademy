import { writable } from 'svelte/store';

// --- Types ---

export interface ScenarioCard {
  scenario: string;
  category?: string;
}

// --- Stores ---

// Holds all scenario cards loaded from JSON
export const fullDeck = writable<ScenarioCard[]>([]);

// The currently active scenario card being discussed/dragged
export const currentCard = writable<ScenarioCard | null>(null); 