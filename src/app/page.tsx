'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from '@/components/PhoneFrame';
import TopBar from '@/components/TopBar';
import BottomNav, { type TabId } from '@/components/BottomNav';
import ChatView from '@/components/chat/ChatView';
import MarketsView from '@/components/markets/MarketsView';
import ObjectivesView from '@/components/objectives/ObjectivesView';
import ProposalsView from '@/components/proposals/ProposalsView';
import VaultView from '@/components/vault/VaultView';
import SettingsView from '@/components/settings/SettingsView';
import LeaderboardPanel from '@/components/overlays/LeaderboardPanel';
import MembersPanel from '@/components/overlays/MembersPanel';
import NotificationsPanel from '@/components/overlays/NotificationsPanel';

const tabTitles: Record<TabId, string> = {
  chat:       'Chat',
  markets:    'Markets',
  objectives: 'Objectives',
  proposals:  'Proposals',
  earn:       'Earn',
};

export default function Home() {
  const [activeTab, setActiveTab]                 = useState<TabId>('markets');
  const [pendingThreadId, setPendingThreadId]     = useState<string | null>(null);
  const [showSettings, setShowSettings]           = useState(false);
  const [showLeaderboard, setShowLeaderboard]     = useState(false);
  const [showMembers, setShowMembers]             = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const openThreadInChat = (threadId: string) => {
    setPendingThreadId(threadId);
    setActiveTab('chat');
  };

  return (
    <PhoneFrame>
      <TopBar
        title={tabTitles[activeTab]}
        onOpenSettings={() => setShowSettings(true)}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenMembers={() => setShowMembers(true)}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="flex-1 overflow-hidden relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'chat'       && <ChatView initialThreadId={pendingThreadId} onThreadOpened={() => setPendingThreadId(null)} />}
          {activeTab === 'markets'    && <MarketsView onOpenChat={openThreadInChat} />}
          {activeTab === 'objectives' && <ObjectivesView onOpenChat={openThreadInChat} />}
          {activeTab === 'proposals'  && <ProposalsView onOpenChat={openThreadInChat} />}
          {activeTab === 'earn'       && <VaultView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      <AnimatePresence>
        {showSettings && <SettingsView onClose={() => setShowSettings(false)} />}
        {showLeaderboard && <LeaderboardPanel onClose={() => setShowLeaderboard(false)} />}
        {showMembers && <MembersPanel onClose={() => setShowMembers(false)} />}
        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      </AnimatePresence>
    </PhoneFrame>
  );
}
