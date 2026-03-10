export interface ChatActor {
  id: string;
  name: string;
  avatar: string;
  type: 'guide' | 'person' | 'group' | 'concierge';
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  type: 'text' | 'product-card' | 'media-card' | 'game-invite' | 'action-buttons';
  content: string;
  timestamp: string;
  productId?: string;
  mediaId?: string;
  gameId?: string;
  actions?: { label: string; action: string }[];
}

export interface MediaItem {
  id: string;
  type: 'image' | 'article' | 'video' | 'audio';
  title: string;
  subtitle: string;
  author: string;
  authorAvatar: string;
  gathering: string;
  gradient: string;
  timeAgo: string;
  remixes: number;
  madeForYou: boolean;
  originator: string;
  originatorAvatar: string;
  remixers?: { name: string; avatar: string; action: string }[];
}

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  gradient: string;
  icon: string;
  players: number;
  isNew: boolean;
}

export interface VaultCoin {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  color: string;
  icon: string;
}

export const chatActors: ChatActor[] = [
  {
    id: 'kinship-guide',
    name: 'Kinship Guide',
    avatar: '✦',
    type: 'guide',
    color: '#D4A574',
    lastMessage: 'Your morning wellness ritual is ready...',
    time: '2m',
    unread: 3,
  },
  {
    id: 'wellness-circle',
    name: 'Wellness Circle',
    avatar: '◎',
    type: 'group',
    color: '#7EB8A8',
    lastMessage: 'New challenge: 7-day cold plunge series',
    time: '15m',
    unread: 12,
  },
  {
    id: 'shop-concierge',
    name: 'Shop Concierge',
    avatar: '◈',
    type: 'concierge',
    color: '#A78BBA',
    lastMessage: 'Lajit Gold is back in stock!',
    time: '1h',
    unread: 1,
  },
  {
    id: 'game-master',
    name: 'Game Master',
    avatar: '⬡',
    type: 'guide',
    color: '#E87B6B',
    lastMessage: 'You unlocked "Mindful Warrior" in Energy Flow!',
    time: '3h',
    unread: 0,
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    avatar: '♡',
    type: 'person',
    color: '#FFB6C1',
    lastMessage: 'Have you tried the mushroom blend?',
    time: '5h',
    unread: 0,
  },
  {
    id: 'biohack-crew',
    name: 'Biohack Crew',
    avatar: '◬',
    type: 'group',
    color: '#4ECDC4',
    lastMessage: 'Marcus shared new EMF research',
    time: '1d',
    unread: 5,
  },
  {
    id: 'creator-studio',
    name: 'Creator Studio',
    avatar: '◐',
    type: 'guide',
    color: '#DAA520',
    lastMessage: 'Your content performance this week...',
    time: '1d',
    unread: 0,
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  'kinship-guide': [
    {
      id: 'm1',
      senderId: 'kinship-guide',
      type: 'text',
      content: 'Good morning! Based on your sleep data and yesterday\'s activity, I\'ve curated your morning ritual.',
      timestamp: '9:02 AM',
    },
    {
      id: 'm2',
      senderId: 'kinship-guide',
      type: 'action-buttons',
      content: 'Ready to start your morning flow?',
      timestamp: '9:02 AM',
      actions: [
        { label: '🧘 Begin Breathwork', action: 'breathwork' },
        { label: '📖 Morning Reading', action: 'reading' },
        { label: '💊 Supplement Check', action: 'supplements' },
      ],
    },
    {
      id: 'm3',
      senderId: 'user',
      type: 'text',
      content: 'Show me the supplement check',
      timestamp: '9:05 AM',
    },
    {
      id: 'm4',
      senderId: 'kinship-guide',
      type: 'product-card',
      content: 'Based on your bio markers, here\'s today\'s recommendation:',
      timestamp: '9:05 AM',
      productId: 'lajit-gold',
    },
    {
      id: 'm5',
      senderId: 'kinship-guide',
      type: 'text',
      content: 'Shilajit in the morning supports mitochondrial function and gives you sustained energy without the crash. Your iron levels from last week\'s test suggest this would be especially beneficial right now.',
      timestamp: '9:06 AM',
    },
    {
      id: 'm6',
      senderId: 'kinship-guide',
      type: 'product-card',
      content: 'And pair it with this for cognitive support:',
      timestamp: '9:06 AM',
      productId: 'high-vibe-mushrooms',
    },
    {
      id: 'm7',
      senderId: 'user',
      type: 'text',
      content: 'Add both to cart',
      timestamp: '9:08 AM',
    },
    {
      id: 'm8',
      senderId: 'kinship-guide',
      type: 'text',
      content: 'Done! Both added to your cart. Your Wellness Circle is starting a group challenge today — want me to join you in?',
      timestamp: '9:08 AM',
    },
    {
      id: 'm9',
      senderId: 'kinship-guide',
      type: 'game-invite',
      content: 'Energy Flow Challenge',
      timestamp: '9:09 AM',
      gameId: 'energy-flow',
    },
  ],
  'wellness-circle': [
    {
      id: 'wc1',
      senderId: 'wellness-circle',
      type: 'text',
      content: '🧊 New 7-Day Cold Plunge Challenge starts tomorrow! 23 members have already joined.',
      timestamp: '8:30 AM',
    },
    {
      id: 'wc2',
      senderId: 'wellness-circle',
      type: 'media-card',
      content: 'Check out this guided cold exposure protocol:',
      timestamp: '8:31 AM',
      mediaId: 'cold-plunge-guide',
    },
    {
      id: 'wc3',
      senderId: 'sarah-chen',
      type: 'text',
      content: 'I\'m in! Did my first 2 minutes yesterday 🥶',
      timestamp: '8:45 AM',
    },
  ],
  'shop-concierge': [
    {
      id: 'sc1',
      senderId: 'shop-concierge',
      type: 'text',
      content: 'Great news! Items you\'ve been watching are now available:',
      timestamp: '7:00 AM',
    },
    {
      id: 'sc2',
      senderId: 'shop-concierge',
      type: 'product-card',
      content: 'Back in stock:',
      timestamp: '7:00 AM',
      productId: 'lajit-gold',
    },
    {
      id: 'sc3',
      senderId: 'shop-concierge',
      type: 'action-buttons',
      content: 'What would you like to do?',
      timestamp: '7:01 AM',
      actions: [
        { label: '🛒 Add to Cart', action: 'add-cart' },
        { label: '💬 Ask Questions', action: 'ask' },
        { label: '👥 Share with Circle', action: 'share' },
      ],
    },
  ],
};

export const gatherings = [
  { id: 'all', name: 'For You', icon: '✦' },
  { id: 'wellness-circle', name: 'Wellness Circle', icon: '◎' },
  { id: 'biohack-crew', name: 'Biohack Crew', icon: '◬' },
  { id: 'mindful-living', name: 'Mindful Living', icon: '☯' },
  { id: 'nutrition', name: 'Nutrition Hub', icon: '🌿' },
  { id: 'movement', name: 'Movement', icon: '🏃' },
];

export const mediaItems: MediaItem[] = [
  {
    id: 'med1',
    type: 'article',
    title: 'The Science Behind Grounding: Why Walking Barefoot Changes Everything',
    subtitle: 'Curated from your interests and recent purchases',
    author: 'Kinship Guide',
    authorAvatar: '✦',
    gathering: 'wellness-circle',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #2a3a2a 100%)',
    timeAgo: '2h',
    remixes: 12,
    madeForYou: true,
    originator: 'Dr. Maya Wells',
    originatorAvatar: '🌿',
    remixers: [
      { name: 'Sarah Chen', avatar: '♡', action: 'Added personal grounding routine' },
      { name: 'Marcus J.', avatar: '◬', action: 'Combined with EMF research' },
      { name: 'Wellness Circle', avatar: '◎', action: 'Adapted for cold climate' },
    ],
  },
  {
    id: 'med2',
    type: 'video',
    title: '5-Minute Morning Breathwork for Peak Energy',
    subtitle: 'Shared by Sarah Chen in Wellness Circle',
    author: 'Sarah Chen',
    authorAvatar: '♡',
    gathering: 'wellness-circle',
    gradient: 'linear-gradient(135deg, #2a1a2a 0%, #3a2a3a 100%)',
    timeAgo: '4h',
    remixes: 34,
    madeForYou: false,
    originator: 'Sarah Chen',
    originatorAvatar: '♡',
    remixers: [
      { name: 'Biohack Crew', avatar: '◬', action: 'Extended to 10-minute version' },
      { name: 'Alex R.', avatar: '⬡', action: 'Added ambient soundtrack' },
    ],
  },
  {
    id: 'med3',
    type: 'article',
    title: 'Your Weekly Biomarker Report: HRV Up 12%, Sleep Score Improving',
    subtitle: 'Generated from your health data',
    author: 'Kinship Guide',
    authorAvatar: '✦',
    gathering: 'all',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    timeAgo: '6h',
    remixes: 0,
    madeForYou: true,
    originator: 'Your Data',
    originatorAvatar: '📊',
  },
  {
    id: 'cold-plunge-guide',
    type: 'video',
    title: 'Cold Plunge Protocol: From 30 Seconds to 5 Minutes',
    subtitle: 'Created for Biohack Crew challenge',
    author: 'Biohack Crew',
    authorAvatar: '◬',
    gathering: 'biohack-crew',
    gradient: 'linear-gradient(135deg, #0a2a3a 0%, #1a3a4a 100%)',
    timeAgo: '8h',
    remixes: 89,
    madeForYou: true,
    originator: 'Wim Hof Method',
    originatorAvatar: '🧊',
    remixers: [
      { name: 'Dr. Frost', avatar: '❄️', action: 'Added safety guidelines' },
      { name: 'Biohack Crew', avatar: '◬', action: 'Personalized for members' },
      { name: 'Sarah Chen', avatar: '♡', action: 'Added beginner modifications' },
    ],
  },
  {
    id: 'med5',
    type: 'audio',
    title: 'Sound Healing Session: 432Hz Tibetan Bowls',
    subtitle: 'Recommended based on your stress levels',
    author: 'Kinship Guide',
    authorAvatar: '✦',
    gathering: 'mindful-living',
    gradient: 'linear-gradient(135deg, #2a1a3a 0%, #1a0a2a 100%)',
    timeAgo: '12h',
    remixes: 203,
    madeForYou: true,
    originator: 'Temple Sounds Collective',
    originatorAvatar: '🔔',
    remixers: [
      { name: 'Mindful Living', avatar: '☯', action: 'Blended with nature sounds' },
    ],
  },
  {
    id: 'med6',
    type: 'image',
    title: 'Mushroom Foraging Guide: Pacific Northwest Edition',
    subtitle: 'Curated for Nutrition Hub gathering',
    author: 'Kinship Guide',
    authorAvatar: '✦',
    gathering: 'nutrition',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #0a1a0a 100%)',
    timeAgo: '1d',
    remixes: 15,
    madeForYou: true,
    originator: "Dr. Cowan's Garden",
    originatorAvatar: '🌱',
    remixers: [
      { name: 'Nutrition Hub', avatar: '🌿', action: 'Added regional specifics' },
    ],
  },
];

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  color: string;
  type: 'person' | 'guide' | 'group';
  isImportant: boolean;
  relationship: 'clan' | 'guild' | 'gathering';
}

