'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import {
  markets,
  objectives,
  proposals,
  chatThreads,
  defaultThreadFor,
  type ChatEntityType,
  type ChatMessage,
  type Market,
  type Objective,
  type Proposal,
} from '@/data/mockData';

type ThreadFilter = 'all' | 'market' | 'objective' | 'proposal';

type ThreadItem = {
  id: string;
  type: ChatEntityType;
  name: string;
  subtitle: string;
  tag: string;
  avatar: string;
  color: string;
  unread: number;
  time: string;
  lastMessage: string;
};

interface ChatViewProps {
  initialThreadId?: string | null;
  onThreadOpened?: () => void;
}

export default function ChatView({ initialThreadId, onThreadOpened }: ChatViewProps) {
  const [filter, setFilter] = useState<ThreadFilter>('all');
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialThreadId) {
      setActiveThread(initialThreadId);
      onThreadOpened?.();
    }
  }, [initialThreadId, onThreadOpened]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread]);

  const threads = useMemo<ThreadItem[]>(() => {
    const marketThreads: ThreadItem[] = markets.map(m => ({
      id: m.id,
      type: 'market',
      name: m.name,
      subtitle: `${m.operatorName} · ${m.fundingMode}`,
      tag: 'Market',
      avatar: m.avatar,
      color: m.color,
      unread: m.unread,
      time: m.time,
      lastMessage: m.lastMessage,
    }));

    const objectiveThreads: ThreadItem[] = objectives.map(o => ({
      id: o.id,
      type: 'objective',
      name: o.name,
      subtitle: `${o.marketName} · ${o.presenceName}`,
      tag: 'Objective',
      avatar: o.icon,
      color: o.color,
      unread: 0,
      time: o.time,
      lastMessage: o.lastMessage,
    }));

    const proposalThreads: ThreadItem[] = proposals.map(p => ({
      id: p.id,
      type: 'proposal',
      name: p.title,
      subtitle: `${p.marketName} · ${p.phase}`,
      tag: 'Proposal',
      avatar: '📋',
      color: p.marketColor,
      unread: 0,
      time: p.time,
      lastMessage: p.lastMessage,
    }));

    return [...marketThreads, ...objectiveThreads, ...proposalThreads];
  }, []);

  const filtered = filter === 'all' ? threads : threads.filter(t => t.type === filter);

  if (activeThread) {
    const thread = threads.find(t => t.id === activeThread);
    if (thread) {
      const messages = chatThreads[thread.id] || defaultThreadFor(
        thread.id,
        thread.type === 'objective'
          ? objectives.find(o => o.id === thread.id)?.presenceName || thread.name
          : thread.name,
        thread.type === 'market' ? 'Operator' : thread.type === 'objective' ? 'Elector pool' : 'Proposal',
      );
      return (
        <ChatThread
          thread={thread}
          messages={messages}
          onBack={() => setActiveThread(null)}
          inputValue={inputValue}
          setInputValue={setInputValue}
          messagesEndRef={messagesEndRef}
          onOpenProposal={(id) => setActiveThread(id)}
          onOpenObjective={(id) => setActiveThread(id)}
        />
      );
    }
  }

  return (
    <div className="content-area px-5 pt-2 pb-4">
      <div
        className="ambient-orb"
        style={{ width: 200, height: 200, background: 'var(--color-accent-gold)', top: -60, right: -40 }}
      />

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
      >
        <Sparkles size={16} style={{ color: 'var(--color-accent-gold)' }} />
        <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          Chat with a Market, Objective, or Proposal…
        </span>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {(['all', 'market', 'objective', 'proposal'] as ThreadFilter[]).map(f => (
          <button
            key={f}
            className={`gathering-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'market' ? 'Markets' : f === 'objective' ? 'Objectives' : 'Proposals'}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="flex flex-col gap-1">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.4) }}
          >
            <ChatListItem thread={t} onClick={() => setActiveThread(t.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChatListItem({ thread, onClick }: { thread: ThreadItem; onClick: () => void }) {
  return (
    <motion.button
      className="w-full flex items-center gap-3 p-3 rounded-2xl text-left"
      style={{ background: 'transparent' }}
      whileTap={{ scale: 0.98, background: 'var(--color-surface)' }}
      onClick={onClick}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${thread.color}18`, border: `1.5px solid ${thread.color}40` }}
      >
        {thread.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[15px] truncate" style={{ color: 'var(--color-text-primary)' }}>
            {thread.name}
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0"
            style={{ background: `${thread.color}20`, color: thread.color }}
          >
            {thread.tag}
          </span>
        </div>
        <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--color-text-secondary)' }}>
          {thread.subtitle}
        </p>
        <p className="text-[12px] truncate mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
          {thread.lastMessage}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{thread.time}</span>
        {thread.unread > 0 && (
          <span
            className="min-w-[20px] h-5 rounded-full text-[11px] font-bold flex items-center justify-center px-1.5"
            style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)' }}
          >
            {thread.unread}
          </span>
        )}
      </div>
    </motion.button>
  );
}

