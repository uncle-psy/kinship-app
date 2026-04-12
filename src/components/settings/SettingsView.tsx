'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Camera, Edit2, Check, ChevronRight, AlertTriangle,
  Lock, Eye, EyeOff, LogOut, Archive, Trash2, Link2,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface SettingsViewProps {
  onClose: () => void;
}

type MembershipTier = 'guest' | 'member' | 'project' | 'platform';

interface UserProfile {
  codeName: string;
  displayName: string;
  firstName: string;
  lastName: string;
  bio: string;
  link: string;
  email: string;
  mobile: string;
  membershipTier: MembershipTier;
}

// ── Static data ───────────────────────────────────────────────────────────────

const INITIAL_USER: UserProfile = {
  codeName: 'marcus.bio',
  displayName: 'Marcus Thompson',
  firstName: 'Marcus',
  lastName: 'Thompson',
  bio: 'Biohacker · Cold exposure & HRV optimization researcher',
  link: 'marcusbio.com',
  email: 'marcus@kinship.app',
  mobile: '+1 (555) 012-3456',
  membershipTier: 'member',
};

const BRIDGES = [
  { id: 'google',    label: 'Google',    emoji: '🌐', connected: true  },
  { id: 'apple',     label: 'Apple',     emoji: '🍎', connected: false },
  { id: 'x',         label: 'X',         emoji: '✗',  connected: false },
  { id: 'instagram', label: 'Instagram', emoji: '📸', connected: true  },
  { id: 'farcaster', label: 'Farcaster', emoji: '🟣', connected: false },
  { id: 'linkedin',  label: 'LinkedIn',  emoji: '💼', connected: false },
  { id: 'tiktok',    label: 'TikTok',    emoji: '🎵', connected: false },
  { id: 'spotify',   label: 'Spotify',   emoji: '🎧', connected: false },
];

const TIERS: {
  id: MembershipTier; label: string; monthly: number;
  annual: number; desc: string; color: string;
}[] = [
  { id: 'guest',    label: 'Guest',    monthly: 0,     annual: 0,      desc: 'Browse & observe',       color: 'rgba(255,255,255,0.35)' },
  { id: 'member',   label: 'Member',   monthly: 10,    annual: 100,    desc: 'Vote, earn & participate', color: '#03CCDA' },
  { id: 'project',  label: 'Project',  monthly: 100,   annual: 1000,   desc: 'Launch a DUNA',          color: '#FFCA00' },
  { id: 'platform', label: 'Platform', monthly: 1000,  annual: 10000,  desc: 'Full platform operator',  color: '#EC008C' },
];

// ── Validation ────────────────────────────────────────────────────────────────

function validateCodeName(val: string): string | null {
  if (!val) return 'Required';
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(val)) {
    if (/^[._-]/.test(val)) return 'Must start with a letter or number';
    return 'Letters, numbers, . _ - only (no spaces)';
  }
  if (val.length < 3) return 'At least 3 characters';
  if (val.length > 30) return '30 characters max';
  return null;
}

// ── Reusable Field ────────────────────────────────────────────────────────────

