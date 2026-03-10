'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { vaultCoins, vaultActivity, type VaultCoin } from '@/data/mockData';

export default function VaultView() {
  const totalValue = vaultCoins.reduce((sum, c) => sum + c.value, 0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
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
      {/* Ambient */}
      <div
        className="ambient-orb"
        style={{ width: 220, height: 220, background: 'var(--color-accent-gold)', top: -80, left: '50%', marginLeft: -110 }}
      />

      {/* Total balance */}
      <motion.div
        className="text-center mb-6 pt-2"
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
            style={{
              background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)',
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <TrendingUp size={14} style={{ color: 'var(--color-success)' }} />
          <span className="text-[13px] font-medium" style={{ color: 'var(--color-success)' }}>
            +12.4% this week
          </span>
        </div>
      </motion.div>

      {/* Coin orbit visual */}
      <div className="relative h-28 mb-6 flex items-center justify-center">
        {vaultCoins.map((coin, i) => {
          const angle = (i / vaultCoins.length) * Math.PI * 2 - Math.PI / 2;
          const radiusX = 110;
          const radiusY = 35;
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;

          return (
            <motion.div
              key={coin.id}
              className="absolute vault-ring"
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
                animationDelay: `${i * 1.5}s`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: `${coin.color}25`,
                  border: `2px solid ${coin.color}50`,
                  boxShadow: `0 0 20px ${coin.color}20`,
                }}
              >
                {coin.icon}
              </div>
            </motion.div>
          );
        })}
        {/* Center dot */}
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: 'var(--color-accent-gold)', boxShadow: '0 0 20px var(--color-accent-gold)' }}
        />
      </div>

      {/* Coin list */}
      <div className="flex flex-col gap-2 mb-6">
        {vaultCoins.map((coin, i) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <CoinRow coin={coin} />
          </motion.div>
        ))}
      </div>

      {/* Reload button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium mb-6"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))',
          color: 'var(--color-background)',
        }}
      >
        <RefreshCw size={16} />
        Reload Coins
      </motion.button>

      {/* Activity */}
      <div>
        <h3 className="text-[13px] font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          Recent Activity
        </h3>
        <div className="flex flex-col gap-1">
          {vaultActivity.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex items-center gap-3 py-2.5"
              style={{ borderBottom: i < vaultActivity.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: activity.type === 'earned'
                    ? 'rgba(93, 232, 160, 0.1)'
                    : 'rgba(232, 93, 93, 0.1)',
                }}
              >
                {activity.type === 'earned'
                  ? <ArrowDownLeft size={14} style={{ color: 'var(--color-success)' }} />
                  : <ArrowUpRight size={14} style={{ color: 'var(--color-danger)' }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {activity.description}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{activity.time}</p>
              </div>
              <span
                className="text-[13px] font-medium flex-shrink-0"
                style={{ color: activity.type === 'earned' ? 'var(--color-success)' : 'var(--color-danger)' }}
              >
                {activity.type === 'earned' ? '+' : '-'}{activity.amount} {activity.coin}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoinRow({ coin }: { coin: VaultCoin }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-base"
        style={{ background: `${coin.color}20`, border: `1.5px solid ${coin.color}40` }}
      >
        {coin.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium" style={{ color: 'var(--color-text-primary)' }}>{coin.name}</p>
          <p className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {coin.amount.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{coin.symbol}</p>
          <div className="flex items-center gap-1">
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
              ${coin.value.toFixed(2)}
            </span>
            <span
              className="text-[11px] font-medium flex items-center gap-0.5"
              style={{ color: coin.change >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}
            >
              {coin.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {Math.abs(coin.change)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
