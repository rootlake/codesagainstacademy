import { writable } from 'svelte/store';

// --- Types ---

export interface ScenarioCard {
  scenario: string;
  category?: string;
}

export interface TierInfo {
  id: string;
  color: string;
  description?: string;
  shortName?: string;
}

export interface CardTierSelection {
  cardId: string; // We'll use scenario text as unique ID
  tierId: string;
  tierColor: string;
  tierDescription?: string;
  tierShortName?: string;
}

// --- Stores ---

// Holds all scenario cards loaded from JSON
export const fullDeck = writable<ScenarioCard[]>([]);

// The currently active scenario card being discussed/dragged
export const currentCard = writable<ScenarioCard | null>(null);

// Tracks which tier is selected for the current card
export const currentCardTierSelection = writable<CardTierSelection | null>(null);

// Tracks all card-tier selections (for showing dots on tier cards)
export const allTierSelections = writable<Map<string, CardTierSelection>>(new Map());

export const tiers: TierInfo[] = [
  {
    id: 'S',
    description: 'Not just ethical... it\'s<br>a moral imperative!',
    color: '#e07875',
    shortName: 'Super'
  },
  {
    id: 'A',
    description: 'This is both ethical<br><i>and</i> a good idea',
    color: '#f2b770',
    shortName: 'Excellent'
  },
  {
    id: 'B',
    description: 'In almost all cases,<br>this is good',
    color: '#faef85',
    shortName: 'Good'
  },
  {
    id: 'C',
    description: 'A gray area, reasonable<br>people could disagree',
    color: '#9bd187',
    shortName: 'Okay'
  },
  {
    id: 'D',
    description: 'Questionable, pushes<br>ethical boundaries',
    color: '#94b8e8',
    shortName: 'Not Okay'
  },
  {
    id: 'E',
    description: 'This is simply<br>unethical and wrong',
    color: '#787ab5',
    shortName: 'Terrible'
  },
  {
    id: 'F',
    description: 'Beyond unethical, this is<br>immoral, illegal, and bad',
    color: '#c086b5',
    shortName: 'Evil'
  },
  {
    id: 'Home',
    color: '#D1D5DB',
    description: 'Home',
    shortName: 'Home'
  }
]; 