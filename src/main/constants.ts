import { Game } from './types';

export const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    title: 'CHRONO TRIGGER',
    platform: 'SNES',
    year: 1995,
    genre: 'RPG',
    description: 'A masterpiece of time-traveling adventure. Join Crono and his friends as they journey through history to save the future from a world-ending threat.',
    coverUrl: 'https://picsum.photos/seed/chrono/300/400',
    screenshots: ['https://picsum.photos/seed/chrono1/600/400', 'https://picsum.photos/seed/chrono2/600/400']
  },
  {
    id: '2',
    title: 'THE LEGEND OF ZELDA',
    platform: 'NES',
    year: 1986,
    genre: 'Adventure',
    description: 'The original epic journey. Explore the land of Hyrule, conquer dungeons, and rescue Princess Zelda from the evil Ganon.',
    coverUrl: 'https://picsum.photos/seed/zelda/300/400',
    screenshots: ['https://picsum.photos/seed/zelda1/600/400']
  },
  {
    id: '3',
    title: 'SONIC THE HEDGEHOG',
    platform: 'GENESIS',
    year: 1991,
    genre: 'Platformer',
    description: 'Speed through the Green Hill Zone and stop Dr. Robotnik in this high-velocity classic that defined a generation.',
    coverUrl: 'https://picsum.photos/seed/sonic/300/400',
    screenshots: ['https://picsum.photos/seed/sonic1/600/400']
  },
  {
    id: '4',
    title: 'METROID FUSION',
    platform: 'GBA',
    year: 2002,
    genre: 'Action',
    description: 'Samus Aran returns in a tense, atmospheric mission on a research station infested by the deadly X Parasite.',
    coverUrl: 'https://picsum.photos/seed/metroid/300/400',
    screenshots: ['https://picsum.photos/seed/metroid1/600/400']
  },
  {
    id: '5',
    title: 'STREET FIGHTER II',
    platform: 'ARCADE',
    year: 1991,
    genre: 'Fighting',
    description: 'The world warrior tournament begins. Choose your fighter and master the special moves that revolutionized the fighting genre.',
    coverUrl: 'https://picsum.photos/seed/sf2/300/400',
    screenshots: ['https://picsum.photos/seed/sf2-1/600/400']
  },
  {
    id: '6',
    title: 'FINAL FANTASY VI',
    platform: 'SNES',
    year: 1994,
    genre: 'RPG',
    description: 'An industrial world where magic has faded. A group of rebels fights against an oppressive empire in this emotional masterpiece.',
    coverUrl: 'https://picsum.photos/seed/ff6/300/400',
    screenshots: ['https://picsum.photos/seed/ff6-1/600/400']
  }
];
