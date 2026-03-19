'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Cpu, Globe, Layers, Star, Zap } from 'lucide-react';

interface ShopViewProps {
  onOpenChat?: (id: string) => void;
}

type NetworkCategory = 'All' | 'Platforms' | 'Projects' | 'Experiences' | 'Offerings' | 'Agents' | 'Members';

type NetworkItemType = 'Platform' | 'Project' | 'Experience' | 'Offering' | 'Agent' | 'Member';

interface NetworkItem {
  id: string;
  type: NetworkItemType;
  name: string;
  description: string;
  gradient: string;
  emoji: string;
  meta: string;
  tags?: string[];
}

const typeConfig: Record<NetworkItemType, { color: string; bg: string; icon: React.ReactNode }> = {
  Platform: { color: '#03CCDA', bg: 'rgba(3,204,218,0.15)', icon: <Globe size={10} /> },
  Project:  { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)',  icon: <Layers size={10} /> },
  Experience: { color: '#EC008C', bg: 'rgba(236,0,140,0.15)', icon: <Star size={10} /> },
  Offering: { color: '#A78BBA', bg: 'rgba(167,139,186,0.18)', icon: <Zap size={10} /> },
  Agent:    { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)',  icon: <Cpu size={10} /> },
  Member:   { color: 'rgba(255,255,255,0.7)', bg: 'rgba(255,255,255,0.1)', icon: <Users size={10} /> },
};

const networkItems: NetworkItem[] = [
  // Platforms
  {
    id: 'kinship-connect',
    type: 'Platform',
    name: 'Kinship Connect',
    description: 'The social layer connecting wellness communities worldwide',
    gradient: 'linear-gradient(135deg, #09073a 0%, #03CCDA22 100%)',
    emoji: '🌐',
    meta: '12.4k members',
  },
  {
    id: 'wellness-dashboard',
    type: 'Platform',
    name: 'Wellness Dashboard',
    description: 'Unified view of your biomarkers, habits, and health data',
    gradient: 'linear-gradient(135deg, #0e0c50 0%, #4ECDC422 100%)',
    emoji: '📊',
    meta: '8.1k users',
  },
  {
    id: 'health-data-hub',
    type: 'Platform',
    name: 'Health Data Hub',
    description: 'Secure, interoperable personal health data vault',
    gradient: 'linear-gradient(135deg, #1a1860 0%, #6536B422 100%)',
    emoji: '🔐',
    meta: '5.3k users',
  },
  // Projects
  {
    id: 'longevity-protocol',
    type: 'Project',
    name: 'Longevity Protocol',
    description: 'Open-source research initiative on human healthspan extension',
    gradient: 'linear-gradient(135deg, #09073a 0%, #FFCA0022 100%)',
    emoji: '⏳',
    meta: '340 contributors',
  },
  {
    id: 'clean-water-collective',
    type: 'Project',
    name: 'Clean Water Collective',
    description: 'Community-driven effort for structured water access globally',
    gradient: 'linear-gradient(135deg, #0a1a40 0%, #00CED122 100%)',
    emoji: '💧',
    meta: '92 contributors',
  },
  {
    id: 'biohack-lab',
    type: 'Project',
    name: 'Biohack Lab',
    description: 'Distributed citizen science testing protocols and findings',
    gradient: 'linear-gradient(135deg, #120f50 0%, #E87B6B22 100%)',
    emoji: '🧪',
    meta: '215 contributors',
  },
  // Experiences
  {
    id: 'cold-plunge-masterclass',
    type: 'Experience',
    name: 'Cold Plunge Masterclass',
    description: 'Live guided cold exposure protocol with top coaches',
    gradient: 'linear-gradient(135deg, #003060 0%, #00CED180 100%)',
    emoji: '🧊',
    meta: 'Mar 22 · 48 going',
  },
  {
    id: 'breathwork-intensive',
    type: 'Experience',
    name: 'Breathwork Intensive',
    description: '3-day deep-dive into advanced breathwork techniques',
    gradient: 'linear-gradient(135deg, #1a0a40 0%, #EC008C40 100%)',
    emoji: '🌬️',
    meta: 'Apr 5 · 120 going',
  },
  {
    id: 'sound-healing',
    type: 'Experience',
    name: 'Sound Healing Circle',
    description: 'Live sound bath with crystal bowls and binaural beats',
    gradient: 'linear-gradient(135deg, #0a0a30 0%, #6536B460 100%)',
    emoji: '🎵',
    meta: 'Weekly · 33 going',
  },
  {
    id: 'wellness-quest',
    type: 'Experience',
    name: 'Wellness Quest',
    description: 'Build your wellness sanctuary in an isometric world',
    gradient: 'linear-gradient(135deg, #7EB8A8 0%, #2D5A4E 100%)',
    emoji: '🏯',
    meta: '1,243 playing',
  },
  {
    id: 'mind-garden',
    type: 'Experience',
    name: 'Mind Garden',
    description: 'Grow a meditative garden that reflects your practice',
    gradient: 'linear-gradient(135deg, #A78BBA 0%, #6B4D8A 100%)',
    emoji: '🌸',
    meta: '892 playing · New',
  },
  {
    id: 'energy-flow',
    type: 'Experience',
    name: 'Energy Flow',
    description: 'Navigate energy pathways in a chakra-inspired world',
    gradient: 'linear-gradient(135deg, #E87B6B 0%, #C0392B 100%)',
    emoji: '⚡',
    meta: '2,107 playing',
  },
  // Offerings
  {
    id: 'lajit-gold',
    type: 'Offering',
    name: 'Lajit Gold',
    description: 'Sherpa-sourced Himalayan gold-grade shilajit resin',
    gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6914 100%)',
    emoji: '🏔️',
    meta: '$45–$100 · 36% back',
  },
  {
    id: 'lumaflex',
    type: 'Offering',
    name: 'LumaFlex',
    description: 'Portable red light therapy for consistent results',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #C0392B 100%)',
    emoji: '🔴',
    meta: '$599–$689 · 31.5% back',
  },
  {
    id: 'spiro-emf',
    type: 'Offering',
    name: 'Spiro EMF',
    description: 'Patented SPIRO system neutralizing EMF disturbances',
    gradient: 'linear-gradient(135deg, #6B5B95 0%, #3D2F5C 100%)',
    emoji: '🛡️',
    meta: '$65–$850 · 36% back',
  },
  {
    id: 'high-vibe-mushrooms',
    type: 'Offering',
    name: 'High Vibe Mushrooms',
    description: 'Full spectrum proprietary medicinal mushroom blend',
    gradient: 'linear-gradient(135deg, #8B5E3C 0%, #D4A574 100%)',
    emoji: '🍄',
    meta: '$69–$79 · 36% back',
  },
  // Agents
  {
    id: 'agent-pace',
    type: 'Agent',
    name: '@PACE',
    description: 'Your personal wellness coach — plans, tracks, adapts',
    gradient: 'linear-gradient(135deg, #003020 0%, #00EB7A22 100%)',
    emoji: '🤖',
    meta: '4.9★ · 2.1k sessions',
  },
  {
    id: 'agent-kin',
    type: 'Agent',
    name: '@KIN',
    description: 'Community intelligence — connects you to the right people',
    gradient: 'linear-gradient(135deg, #09073a 0%, #03CCDA22 100%)',
    emoji: '🧠',
    meta: '4.8★ · 1.8k sessions',
  },
  {
    id: 'agent-fdn',
    type: 'Agent',
    name: '@FDN',
    description: 'Functional diagnostics — interprets your labs and biomarkers',
    gradient: 'linear-gradient(135deg, #1a1030 0%, #A78BBA30 100%)',
    emoji: '🔬',
    meta: '4.7★ · 940 sessions',
  },
  // Members
  {
    id: 'member-sarah',
    type: 'Member',
    name: 'Dr. Sarah Chen',
    description: 'Integrative MD · Longevity & functional medicine specialist',
    gradient: 'linear-gradient(135deg, #1a1060 0%, #7EB8A820 100%)',
    emoji: '👩‍⚕️',
    meta: '2.4k followers',
  },
  {
    id: 'member-marcus',
    type: 'Member',
    name: 'Marcus Thompson',
    description: 'Biohacker · Cold exposure & HRV optimization researcher',
    gradient: 'linear-gradient(135deg, #0a1a30 0%, #4ECDC420 100%)',
    emoji: '🧬',
    meta: '1.7k followers',
  },
  {
    id: 'member-priya',
    type: 'Member',
    name: 'Priya Patel',
    description: 'Wellness Coach · Breathwork, movement & nervous system',
    gradient: 'linear-gradient(135deg, #1a0a30 0%, #EC008C20 100%)',
    emoji: '🧘‍♀️',
    meta: '3.1k followers',
  },
];

