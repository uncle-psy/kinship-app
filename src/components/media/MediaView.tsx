'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Headphones, BookOpen, Image as ImageIcon,
  Sparkles, Send, Repeat2, ThumbsUp, ThumbsDown,
  ChevronDown, ChevronUp, ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { gatherings, mediaItems, type MediaItem } from '@/data/mockData';

interface MediaViewProps {
  onOpenChat?: (mediaId: string) => void;
}

export default function MediaView({ onOpenChat }: MediaViewProps) {
  const [activeGathering, setActiveGathering] = useState('all');
  const [longPressId, setLongPressId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = activeGathering === 'all'
    ? mediaItems
    : mediaItems.filter(m => m.gathering === activeGathering);

  const handleTouchStart = useCallback((id: string) => {
    timerRef.current = setTimeout(() => {
      setLongPressId(id);
    }, 500);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      {/* Ambient */}
      <div
        className="ambient-orb"
        style={{ width: 180, height: 180, background: 'var(--color-accent-sage)', top: -40, left: -60 }}
      />

      {/* Gathering filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {gatherings.map(g => (
          <button
            key={g.id}
            className={`gathering-pill ${activeGathering === g.id ? 'active' : ''}`}
            onClick={() => setActiveGathering(g.id)}
          >
            <span className="mr-1.5">{g.icon}</span>
            {g.name}
          </button>
        ))}
      </div>

      {/* Media feed */}
      <div className="flex flex-col gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <MediaCard
              item={item}
              isLongPressed={longPressId === item.id}
              onTouchStart={() => handleTouchStart(item.id)}
              onTouchEnd={handleTouchEnd}
              onDismissOverlay={() => setLongPressId(null)}
              onRemix={() => {
                setLongPressId(null);
                onOpenChat?.(item.id);
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MediaCard({
  item,
  isLongPressed,
  onTouchStart,
  onTouchEnd,
  onDismissOverlay,
  onRemix,
}: {
  item: MediaItem;
  isLongPressed: boolean;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onDismissOverlay: () => void;
  onRemix: () => void;
}) {
  const [showRemixes, setShowRemixes] = useState(false);
  const [preference, setPreference] = useState<'more' | 'less' | null>(null);

  const typeIcon = {
    video: <Play size={16} />,
    audio: <Headphones size={16} />,
    article: <BookOpen size={16} />,
    image: <ImageIcon size={16} />,
  }[item.type];

  const typeLabel = {
    video: 'Video',
    audio: 'Audio',
    article: 'Article',
    image: 'Image',
  }[item.type];

  return (
    <div
      className="media-card"
      onMouseDown={onTouchStart}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Card content */}
      <div className="relative" style={{ background: item.gradient }}>
        {/* Visual area */}
        <div className="h-44 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ opacity: 0.1 }}>
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full" style={{ background: 'white', filter: 'blur(30px)' }} />
            <div className="absolute bottom-4 right-8 w-32 h-32 rounded-full" style={{ background: 'white', filter: 'blur(40px)' }} />
          </div>

          {/* Type icon */}
          <div className="flex flex-col items-center gap-3 z-10">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
            >
              <span className="text-white">{typeIcon}</span>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {typeLabel}
            </span>
          </div>

          {/* Made for you badge */}
          {item.madeForYou && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', color: 'var(--color-accent-gold)' }}
            >
              <Sparkles size={10} />
              Made for you
            </div>
          )}

          {/* Originator badge */}
          <button
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-medium"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.85)' }}
          >
            <span className="text-[12px]">{item.originatorAvatar}</span>
            <span>Origin: {item.originator}</span>
            <ExternalLink size={9} style={{ opacity: 0.6 }} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4" style={{ background: 'var(--color-surface-card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
            >
              {item.authorAvatar}
            </div>
            <span className="text-[12px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {item.author}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>&middot; {item.timeAgo}</span>
          </div>

          <h3 className="text-[15px] font-medium leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {item.title}
          </h3>
          <p className="text-[12px] mb-3" style={{ color: 'var(--color-text-tertiary)' }}>{item.subtitle}</p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                <Send size={13} />
                Send
              </button>
              <button
                className="flex items-center gap-1.5 text-[12px]"
                style={{ color: item.remixes > 0 ? 'var(--color-accent-lavender)' : 'var(--color-text-secondary)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.remixes > 0 && item.remixers) {
                    setShowRemixes(!showRemixes);
                  } else {
                    onRemix();
                  }
                }}
              >
                <Repeat2 size={14} />
                {item.remixes > 0 ? item.remixes : 'Remix'}
                {item.remixes > 0 && (
                  showRemixes ? <ChevronUp size={10} /> : <ChevronDown size={10} />
                )}
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: preference === 'more' ? 'rgba(93, 232, 160, 0.15)' : 'transparent',
                  color: preference === 'more' ? 'var(--color-success)' : 'var(--color-text-tertiary)',
                }}
                onClick={(e) => { e.stopPropagation(); setPreference(preference === 'more' ? null : 'more'); }}
              >
                <ThumbsUp size={13} />
              </button>
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: preference === 'less' ? 'rgba(232, 93, 93, 0.15)' : 'transparent',
                  color: preference === 'less' ? 'var(--color-danger)' : 'var(--color-text-tertiary)',
                }}
                onClick={(e) => { e.stopPropagation(); setPreference(preference === 'less' ? null : 'less'); }}
              >
                <ThumbsDown size={13} />
              </button>
            </div>
          </div>

          {/* Remix accordion */}
          <AnimatePresence>
            {showRemixes && item.remixers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  <p className="text-[11px] font-medium mb-2" style={{ color: 'var(--color-accent-lavender)' }}>
                    Remixed by {item.remixers.length} people
                  </p>
                  <div className="flex flex-col gap-2">
                    {item.remixers.map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[12px]">{r.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.name}</span>
                          <span className="text-[11px] ml-1" style={{ color: 'var(--color-text-tertiary)' }}>— {r.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => { e.stopPropagation(); onRemix(); }}
                    className="w-full mt-2 py-2 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5"
                    style={{ background: 'rgba(167, 139, 186, 0.15)', color: 'var(--color-accent-lavender)' }}
                  >
                    <Repeat2 size={13} />
                    Remix This
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Long press overlay */}
      <AnimatePresence>
        {isLongPressed && (
          <motion.div
            className="media-long-press"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-3 px-4"
            >
              <p className="text-sm font-medium text-center" style={{ color: 'var(--color-text-primary)' }}>
                {item.title}
              </p>
              <div className="flex flex-col gap-2 w-full">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onRemix}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{ background: 'var(--color-accent-lavender)', color: 'white' }}
                >
                  <Repeat2 size={16} />
                  Remix in Chat
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)' }}
                >
                  <Send size={14} />
                  Send to...
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)' }}
                >
                  <MessageCircle size={14} />
                  Discuss in Chat
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onDismissOverlay}
                  className="px-4 py-2 rounded-full text-sm text-center"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
