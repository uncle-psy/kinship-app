'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp, MessageCircle, Wrench } from 'lucide-react';
import { proposals, objectives, markets, type Proposal } from '@/data/mockData';

interface ProposalsViewProps {
  onOpenChat?: (threadId: string) => void;
}

type Filter = 'all' | 'active' | 'passed' | 'pending';

export default function ProposalsView({ onOpenChat }: ProposalsViewProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [marketFilter, setMarketFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = proposals
    .filter(p => filter === 'all' ? true : p.status === filter)
    .filter(p => marketFilter === 'all' ? true : p.marketId === marketFilter);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 180, height: 180, background: 'var(--color-accent-lavender)', top: -40, right: -60 }}
      />

      <p className="text-[12px] mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
        Pass/Fail conditional markets. Electors price each proposal against the Market&apos;s objective vector. On Pass, Executor agents are commissioned.
      </p>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {(['all', 'active', 'pending', 'passed'] as Filter[]).map(f => (
          <button
            key={f}
            className={`gathering-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Market filter */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        <button
          className={`gathering-pill ${marketFilter === 'all' ? 'active' : ''}`}
          onClick={() => setMarketFilter('all')}
        >
          All Markets
        </button>
        {markets.map(m => (
          <button
            key={m.id}
            className={`gathering-pill ${marketFilter === m.id ? 'active' : ''}`}
            onClick={() => setMarketFilter(m.id)}
          >
            {m.avatar} {m.name.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <ProposalCard
              proposal={p}
              expanded={expandedId === p.id}
              onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
              onOpenChat={onOpenChat}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProposalCard({
  proposal, expanded, onToggle, onOpenChat,
}: {
  proposal: Proposal;
  expanded: boolean;
  onToggle: () => void;
  onOpenChat?: (threadId: string) => void;
}) {
  const statusConfig = {
    active:   { color: '#03CCDA', bg: 'rgba(3,204,218,0.15)', label: 'Active' },
    passed:   { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)', label: 'Passed' },
    rejected: { color: '#FF3A3A', bg: 'rgba(255,58,58,0.15)', label: 'Rejected' },
    pending:  { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)', label: 'Pending' },
  };
  const sCfg = statusConfig[proposal.status];

  const totalVol = proposal.passVolume + proposal.failVolume;
  const passWeight = totalVol > 0 ? (proposal.passVolume / totalVol) * 100 : 50;

  const topObjective = proposal.objectiveScores[0];
  const topObjectiveData = topObjective ? objectives.find(o => o.id === topObjective.objectiveId) : null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-surface-card)',
        border: expanded ? `1px solid ${proposal.marketColor}40` : '1px solid var(--color-border-subtle)',
      }}
    >
      <motion.div className="p-4 cursor-pointer" whileTap={{ scale: 0.99 }} onClick={onToggle}>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{ background: sCfg.bg, color: sCfg.color }}
          >
            {sCfg.label}
          </span>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{ background: `${proposal.marketColor}15`, color: proposal.marketColor }}
          >
            {proposal.marketName.split(' ').slice(0, 2).join(' ')}
          </span>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}
          >
            {proposal.phase}
          </span>
        </div>

        <h3 className="text-[15px] font-medium leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {proposal.title}
        </h3>
        <p className="text-[12px] mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
          {proposal.description.slice(0, 110)}{proposal.description.length > 110 ? '…' : ''}
        </p>

        {/* Top objective alignment */}
        {topObjectiveData && (
          <div className="flex items-center gap-2 mb-3 text-[11px]">
            <span>{topObjectiveData.icon}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>
              Best aligned to <span style={{ color: topObjectiveData.color, fontWeight: 600 }}>{topObjectiveData.name}</span>
            </span>
            <span
              className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${topObjectiveData.color}15`, color: topObjectiveData.color }}
            >
              {topObjective.score}/100
            </span>
          </div>
        )}

        {/* Pass/Fail market */}
        {proposal.status === 'active' && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span style={{ color: 'var(--color-success)' }}>
                Pass {proposal.passPrice.toFixed(2)} · {(proposal.passVolume / 1000).toFixed(1)}k vol
              </span>
              <span style={{ color: 'var(--color-danger)' }}>
                Fail {proposal.failPrice.toFixed(2)} · {(proposal.failVolume / 1000).toFixed(1)}k vol
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full" style={{ width: `${passWeight}%`, background: 'var(--color-success)' }} />
              <div className="h-full" style={{ width: `${100 - passWeight}%`, background: 'var(--color-danger)' }} />
            </div>
            <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
              {proposal.participants.toLocaleString()} Electors participating
            </p>
          </div>
        )}

        {proposal.status === 'active' && <CountdownTimer endsAt={proposal.endsAt} />}

        <div className="flex items-center justify-center mt-2">
          {expanded
            ? <ChevronUp size={16} style={{ color: 'var(--color-text-tertiary)' }} />
            : <ChevronDown size={16} style={{ color: 'var(--color-text-tertiary)' }} />}
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
              {/* Objective scores */}
              <p className="text-[11px] font-medium mt-3 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Objective Alignment
              </p>
              <div className="flex flex-col gap-1.5 mb-4">
                {proposal.objectiveScores.map(os => {
                  const o = objectives.find(x => x.id === os.objectiveId);
                  if (!o) return null;
                  return (
                    <div key={os.objectiveId} className="flex items-center gap-2">
                      <span className="text-[13px] w-5">{o.icon}</span>
                      <span className="text-[11px] flex-1 truncate" style={{ color: 'var(--color-text-secondary)' }}>
                        {o.name}
                      </span>
                      <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full" style={{ width: `${os.score}%`, background: o.color }} />
                      </div>
                      <span className="text-[10px] w-8 text-right" style={{ color: o.color }}>{os.score}</span>
                    </div>
                  );
                })}
              </div>

              {/* Agent dialogue */}
              <p className="text-[11px] font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Agent Dialogue
              </p>
              <div className="flex flex-col gap-2 mb-4">
                {proposal.agentDialogue.map((entry, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3"
                    style={{
                      background: entry.position === 'pass' ? 'rgba(0,235,122,0.06)' : 'rgba(255,58,58,0.06)',
                      border: `1px solid ${entry.position === 'pass' ? 'rgba(0,235,122,0.15)' : 'rgba(255,58,58,0.15)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-sm">{entry.agentPresence}</span>
                      <span className="text-[12px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {entry.agentName}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                        style={{
                          background: entry.agentRole === 'Operator' ? 'rgba(255,202,0,0.15)'
                            : entry.agentRole === 'Elector' ? 'rgba(3,204,218,0.15)'
                            : 'rgba(236,0,140,0.15)',
                          color: entry.agentRole === 'Operator' ? '#FFCA00'
                            : entry.agentRole === 'Elector' ? '#03CCDA'
                            : '#EC008C',
                        }}
                      >
                        {entry.agentRole}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                        style={{
                          background: entry.position === 'pass' ? 'rgba(0,235,122,0.15)' : 'rgba(255,58,58,0.15)',
                          color: entry.position === 'pass' ? '#00EB7A' : '#FF3A3A',
                        }}
                      >
                        {entry.position}
                      </span>
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {entry.argument}
                    </p>
                    <p className="text-[10px] mt-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                      Source: {entry.humanSource}
                    </p>
                  </div>
                ))}
              </div>

              {/* Executors commissioned on Pass */}
              <p className="text-[11px] font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                <Wrench size={11} /> Executors commissioned on Pass
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proposal.executors.map(ex => (
                  <span
                    key={ex}
                    className="text-[10px] px-2 py-1 rounded-full"
                    style={{ background: `${proposal.marketColor}15`, color: proposal.marketColor, border: `1px solid ${proposal.marketColor}30` }}
                  >
                    {ex}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenChat?.(proposal.id)}
                  className="flex-1 py-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5"
                  style={{ background: `${proposal.marketColor}18`, color: proposal.marketColor, border: `1px solid ${proposal.marketColor}40` }}
                >
                  <MessageCircle size={12} /> Chat with proposal
                </motion.button>
                {proposal.status === 'active' && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2.5 rounded-xl text-[12px] font-medium"
                      style={{ background: 'rgba(0,235,122,0.18)', color: '#00EB7A' }}
                    >
                      Buy Pass
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2.5 rounded-xl text-[12px] font-medium"
                      style={{ background: 'rgba(255,58,58,0.15)', color: '#FF3A3A' }}
                    >
                      Buy Fail
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Ended'); return; }
      const days  = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff % 86_400_000) / 3_600_000);
      const mins  = Math.floor((diff % 3_600_000)  / 60_000);
      setTimeLeft(days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`);
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [endsAt]);

  return (
    <div className="flex items-center gap-1.5">
      <Clock size={12} style={{ color: 'var(--color-accent-coral)' }} />
      <span className="text-[11px] font-medium" style={{ color: 'var(--color-accent-coral)' }}>
        {timeLeft} remaining
      </span>
    </div>
  );
}
