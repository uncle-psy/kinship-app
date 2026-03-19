'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from '@/components/PhoneFrame';
import TopBar from '@/components/TopBar';
import BottomNav, { type TabId } from '@/components/BottomNav';
import ChatView from '@/components/chat/ChatView';
import MediaView from '@/components/media/MediaView';
import GamesView from '@/components/games/GamesView';
import ShopView from '@/components/shop/ShopView';
import VaultView from '@/components/vault/VaultView';

const tabTitles: Record<TabId, string> = {
  chat: 'Chat',
  media: 'Flow',
  games: 'Experience',
  shop: 'Discover',
  vault: 'Earn',
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('chat');

  const handleSwitchToChat = () => setActiveTab('chat');

  return (
    <PhoneFrame>
      <TopBar title={tabTitles[activeTab]} />

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
          {activeTab === 'media' && <MediaView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'games' && <GamesView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'shop' && <ShopView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'vault' && <VaultView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </PhoneFrame>
  );
}
