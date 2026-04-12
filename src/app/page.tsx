'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from '@/components/PhoneFrame';
import TopBar from '@/components/TopBar';
import BottomNav, { type TabId } from '@/components/BottomNav';
import ChatView from '@/components/chat/ChatView';
import MediaView from '@/components/media/MediaView';
import ShopView from '@/components/shop/ShopView';
import VaultView from '@/components/vault/VaultView';
import VoteView from '@/components/vote/VoteView';
import SettingsView from '@/components/settings/SettingsView';
import LeaderboardPanel from '@/components/overlays/LeaderboardPanel';
import MembersPanel from '@/components/overlays/MembersPanel';
import NotificationsPanel from '@/components/overlays/NotificationsPanel';

const tabTitles: Record<TabId, string> = {
  chat:  'Chat',
  flow:  'Flow',
  seek:  'Seek',
  vote:  'Vote',
  earn:  'Earn',
};

export default function Home() {
  const [activeTab, setActiveTab]               = useState<TabId>('chat');
  const [showSettings, setShowSettings]         = useState(false);
  const [showLeaderboard, setShowLeaderboard]   = useState(false);
  const [showMembers, setShowMembers]           = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSwitchToChat = () => setActiveTab('chat');

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
          {activeTab === 'chat' && <ChatView />}
          {activeTab === 'flow' && <MediaView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'seek' && <ShopView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'vote' && <VoteView />}
          {activeTab === 'earn' && <VaultView />}
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
