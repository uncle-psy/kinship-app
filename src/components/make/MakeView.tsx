'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Zap, Star, Cpu,
  Globe, Lock, Users,
  ChevronRight, Pencil, FlaskConical, CheckCircle,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

type CreationType  = 'Project' | 'Offering' | 'Experience' | 'Agent';
type CreationStatus = 'Draft' | 'Testing' | 'Published';
type Visibility    = 'Secret' | 'Private' | 'Public';

interface Creation {
  id: string;
  type: CreationType;
  name: string;
  description: string;
  status: CreationStatus;
  visibility?: Visibility;
  updatedAt: string;
  emoji: string;
}

// ── Config ───────────────────────────────────────────────────────────────────

const typeConfig: Record<CreationType, { color: string; bg: string; icon: React.ReactNode }> = {
  Project:    { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)',    icon: <Layers size={10} /> },
  Offering:   { color: '#A78BBA', bg: 'rgba(167,139,186,0.18)', icon: <Zap size={10} /> },
  Experience: { color: '#EC008C', bg: 'rgba(236,0,140,0.15)',   icon: <Star size={10} /> },
  Agent:      { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)',   icon: <Cpu size={10} /> },
};

const statusConfig: Record<CreationStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  Draft:     { color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.06)', icon: <Pencil size={9} /> },
  Testing:   { color: '#FFCA00',               bg: 'rgba(255,202,0,0.12)',   icon: <FlaskConical size={9} /> },
  Published: { color: '#00EB7A',               bg: 'rgba(0,235,122,0.12)',   icon: <CheckCircle size={9} /> },
};

const visibilityConfig: Record<Visibility, { icon: React.ReactNode; label: string }> = {
  Secret:  { icon: <Lock size={9} />,  label: 'Secret' },
  Private: { icon: <Users size={9} />, label: 'Private' },
  Public:  { icon: <Globe size={9} />, label: 'Public' },
};

// ── Mock data ────────────────────────────────────────────────────────────────

const createOptions: { type: CreationType; emoji: string; description: string }[] = [
  { type: 'Project',    emoji: '📋', description: 'Research or open initiative' },
  { type: 'Experience', emoji: '✨', description: 'Event, journey, or program' },
  { type: 'Offering',   emoji: '🛍️', description: 'Product or service to share' },
  { type: 'Agent',      emoji: '🤖', description: 'AI agent with a specific role' },
];

const mockCreations: Creation[] = [
  {
    id: 'c1',
    type: 'Agent',
    name: '@PACE Wellness Agent',
    description: 'Personal wellness coach that plans, tracks, and adapts to your biometric data. Integrates with Wellness Dashboard and Health Data Hub.',
    status: 'Published',
    visibility: 'Public',
    updatedAt: '2h ago',
    emoji: '🤖',
  },
  {
    id: 'c2',
    type: 'Experience',
    name: 'Deep Cold Protocol',
    description: '21-day guided cold exposure journey with daily check-ins, progressive targets, and community accountability.',
    status: 'Testing',
    updatedAt: '5h ago',
    emoji: '🧊',
  },
  {
    id: 'c3',
    type: 'Project',
    name: 'EMF Resilience Guide',
    description: 'Open-source research compiling EMF reduction strategies, protective protocols, and community-tested findings.',
    status: 'Draft',
    updatedAt: '1d ago',
    emoji: '🛡️',
  },
  {
    id: 'c4',
    type: 'Offering',
    name: 'Himalayan Mineral Stack',
    description: 'Curated supplementation protocol based on Ayurvedic tradition — sourced, tested, and community-reviewed.',
    status: 'Draft',
    updatedAt: '2d ago',
    emoji: '⛰️',
  },
];

// ── Main view ────────────────────────────────────────────────────────────────

