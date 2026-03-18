export type Platform = 'NES' | 'SNES' | 'GENESIS' | 'GBA' | 'ARCADE';

export interface Game {
  id: string;
  title: string;
  platform: Platform;
  year: number;
  genre: string;
  description: string;
  coverUrl: string;
  screenshots: string[];
}

export type Screen = 'BOOT' | 'HOME' | 'LIBRARY' | 'GAME_DETAILS' | 'DISCOVER' | 'ADMIN' | 'SETTINGS';
