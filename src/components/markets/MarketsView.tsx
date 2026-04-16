'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, Target, ScrollText, Users } from 'lucide-react';
import { markets, objectives, proposals, type Market } from '@/data/mockData';

interface MarketsViewProps {
  onOpenChat?: (threadId: string) => void;
}

export default function MarketsView({ onOpenChat }: MarketsViewProps) {
  const [activeMarketId, setActiveMarketId] = useState<string | null>(null);

  if (activeMarketId) {
    const market = markets.find(m => m.id === activeMarketId);
    if (market) {
      return (
        <MarketDetail
          market={market}
          onBack={() => setActiveMarketId(null)}
          onOpenChat={onOpenChat}
        />
      );
    }
  }

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 180, height: 180, background: 'var(--color-accent-sage)', top: -40, left: -60 }}
      />

      <p className="text-[12px] mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
        Three Sponsors designed three Markets. Tap any one to meet its Operator, see its Objectives, and review its Proposals.
      </p>

      <div className="flex flex-col gap-4">
        {markets.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <MarketCard market={m} onTap={() => setActiveMarketId(m.id)} onChat={() => onOpenChat?.(m.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MarketCard({
  market, onTap, onChat,
}: {
  market: Market;
  onTap: () => void;
  onChat: () => void;
}) {
  const phaseColors: Record<Market['stage'], { color: string; bg: string }> = {
    Design: { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)' },
    Decide: { color: '#03CCDA', bg: 'rgba(3,204,218,0.15)' },
    Deploy: { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)' },
  };
  const phaseCfg = phaseColors[market.stage];
  const marketObjectives = objectives.filter(o => o.marketId === market.id);
  const marketProposals = proposals.filter(p => p.marketId === market.id);

  return (
    <motion.div
      className="media-card"
      whileTap={{ scale: 0.97 }}
      onClick={onTap}
    >
      <div className="relative" style={{ background: market.gradient }}>
        <div className="h-44 flex items-center justify-center relative overflow-hidden">
          {/* cover art */}
          <div className="absolute inset-0" style={{ background: market.coverArt }} />

          {/* Big avatar + name */}
          <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}
            >
              {market.avatar}
            </div>
            <div className="text-[12px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {market.sponsor}
            </div>
          </div>

          {/* Phase badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: phaseCfg.bg, backdropFilter: 'blur(10px)', color: phaseCfg.color }}
          >
            {market.stage}
          </div>
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.85)' }}
          >
            {market.fundingMode}
          </div>
        </div>

        <div className="p-4" style={{ background: 'var(--color-surface-card)' }}>
          <h3 className="text-[17px] font-medium leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {market.name}
          </h3>
          <p className="text-[12px] mb-3 leading-snug" style={{ color: 'var(--color-text-tertiary)' }}>
            {market.tagline}
          </p>

          <div className="flex items-center gap-3 mb-3 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="flex items-center gap-1">
              <Target size={11} style={{ color: market.color }} />
              <span className="font-medium">{marketObjectives.length}</span> Objectives
            </span>
            <span className="flex items-center gap-1">
              <ScrollText size={11} style={{ color: market.color }} />
              <span className="font-medium">{marketProposals.length}</span> Proposals
            </span>
            <span className="flex items-center gap-1">
              <Users size={11} style={{ color: market.color }} />
              <span className="font-medium">{market.members.toLocaleString()}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onChat(); }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full"
              style={{ background: `${market.color}18`, color: market.color, border: `1px solid ${market.color}40` }}
            >
              <MessageCircle size={12} />
              Chat with Operator
            </motion.button>
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
              Open Market →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarketDetail({
  market, onBack, onOpenChat,
}: {
  market: Market;
  onBack: () => void;
  onOpenChat?: (threadId: string) => void;
}) {
  const marketObjectives = objectives.filter(o => o.marketId === market.id);
  const marketProposals = proposals.filter(p => p.marketId === market.id);

  return (
    <div className="content-area px-0 pt-0 pb-4">
      {/* Banner */}
      <div className="relative h-40" style={{ background: market.gradient }}>
        <div className="absolute inset-0" style={{ background: market.coverArt }} />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
        >
          <ArrowLeft size={16} style={{ color: 'white' }} />
        </motion.button>
        <div className="absolute bottom-3 left-4 right-4">
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2"
            style={{ background: 'rgba(0,0,0,0.45)', color: market.color, backdropFilter: 'blur(10px)' }}
          >
            {market.stage} · {market.fundingMode}
          </div>
          <h2 className="text-[22px] font-semibold" style={{ color: 'white' }}>
            {market.name}
          </h2>
        </div>
      </div>

      <div className="px-5 pt-4">
        {/* Mission */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}
        >
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
            Mission
          </p>
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            {market.mission}
          </p>

          <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: `${market.color}18`, border: `1.5px solid ${market.color}40` }}
            >
              {market.operatorPresence}
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                Operator
              </p>
              <p className="text-[14px] font-medium" style={{ color: market.color }}>
                {market.operatorName}
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenChat?.(market.id)}
              className="px-3 py-2 rounded-full text-[12px] font-medium flex items-center gap-1.5"
              style={{ background: `${market.color}18`, color: market.color, border: `1px solid ${market.color}40` }}
            >
              <MessageCircle size={12} /> Chat
            </motion.button>
          </div>
        </div>

        {/* Objectives */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--color-text-tertiary)' }}>
          Objective Vector
        </p>
        <div className="flex flex-col gap-2 mb-5">
          {marketObjectives.map(o => (
            <motion.button
              key={o.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenChat?.(o.id)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl text-left"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: `${o.color}18`, border: `1.5px solid ${o.color}40` }}
              >
                {o.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {o.name}
                  </p>
                  <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    weight {Math.round(o.weight * 100)}%
                  </span>
                </div>
                <p className="text-[11px] truncate" style={{ color: 'var(--color-text-tertiary)' }}>
                  {o.presenceName} · {o.lastMessage}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[14px] font-bold" style={{ color: o.color }}>{o.currentScore}</p>
                <p className="text-[10px]" style={{ color: o.trend >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {o.trend >= 0 ? '+' : ''}{o.trend.toFixed(1)}%
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Proposals */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--color-text-tertiary)' }}>
          Live Proposals
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {marketProposals.map(p => (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenChat?.(p.id)}
              className="w-full text-left p-3 rounded-2xl"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    background:
                      p.status === 'active' ? 'rgba(3,204,218,0.15)'
                      : p.status === 'passed' ? 'rgba(0,235,122,0.15)'
                      : p.status === 'rejected' ? 'rgba(255,58,58,0.15)'
                      : 'rgba(255,202,0,0.15)',
                    color:
                      p.status === 'active' ? '#03CCDA'
                      : p.status === 'passed' ? '#00EB7A'
                      : p.status === 'rejected' ? '#FF3A3A'
                      : '#FFCA00',
                  }}
                >
                  {p.status}
                </span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ background: `${market.color}18`, color: market.color }}
                >
                  {p.phase}
                </span>
              </div>
              <p className="text-[13px] font-medium leading-snug mb-2" style={{ color: 'var(--color-text-primary)' }}>
                {p.title}
              </p>
              {p.status === 'active' && (
                <div className="flex items-center gap-3 text-[11px]">
                  <span style={{ color: 'var(--color-success)' }}>Pass {p.passPrice.toFixed(2)}</span>
                  <span style={{ color: 'var(--color-danger)' }}>Fail {p.failPrice.toFixed(2)}</span>
                  <span className="ml-auto" style={{ color: 'var(--color-text-tertiary)' }}>
                    {p.participants.toLocaleString()} Electors
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
