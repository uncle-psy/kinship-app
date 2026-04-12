'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp, TrendingUp, Heart, Shield } from 'lucide-react';
import { voteProposals, type VoteProposal } from '@/data/mockData';

export default function VoteView() {
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'pending'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? voteProposals
    : voteProposals.filter(p => p.status === filter);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 180, height: 180, background: 'var(--color-accent-lavender)', top: -40, right: -60 }}
      />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {(['all', 'active', 'pending', 'passed'] as const).map(f => (
          <button
            key={f}
            className={`gathering-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Proposals' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Proposal cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((proposal, i) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <ProposalCard
              proposal={proposal}
              expanded={expandedId === proposal.id}
              onToggle={() => setExpandedId(expandedId === proposal.id ? null : proposal.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProposalCard({
  proposal,
  expanded,
  onToggle,
}: {
  proposal: VoteProposal;
  expanded: boolean;
  onToggle: () => void;
}) {
  const statusConfig = {
    active: { color: '#03CCDA', bg: 'rgba(3,204,218,0.15)', label: 'Active' },
    passed: { color: '#00EB7A', bg: 'rgba(0,235,122,0.15)', label: 'Passed' },
    rejected: { color: '#FF3A3A', bg: 'rgba(255,58,58,0.15)', label: 'Rejected' },
    pending: { color: '#FFCA00', bg: 'rgba(255,202,0,0.15)', label: 'Pending' },
  };
  const sCfg = statusConfig[proposal.status];

  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPct = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 50;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-surface-card)',
        border: expanded ? `1px solid ${proposal.color}40` : '1px solid var(--color-border-subtle)',
      }}
    >
      {/* Card face */}
      <motion.div
        className="p-4 cursor-pointer"
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
      >
        {/* Header badges */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{ background: sCfg.bg, color: sCfg.color }}
          >
            {sCfg.label}
          </span>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{ background: `${proposal.color}15`, color: proposal.color }}
          >
            {proposal.category}
          </span>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{
              background: proposal.contractType === 'KII' ? 'rgba(101,54,180,0.15)' : 'rgba(255,202,0,0.15)',
              color: proposal.contractType === 'KII' ? '#6536B4' : '#FFCA00',
            }}
          >
            {proposal.contractType}
          </span>
        </div>

        <h3 className="text-[15px] font-medium leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {proposal.title}
        </h3>
        <p className="text-[12px] mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
          {proposal.projectName} &middot; {proposal.description.slice(0, 80)}...
        </p>

        {/* Scores */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <TrendingUp size={12} style={{ color: '#FFCA00' }} />
            <span className="text-[11px] font-bold" style={{ color: '#FFCA00' }}>{proposal.valueScore}</span>
            <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Value</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} style={{ color: '#EC008C' }} />
            <span className="text-[11px] font-bold" style={{ color: '#EC008C' }}>{proposal.benefitScore}</span>
            <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Benefits</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={12} style={{ color: '#03CCDA' }} />
            <span className="text-[11px] font-bold" style={{ color: '#03CCDA' }}>
              {Math.round((proposal.valueScore + proposal.benefitScore) / 2)}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Combined</span>
          </div>
        </div>

        {/* Vote bar */}
        {totalVotes > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span style={{ color: 'var(--color-success)' }}>For: {proposal.votesFor.toLocaleString()}</span>
              <span style={{ color: 'var(--color-danger)' }}>Against: {proposal.votesAgainst.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${forPct}%`, background: 'var(--color-success)' }}
              />
              <div
                className="h-full rounded-full"
                style={{ width: `${100 - forPct}%`, background: 'var(--color-danger)' }}
              />
            </div>
            <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
              {proposal.totalVoters.toLocaleString()} total voters
            </p>
          </div>
        )}

        {/* Countdown */}
        {proposal.status === 'active' && (
          <CountdownTimer endsAt={proposal.endsAt} />
        )}

        {/* Expand toggle */}
        <div className="flex items-center justify-center mt-2">
          {expanded
            ? <ChevronUp size={16} style={{ color: 'var(--color-text-tertiary)' }} />
            : <ChevronDown size={16} style={{ color: 'var(--color-text-tertiary)' }} />
          }
        </div>
      </motion.div>

      {/* Expanded: Agent dialogue */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
              <p className="text-[12px] font-medium mt-3 mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                Agent Dialogue
              </p>

              <div className="flex flex-col gap-3">
                {proposal.agentDialogue.map((entry, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3"
                    style={{
                      background: entry.position === 'for' ? 'rgba(0,235,122,0.06)' : 'rgba(255,58,58,0.06)',
                      border: `1px solid ${entry.position === 'for' ? 'rgba(0,235,122,0.15)' : 'rgba(255,58,58,0.15)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">{entry.agentPresence}</span>
                      <span className="text-[12px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {entry.agentName}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                        style={{
                          background: entry.category === 'value' ? 'rgba(255,202,0,0.15)' : 'rgba(236,0,140,0.15)',
                          color: entry.category === 'value' ? '#FFCA00' : '#EC008C',
                        }}
                      >
                        {entry.category}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                        style={{
                          background: entry.position === 'for' ? 'rgba(0,235,122,0.15)' : 'rgba(255,58,58,0.15)',
                          color: entry.position === 'for' ? '#00EB7A' : '#FF3A3A',
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

              {/* Vote buttons */}
              {proposal.status === 'active' && (
                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-xl text-[13px] font-medium"
                    style={{ background: 'rgba(0,235,122,0.15)', color: '#00EB7A' }}
                  >
                    Vote For
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-xl text-[13px] font-medium"
                    style={{ background: 'rgba(255,58,58,0.15)', color: '#FF3A3A' }}
                  >
                    Vote Against
                  </motion.button>
                </div>
              )}
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
      const now = new Date().getTime();
      const end = new Date(endsAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${mins}m`);
      } else {
        setTimeLeft(`${hours}h ${mins}m`);
      }
    };

    update();
    const interval = setInterval(update, 60000);
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