function Field({
  label, value, onChange, placeholder, prefix,
  error, hint, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; prefix?: string;
  error?: string | null; hint?: string; type?: string;
}) {
  return (
    <div className="mb-3">
      <label className="block text-[11px] font-semibold uppercase tracking-wide mb-1.5"
        style={{ color: 'var(--color-text-tertiary)' }}>
        {label}
      </label>
      <div className="flex items-center rounded-xl overflow-hidden"
        style={{
          background: 'var(--color-surface)',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border-medium)'}`,
        }}>
        {prefix && (
          <span className="pl-3 text-[14px]" style={{ color: 'var(--color-text-tertiary)' }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 bg-transparent text-[14px] outline-none"
          style={{ color: 'var(--color-text-primary)' }}
        />
      </div>
      {error  && <p className="text-[11px] mt-1" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      {hint && !error && <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{hint}</p>}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1"
      style={{ color: 'var(--color-text-tertiary)' }}>
      {children}
    </p>
  );
}

// ── Profile display ───────────────────────────────────────────────────────────

function ProfileDisplay({ user, onEdit }: { user: UserProfile; onEdit: () => void }) {
  return (
    <div className="mb-6">
      <SectionLabel>Profile</SectionLabel>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}>

        {/* Banner */}
        <div className="relative h-24"
          style={{ background: 'linear-gradient(135deg, #09073a 0%, #1a0a40 50%, #0a1440 100%)' }}>
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 25% 60%, rgba(101,54,180,0.5) 0%, transparent 65%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 75% 40%, rgba(3,204,218,0.25) 0%, transparent 65%)' }} />
          <motion.button whileTap={{ scale: 0.9 }}
            className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
            <Camera size={12} style={{ color: 'rgba(255,255,255,0.7)' }} />
          </motion.button>
        </div>

        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative w-fit -mt-8 mb-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: 'linear-gradient(135deg, #1a1060, #6536B4)',
                border: '3px solid var(--color-background)',
              }}>
              🧬
            </div>
            <motion.button whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-surface)', border: '2px solid var(--color-background)' }}>
              <Camera size={10} style={{ color: 'var(--color-text-secondary)' }} />
            </motion.button>
          </div>

          {/* Name + codename */}
          <p className="text-[17px] font-semibold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            {user.displayName}
          </p>
          <p className="text-[13px] mb-2" style={{ color: 'var(--color-accent-teal)' }}>
            @{user.codeName}
          </p>
          {user.bio && (
            <p className="text-[13px] leading-snug mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {user.bio}
            </p>
          )}
          {user.link && (
            <div className="flex items-center gap-1.5 mb-4">
              <Link2 size={12} style={{ color: 'var(--color-accent-teal)' }} />
              <span className="text-[13px]" style={{ color: 'var(--color-accent-teal)' }}>{user.link}</span>
            </div>
          )}

          {/* Personal info */}
          <div className="rounded-xl overflow-hidden mb-4"
            style={{ border: '1px solid var(--color-border-subtle)' }}>
            {[
              { label: 'Name',   value: `${user.firstName} ${user.lastName}` },
              { label: 'Email',  value: user.email },
              { label: 'Mobile', value: user.mobile },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex justify-between items-center px-3 py-2.5"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                <span className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>{row.label}</span>
                <span className="text-[13px]" style={{ color: 'var(--color-text-primary)' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.97 }} onClick={onEdit}
            className="w-full py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2"
            style={{ background: 'rgba(3,204,218,0.1)', color: 'var(--color-accent-teal)', border: '1px solid rgba(3,204,218,0.2)' }}>
            <Edit2 size={14} />
            Edit Profile
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ── Profile edit form ─────────────────────────────────────────────────────────

function ProfileEditForm({ user, onSave, onCancel }: {
  user: UserProfile;
  onSave: (u: UserProfile) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...user });
  const [codeNameError, setCNError] = useState<string | null>(null);

  const set = (key: keyof UserProfile) => (val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (key === 'codeName') setCNError(validateCodeName(val));
  };

  const handleSave = () => {
    const err = validateCodeName(form.codeName);
    if (err) { setCNError(err); return; }
    onSave(form);
  };

  return (
    <div className="mb-6">
      <SectionLabel>Edit Profile</SectionLabel>
      <div className="rounded-2xl p-4"
        style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}>

        <Field label="Code Name" value={form.codeName} onChange={set('codeName')}
          prefix="@" placeholder="your.handle" error={codeNameError}
          hint="Letters, numbers, . _ - only — no spaces" />
        <Field label="Display Name" value={form.displayName} onChange={set('displayName')}
          placeholder="Your display name" />
        <Field label="Bio" value={form.bio} onChange={set('bio')}
          placeholder="Tell your story..." />
        <Field label="Link" value={form.link} onChange={set('link')}
          placeholder="yoursite.com" />

        <div className="h-px mb-3 -mx-4" style={{ background: 'var(--color-border-subtle)' }} />

        <div className="grid grid-cols-2 gap-2">
          <Field label="First Name" value={form.firstName} onChange={set('firstName')} placeholder="First" />
          <Field label="Last Name"  value={form.lastName}  onChange={set('lastName')}  placeholder="Last" />
        </div>
        <Field label="Email"  value={form.email}  onChange={set('email')}  placeholder="you@example.com" type="email" />
        <Field label="Mobile" value={form.mobile} onChange={set('mobile')} placeholder="+1 (555) 000-0000" type="tel" />

        <div className="flex gap-2 mt-2">
          <motion.button whileTap={{ scale: 0.97 }} onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-medium"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}>
            Cancel
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-center gap-1.5"
            style={{ background: 'rgba(3,204,218,0.15)', color: 'var(--color-accent-teal)' }}>
            <Check size={14} /> Save
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ── Password section ──────────────────────────────────────────────────────────

function PasswordSection() {
  const [expanded, setExpanded] = useState(false);
  const [current, setCurrent]   = useState('');
  const [next, setNext]         = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showCur, setShowCur]   = useState(false);
  const [showNew, setShowNew]   = useState(false);

  const isValid = current.length > 0 && next.length >= 8 && next === confirm;

  const PwField = ({
    label, value, onChange, show, onToggle, placeholder,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    show: boolean; onToggle: () => void; placeholder?: string;
  }) => (
    <div className="mb-3">
      <label className="block text-[11px] font-semibold uppercase tracking-wide mb-1.5"
        style={{ color: 'var(--color-text-tertiary)' }}>{label}</label>
      <div className="flex items-center rounded-xl"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-medium)' }}>
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder || '••••••••'}
          className="flex-1 px-3 py-2.5 bg-transparent text-[14px] outline-none"
          style={{ color: 'var(--color-text-primary)' }} />
        <button className="px-3 py-2" onClick={onToggle}>
          {show
            ? <EyeOff size={15} style={{ color: 'var(--color-text-tertiary)' }} />
            : <Eye    size={15} style={{ color: 'var(--color-text-tertiary)' }} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <SectionLabel>Security</SectionLabel>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}>
        <motion.button whileTap={{ scale: 0.99 }} onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Lock size={16} style={{ color: 'var(--color-accent-teal)' }} />
            <span className="text-[14px]" style={{ color: 'var(--color-text-primary)' }}>Change Password</span>
          </div>
          <ChevronRight size={14} style={{
            color: 'var(--color-text-tertiary)',
            transform: expanded ? 'rotate(90deg)' : 'none',
            transition: 'transform 0.2s',
          }} />
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="px-4 pt-3 pb-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <PwField label="Current Password" value={current} onChange={setCurrent}
                  show={showCur} onToggle={() => setShowCur(s => !s)} />
                <PwField label="New Password" value={next} onChange={setNext}
                  show={showNew} onToggle={() => setShowNew(s => !s)} placeholder="Min. 8 characters" />
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: 'var(--color-text-tertiary)' }}>Confirm New Password</label>
                  <div className="rounded-xl" style={{
                    background: 'var(--color-surface)',
                    border: `1px solid ${confirm && next !== confirm ? 'var(--color-danger)' : 'var(--color-border-medium)'}`,
                  }}>
                    <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2.5 bg-transparent text-[14px] outline-none"
                      style={{ color: 'var(--color-text-primary)' }} />
                  </div>
                  {confirm && next !== confirm && (
                    <p className="text-[11px] mt-1" style={{ color: 'var(--color-danger)' }}>
                      Passwords don&apos;t match
                    </p>
                  )}
                </div>
                <motion.button whileTap={isValid ? { scale: 0.97 } : {}}
                  className="w-full py-2.5 rounded-xl text-[13px] font-medium"
                  style={{
                    background: isValid ? 'rgba(3,204,218,0.15)' : 'rgba(255,255,255,0.04)',
                    color: isValid ? 'var(--color-accent-teal)' : 'var(--color-text-tertiary)',
                    cursor: isValid ? 'pointer' : 'default',
                  }}>
                  Update Password
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Bridges section ───────────────────────────────────────────────────────────

