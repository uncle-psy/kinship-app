'use client';

import { motion } from 'framer-motion';
import { X, ScrollText, Gift, Target, Globe, Users, Wrench } from 'lucide-react';
import { notifications } from '@/data/mockData';

interface NotificationsPanelProps {
  onClose: () => void;
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    proposal:  { icon: <ScrollText size={14} />, color: '#03CCDA' },
    market:    { icon: <Globe size={14}     />, color: '#FFCA00' },
    objective: { icon: <Target size={14}    />, color: '#EC008C' },
    executor:  { icon: <Wrench size={14}    />, color: '#6536B4' },
    reward:    { icon: <Gift size={14}      />, color: '#00EB7A' },
    member:    { icon: <Users size={14}     />, color: '#7EB8A8' },
  };

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

      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[26px] tracking-wide" style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-primary)', fontWeight: 700 }}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--color-accent-coral)', color: 'white' }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'var(--color-surface)' }}>
          <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto px-5 pb-10" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-1">
          {notifications.map((notif, i) => {
            const cfg = typeConfig[notif.type] || typeConfig.market;

            return (
              <motion.button
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-start gap-3 py-3 text-left"
                style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${cfg.color}15` }}
                >
                  <span style={{ color: cfg.color }}>{cfg.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent-coral)' }} />
                    )}
                  </div>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {notif.description}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                    {notif.time}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
