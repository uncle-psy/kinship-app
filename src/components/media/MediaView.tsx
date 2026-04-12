'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, ArrowLeft } from 'lucide-react';
import { flowCategories, flowItems, type FlowItem } from '@/data/mockData';

interface MediaViewProps {
  onOpenChat?: (id: string) => void;
}

export default function MediaView({ onOpenChat }: MediaViewProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? flowItems
    : flowItems.filter(f => f.category === activeCategory);

  if (activeFlow) {
    const flow = flowItems.find(f => f.id === activeFlow);
    if (flow) {
      return <FlowSimulation flow={flow} onBack={() => setActiveFlow(null)} />;
    }
  }

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 180, height: 180, background: 'var(--color-accent-sage)', top: -40, left: -60 }}
      />

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {flowCategories.map(c => (
          <button
            key={c.id}
            className={`gathering-pill ${activeCategory === c.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Flow cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <FlowCard item={item} onTap={() => setActiveFlow(item.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FlowCard({ item, onTap }: { item: FlowItem; onTap: () => void }) {
  const stageColors = {
    Build: { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)' },
    Launch: { color: '#03CCDA', bg: 'rgba(3,204,218,0.15)' },
    Scale: { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)' },
  };
  const stageCfg = stageColors[item.stage];

  return (
    <motion.div
      className="media-card"
      whileTap={{ scale: 0.97 }}
      onClick={onTap}
    >
      {/* Visual area */}
      <div className="relative" style={{ background: item.gradient }}>
        <div className="h-44 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ opacity: 0.1 }}>
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full" style={{ background: 'white', filter: 'blur(30px)' }} />
            <div className="absolute bottom-4 right-8 w-32 h-32 rounded-full" style={{ background: 'white', filter: 'blur(40px)' }} />
          </div>

          {/* Isometric preview hint */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="iso-preview" style={{ transform: 'rotateX(45deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-sm"
                    style={{
                      background: `rgba(255,255,255,${0.05 + Math.random() * 0.12})`,
                      transform: `translateZ(${Math.random() * 8}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tap to enter simulation
            </span>
          </div>

          {/* Category badge */}
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.85)' }}
          >
            {item.category}
          </div>

          {/* Stage badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: stageCfg.bg, backdropFilter: 'blur(10px)', color: stageCfg.color }}
          >
            {item.stage}
          </div>
        </div>

        {/* Info section */}
        <div className="p-4" style={{ background: 'var(--color-surface-card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {item.projectName}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>&middot; {item.founder}</span>
          </div>

          <h3 className="text-[15px] font-medium leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {item.title}
          </h3>
          <p className="text-[12px] mb-2" style={{ color: 'var(--color-text-tertiary)' }}>{item.description}</p>

          {/* Flows in this project */}
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {item.flows.map(f => (
              <span
                key={f}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
              <Send size={13} />
              Send
            </button>
            <div className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--color-accent-teal)' }}>
              <Users size={13} />
              <span className="font-medium">{item.activeMembers}</span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>participating</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── 2.5D Isometric Simulation View ──────────────────────────────────────────

function FlowSimulation({ flow, onBack }: { flow: FlowItem; onBack: () => void }) {
  const envConfig: Record<string, { tiles: { emoji: string; label: string }[]; bgGrad: string }> = {
    farm: {
      tiles: [
        { emoji: '🌾', label: 'Crop Field' },
        { emoji: '🤖', label: 'AI Monitor' },
        { emoji: '🌍', label: 'Satellite' },
        { emoji: '🧑‍🌾', label: 'Farmer' },
        { emoji: '💧', label: 'Irrigation' },
        { emoji: '📊', label: 'Analytics' },
        { emoji: '🌱', label: 'Seedlings' },
        { emoji: '☀️', label: 'Weather' },
        { emoji: '🏠', label: 'Storehouse' },
      ],
      bgGrad: 'linear-gradient(135deg, #0a2a0a 0%, #1a3a1a 50%, #0a2a1a 100%)',
    },
    office: {
      tiles: [
        { emoji: '💻', label: 'Terminal' },
        { emoji: '📋', label: 'Loan Desk' },
        { emoji: '🤖', label: 'AI Review' },
        { emoji: '👥', label: 'Community' },
        { emoji: '📊', label: 'Dashboard' },
        { emoji: '🏦', label: 'Treasury' },
        { emoji: '📱', label: 'Mobile App' },
        { emoji: '🤝', label: 'Meeting' },
        { emoji: '🔐', label: 'Vault' },
      ],
      bgGrad: 'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 50%, #0a1a3a 100%)',
    },
    clinic: {
      tiles: [
        { emoji: '🏥', label: 'Reception' },
        { emoji: '📺', label: 'Telehealth' },
        { emoji: '🤖', label: 'AI Triage' },
        { emoji: '👩‍⚕️', label: 'Doctor' },
        { emoji: '🩺', label: 'Exam Room' },
        { emoji: '💊', label: 'Pharmacy' },
        { emoji: '🧑', label: 'Patient' },
        { emoji: '📋', label: 'Records' },
        { emoji: '🚑', label: 'Emergency' },
      ],
      bgGrad: 'linear-gradient(135deg, #2a0a1a 0%, #3a1a2a 50%, #2a0a2a 100%)',
    },
    lab: {
      tiles: [
        { emoji: '🔬', label: 'Microscope' },
        { emoji: '🧫', label: 'Cultures' },
        { emoji: '🤖', label: 'AI Seq.' },
        { emoji: '🧪', label: 'Testing' },
        { emoji: '📊', label: 'Results' },
        { emoji: '🌱', label: 'Samples' },
        { emoji: '💻', label: 'Analysis' },
        { emoji: '👩‍🔬', label: 'Researcher' },
        { emoji: '📦', label: 'Storage' },
      ],
      bgGrad: 'linear-gradient(135deg, #1a0a2a 0%, #2a1a3a 50%, #1a0a3a 100%)',
    },
    classroom: {
      tiles: [
        { emoji: '📚', label: 'Library' },
        { emoji: '🤖', label: 'AI Tutor' },
        { emoji: '👩‍🏫', label: 'Teacher' },
        { emoji: '📱', label: 'Tablet' },
        { emoji: '🧑‍🎓', label: 'Student' },
        { emoji: '📊', label: 'Progress' },
        { emoji: '🎮', label: 'Game Lab' },
        { emoji: '👥', label: 'Group' },
        { emoji: '🏫', label: 'School' },
      ],
      bgGrad: 'linear-gradient(135deg, #2a1a0a 0%, #3a2a1a 50%, #2a1a1a 100%)',
    },
    'city-hall': {
      tiles: [
        { emoji: '🏛️', label: 'Council' },
        { emoji: '📊', label: 'Budget' },
        { emoji: '🤖', label: 'AI Audit' },
        { emoji: '👥', label: 'Public' },
        { emoji: '📋', label: 'Policy' },
        { emoji: '💰', label: 'Funds' },
        { emoji: '🗳️', label: 'Voting' },
        { emoji: '📱', label: 'Portal' },
        { emoji: '🏗️', label: 'Projects' },
      ],
      bgGrad: 'linear-gradient(135deg, #0a1a2a 0%, #1a2a2a 50%, #0a2a2a 100%)',
    },
    marketplace: {
      tiles: [
        { emoji: '🏪', label: 'Shop' },
        { emoji: '🤖', label: 'AI Match' },
        { emoji: '🎨', label: 'Artisan' },
        { emoji: '📦', label: 'Shipping' },
        { emoji: '💳', label: 'Payment' },
        { emoji: '⭐', label: 'Reviews' },
        { emoji: '👥', label: 'Community' },
        { emoji: '🌍', label: 'Global' },
        { emoji: '📊', label: 'Impact' },
      ],
      bgGrad: 'linear-gradient(135deg, #2a0a1a 0%, #3a1a1a 50%, #2a1a0a 100%)',
    },
    housing: {
      tiles: [
        { emoji: '🏠', label: 'Home' },
        { emoji: '📋', label: 'Trust Doc' },
        { emoji: '🤖', label: 'AI Match' },
        { emoji: '👥', label: 'Community' },
        { emoji: '💰', label: 'Finance' },
        { emoji: '🏗️', label: 'Building' },
        { emoji: '🌳', label: 'Green' },
        { emoji: '📊', label: 'Equity' },
        { emoji: '🗳️', label: 'Govern' },
      ],
      bgGrad: 'linear-gradient(135deg, #2a1a0a 0%, #3a2a0a 50%, #2a2a0a 100%)',
    },
    workshop: {
      tiles: [
        { emoji: '🔧', label: 'Tools' },
        { emoji: '🤖', label: 'AI Assist' },
        { emoji: '📋', label: 'Plans' },
        { emoji: '👷', label: 'Worker' },
        { emoji: '📦', label: 'Materials' },
        { emoji: '⚡', label: 'Power' },
        { emoji: '📊', label: 'QA' },
        { emoji: '🏭', label: 'Assembly' },
        { emoji: '🚛', label: 'Dispatch' },
      ],
      bgGrad: 'linear-gradient(135deg, #1a1a0a 0%, #2a2a1a 50%, #1a2a0a 100%)',
    },
    factory: {
      tiles: [
        { emoji: '⚛️', label: 'Quantum' },
        { emoji: '💧', label: 'Water In' },
        { emoji: '🤖', label: 'AI Control' },
        { emoji: '🔬', label: 'Testing' },
        { emoji: '📊', label: 'Metrics' },
        { emoji: '🧑‍🔬', label: 'Operator' },
        { emoji: '✨', label: 'Pure Out' },
        { emoji: '🏗️', label: 'Scale Up' },
        { emoji: '🌍', label: 'Distrib.' },
      ],
      bgGrad: 'linear-gradient(135deg, #0a2a1a 0%, #1a3a2a 50%, #0a2a2a 100%)',
    },
  };

  const env = envConfig[flow.environment] || envConfig.office;

  return (
    <div className="flex flex-col h-full" style={{ background: env.bgGrad }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}>
          <ArrowLeft size={20} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
        <div>
          <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{flow.title}</p>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            {flow.projectName} &middot; {flow.activeMembers} active
          </p>
        </div>
      </div>

      {/* Isometric environment */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {/* Background particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Isometric grid */}
        <div style={{ transform: 'rotateX(55deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
          <div className="grid grid-cols-3 gap-2">
            {env.tiles.map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transform: `translateZ(${i % 3 === 1 ? 12 : i % 2 === 0 ? 6 : 0}px)`,
                  transition: 'transform 0.3s, background 0.3s',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{tile.emoji}</span>
                <span className="text-[8px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {tile.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="px-4 py-3 flex-shrink-0" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1.5">
            {flow.flows.map(f => (
              <span
                key={f}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)' }}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--color-accent-teal)' }}>
            <Users size={12} />
            {flow.activeMembers}
          </div>
        </div>
        <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
          Move your Presence through the environment. Interact with agents and other members.
        </p>
      </div>
    </div>
  );
}
