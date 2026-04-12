'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { seekCategories, seekItems, type SeekItem } from '@/data/mockData';

interface ShopViewProps {
  onOpenChat?: (id: string) => void;
}

export default function ShopView({ onOpenChat }: ShopViewProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? seekItems
    : activeCategory === 'trending'
    ? [...seekItems].sort((a, b) => b.members - a.members).slice(0, 6)
    : activeCategory === 'new'
    ? seekItems.filter(i => i.stage === 'Build')
    : seekItems.filter(i => i.category === activeCategory);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 160, height: 160, background: 'var(--color-accent-lavender)', top: -30, left: -40 }}
      />

      {/* Search */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl mb-4"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
      >
        <Search size={15} style={{ color: 'var(--color-text-tertiary)' }} />
        <span className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>Discover projects...</span>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {seekCategories.map(cat => (
          <button
            key={cat.id}
            className={`gathering-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04 }}
            >
              <SeekCard item={item} onOpenChat={onOpenChat} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SeekCard({ item, onOpenChat }: { item: SeekItem; onOpenChat?: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const stageColors: Record<string, { color: string; bg: string }> = {
    Build: { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)' },
    Launch: { color: '#03CCDA', bg: 'rgba(3,204,218,0.15)' },
    Scale: { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)' },
  };
  const stageCfg = stageColors[item.stage];

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--color-surface-card)',
        border: expanded ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--color-border-subtle)',
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setExpanded(e => !e)}
      layout
    >
      {/* Cover art */}
      <div
        className="h-28 relative overflow-hidden"
        style={{ background: item.gradient }}
      >
        {/* Generative cover art */}
        <div className="absolute inset-0" style={{ background: item.coverArt }} />

        {/* Stage badge */}
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
          style={{ background: stageCfg.bg, color: stageCfg.color, backdropFilter: 'blur(8px)' }}
        >
          {item.stage}
        </div>

        {/* Category */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
          style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
        >
          {item.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-[13px] font-medium leading-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {item.name}
        </h4>
        <p className="text-[11px] leading-snug mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap mb-2">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-tertiary)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Members count */}
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
          <Users size={11} />
          <span className="font-medium">{item.members.toLocaleString()}</span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>members</span>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              <p className="text-[11px] mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                Founded by {item.founder}
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onOpenChat?.(item.id); }}
                className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5"
                style={{ background: 'rgba(3,204,218,0.15)', color: 'var(--color-accent-teal)', border: '1px solid rgba(3,204,218,0.3)' }}
              >
                Connect
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
