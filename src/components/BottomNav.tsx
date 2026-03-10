'use client';

import { MessageCircle, Play, Gamepad2, ShoppingBag, Vault } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabId = 'chat' | 'media' | 'games' | 'shop' | 'vault';

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; Icon: typeof MessageCircle }[] = [
  { id: 'chat', label: 'Chat', Icon: MessageCircle },
  { id: 'media', label: 'Media', Icon: Play },
  { id: 'games', label: 'Games', Icon: Gamepad2 },
  { id: 'shop', label: 'Shop', Icon: ShoppingBag },
  { id: 'vault', label: 'Vault', Icon: Vault },
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
          style={{ color: active === id ? 'var(--color-accent-gold)' : 'var(--color-text-tertiary)' }}
        >
          <Icon size={22} strokeWidth={active === id ? 2 : 1.5} />
          <span className="nav-label">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
