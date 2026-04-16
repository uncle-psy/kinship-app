'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, CheckCircle, XCircle, Coins, Award, ShoppingCart, Wrench,
} from 'lucide-react';
import { holdings, walletTransactions, type HoldingToken } from '@/data/mockData';

type EarnTab = 'holdings' | 'history' | 'charts';

export default function VaultView() {
  const [activeTab, setActiveTab] = useState<EarnTab>('holdings');
  const totalValue = holdings.reduce((sum, c) => sum + c.value, 0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * totalValue * 100) / 100);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [totalValue]);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 220, height: 220, background: 'var(--color-accent-gold)', top: -80, left: '50%', marginLeft: -110 }}
      />

      <motion.div
        className="text-center mb-5 pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[12px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          Total Balance
        </p>
        <div className="relative inline-block">
          <p className="text-[42px] font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            ${displayValue.toFixed(2)}
          </p>
          <div
            className="absolute -inset-4 rounded-full -z-10"
            style={{ background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)' }}
          />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <TrendingUp size={14} style={{ color: 'var(--color-success)' }} />
          <span className="text-[13px] font-medium" style={{ color: 'var(--color-success)' }}>
            +13.8% this week
          </span>
        </div>
        <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
          Market tokens + live Pass/Fail positions
        </p>
      </motion.div>

      <div
        className="flex p-1 rounded-xl mb-4"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
      >
        {(['holdings', 'history', 'charts'] as EarnTab[]).map(tab => (
          <motion.button
            key={tab}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 rounded-lg text-[12px] font-medium capitalize"
            style={{
              background: activeTab === tab ? 'var(--color-surface-card)' : 'transparent',
              color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {activeTab === 'holdings' && <HoldingsTab />}
      {activeTab === 'history'  && <HistoryTab />}
      {activeTab === 'charts'   && <ChartsTab />}
    </div>
  );
}

function HoldingsTab() {
  return (
    <div className="flex flex-col gap-2">
      {holdings.map((token, i) => (
        <motion.div
          key={token.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <TokenRow token={token} />
        </motion.div>
      ))}
    </div>
  );
}

function TokenRow({ token }: { token: HoldingToken }) {
  const isConditional = token.symbol.startsWith('PASS-') || token.symbol.startsWith('FAIL-');
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-base"
        style={{ background: `${token.color}20`, border: `1.5px solid ${token.color}40` }}
      >
        {token.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[14px] font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
            {token.name}
          </p>
          <p className="text-[14px] font-bold flex-shrink-0" style={{ color: 'var(--color-text-primary)' }}>
            {token.amount.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[11px]" style={{ color: isConditional ? token.color : 'var(--color-text-tertiary)' }}>
            {token.symbol}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
              ${token.value.toFixed(2)}
            </span>
            <span
              className="text-[11px] font-medium flex items-center gap-0.5"
              style={{ color: token.change >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}
            >
              {token.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {Math.abs(token.change)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryTab() {
  const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    'pass-purchased':  { icon: <ShoppingCart size={14} />, color: 'var(--color-success)',        label: 'Pass Buy' },
    'fail-purchased':  { icon: <ShoppingCart size={14} />, color: 'var(--color-danger)',         label: 'Fail Buy' },
    'pass-resolved':   { icon: <CheckCircle size={14}  />, color: 'var(--color-success)',        label: 'Pass Win' },
    'fail-resolved':   { icon: <XCircle size={14}      />, color: 'var(--color-danger)',         label: 'Fail Loss' },
    'market-earned':   { icon: <Award size={14}        />, color: 'var(--color-accent-gold)',    label: 'Earned' },
    'executor-paid':   { icon: <Wrench size={14}       />, color: 'var(--color-accent-lavender)',label: 'Executor' },
    'stake':           { icon: <Coins size={14}        />, color: 'var(--color-accent-teal)',    label: 'Staked' },
    'reward':          { icon: <Award size={14}        />, color: 'var(--color-accent-gold)',    label: 'Reward' },
  };

  return (
    <div className="flex flex-col gap-1">
      {walletTransactions.map((tx, i) => {
        const cfg = typeConfig[tx.type] || typeConfig['market-earned'];
        const isPositive = tx.amount > 0;

        return (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 py-2.5"
            style={{ borderBottom: i < walletTransactions.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: isPositive ? 'rgba(0,235,122,0.1)' : 'rgba(255,58,58,0.1)' }}
            >
              <span style={{ color: cfg.color }}>{cfg.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] truncate" style={{ color: 'var(--color-text-primary)' }}>
                {tx.description}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-tertiary)' }}
                >
                  {cfg.label}
                </span>
                <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{tx.time}</p>
              </div>
            </div>
            <span
              className="text-[13px] font-medium flex-shrink-0"
              style={{ color: isPositive ? 'var(--color-success)' : 'var(--color-danger)' }}
            >
              {isPositive ? '+' : ''}{tx.amount} {tx.symbol}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function ChartsTab() {
  const topHoldings = holdings.slice(0, 6);
  const maxValue = Math.max(...topHoldings.map(t => t.value));

  return (
    <div>
      <p className="text-[12px] font-medium mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Portfolio Distribution
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {topHoldings.map((token, i) => {
          const pct = (token.value / maxValue) * 100;
          return (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-sm">{token.icon}</span>
                  <span className="text-[12px] font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {token.symbol}
                  </span>
                </div>
                <span className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
                  ${token.value.toFixed(0)}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: token.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}>
        <p className="text-[12px] font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          7-Day KAM Activity
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-[18px] font-bold" style={{ color: 'var(--color-success)' }}>+$386</p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Pass Earnings</p>
          </div>
          <div className="text-center">
            <p className="text-[18px] font-bold" style={{ color: 'var(--color-accent-teal)' }}>8</p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Proposals Priced</p>
          </div>
          <div className="text-center">
            <p className="text-[18px] font-bold" style={{ color: 'var(--color-accent-gold)' }}>3</p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>Markets Joined</p>
          </div>
        </div>
      </div>
    </div>
  );
}
