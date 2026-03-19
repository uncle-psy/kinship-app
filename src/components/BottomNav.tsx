'use client';

import { MessageCircle, Waves, Compass, Coins, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabId = 'chat' | 'media' | 'explore' | 'vault' | 'make';

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; Icon: typeof MessageCircle }[] = [
  { id: 'chat',    label: 'Chat',    Icon: MessageCircle },
  { id: 'media',   label: 'Flow',    Icon: Waves },
  { id: 'explore', label: 'Explore', Icon: Compass },
  { id: 'vault',   label: 'Earn',    Icon: Coins },
  { id: 'make',    label: 'Make',    Icon: Wand2 },
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
