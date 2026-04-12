'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import { chatActors, chatMessages, type ChatActor, type ChatMessage } from '@/data/mockData';

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
          Ask any project anything...
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
  const stageColors = {
    Build: '#FFCA00',
    Launch: '#03CCDA',
    Scale: '#00EB7A',
  };

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
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: `${actor.color}20`, color: actor.color }}
          >
            {actor.category}
          </span>
          <span
            className="text-[8px] font-bold px-1 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: `${stageColors[actor.stage]}15`, color: stageColors[actor.stage] }}
          >
            {actor.stage}
          </span>
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
            Program &middot; {actor.category} &middot; {actor.stage}
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
            placeholder="Ask about this project..."
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

  if (message.type === 'proposal-card') {
    return (
      <div className="max-w-[85%]">
        <div className="chat-bubble incoming mb-2">
          <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
        </div>
        <div
          className="rounded-2xl p-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${actorColor}15 0%, ${actorColor}08 100%)`,
            border: `1px solid ${actorColor}40`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📋</span>
            <span className="text-sm font-medium" style={{ color: actorColor }}>Active Proposal</span>
          </div>
          <p className="text-[13px] mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Tap &ldquo;View Full Proposal&rdquo; to review in the Vote tab
          </p>
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

  return (
    <div className={`chat-bubble ${isUser ? 'outgoing' : 'incoming'}`}>
      <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
      <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{message.timestamp}</p>
    </div>
  );
}
