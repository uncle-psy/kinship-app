'use client';

import { MessageCircle, Waves, Search, Vote, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabId = 'chat' | 'flow' | 'seek' | 'vote' | 'earn';

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; Icon: typeof MessageCircle }[] = [
  { id: 'chat', label: 'Chat', Icon: MessageCircle },
  { id: 'flow', label: 'Flow', Icon: Waves },
  { id: 'seek', label: 'Seek', Icon: Search },
  { id: 'vote', label: 'Vote', Icon: Vote },
  { id: 'earn', label: 'Earn', Icon: Coins },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="bottom-nav">
      {tabs.map(({ id, label, Icon }) => (
        <motion.button
          key={id}
          className={`nav-item ${active === id ? 'active' : ''}`}
          onClick={() => onChange(id)}
          whileTap={{ scale: 0.85 }}
          style={{ color: active === id ? 'var(--color-accent-teal)' : 'var(--color-text-tertiary)' }}
        >
          <Icon size={22} strokeWidth={active === id ? 2 : 1.5} />
          <span className="nav-label">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