const CATEGORIES: NetworkCategory[] = ['All', 'Platforms', 'Projects', 'Experiences', 'Offerings', 'Agents', 'Members'];

const categoryTypeMap: Record<NetworkCategory, NetworkItemType | null> = {
  All: null,
  Platforms: 'Platform',
  Projects: 'Project',
  Experiences: 'Experience',
  Offerings: 'Offering',
  Agents: 'Agent',
  Members: 'Member',
};

export default function ShopView({ onOpenChat }: ShopViewProps) {
  const [activeCategory, setActiveCategory] = useState<NetworkCategory>('All');

  const filtered = categoryTypeMap[activeCategory] === null
    ? networkItems
    : networkItems.filter(item => item.type === categoryTypeMap[activeCategory]);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      {/* Ambient */}
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
        <span className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>Search the network...</span>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`gathering-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Network grid */}
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
              <NetworkCard item={item} onOpenChat={onOpenChat} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NetworkCard({ item, onOpenChat }: { item: NetworkItem; onOpenChat?: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = typeConfig[item.type];

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--color-surface-card)',
        border: expanded ? `1px solid ${cfg.color}50` : '1px solid var(--color-border-subtle)',
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setExpanded(e => !e)}
      layout
    >
      {/* Visual header */}
      <div
        className="h-24 flex items-center justify-center relative overflow-hidden"
        style={{ background: item.gradient }}
      >
        {/* Subtle glow blob */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${cfg.color}18 0%, transparent 70%)`,
          }}
        />
        <span className="text-3xl z-10">{item.emoji}</span>

        {/* Type badge */}
        <div
          className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
          style={{ background: cfg.bg, color: cfg.color, backdropFilter: 'blur(8px)', border: `1px solid ${cfg.color}30` }}
        >
          {cfg.icon}
          {item.type}
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
        <p className="text-[11px] font-medium" style={{ color: cfg.color }}>
          {item.meta}
        </p>
      </div>

      {/* Expanded action */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onOpenChat?.(item.id); }}
                className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5"
                style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
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
