/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Library, 
  Search, 
  Settings, 
  ShieldAlert, 
  Play, 
  Info, 
  Plus, 
  Trash2, 
  ChevronLeft,
  Download,
  Star
} from 'lucide-react';
import { Game, Screen, Platform } from './types';
import { INITIAL_GAMES } from './constants';

export default function App() {
  const [screen, setScreen] = useState<Screen>('BOOT');
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [bootText, setBootText] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'ALL'>('ALL');

  // Boot sequence effect
  useEffect(() => {
    if (screen === 'BOOT') {
      const lines = [
        '> Booting RetroVault OS...',
        '> Loading Game Database...',
        '> Initializing Launcher...',
        '> System Ready.'
      ];
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < lines.length) {
          setBootText(prev => [...prev, lines[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => setScreen('HOME'), 1000);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const handleAddGame = (newGame: Omit<Game, 'id' | 'screenshots'>) => {
    const game: Game = {
      ...newGame,
      id: Math.random().toString(36).substr(2, 9),
      screenshots: ['https://picsum.photos/seed/new/600/400']
    };
    setGames([...games, game]);
  };

  const handleDeleteGame = (id: string) => {
    setGames(games.filter(g => g.id !== id));
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'ALL' || game.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      {/* CRT Overlay */}
      <div className="crt-overlay crt-flicker" />
      
      {/* Parallax Background */}
      <div className="stars-container">
        <div className="stars-layer">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="star" 
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {screen === 'BOOT' && (
          <motion.div 
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full bg-black font-press-start text-retro-cyan"
          >
            <div className="space-y-4 max-w-md w-full px-8">
              {bootText.map((text, i) => (
                <div key={i} className="text-sm md:text-base">{text}</div>
              ))}
              <div className="w-4 h-6 bg-retro-cyan animate-pulse inline-block ml-1" />
            </div>
          </motion.div>
        )}

        {screen !== 'BOOT' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full"
          >
            {/* Sidebar */}
            <nav className="w-20 md:w-64 bg-retro-purple-dark border-r-4 border-white flex flex-col items-center md:items-stretch p-4 z-10">
              <div className="mb-12 hidden md:block">
                <h1 className="font-press-start text-retro-gold text-lg leading-tight">
                  RETRO<br />VAULT
                </h1>
              </div>
              
              <div className="space-y-4 flex-1">
                <SidebarItem 
                  icon={<Home size={24} />} 
                  label="HOME" 
                  active={screen === 'HOME'} 
                  onClick={() => setScreen('HOME')} 
                />
                <SidebarItem 
                  icon={<Library size={24} />} 
                  label="LIBRARY" 
                  active={screen === 'LIBRARY'} 
                  onClick={() => setScreen('LIBRARY')} 
                />
                <SidebarItem 
                  icon={<Search size={24} />} 
                  label="DISCOVER" 
                  active={screen === 'DISCOVER'} 
                  onClick={() => setScreen('DISCOVER')} 
                />
                <SidebarItem 
                  icon={<ShieldAlert size={24} />} 
                  label="ADMIN" 
                  active={screen === 'ADMIN'} 
                  onClick={() => setScreen('ADMIN')} 
                />
              </div>

              <SidebarItem 
                icon={<Settings size={24} />} 
                label="SETTINGS" 
                active={screen === 'SETTINGS'} 
                onClick={() => setScreen('SETTINGS')} 
              />
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 relative">
              <AnimatePresence mode="wait">
                {screen === 'HOME' && (
                  <motion.div 
                    key="home"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="pixel-border bg-retro-purple-mid/30 p-8">
                      <h2 className="font-press-start text-2xl text-retro-cyan mb-4">WELCOME BACK, PLAYER 1</h2>
                      <p className="text-retro-gold text-sm md:text-base max-w-2xl">
                        Your vault is ready. Access your classic collection or discover new legends from the golden era of gaming.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-press-start text-lg mb-6 flex items-center gap-4">
                        <span className="w-4 h-4 bg-retro-magenta inline-block" />
                        RECENTLY PLAYED
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.slice(0, 3).map(game => (
                          <GameCard 
                            key={game.id} 
                            game={game} 
                            onClick={() => {
                              setSelectedGame(game);
                              setScreen('GAME_DETAILS');
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {screen === 'LIBRARY' && (
                  <motion.div 
                    key="library"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <h2 className="font-press-start text-2xl text-retro-cyan">MY LIBRARY</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {games.map(game => (
                        <GameCard 
                          key={game.id} 
                          game={game} 
                          onClick={() => {
                            setSelectedGame(game);
                            setScreen('GAME_DETAILS');
                          }} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {screen === 'DISCOVER' && (
                  <motion.div 
                    key="discover"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <h2 className="font-press-start text-2xl text-retro-cyan">DISCOVER</h2>
                      <div className="flex gap-4 w-full md:w-auto">
                        <input 
                          type="text" 
                          placeholder="SEARCH GAMES..." 
                          className="bg-black border-4 border-white p-2 font-mono text-sm flex-1 md:w-64 focus:border-retro-cyan outline-none"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select 
                          className="bg-black border-4 border-white p-2 font-mono text-sm focus:border-retro-cyan outline-none"
                          value={filterPlatform}
                          onChange={(e) => setFilterPlatform(e.target.value as any)}
                        >
                          <option value="ALL">ALL PLATFORMS</option>
                          <option value="NES">NES</option>
                          <option value="SNES">SNES</option>
                          <option value="GENESIS">GENESIS</option>
                          <option value="GBA">GBA</option>
                          <option value="ARCADE">ARCADE</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredGames.map(game => (
                        <GameCard 
                          key={game.id} 
                          game={game} 
                          onClick={() => {
                            setSelectedGame(game);
                            setScreen('GAME_DETAILS');
                          }} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {screen === 'GAME_DETAILS' && selectedGame && (
                  <motion.div 
                    key="details"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    className="space-y-8"
                  >
                    <button 
                      onClick={() => setScreen('LIBRARY')}
                      className="flex items-center gap-2 font-press-start text-[10px] text-retro-cyan hover:text-white transition-colors"
                    >
                      <ChevronLeft size={16} /> BACK TO LIST
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1">
                        <div className="pixel-border-cyan overflow-hidden aspect-[3/4]">
                          <img 
                            src={selectedGame.coverUrl} 
                            alt={selectedGame.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-2">
                          <span className="bg-retro-magenta px-2 py-1 font-press-start text-[10px]">{selectedGame.platform}</span>
                          <h2 className="font-press-start text-3xl text-retro-gold">{selectedGame.title}</h2>
                          <div className="flex gap-4 text-sm opacity-70">
                            <span>GENRE: {selectedGame.genre}</span>
                            <span>YEAR: {selectedGame.year}</span>
                          </div>
                        </div>

                        <div className="pixel-border bg-white/5 p-6">
                          <p className="leading-relaxed text-lg">
                            {selectedGame.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <button className="pixel-button bg-retro-cyan !text-retro-bg flex items-center gap-2">
                            <Play size={16} /> PLAY NOW
                          </button>
                          <button className="pixel-button flex items-center gap-2">
                            <Download size={16} /> DOWNLOAD
                          </button>
                          <button className="pixel-button flex items-center gap-2">
                            <Star size={16} /> FAVORITE
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-press-start text-lg">SCREENSHOTS</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedGame.screenshots.map((s, i) => (
                          <div key={i} className="pixel-border overflow-hidden aspect-video">
                            <img src={s} alt="screenshot" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {screen === 'ADMIN' && (
                  <motion.div 
                    key="admin"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <h2 className="font-press-start text-2xl text-retro-magenta">ADMIN PANEL</h2>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                      <div className="xl:col-span-1">
                        <div className="pixel-border bg-retro-purple-mid/20 p-6 space-y-6">
                          <h3 className="font-press-start text-sm">ADD NEW GAME</h3>
                          <AdminForm onAdd={handleAddGame} />
                        </div>
                      </div>

                      <div className="xl:col-span-2">
                        <div className="pixel-border bg-black p-6 space-y-4">
                          <h3 className="font-press-start text-sm">MANAGE DATABASE</h3>
                          <div className="space-y-2">
                            {games.map(game => (
                              <div key={game.id} className="flex items-center justify-between p-4 bg-white/5 border-2 border-white/20 hover:border-retro-cyan transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-16 bg-gray-800 flex-shrink-0">
                                    <img src={game.coverUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  </div>
                                  <div>
                                    <div className="font-press-start text-[10px]">{game.title}</div>
                                    <div className="text-xs opacity-50">{game.platform} | {game.year}</div>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => handleDeleteGame(game.id)}
                                  className="p-2 text-retro-magenta hover:bg-retro-magenta hover:text-white transition-colors"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {screen === 'SETTINGS' && (
                  <motion.div 
                    key="settings"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <h2 className="font-press-start text-2xl text-retro-gold">SETTINGS</h2>
                    <div className="pixel-border bg-retro-purple-mid/20 p-8 max-w-2xl space-y-8">
                      <div className="space-y-4">
                        <h3 className="font-press-start text-sm">VIDEO</h3>
                        <div className="flex items-center justify-between p-4 bg-black/40 border-2 border-white/20">
                          <span>CRT SCANLINES</span>
                          <div className="w-12 h-6 bg-retro-cyan border-2 border-white" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-black/40 border-2 border-white/20">
                          <span>SCREEN FLICKER</span>
                          <div className="w-12 h-6 bg-retro-cyan border-2 border-white" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-press-start text-sm">AUDIO</h3>
                        <div className="flex items-center justify-between p-4 bg-black/40 border-2 border-white/20">
                          <span>SYSTEM SOUNDS</span>
                          <div className="w-12 h-6 bg-retro-magenta border-2 border-white" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-black/40 border-2 border-white/20">
                          <span>BACKGROUND MUSIC</span>
                          <div className="w-12 h-6 bg-retro-purple-mid border-2 border-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-3 transition-all group ${
        active 
          ? 'bg-retro-cyan text-retro-bg shadow-[0_0_15px_#00eaff]' 
          : 'text-white hover:bg-white/10'
      }`}
      style={{
        border: active ? '4px solid #00eaff' : '4px solid transparent'
      }}
    >
      <span className={active ? 'scale-110' : 'group-hover:scale-110 transition-transform'}>
        {icon}
      </span>
      <span className="hidden md:block font-press-start text-[10px]">{label}</span>
    </button>
  );
}

function GameCard({ game, onClick }: { game: Game, onClick: () => void, key?: string | number }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="pixel-border bg-retro-purple-dark overflow-hidden group-hover:pixel-border-cyan transition-all">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img 
            src={game.coverUrl} 
            alt={game.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 bg-retro-magenta px-2 py-1 font-press-start text-[8px]">
            {game.platform}
          </div>
        </div>
        <div className="p-4 bg-black/80">
          <h4 className="font-press-start text-[10px] text-retro-gold truncate mb-2">{game.title}</h4>
          <div className="flex justify-between items-center">
            <span className="text-[10px] opacity-60">{game.year}</span>
            <div className="flex gap-2">
              <button className="p-1 hover:text-retro-cyan"><Play size={16} /></button>
              <button className="p-1 hover:text-retro-cyan"><Info size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminForm({ onAdd }: { onAdd: (game: any) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    platform: 'SNES',
    year: 1990,
    genre: '',
    description: '',
    coverUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      platform: 'SNES',
      year: 1990,
      genre: '',
      description: '',
      coverUrl: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-press-start">TITLE</label>
        <input 
          required
          type="text" 
          className="w-full bg-black border-2 border-white p-2 text-sm outline-none focus:border-retro-cyan"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-press-start">PLATFORM</label>
          <select 
            className="w-full bg-black border-2 border-white p-2 text-sm outline-none focus:border-retro-cyan"
            value={formData.platform}
            onChange={e => setFormData({...formData, platform: e.target.value})}
          >
            <option>NES</option>
            <option>SNES</option>
            <option>GENESIS</option>
            <option>GBA</option>
            <option>ARCADE</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-press-start">YEAR</label>
          <input 
            type="number" 
            className="w-full bg-black border-2 border-white p-2 text-sm outline-none focus:border-retro-cyan"
            value={formData.year}
            onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-press-start">GENRE</label>
        <input 
          type="text" 
          className="w-full bg-black border-2 border-white p-2 text-sm outline-none focus:border-retro-cyan"
          value={formData.genre}
          onChange={e => setFormData({...formData, genre: e.target.value})}
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-press-start">DESCRIPTION</label>
        <textarea 
          className="w-full bg-black border-2 border-white p-2 text-sm outline-none focus:border-retro-cyan h-24 resize-none"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-press-start">COVER URL</label>
        <input 
          type="text" 
          placeholder="https://..."
          className="w-full bg-black border-2 border-white p-2 text-sm outline-none focus:border-retro-cyan"
          value={formData.coverUrl}
          onChange={e => setFormData({...formData, coverUrl: e.target.value})}
        />
      </div>
      <button type="submit" className="pixel-button w-full flex items-center justify-center gap-2">
        <Plus size={16} /> ADD GAME
      </button>
    </form>
  );
}