export const contacts: Contact[] = [
  { id: 'sarah-chen', name: 'Sarah Chen', avatar: '♡', color: '#FFB6C1', type: 'person', isImportant: true, relationship: 'clan' },
  { id: 'marcus-j', name: 'Marcus J.', avatar: '◬', color: '#4ECDC4', type: 'person', isImportant: true, relationship: 'clan' },
  { id: 'kinship-guide', name: 'Kinship Guide', avatar: '✦', color: '#D4A574', type: 'guide', isImportant: true, relationship: 'guild' },
  { id: 'alex-r', name: 'Alex R.', avatar: '⬡', color: '#E87B6B', type: 'person', isImportant: false, relationship: 'guild' },
  { id: 'dr-maya', name: 'Dr. Maya Wells', avatar: '🌿', color: '#7EB8A8', type: 'person', isImportant: true, relationship: 'guild' },
  { id: 'wellness-circle', name: 'Wellness Circle', avatar: '◎', color: '#7EB8A8', type: 'group', isImportant: true, relationship: 'gathering' },
  { id: 'biohack-crew', name: 'Biohack Crew', avatar: '◬', color: '#4ECDC4', type: 'group', isImportant: true, relationship: 'gathering' },
  { id: 'mindful-living', name: 'Mindful Living', avatar: '☯', color: '#A78BBA', type: 'group', isImportant: false, relationship: 'gathering' },
  { id: 'game-master', name: 'Game Master', avatar: '⬡', color: '#E87B6B', type: 'guide', isImportant: false, relationship: 'guild' },
  { id: 'shop-concierge', name: 'Shop Concierge', avatar: '◈', color: '#A78BBA', type: 'guide', isImportant: false, relationship: 'guild' },
  { id: 'nutrition-hub', name: 'Nutrition Hub', avatar: '🌿', color: '#6B8E23', type: 'group', isImportant: false, relationship: 'gathering' },
  { id: 'leo-b', name: 'Leo B.', avatar: '☀️', color: '#DAA520', type: 'person', isImportant: false, relationship: 'clan' },
];