function BridgesSection({
  bridges, onToggle,
}: {
  bridges: { id: string; label: string; emoji: string; connected: boolean }[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="mb-6">
      <SectionLabel>Bridges</SectionLabel>
      <p className="text-[12px] mb-3 px-1" style={{ color: 'var(--color-text-tertiary)' }}>
        Connect your accounts to bring your world into Kinship.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {bridges.map(b => (
          <motion.div key={b.id} layout className="rounded-xl p-3"
            style={{
              background: 'var(--color-surface-card)',
              border: `1px solid ${b.connected ? 'rgba(0,235,122,0.3)' : 'var(--color-border-subtle)'}`,
            }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl leading-none">{b.emoji}</span>
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: b.connected ? '#00EB7A' : 'rgba(255,255,255,0.2)' }} />
            </div>
            <p className="text-[13px] font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
              {b.label}
            </p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => onToggle(b.id)}
              className="w-full py-1.5 rounded-lg text-[11px] font-medium"
              style={{
                background: b.connected ? 'rgba(255,58,58,0.1)' : 'rgba(3,204,218,0.1)',
                color: b.connected ? 'var(--color-danger)' : 'var(--color-accent-teal)',
              }}>
              {b.connected ? 'Disconnect' : 'Connect'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Membership section ────────────────────────────────────────────────────────

function MembershipSection({
  currentTier, billing, onBillingChange, onSelectTier,
}: {
  currentTier: MembershipTier;
  billing: 'monthly' | 'annual';
  onBillingChange: (b: 'monthly' | 'annual') => void;
  onSelectTier: (t: MembershipTier) => void;
}) {
  return (
    <div className="mb-6">
      <SectionLabel>Membership</SectionLabel>

      {/* Billing toggle */}
      <div className="flex p-1 rounded-xl mb-3"
        style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}>
        {(['monthly', 'annual'] as const).map(b => (
          <motion.button key={b} whileTap={{ scale: 0.97 }} onClick={() => onBillingChange(b)}
            className="flex-1 py-2 rounded-lg text-[12px] font-medium flex items-center justify-center gap-1.5"
            style={{
              background: billing === b ? 'var(--color-surface)' : 'transparent',
              color: billing === b ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            }}>
            {b === 'monthly' ? 'Monthly' : 'Annual'}
            {b === 'annual' && (
              <span className="text-[10px] font-bold px-1 py-0.5 rounded-md"
                style={{ background: 'rgba(0,235,122,0.15)', color: '#00EB7A' }}>
                −17%
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Tier grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {TIERS.map(tier => {
          const isCurrent = tier.id === currentTier;
          const price = billing === 'monthly' ? tier.monthly : tier.annual;
          const period = billing === 'monthly' ? '/mo' : '/yr';
          return (
            <motion.button key={tier.id} whileTap={{ scale: 0.97 }} onClick={() => onSelectTier(tier.id)}
              className="rounded-xl p-3 text-left"
              style={{
                background: isCurrent ? `${tier.color}15` : 'var(--color-surface-card)',
                border: `1px solid ${isCurrent ? tier.color + '55' : 'var(--color-border-subtle)'}`,
              }}>
              <div className="flex items-start justify-between mb-1">
                <span className="text-[13px] font-semibold"
                  style={{ color: isCurrent ? tier.color : 'var(--color-text-primary)' }}>
                  {tier.label}
                </span>
                {isCurrent && (
                  <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                    style={{ background: `${tier.color}20`, color: tier.color }}>
                    Current
                  </span>
                )}
              </div>
              <p className="text-[20px] font-bold leading-tight mb-0.5"
                style={{ color: 'var(--color-text-primary)' }}>
                {price === 0 ? 'Free' : `$${price.toLocaleString()}`}
                {price > 0 && (
                  <span className="text-[11px] font-normal ml-0.5"
                    style={{ color: 'var(--color-text-tertiary)' }}>
                    {period}
                  </span>
                )}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                {tier.desc}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── Account section ───────────────────────────────────────────────────────────

function AccountSection({ onDeleteRequest }: { onDeleteRequest: () => void }) {
  return (
    <div className="mb-6">
      <SectionLabel>Account</SectionLabel>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-subtle)' }}>

        {/* Log Out */}
        <motion.button whileTap={{ scale: 0.99 }}
          className="w-full flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <LogOut size={16} style={{ color: 'var(--color-text-secondary)' }} />
          <span className="text-[14px]" style={{ color: 'var(--color-text-primary)' }}>Log Out</span>
        </motion.button>

        {/* Archive */}
        <motion.button whileTap={{ scale: 0.99 }}
          className="w-full flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <Archive size={16} style={{ color: 'var(--color-text-secondary)' }} />
          <div className="text-left">
            <p className="text-[14px]" style={{ color: 'var(--color-text-primary)' }}>Archive Account</p>
            <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
              Pause your account — reactivate anytime
            </p>
          </div>
        </motion.button>

        {/* Delete */}
        <motion.button whileTap={{ scale: 0.99 }} onClick={onDeleteRequest}
          className="w-full flex items-center gap-3 px-4 py-3.5">
          <Trash2 size={16} style={{ color: 'var(--color-danger)' }} />
          <div className="text-left">
            <p className="text-[14px]" style={{ color: 'var(--color-danger)' }}>Delete Account</p>
            <p className="text-[11px]" style={{ color: 'rgba(255,58,58,0.55)' }}>
              Permanently erase all your data
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}

// ── Delete confirmation modal ─────────────────────────────────────────────────

function DeleteModal({ onClose }: { onClose: () => void }) {
  const [typed, setTyped] = useState('');
  const confirmed = typed === 'DELETE';

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center px-5"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="w-full rounded-2xl p-6"
        style={{ background: 'var(--color-surface-card)', border: '1px solid rgba(255,58,58,0.35)' }}
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto"
          style={{ background: 'rgba(255,58,58,0.12)' }}>
          <AlertTriangle size={28} style={{ color: 'var(--color-danger)' }} />
        </div>

        <h2 className="text-[20px] font-bold text-center mb-1"
          style={{ color: 'var(--color-danger)' }}>
          Delete Account
        </h2>
        <p className="text-[13px] text-center mb-4"
          style={{ color: 'var(--color-text-secondary)' }}>
          This action is <strong style={{ color: 'var(--color-text-primary)' }}>permanent and cannot be undone.</strong>
        </p>

        {/* Warning box */}
        <div className="rounded-xl p-3.5 mb-4"
          style={{ background: 'rgba(255,58,58,0.08)', border: '1px solid rgba(255,58,58,0.2)' }}>
          <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,120,120,0.95)' }}>
            ⚠ Deleting your account will permanently remove your profile, all connections, all content and creations, your earned tokens and rewards, and all personal data. There is no recovery process.
          </p>
        </div>

        {/* Confirm input */}
        <p className="text-[12px] text-center mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          Type <span className="font-bold" style={{ color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}>DELETE</span> to confirm
        </p>
        <input
          type="text"
          value={typed}
          onChange={e => setTyped(e.target.value)}
          placeholder="Type DELETE here"
          className="w-full px-4 py-3 rounded-xl text-[14px] text-center outline-none mb-4"
          style={{
            background: 'var(--color-surface)',
            border: `1px solid ${confirmed ? 'var(--color-danger)' : 'var(--color-border-medium)'}`,
            color: 'var(--color-text-primary)',
            letterSpacing: typed ? '0.1em' : 'normal',
          }}
        />

        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
            className="flex-1 py-3 rounded-xl text-[13px] font-medium"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--color-text-secondary)' }}>
            Cancel
          </motion.button>
          <motion.button whileTap={confirmed ? { scale: 0.97 } : {}}
            className="flex-1 py-3 rounded-xl text-[13px] font-semibold"
            style={{
              background: confirmed ? 'rgba(255,58,58,0.22)' : 'rgba(255,58,58,0.06)',
              color: confirmed ? 'var(--color-danger)' : 'rgba(255,58,58,0.3)',
              cursor: confirmed ? 'pointer' : 'not-allowed',
            }}>
            Delete Forever
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

export default function SettingsView({ onClose }: SettingsViewProps) {
  const [user, setUser]                 = useState(INITIAL_USER);
  const [editingProfile, setEditing]    = useState(false);
  const [billing, setBilling]           = useState<'monthly' | 'annual'>('monthly');
  const [bridges, setBridges]           = useState(BRIDGES.map(b => ({ ...b })));
  const [showDelete, setShowDelete]     = useState(false);

  const toggleBridge = (id: string) =>
    setBridges(prev => prev.map(b => b.id === id ? { ...b, connected: !b.connected } : b));

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col"
      style={{ background: 'var(--color-background)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      {/* Mimic status bar height */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-4 flex-shrink-0">
        <h1 className="text-[26px] tracking-wide"
          style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-primary)', fontWeight: 700 }}>
          Settings
        </h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'var(--color-surface)' }}>
          <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 pb-10" style={{ scrollbarWidth: 'none' }}>

        {editingProfile ? (
          <ProfileEditForm
            user={user}
            onSave={u => { setUser(u); setEditing(false); }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <ProfileDisplay user={user} onEdit={() => setEditing(true)} />
        )}

        <PasswordSection />

        <BridgesSection bridges={bridges} onToggle={toggleBridge} />

        <MembershipSection
          currentTier={user.membershipTier}
          billing={billing}
          onBillingChange={setBilling}
          onSelectTier={t => setUser(u => ({ ...u, membershipTier: t }))}
        />

        <AccountSection onDeleteRequest={() => setShowDelete(true)} />
      </div>

      <AnimatePresence>
        {showDelete && <DeleteModal onClose={() => setShowDelete(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