export default function MakeView() {
  return (
    <div className="content-area px-5 pt-2 pb-4">
      {/* Ambient */}
      <div
        className="ambient-orb"
        style={{ width: 200, height: 200, background: 'var(--color-accent-coral)', top: -40, right: -60 }}
      />

      {/* Studio Agent */}
      <StudioAgent />

      {/* My Creations */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
          My Creations
        </h2>
        <span className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
          {mockCreations.length} items
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {mockCreations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <CreationCard creation={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Studio Agent card ─────────────────────────────────────────────────────────

function StudioAgent() {
  const [selected, setSelected] = useState<CreationType | null>(null);

  return (
    <div
      className="rounded-2xl p-4 mb-5"
      style={{
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      {/* Agent header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]"
          style={{ background: 'linear-gradient(135deg, #6536B4 0%, #EC008C 100%)' }}
        >
          ✦
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Studio Agent
          </p>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            Your creation partner
          </p>
        </div>
        <div className="w-2 h-2 rounded-full" style={{ background: '#00EB7A', boxShadow: '0 0 6px #00EB7A' }} />
      </div>

      {/* Agent message */}
      <div
        className="rounded-xl px-4 py-3 mb-3"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border-subtle)' }}
      >
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {selected
            ? `Let's build a${selected === 'Agent' || selected === 'Experience' || selected === 'Offering' ? 'n' : ''} ${selected}. What's the core idea?`
            : "What would you like to create today? I'll help you shape it, test it, and publish it to the network."}
        </p>
      </div>

      {/* Create type options */}
      <div className="grid grid-cols-2 gap-2">
        {createOptions.map(opt => {
          const cfg = typeConfig[opt.type];
          const isActive = selected === opt.type;
          return (
            <motion.button
              key={opt.type}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelected(isActive ? null : opt.type)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-left"
              style={{
                background: isActive ? cfg.bg : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? cfg.color + '50' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              <span className="text-lg leading-none">{opt.emoji}</span>
              <div>
                <p className="text-[12px] font-medium leading-tight" style={{ color: isActive ? cfg.color : 'var(--color-text-primary)' }}>
                  {opt.type}
                </p>
                <p className="text-[10px] leading-snug mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  {opt.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Start button */}
      <AnimatePresence>
        {selected && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-3 py-2.5 rounded-xl text-[13px] font-medium overflow-hidden"
            style={{
              background: typeConfig[selected].bg,
              color: typeConfig[selected].color,
              border: `1px solid ${typeConfig[selected].color}40`,
            }}
          >
            Start creating →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Creation card ─────────────────────────────────────────────────────────────

function CreationCard({ creation }: { creation: Creation }) {
  const [expanded, setExpanded] = useState(false);
  const typeCfg   = typeConfig[creation.type];
  const statusCfg = statusConfig[creation.status];

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--color-surface-card)',
        border: expanded
          ? `1px solid ${typeCfg.color}40`
          : '1px solid var(--color-border-subtle)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setExpanded(e => !e)}
      layout
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Emoji icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: typeCfg.bg }}
          >
            {creation.emoji}
          </div>

          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
              {/* Type badge */}
              <div
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
                style={{ background: typeCfg.bg, color: typeCfg.color, border: `1px solid ${typeCfg.color}30` }}
              >
                {typeCfg.icon}
                <span className="ml-0.5">{creation.type}</span>
              </div>
              {/* Status badge */}
              <div
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                style={{ background: statusCfg.bg, color: statusCfg.color }}
              >
                {statusCfg.icon}
                <span className="ml-0.5">{creation.status}</span>
              </div>
              {/* Visibility badge (published only) */}
              {creation.visibility && (
                <div
                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                >
                  {visibilityConfig[creation.visibility].icon}
                  <span className="ml-0.5">{creation.visibility}</span>
                </div>
              )}
            </div>

            <h4 className="text-[13px] font-medium leading-tight" style={{ color: 'var(--color-text-primary)' }}>
              {creation.name}
            </h4>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
              Updated {creation.updatedAt}
            </p>
          </div>

          <ChevronRight
            size={14}
            style={{
              color: 'var(--color-text-tertiary)',
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              flexShrink: 0,
              marginTop: 2,
            }}
          />
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p
                className="text-[12px] leading-relaxed mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {creation.description}
              </p>

              {/* Action buttons */}
              <div className="flex gap-2 mb-3">
                {creation.status === 'Draft' && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-xl text-[11px] font-medium"
                      style={{ background: 'rgba(255,202,0,0.15)', color: '#FFCA00' }}
                    >
                      Start Testing
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-xl text-[11px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}
                    >
                      Edit
                    </motion.button>
                  </>
                )}
                {creation.status === 'Testing' && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-xl text-[11px] font-medium"
                      style={{ background: 'rgba(0,235,122,0.15)', color: '#00EB7A' }}
                    >
                      Publish
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-xl text-[11px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}
                    >
                      View Test
                    </motion.button>
                  </>
                )}
                {creation.status === 'Published' && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-xl text-[11px] font-medium"
                      style={{ background: 'rgba(3,204,218,0.15)', color: '#03CCDA' }}
                    >
                      View Live
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-xl text-[11px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}
                    >
                      Analytics
                    </motion.button>
                  </>
                )}
              </div>

              {/* Publish visibility (Draft + Testing only) */}
              {creation.status !== 'Published' && (
                <div
                  className="pt-3"
                  style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                >
                  <p className="text-[10px] mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                    Publish as:
                  </p>
                  <div className="flex gap-2">
                    {(['Secret', 'Private', 'Public'] as Visibility[]).map(v => {
                      const vcfg = visibilityConfig[v];
                      return (
                        <motion.button
                          key={v}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-medium"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border-subtle)',
                          }}
                        >
                          {vcfg.icon}
                          {v}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
