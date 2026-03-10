'use client';

import { Bell, Settings, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export default function TopBar({ title, onBack, showBack }: TopBarProps) {
  return (
    <>
      {/* Status bar */}
      <div className="status-bar">
        <span style={{ color: 'var(--color-text-primary)' }}>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" style={{ color: 'var(--color-text-primary)' }}>
            <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.4" />
            <rect x="4" y="5" width="3" height="7" rx="0.5" opacity="0.6" />
            <rect x="8" y="3" width="3" height="9" rx="0.5" opacity="0.8" />
            <rect x="12" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <span style={{ fontSize: 12, color: 'var(--color-text-primary)' }}>5G</span>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor" style={{ color: 'var(--color-text-primary)' }}>
            <rect x="0" y="1" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="2" y="3" width="14" height="6" rx="1" fill="var(--color-success)" />
            <rect x="21" y="4" width="2" height="4" rx="0.5" />
          </svg>
        </div>
      </div>

      {/* App bar */}
      <div className="flex items-center justify-between px-5 py-3" style={{ flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          {showBack && onBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: 'var(--color-surface)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
          ) : null}
          <h1
            className="text-[22px] tracking-wide"
            style={{
              fontFamily: 'var(--font-brand)',
              color: title ? 'var(--color-text-primary)' : 'var(--color-accent-gold)',
            }}
          >
            {title || 'Kinship'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: 'var(--color-surface)' }}
          >
            <Radio size={16} style={{ color: 'var(--color-accent-sage)' }} />
            {/* Vibes pulse indicator */}
            <span
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--color-accent-sage)',
                boxShadow: '0 0 8px var(--color-accent-sage)',
                animation: 'pulse-slow 3s ease-in-out infinite',
              }}
            />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: 'var(--color-surface)' }}
          >
            <Bell size={16} style={{ color: 'var(--color-text-secondary)' }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
              style={{ background: 'var(--color-accent-coral)', color: 'white' }}
            >
              3
            </span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: 'var(--color-surface)' }}
          >
            <Settings size={16} style={{ color: 'var(--color-text-secondary)' }} />
          </motion.button>
        </div>
      </div>
    </>
  );
}
