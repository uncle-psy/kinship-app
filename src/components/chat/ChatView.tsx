'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import { chatActors, chatMessages, type ChatActor, type ChatMessage } from '@/data/mockData';
import { products } from '@/data/products';

export default function ChatView() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread]);

  if (activeThread) {
    const actor = chatActors.find(a => a.id === activeThread);
    const messages = chatMessages[activeThread] || [];
    return (
      <ChatThread
        actor={actor!}
        messages={messages}
        onBack={() => setActiveThread(null)}
        inputValue={inputValue}
        setInputValue={setInputValue}
        messagesEndRef={messagesEndRef}
      />
    );
  }

  return (
    <div className="content-area px-5 pt-2 pb-4">
      {/* Ambient orb */}
      <div
        className="ambient-orb"
        style={{ width: 200, height: 200, background: 'var(--color-accent-gold)', top: -60, right: -40 }}
      />

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
      >
        <Sparkles size={16} style={{ color: 'var(--color-accent-gold)' }} />
        <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          Ask anything...
        </span>
      </div>

      {/* Chat list */}
      <div className="flex flex-col gap-2">
        {chatActors.map((actor, i) => (
          <motion.div
            key={actor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ChatListItem actor={actor} onClick={() => setActiveThread(actor.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChatListItem({ actor, onClick }: { actor: ChatActor; onClick: () => void }) {
  const typeLabel = {
    guide: 'Guide',
    person: '',
    group: 'Group',
    concierge: 'Concierge',
  }[actor.type];

  return (
    <motion.button
      className="w-full flex items-center gap-3 p-3 rounded-2xl text-left"
      style={{ background: 'transparent' }}
      whileTap={{ scale: 0.98, background: 'var(--color-surface)' }}
      onClick={onClick}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
        style={{
          background: `${actor.color}18`,
          border: `1.5px solid ${actor.color}40`,
        }}
      >
        {actor.avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[15px] truncate" style={{ color: 'var(--color-text-primary)' }}>
            {actor.name}
          </span>
          {typeLabel && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: `${actor.color}20`, color: actor.color }}
            >
              {typeLabel}
            </span>
          )}
        </div>
        <p className="text-[13px] truncate mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          {actor.lastMessage}
        </p>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{actor.time}</span>
        {actor.unread > 0 && (
          <span
            className="min-w-[20px] h-5 rounded-full text-[11px] font-bold flex items-center justify-center px-1.5"
            style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)' }}
          >
            {actor.unread}
          </span>
        )}
      </div>
    </motion.button>
  );
}

function ChatThread({
  actor,
  messages,
  onBack,
  inputValue,
  setInputValue,
  messagesEndRef,
}: {
  actor: ChatActor;
  messages: ChatMessage[];
  onBack: () => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <motion.div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}>
          <ArrowLeft size={20} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
          style={{ background: `${actor.color}18`, border: `1.5px solid ${actor.color}40` }}
        >
          {actor.avatar}
        </div>
        <div>
          <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{actor.name}</p>
          <p className="text-[11px]" style={{ color: actor.color }}>
            {actor.type === 'guide' ? 'Your Guide' : actor.type === 'group' ? 'Group Chat' : actor.type === 'concierge' ? 'Concierge' : 'Online'}
          </p>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <MessageBubble message={msg} actorColor={actor.color} />
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 py-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--color-text-primary)' }}
          />
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: inputValue ? 'var(--color-accent-gold)' : 'var(--color-surface-card)' }}
          >
            <Send size={14} style={{ color: inputValue ? 'var(--color-background)' : 'var(--color-text-tertiary)' }} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, actorColor }: { message: ChatMessage; actorColor: string }) {
  const isUser = message.senderId === 'user';

  if (message.type === 'product-card' && message.productId) {
    const product = products.find(p => p.id === message.productId);
    if (!product) return null;
    return (
      <div className="max-w-[85%]">
        <div className="chat-bubble incoming mb-2">
          <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
        </div>
        <div className="product-chat-card">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: product.gradient }}
            >
              {product.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{product.name}</p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{product.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--color-accent-gold)' }}>{product.priceRange}</span>
            <div className="flex gap-2">
              <button
                className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' }}
              >
                Details
              </button>
              <button
                className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'game-invite') {
    return (
      <div className="max-w-[85%]">
        <div
          className="rounded-2xl p-4 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #E87B6B22 0%, #C0392B22 100%)',
            border: '1px solid var(--color-accent-coral)',
            borderColor: 'rgba(232, 123, 107, 0.3)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-medium" style={{ color: 'var(--color-accent-coral)' }}>Game Invite</span>
          </div>
          <p className="font-medium text-[15px] mb-3" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
          <div className="flex gap-2">
            <button
              className="flex-1 text-[12px] font-medium py-2 rounded-xl"
              style={{ background: 'var(--color-accent-coral)', color: 'white' }}
            >
              Join Now
            </button>
            <button
              className="text-[12px] font-medium py-2 px-4 rounded-xl"
              style={{ background: 'rgba(232, 123, 107, 0.15)', color: 'var(--color-accent-coral)' }}
            >
              Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'action-buttons' && message.actions) {
    return (
      <div className="max-w-[85%]">
        <div className="chat-bubble incoming mb-2">
          <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
        </div>
        <div className="flex flex-col gap-2">
          {message.actions.map((action, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.97 }}
              className="w-full text-left px-4 py-3 rounded-2xl text-sm font-medium"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              {action.label}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (message.type === 'media-card') {
    return (
      <div className="max-w-[85%]">
        <div className="chat-bubble incoming mb-2">
          <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
        </div>
        <div
          className="rounded-2xl p-4 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a2a3a 0%, #1a3a4a 100%)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(78, 205, 196, 0.2)' }}>
              <span>🎬</span>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Cold Plunge Protocol</p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>Video &middot; 12 min</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-bubble ${isUser ? 'outgoing' : 'incoming'}`}>
      <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
      <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{message.timestamp}</p>
    </div>
  );
}