function ChatThread({
  thread,
  messages,
  onBack,
  inputValue,
  setInputValue,
  messagesEndRef,
  onOpenProposal,
  onOpenObjective,
}: {
  thread: ThreadItem;
  messages: ChatMessage[];
  onBack: () => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onOpenProposal: (id: string) => void;
  onOpenObjective: (id: string) => void;
}) {
  const entityMeta = useMemo(() => {
    if (thread.type === 'market') {
      const m = markets.find(x => x.id === thread.id);
      return m ? `Operator · ${m.operatorName} · ${m.stage}` : thread.subtitle;
    }
    if (thread.type === 'objective') {
      const o = objectives.find(x => x.id === thread.id);
      return o ? `Elector pool · ${o.presenceName} · score ${o.currentScore}` : thread.subtitle;
    }
    const p = proposals.find(x => x.id === thread.id);
    return p ? `Proposal · ${p.phase} · ${p.status}` : thread.subtitle;
  }, [thread]);

  const placeholder =
    thread.type === 'market' ? 'Ask the Operator…'
    : thread.type === 'objective' ? 'Ask the Elector pool…'
    : 'Ask the proposal…';

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
          style={{ background: `${thread.color}18`, border: `1.5px solid ${thread.color}40` }}
        >
          {thread.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>
            {thread.name}
          </p>
          <p className="text-[11px] truncate" style={{ color: thread.color }}>
            {entityMeta}
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
              <MessageBubble
                message={msg}
                entityColor={thread.color}
                onOpenProposal={onOpenProposal}
                onOpenObjective={onOpenObjective}
              />
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
            placeholder={placeholder}
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

function MessageBubble({
  message,
  entityColor,
  onOpenProposal,
  onOpenObjective,
}: {
  message: ChatMessage;
  entityColor: string;
  onOpenProposal: (id: string) => void;
  onOpenObjective: (id: string) => void;
}) {
  const isUser = message.senderId === 'user';

  if (message.type === 'proposal-card' && message.proposalId) {
    const proposal = proposals.find(p => p.id === message.proposalId);
    if (!proposal) return null;
    return (
      <div className="max-w-[85%]">
        <div className="chat-bubble incoming mb-2">
          <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenProposal(proposal.id)}
          className="w-full text-left rounded-2xl p-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${entityColor}15 0%, ${entityColor}08 100%)`,
            border: `1px solid ${entityColor}40`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📋</span>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: entityColor }}>
              Proposal · {proposal.phase}
            </span>
          </div>
          <p className="text-[13px] font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {proposal.title}
          </p>
          {proposal.status === 'active' && (
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]" style={{ color: 'var(--color-success)' }}>Pass</span>
                <span className="text-[12px] font-bold" style={{ color: 'var(--color-success)' }}>
                  {proposal.passPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]" style={{ color: 'var(--color-danger)' }}>Fail</span>
                <span className="text-[12px] font-bold" style={{ color: 'var(--color-danger)' }}>
                  {proposal.failPrice.toFixed(2)}
                </span>
              </div>
              <span className="text-[10px] ml-auto" style={{ color: 'var(--color-text-tertiary)' }}>
                {proposal.participants.toLocaleString()} Electors
              </span>
            </div>
          )}
          <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Tap to chat with this proposal →
          </p>
        </motion.button>
      </div>
    );
  }

  if (message.type === 'objective-card' && message.objectiveId) {
    const objective = objectives.find(o => o.id === message.objectiveId);
    if (!objective) return null;
    return (
      <div className="max-w-[85%]">
        <div className="chat-bubble incoming mb-2">
          <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{message.content}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenObjective(objective.id)}
          className="w-full text-left rounded-2xl p-4"
          style={{
            background: `linear-gradient(135deg, ${entityColor}15 0%, ${entityColor}08 100%)`,
            border: `1px solid ${entityColor}40`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{objective.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: entityColor }}>
              Objective
            </span>
          </div>
          <p className="text-[13px] font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {objective.name}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="text-[18px] font-bold" style={{ color: entityColor }}>
              {objective.currentScore}
            </div>
            <div
              className="text-[11px] font-medium"
              style={{ color: objective.trend >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}
            >
              {objective.trend >= 0 ? '+' : ''}{objective.trend.toFixed(1)}% this quarter
            </div>
          </div>
        </motion.button>
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
              onClick={() => {
                const [kind, id] = action.action.split(':');
                if (kind === 'chat-objective' && id) onOpenObjective(id);
                if (kind === 'chat-proposal' && id) onOpenProposal(id);
              }}
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
