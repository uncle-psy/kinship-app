'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowLeft, MessageCircle, Trophy } from 'lucide-react';
import { games, type GameInfo } from '@/data/mockData';

interface GamesViewProps {
  onOpenChat?: () => void;
}

export default function GamesView({ onOpenChat }: GamesViewProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return (
      <GamePlayView
        game={game!}
        onBack={() => setActiveGame(null)}
        onOpenChat={onOpenChat}
      />
    );
  }

  return (
    <div className="content-area px-5 pt-2 pb-4">
      {/* Ambient */}
      <div
        className="ambient-orb"
        style={{ width: 200, height: 200, background: 'var(--color-accent-coral)', top: -40, right: -60 }}
      />

      {/* Header */}
      <div className="mb-5">
        <p className="text-[13px] mb-1" style={{ color: 'var(--color-text-secondary)' }}>
          Isometric Worlds
        </p>
        <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
          Build, explore, and grow in AI-powered wellness games
        </p>
      </div>

      {/* Game cards */}
      <div className="flex flex-col gap-4">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GameCard game={game} onSelect={() => setActiveGame(game.id)} />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={16} style={{ color: 'var(--color-accent-gold)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Your Stats</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Level', value: '12', color: 'var(--color-accent-gold)' },
            { label: 'Games', value: '47', color: 'var(--color-accent-sage)' },
            { label: 'Streak', value: '5d', color: 'var(--color-accent-coral)' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameCard({ game, onSelect }: { game: GameInfo; onSelect: () => void }) {
  return (
    <motion.button
      className="game-tile w-full text-left"
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
    >
      {/* Visual */}
      <div className="h-40 relative overflow-hidden rounded-t-[20px]" style={{ background: game.gradient }}>
        {/* Isometric decoration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ transform: 'rotateX(55deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-sm"
                  style={{
                    background: `rgba(255,255,255,${0.03 + Math.random() * 0.08})`,
                    transform: `translateZ(${Math.random() * 15}px)`,
                    transition: 'transform 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Game icon */}
        <div className="absolute top-4 left-4 text-3xl">{game.icon}</div>

        {/* New badge */}
        {game.isNew && (
          <div
            className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
            style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)' }}
          >
            New
          </div>
        )}

        {/* Players */}
        <div
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.7)' }}
        >
          <Users size={12} />
          {game.players.toLocaleString()} playing
        </div>
      </div>

      {/* Info */}
      <div className="p-4 rounded-b-[20px]" style={{ background: 'var(--color-surface-card)' }}>
        <h3 className="font-medium text-[16px] mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {game.name}
        </h3>
        <p className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
          {game.description}
        </p>
      </div>
    </motion.button>
  );
}

function GamePlayView({ game, onBack, onOpenChat }: { game: GameInfo; onBack: () => void; onOpenChat?: () => void }) {
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Game header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}>
            <ArrowLeft size={20} style={{ color: 'var(--color-text-secondary)' }} />
          </motion.button>
          <span className="text-lg">{game.icon}</span>
          <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{game.name}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenChat}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)' }}
        >
          <MessageCircle size={16} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
      </div>

      {/* Game area */}
      <div className="flex-1 relative overflow-hidden" style={{ background: game.gradient }}>
        {/* Isometric grid */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
          <div
            style={{
              transform: 'rotateX(55deg) rotateZ(45deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: 36 }).map((_, i) => {
                const isSelected = selectedTile === i;
                const hasBuilding = [5, 12, 18, 23, 28, 33].includes(i);
                const hasTree = [2, 7, 14, 20, 30].includes(i);
                const hasWater = [9, 10, 15, 16].includes(i);

                return (
                  <motion.div
                    key={i}
                    className="iso-tile w-10 h-10 rounded-sm cursor-pointer relative"
                    style={{
                      background: hasWater
                        ? 'rgba(78, 205, 196, 0.3)'
                        : hasBuilding
                        ? 'rgba(212, 165, 116, 0.25)'
                        : `rgba(255,255,255,${0.04 + Math.random() * 0.06})`,
                      boxShadow: isSelected ? '0 0 20px rgba(212, 165, 116, 0.5)' : 'none',
                      border: isSelected ? '2px solid var(--color-accent-gold)' : '1px solid rgba(255,255,255,0.05)',
                      transform: `translateZ(${isSelected ? 15 : hasBuilding ? 8 : 0}px)`,
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedTile(isSelected ? null : i)}
                  >
                    {hasBuilding && (
                      <div className="absolute inset-0 flex items-center justify-center text-sm">
                        {['🏯', '🏠', '⛩️', '🧘', '🌿', '💎'][
                          [5, 12, 18, 23, 28, 33].indexOf(i)
                        ]}
                      </div>
                    )}
                    {hasTree && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs">
                        🌳
                      </div>
                    )}
                    {hasWater && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs opacity-50">
                        ~
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected tile info */}
        <AnimatePresence>
          {selectedTile !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 glass-card p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    Tile ({Math.floor(selectedTile / 6)}, {selectedTile % 6})
                  </p>
                  <p className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {[5, 12, 18, 23, 28, 33].includes(selectedTile)
                      ? 'Structure — Tap to upgrade'
                      : [2, 7, 14, 20, 30].includes(selectedTile)
                      ? 'Tree — Harvest for wellness points'
                      : [9, 10, 15, 16].includes(selectedTile)
                      ? 'Water — Provides harmony bonus'
                      : 'Empty — Build something here'}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 rounded-xl text-[12px] font-medium"
                  style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)' }}
                >
                  Build
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: 'var(--color-accent-gold)' }}
          >
            ✦ 2,450 KIN
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: 'var(--color-accent-sage)' }}
          >
            Level 12
          </div>
        </div>
      </div>
    </div>
  );
}
