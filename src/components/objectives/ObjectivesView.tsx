'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { objectives, markets, type Objective } from '@/data/mockData';

interface ObjectivesViewProps {
  onOpenChat?: (threadId: string) => void;
}

export default function ObjectivesView({ onOpenChat }: ObjectivesViewProps) {
  const [activeMarket, setActiveMarket] = useState<string>('all');

  const filtered = activeMarket === 'all' ? objectives : objectives.filter(o => o.marketId === activeMarket);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 160, height: 160, background: 'var(--color-accent-lavender)', top: -30, left: -40 }}
      />

      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl mb-3"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
      >
        <Search size={15} style={{ color: 'var(--color-text-tertiary)' }} />
        <span className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>
          Chat with any Objective…
        </span>
      </div>

      <p className="text-[12px] mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
        Each Market declares a multidimensional objective vector. Every Proposal is priced against these dimensions.
      </p>

      {/* Market filter */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        <button
          className={`gathering-pill ${activeMarket === 'all' ? 'active' : ''}`}
          onClick={() => setActiveMarket('all')}
        >
          All Markets
        </button>
        {markets.map(m => (
          <button
            key={m.id}
            className={`gathering-pill ${activeMarket === m.id ? 'active' : ''}`}
            onClick={() => setActiveMarket(m.id)}
          >
            {m.avatar} {m.name.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      {/* Objective grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((o, i) => (
            <motion.div
              key={o.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ delay: i * 0.04 }}
            >
              <ObjectiveCard objective={o} onOpenChat={onOpenChat} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ObjectiveCard({
  objective, onOpenChat,
}: {
  objective: Objective;
  onOpenChat?: (threadId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Header with score */}
      <div
        className="relative p-3 pb-2"
        style={{ background: `linear-gradient(135deg, ${objective.color}25 0%, ${objective.color}08 100%)` }}
      >
        <div className="flex items-start justify-between mb-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}
          >
            {objective.icon}
          </div>
          <div className="text-right">
            <p className="text-[20px] font-bold leading-none" style={{ color: objective.color }}>
              {objective.currentScore}
            </p>
            <p
              className="text-[10px] font-medium flex items-center gap-0.5 justify-end mt-0.5"
              style={{ color: objective.trend >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}
            >
              {objective.trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {Math.abs(objective.trend).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 pt-2">
        <p className="text-[13px] font-medium leading-tight mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
          {objective.name}
        </p>
        <p className="text-[10px] mb-2" style={{ color: objective.color }}>
          {objective.marketName.split(' ').slice(0, 3).join(' ')}
        </p>

        <div className="flex items-center gap-1 text-[10px] mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
          <span>weight {Math.round(objective.weight * 100)}%</span>
          <span>·</span>
          <span>{objective.presenceName}</span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="text-[11px] leading-snug mt-2 mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {objective.description}
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onOpenChat?.(objective.id); }}
                className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5"
                style={{ background: `${objective.color}18`, color: objective.color, border: `1px solid ${objective.color}40` }}
              >
                <MessageCircle size={11} />
                Chat with {objective.presenceName}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
