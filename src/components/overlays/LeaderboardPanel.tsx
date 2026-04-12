'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Heart, Shield } from 'lucide-react';
import { leaderboard } from '@/data/mockData';

type LeaderboardTab = 'total' | 'value' | 'benefits';

interface LeaderboardPanelProps {
  onClose: () => void;
}

export default function LeaderboardPanel({ onClose }: LeaderboardPanelProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('total');

  const sorted = [...leaderboard].sort((a, b) => {
    if (activeTab === 'value') return b.valueScore - a.valueScore;
    if (activeTab === 'benefits') return b.benefitScore - a.benefitScore;
    return b.totalScore - a.totalScore;
  });

  const tabConfig = {
    total: { label: 'Total', icon: <Shield size={12} />, color: '#03CCDA' },
    value: { label: 'Value', icon: <TrendingUp size={12} />, color: '#FFCA00' },
    benefits: { label: 'Benefits', icon: <Heart size={12} />, color: '#EC008C' },
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col"
      style={{ background: 'var(--color-background)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
        <h1 className="text-[26px] tracking-wide" style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-primary)', fontWeight: 700 }}>
          Leaderboard
        </h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'var(--color-surface)' }}>
          <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 pb-4">
        {(['total', 'value', 'benefits'] as LeaderboardTab[]).map(tab => {
          const cfg = tabConfig[tab];
          const isActive = activeTab === tab;
          return (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-medium"
              style={{
                background: isActive ? `${cfg.color}15` : 'var(--color-surface)',
                color: isActive ? cfg.color : 'var(--color-text-tertiary)',
                border: `1px solid ${isActive ? cfg.color + '40' : 'var(--color-border-subtle)'}`,
              }}
            >
              {cfg.icon}
              {cfg.label}
            </motion.button>
          );
        })}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 pb-10" style={{ scrollbarWidth: 'none' }}>
        {sorted.map((entry, i) => {
          const scoreVal = activeTab === 'value' ? entry.valueScore
            : activeTab === 'benefits' ? entry.benefitScore
            : entry.totalScore;
          const cfg = tabConfig[activeTab];

          return (
            <motion.div
              key={entry.memberId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-3"
              style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
            >
              {/* Rank */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                style={{
                  background: i < 3 ? `${cfg.color}20` : 'rgba(255,255,255,0.06)',
                  color: i < 3 ? cfg.color : 'var(--color-text-tertiary)',
                }}
              >
                {i + 1}
              </div>

              {/* Avatar */}
              <span className="text-lg flex-shrink-0">{entry.avatar}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {entry.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    V:{entry.valueScore}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    B:{entry.benefitScore}
                  </span>
                </div>
              </div>

              {/* Score */}
              <span className="text-[15px] font-bold flex-shrink-0" style={{ color: cfg.color }}>
                {scoreVal.toLocaleString()}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
