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
import MakeView from '@/components/make/MakeView';
import SettingsView from '@/components/settings/SettingsView';

const tabTitles: Record<TabId, string> = {
  chat:    'Chat',
  media:   'Flow',
  explore: 'Explore',
  vault:   'Earn',
  make:    'Make',
};

export default function Home() {
  const [activeTab, setActiveTab]     = useState<TabId>('chat');
  const [showSettings, setShowSettings] = useState(false);

  const handleSwitchToChat = () => setActiveTab('chat');

  return (
    <PhoneFrame>
      <TopBar title={tabTitles[activeTab]} onOpenSettings={() => setShowSettings(true)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="flex-1 overflow-hidden relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'chat'    && <ChatView />}
          {activeTab === 'media'   && <MediaView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'explore' && <ShopView onOpenChat={handleSwitchToChat} />}
          {activeTab === 'vault'   && <VaultView />}
          {activeTab === 'make'    && <MakeView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      <AnimatePresence>
        {showSettings && (
          <SettingsView onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}
