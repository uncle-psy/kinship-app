'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, MessageCircle, TrendingUp, Heart, Shield } from 'lucide-react';
import { members, markets, type Member } from '@/data/mockData';

interface MembersPanelProps {
  onClose: () => void;
}

export default function MembersPanel({ onClose }: MembersPanelProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  if (selectedMember) {
    return <MemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} onClose={onClose} />;
  }

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col"
      style={{ background: 'var(--color-background)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div style={{ height: 54, flexShrink: 0 }} />

      <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
        <h1 className="text-[26px] tracking-wide" style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-primary)', fontWeight: 700 }}>
          Members
        </h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'var(--color-surface)' }}>
          <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
      </div>

      <p className="text-[12px] px-5 mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
        {members.length} Sponsors, Citizens, and Architects &middot; Tap to view Presence
      </p>

      <div className="flex-1 overflow-y-auto px-5 pb-10" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-2">
          {members.map((member, i) => (
            <motion.button
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMember(member)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl text-left"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${member.color}18`, border: `1.5px solid ${member.color}40` }}
              >
                {member.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {member.name}
                </p>
                <p className="text-[11px] truncate" style={{ color: 'var(--color-text-tertiary)' }}>
                  {member.role}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[12px] font-bold" style={{ color: '#03CCDA' }}>
                  {member.totalScore.toLocaleString()}
                </p>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold"
                  style={{
                    background:
                      member.memberType === 'sponsor' ? 'rgba(255,202,0,0.15)'
                      : member.memberType === 'architect' ? 'rgba(236,0,140,0.15)'
                      : 'rgba(3,204,218,0.15)',
                    color:
                      member.memberType === 'sponsor' ? '#FFCA00'
                      : member.memberType === 'architect' ? '#EC008C'
                      : '#03CCDA',
                  }}
                >
                  {member.memberType}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MemberDetail({ member, onBack, onClose }: { member: Member; onBack: () => void; onClose: () => void }) {
  const memberMarkets = markets.filter(m => member.markets.includes(m.id));

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col"
      style={{ background: 'var(--color-background)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div style={{ height: 54, flexShrink: 0 }} />

      <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}>
            <ArrowLeft size={20} style={{ color: 'var(--color-text-secondary)' }} />
          </motion.button>
          <h1 className="text-[20px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Presence
          </h1>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'var(--color-surface)' }}>
          <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10" style={{ scrollbarWidth: 'none' }}>
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}>
          <div className="relative h-24" style={{ background: `linear-gradient(135deg, ${member.color}30 0%, ${member.color}10 100%)` }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 60%, ${member.color}40 0%, transparent 60%)` }} />
          </div>

          <div className="px-4 pb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl -mt-8 mb-3"
              style={{ background: `${member.color}25`, border: '3px solid var(--color-background)' }}>
              {member.avatar}
            </div>

            <p className="text-[17px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {member.name}
            </p>
            <p className="text-[13px] mb-1" style={{ color: member.color }}>
              @{member.codeName}
            </p>
            <p className="text-[12px] mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              {member.role}
            </p>
            <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
              {member.bio}
            </p>

            <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border-subtle)' }}>
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                Presence Agent
              </p>
              <p className="text-[13px] font-medium" style={{ color: member.color }}>
                {member.presenceName}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(3,204,218,0.08)' }}>
                <Shield size={14} className="mx-auto mb-1" style={{ color: '#03CCDA' }} />
                <p className="text-[14px] font-bold" style={{ color: '#03CCDA' }}>{member.totalScore.toLocaleString()}</p>
                <p className="text-[9px]" style={{ color: 'var(--color-text-tertiary)' }}>Total</p>
              </div>
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,202,0,0.08)' }}>
                <TrendingUp size={14} className="mx-auto mb-1" style={{ color: '#FFCA00' }} />
                <p className="text-[14px] font-bold" style={{ color: '#FFCA00' }}>{member.valueScore.toLocaleString()}</p>
                <p className="text-[9px]" style={{ color: 'var(--color-text-tertiary)' }}>Value</p>
              </div>
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(236,0,140,0.08)' }}>
                <Heart size={14} className="mx-auto mb-1" style={{ color: '#EC008C' }} />
                <p className="text-[14px] font-bold" style={{ color: '#EC008C' }}>{member.benefitScore.toLocaleString()}</p>
                <p className="text-[9px]" style={{ color: 'var(--color-text-tertiary)' }}>Benefit</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                Markets
              </p>
              <div className="flex gap-2 flex-wrap">
                {memberMarkets.map(m => (
                  <span key={m.id} className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${m.color}15`, color: m.color }}>
                    {m.avatar} {m.name}
                  </span>
                ))}
                {member.markets.includes('kinship') && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(255,202,0,0.15)', color: '#FFCA00' }}>
                    ✦ Kinship
                  </span>
                )}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2"
              style={{ background: `${member.color}15`, color: member.color, border: `1px solid ${member.color}30` }}
            >
              <MessageCircle size={14} />
              Send Message
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