export const games: GameInfo[] = [
  {
    id: 'wellness-quest',
    name: 'Wellness Quest',
    description: 'Build your wellness sanctuary in an isometric world',
    gradient: 'linear-gradient(135deg, #7EB8A8 0%, #2D5A4E 100%)',
    icon: '🏯',
    players: 1243,
    isNew: false,
  },
  {
    id: 'mind-garden',
    name: 'Mind Garden',
    description: 'Grow a meditative garden that reflects your practice',
    gradient: 'linear-gradient(135deg, #A78BBA 0%, #6B4D8A 100%)',
    icon: '🌸',
    players: 892,
    isNew: true,
  },
  {
    id: 'energy-flow',
    name: 'Energy Flow',
    description: 'Navigate energy pathways in a chakra-inspired world',
    gradient: 'linear-gradient(135deg, #E87B6B 0%, #C0392B 100%)',
    icon: '⚡',
    players: 2107,
    isNew: false,
  },
];

export const vaultCoins: VaultCoin[] = [
  {
    id: 'kin',
    name: 'Kinship Coins',
    symbol: 'KIN',
    amount: 2450,
    value: 245.0,
    change: 12.5,
    color: '#D4A574',
    icon: '✦',
  },
  {
    id: 'wellness',
    name: 'Wellness Tokens',
    symbol: 'WELL',
    amount: 180,
    value: 36.0,
    change: 5.2,
    color: '#7EB8A8',
    icon: '◎',
  },
  {
    id: 'game',
    name: 'Game Credits',
    symbol: 'GC',
    amount: 520,
    value: 52.0,
    change: -2.1,
    color: '#E87B6B',
    icon: '⬡',
  },
  {
    id: 'creator',
    name: 'Creator Rewards',
    symbol: 'CR',
    amount: 75,
    value: 150.0,
    change: 28.3,
    color: '#A78BBA',
    icon: '◈',
  },
];

export const vaultActivity = [
  { id: 'a1', type: 'earned', description: 'Morning routine completed', amount: 15, coin: 'KIN', time: '2h ago' },
  { id: 'a2', type: 'earned', description: 'Wellness Quest achievement', amount: 50, coin: 'GC', time: '5h ago' },
  { id: 'a3', type: 'spent', description: 'Shop purchase: Lajit Gold', amount: 120, coin: 'KIN', time: '1d ago' },
  { id: 'a4', type: 'earned', description: 'Content shared to circle', amount: 10, coin: 'CR', time: '1d ago' },
  { id: 'a5', type: 'earned', description: 'Cold plunge challenge Day 3', amount: 25, coin: 'WELL', time: '2d ago' },
  { id: 'a6', type: 'earned', description: 'Referral bonus: Sarah Chen', amount: 100, coin: 'KIN', time: '3d ago' },
];
