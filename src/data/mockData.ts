// ── Kinship Agents — Agentic DUNA Futarchy Governance ──────────────────────
// All interactions cross-optimize for value creation and planetary flourishing.
// "Users" are Parties. Personal agents are Presences. Smart contracts are Vibe Contracts.

// ── Chat (Startup Project Programs) ─────────────────────────────────────────

export interface ChatActor {
  id: string;
  name: string;
  avatar: string;
  type: 'program';
  category: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
  founder: string;
  stage: 'Build' | 'Launch' | 'Scale';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  type: 'text' | 'proposal-card' | 'action-buttons';
  content: string;
  timestamp: string;
  proposalId?: string;
  actions?: { label: string; action: string }[];
}

export const chatActors: ChatActor[] = [
  {
    id: 'terra-ai',
    name: 'TerraAI',
    avatar: '🤖',
    type: 'program',
    category: 'AI',
    color: '#03CCDA',
    lastMessage: 'Our climate prediction model could reduce crop losses by 40% in sub-Saharan Africa...',
    time: '5m',
    unread: 3,
    founder: 'Dr. Amara Okafor',
    stage: 'Launch',
  },
  {
    id: 'equitable-lending',
    name: 'EquiLend',
    avatar: '🏦',
    type: 'program',
    category: 'Fintech',
    color: '#00EB7A',
    lastMessage: 'The micro-lending protocol has disbursed $2.4M to underbanked communities...',
    time: '12m',
    unread: 2,
    founder: 'Maya Rodriguez',
    stage: 'Scale',
  },
  {
    id: 'helix-health',
    name: 'Helix Health',
    avatar: '🧬',
    type: 'program',
    category: 'Healthcare',
    color: '#EC008C',
    lastMessage: 'Proposal: Deploy telehealth nodes in 12 rural clinics across Appalachia...',
    time: '28m',
    unread: 1,
    founder: 'Dr. James Whitfield',
    stage: 'Build',
  },
  {
    id: 'opendesk',
    name: 'OpenDesk',
    avatar: '💼',
    type: 'program',
    category: 'B2B',
    color: '#FFCA00',
    lastMessage: 'Worker-owned cooperative model is showing 3x retention vs. traditional staffing...',
    time: '1h',
    unread: 0,
    founder: 'Collective DAO',
    stage: 'Launch',
  },
  {
    id: 'symbiome',
    name: 'Symbiome',
    avatar: '🧪',
    type: 'program',
    category: 'Biotech',
    color: '#6536B4',
    lastMessage: 'Soil microbiome restoration trial results: 60% yield increase with zero pesticides...',
    time: '2h',
    unread: 5,
    founder: 'BioRestore Foundation',
    stage: 'Build',
  },
  {
    id: 'civicchain',
    name: 'CivicChain',
    avatar: '🏛️',
    type: 'program',
    category: 'Government',
    color: '#4ECDC4',
    lastMessage: 'Transparent budgeting pilot reduced municipal waste by 22% in Burlington...',
    time: '3h',
    unread: 0,
    founder: 'GovTech Alliance',
    stage: 'Launch',
  },
  {
    id: 'learnloop',
    name: 'LearnLoop',
    avatar: '📚',
    type: 'program',
    category: 'Education',
    color: '#FFB347',
    lastMessage: 'AI tutoring has closed the math gap for 8,000 students in Title I schools...',
    time: '5h',
    unread: 0,
    founder: 'Dr. Priya Sharma',
    stage: 'Scale',
  },
  {
    id: 'roothome',
    name: 'RootHome',
    avatar: '🏠',
    type: 'program',
    category: 'Real Estate',
    color: '#D4A574',
    lastMessage: 'Community land trust model makes homes 45% more affordable without subsidy...',
    time: '8h',
    unread: 1,
    founder: 'Housing Justice Lab',
    stage: 'Build',
  },
  {
    id: 'deepfield',
    name: 'DeepField',
    avatar: '🔬',
    type: 'program',
    category: 'Deep Tech',
    color: '#7EB8A8',
    lastMessage: 'Quantum-enhanced water purification could serve 500M people by 2030...',
    time: '1d',
    unread: 0,
    founder: 'Dr. Lin Wei',
    stage: 'Build',
  },
  {
    id: 'kinfolk',
    name: 'KinFolk',
    avatar: '👥',
    type: 'program',
    category: 'Consumer',
    color: '#FF6B8A',
    lastMessage: 'Ethical marketplace connecting artisans directly to buyers — 92% of revenue to creators...',
    time: '1d',
    unread: 0,
    founder: 'Artisan Collective',
    stage: 'Launch',
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  'terra-ai': [
    {
      id: 'm1',
      senderId: 'terra-ai',
      type: 'text',
      content: 'Welcome to TerraAI. Our mission is to use predictive AI to help smallholder farmers adapt to climate change while building regenerative food systems.',
      timestamp: '9:02 AM',
    },
    {
      id: 'm2',
      senderId: 'user',
      type: 'text',
      content: 'How does this create both economic value and address food insecurity?',
      timestamp: '9:04 AM',
    },
    {
      id: 'm3',
      senderId: 'terra-ai',
      type: 'text',
      content: 'Great question. Value side: Our prediction model reduces crop losses by 40%, generating $12M in saved produce annually across our pilot regions. Each farmer sees an average 3.2x return on their subscription.',
      timestamp: '9:05 AM',
    },
    {
      id: 'm4',
      senderId: 'terra-ai',
      type: 'text',
      content: 'Flourishing side: We serve 14,000 smallholder families in sub-Saharan Africa. Food waste reduction cuts methane emissions. Our soil health recommendations have restored 2,400 hectares of degraded farmland. Zero pesticide approach protects local water systems.',
      timestamp: '9:05 AM',
    },
    {
      id: 'm5',
      senderId: 'user',
      type: 'text',
      content: 'What about the upcoming governance proposal?',
      timestamp: '9:08 AM',
    },
    {
      id: 'm6',
      senderId: 'terra-ai',
      type: 'proposal-card',
      content: 'Active Proposal: Expand prediction coverage to Southeast Asia',
      timestamp: '9:08 AM',
      proposalId: 'prop-terra-expand',
    },
    {
      id: 'm7',
      senderId: 'terra-ai',
      type: 'text',
      content: 'This proposal would allocate 200,000 TERRA tokens to deploy our model in Vietnam, Cambodia, and Myanmar. Projected impact: 45,000 additional farming families served, $8M in value creation, and restoration of 5,000 hectares of rice paddies using regenerative methods.',
      timestamp: '9:09 AM',
    },
    {
      id: 'm8',
      senderId: 'terra-ai',
      type: 'action-buttons',
      content: 'Would you like to explore this further?',
      timestamp: '9:10 AM',
      actions: [
        { label: 'View Full Proposal', action: 'view-proposal' },
        { label: 'See Agent Arguments', action: 'agent-debate' },
        { label: 'Enter Flow Simulation', action: 'enter-flow' },
      ],
    },
  ],
  'equitable-lending': [
    {
      id: 'el1',
      senderId: 'equitable-lending',
      type: 'text',
      content: 'EquiLend is a decentralized micro-lending protocol that provides fair-rate loans to underbanked communities, with profits redistributed to community development funds.',
      timestamp: '8:30 AM',
    },
    {
      id: 'el2',
      senderId: 'user',
      type: 'text',
      content: 'How do you ensure this doesn\'t become predatory lending with a blockchain wrapper?',
      timestamp: '8:35 AM',
    },
    {
      id: 'el3',
      senderId: 'equitable-lending',
      type: 'text',
      content: 'Our Vibe Contract caps interest at 3.5% APR — enforced on-chain. 40% of protocol revenue goes to a community development fund governed by borrowers themselves. Default recovery uses reputation-based social collateral, not asset seizure. Every loan interaction is auditable on-chain.',
      timestamp: '8:36 AM',
    },
    {
      id: 'el4',
      senderId: 'equitable-lending',
      type: 'text',
      content: 'Results so far: $2.4M disbursed, 98.2% repayment rate, 1,200 small businesses launched, average borrower income up 34% within 18 months. Zero predatory outcomes flagged by our ethics AI.',
      timestamp: '8:37 AM',
    },
  ],
  'helix-health': [
    {
      id: 'hh1',
      senderId: 'helix-health',
      type: 'text',
      content: 'Helix Health is building a decentralized telehealth network that brings specialist care to underserved rural communities. Our model pairs AI diagnostics with human physicians.',
      timestamp: '8:00 AM',
    },
    {
      id: 'hh2',
      senderId: 'user',
      type: 'text',
      content: 'What\'s the proposal for Appalachia?',
      timestamp: '8:05 AM',
    },
    {
      id: 'hh3',
      senderId: 'helix-health',
      type: 'text',
      content: 'We\'re proposing to deploy 12 telehealth nodes across rural Appalachian clinics. Value: $4.2M in reduced emergency transport costs, sustainable revenue model from insurance reimbursements. Benefits: 28,000 residents gain access to specialists within 15 minutes instead of 3-hour drives. Maternal mortality rates in these areas are 2x the national average — we can change that.',
      timestamp: '8:06 AM',
    },
  ],
};

// ── Flow (Project Simulation Cards) ────────────────────────────────────────

export interface FlowItem {
  id: string;
  projectId: string;
  projectName: string;
  category: string;
  title: string;
  description: string;
  gradient: string;
  founder: string;
  stage: 'Build' | 'Launch' | 'Scale';
  activeMembers: number;
  environment: 'office' | 'lab' | 'clinic' | 'farm' | 'classroom' | 'marketplace' | 'city-hall' | 'workshop' | 'housing' | 'factory';
  flows: string[];
}

export const flowCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'ai', name: 'AI' },
  { id: 'fintech', name: 'Fintech' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'biotech', name: 'Biotech' },
  { id: 'education', name: 'Education' },
  { id: 'govtech', name: 'Government' },
  { id: 'consumer', name: 'Consumer' },
  { id: 'deeptech', name: 'Deep Tech' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'b2b', name: 'B2B' },
];

export const flowItems: FlowItem[] = [
  {
    id: 'flow-terra',
    projectId: 'terra-ai',
    projectName: 'TerraAI',
    category: 'ai',
    title: 'Climate Prediction Lab',
    description: 'Watch agents analyze satellite data and generate crop yield predictions for farming communities',
    gradient: 'linear-gradient(135deg, #0a2a2a 0%, #03CCDA22 100%)',
    founder: 'Dr. Amara Okafor',
    stage: 'Launch',
    activeMembers: 47,
    environment: 'farm',
    flows: ['Prediction Engine', 'Farmer Advisory', 'Soil Analysis'],
  },
  {
    id: 'flow-equilend',
    projectId: 'equitable-lending',
    projectName: 'EquiLend',
    category: 'fintech',
    title: 'Lending Protocol Floor',
    description: 'Observe the decentralized lending process — agents evaluate applications and community impact',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #00EB7A22 100%)',
    founder: 'Maya Rodriguez',
    stage: 'Scale',
    activeMembers: 123,
    environment: 'office',
    flows: ['Loan Processing', 'Community Fund', 'Risk Assessment'],
  },
  {
    id: 'flow-helix',
    projectId: 'helix-health',
    projectName: 'Helix Health',
    category: 'healthcare',
    title: 'Rural Telehealth Clinic',
    description: 'Experience the AI-assisted diagnostic flow in a simulated rural health clinic',
    gradient: 'linear-gradient(135deg, #2a0a2a 0%, #EC008C22 100%)',
    founder: 'Dr. James Whitfield',
    stage: 'Build',
    activeMembers: 31,
    environment: 'clinic',
    flows: ['Patient Intake', 'AI Diagnostics', 'Specialist Connect'],
  },
  {
    id: 'flow-symbiome',
    projectId: 'symbiome',
    projectName: 'Symbiome',
    category: 'biotech',
    title: 'Microbiome Restoration Lab',
    description: 'Explore the soil analysis and microbiome restoration process in an interactive lab',
    gradient: 'linear-gradient(135deg, #1a0a3a 0%, #6536B422 100%)',
    founder: 'BioRestore Foundation',
    stage: 'Build',
    activeMembers: 18,
    environment: 'lab',
    flows: ['Soil Sequencing', 'Microbe Cultivation', 'Field Trials'],
  },
  {
    id: 'flow-learnloop',
    projectId: 'learnloop',
    projectName: 'LearnLoop',
    category: 'education',
    title: 'Adaptive Learning Classroom',
    description: 'See how AI tutors personalize lessons in real-time for students at different levels',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #FFB34722 100%)',
    founder: 'Dr. Priya Sharma',
    stage: 'Scale',
    activeMembers: 89,
    environment: 'classroom',
    flows: ['AI Tutoring', 'Peer Learning', 'Progress Tracking'],
  },
  {
    id: 'flow-civic',
    projectId: 'civicchain',
    projectName: 'CivicChain',
    category: 'govtech',
    title: 'Transparent Budget Hall',
    description: 'Participate in the municipal budget simulation where every dollar is tracked on-chain',
    gradient: 'linear-gradient(135deg, #0a1a2a 0%, #4ECDC422 100%)',
    founder: 'GovTech Alliance',
    stage: 'Launch',
    activeMembers: 56,
    environment: 'city-hall',
    flows: ['Budget Allocation', 'Public Comment', 'Impact Tracking'],
  },
  {
    id: 'flow-roothome',
    projectId: 'roothome',
    projectName: 'RootHome',
    category: 'realestate',
    title: 'Community Land Trust',
    description: 'Explore how the cooperative housing model creates permanently affordable homes',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #D4A57422 100%)',
    founder: 'Housing Justice Lab',
    stage: 'Build',
    activeMembers: 24,
    environment: 'housing',
    flows: ['Trust Formation', 'Home Matching', 'Community Governance'],
  },
  {
    id: 'flow-deepfield',
    projectId: 'deepfield',
    projectName: 'DeepField',
    category: 'deeptech',
    title: 'Quantum Purification Lab',
    description: 'Witness quantum-enhanced water purification technology being developed and tested',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #7EB8A822 100%)',
    founder: 'Dr. Lin Wei',
    stage: 'Build',
    activeMembers: 12,
    environment: 'factory',
    flows: ['Quantum Processing', 'Water Testing', 'Scale Modeling'],
  },
];

// ── Seek (Discovery) ────────────────────────────────────────────────────────

export interface SeekItem {
  id: string;
  name: string;
  category: string;
  description: string;
  gradient: string;
  coverArt: string; // CSS art pattern
  members: number;
  founder: string;
  stage: 'Build' | 'Launch' | 'Scale';
  tags: string[];
}

export const seekCategories = [
  { id: 'all', name: 'All' },
  { id: 'trending', name: 'Trending' },
  { id: 'new', name: 'New' },
  { id: 'ai', name: 'AI' },
  { id: 'fintech', name: 'Fintech' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'biotech', name: 'Biotech' },
  { id: 'education', name: 'Education' },
  { id: 'govtech', name: 'Government' },
  { id: 'deeptech', name: 'Deep Tech' },
  { id: 'realestate', name: 'Real Estate' },
];

export const seekItems: SeekItem[] = [
  {
    id: 'seek-terra',
    name: 'TerraAI',
    category: 'ai',
    description: 'Predictive AI for climate-resilient agriculture serving 14,000 smallholder families',
    gradient: 'linear-gradient(135deg, #03CCDA 0%, #006994 100%)',
    coverArt: 'radial-gradient(circle at 30% 40%, rgba(3,204,218,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,235,122,0.4) 0%, transparent 40%)',
    members: 2840,
    founder: 'Dr. Amara Okafor',
    stage: 'Launch',
    tags: ['Climate', 'Agriculture', 'Africa'],
  },
  {
    id: 'seek-equilend',
    name: 'EquiLend',
    category: 'fintech',
    description: 'Decentralized micro-lending with 3.5% APR cap and community profit sharing',
    gradient: 'linear-gradient(135deg, #00EB7A 0%, #006B3A 100%)',
    coverArt: 'radial-gradient(circle at 50% 30%, rgba(0,235,122,0.5) 0%, transparent 50%), radial-gradient(circle at 25% 70%, rgba(255,202,0,0.3) 0%, transparent 40%)',
    members: 5120,
    founder: 'Maya Rodriguez',
    stage: 'Scale',
    tags: ['DeFi', 'Inclusion', 'Microfinance'],
  },
  {
    id: 'seek-helix',
    name: 'Helix Health',
    category: 'healthcare',
    description: 'AI-powered telehealth bringing specialist care to rural communities',
    gradient: 'linear-gradient(135deg, #EC008C 0%, #8B0053 100%)',
    coverArt: 'radial-gradient(circle at 60% 50%, rgba(236,0,140,0.5) 0%, transparent 45%), radial-gradient(circle at 30% 30%, rgba(101,54,180,0.3) 0%, transparent 40%)',
    members: 1560,
    founder: 'Dr. James Whitfield',
    stage: 'Build',
    tags: ['Telehealth', 'Rural', 'Equity'],
  },
  {
    id: 'seek-opendesk',
    name: 'OpenDesk',
    category: 'b2b',
    description: 'Worker-owned staffing cooperative with 3x retention and shared profits',
    gradient: 'linear-gradient(135deg, #FFCA00 0%, #8B6914 100%)',
    coverArt: 'radial-gradient(circle at 40% 60%, rgba(255,202,0,0.5) 0%, transparent 45%), radial-gradient(circle at 70% 30%, rgba(236,0,140,0.2) 0%, transparent 40%)',
    members: 3200,
    founder: 'Collective DAO',
    stage: 'Launch',
    tags: ['Cooperative', 'Labor', 'B2B'],
  },
  {
    id: 'seek-symbiome',
    name: 'Symbiome',
    category: 'biotech',
    description: 'Soil microbiome restoration achieving 60% yield increase without pesticides',
    gradient: 'linear-gradient(135deg, #6536B4 0%, #3D1F6D 100%)',
    coverArt: 'radial-gradient(circle at 50% 50%, rgba(101,54,180,0.5) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,235,122,0.3) 0%, transparent 40%)',
    members: 890,
    founder: 'BioRestore Foundation',
    stage: 'Build',
    tags: ['Soil', 'Regenerative', 'Agriculture'],
  },
  {
    id: 'seek-civic',
    name: 'CivicChain',
    category: 'govtech',
    description: 'On-chain transparent budgeting that reduced municipal waste by 22%',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #1A6B65 100%)',
    coverArt: 'radial-gradient(circle at 45% 45%, rgba(78,205,196,0.5) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(3,204,218,0.3) 0%, transparent 40%)',
    members: 4100,
    founder: 'GovTech Alliance',
    stage: 'Launch',
    tags: ['Transparency', 'Municipal', 'Governance'],
  },
  {
    id: 'seek-learnloop',
    name: 'LearnLoop',
    category: 'education',
    description: 'AI tutoring that closed the math gap for 8,000 students in Title I schools',
    gradient: 'linear-gradient(135deg, #FFB347 0%, #8B5E00 100%)',
    coverArt: 'radial-gradient(circle at 35% 55%, rgba(255,179,71,0.5) 0%, transparent 50%), radial-gradient(circle at 65% 35%, rgba(255,202,0,0.3) 0%, transparent 40%)',
    members: 6200,
    founder: 'Dr. Priya Sharma',
    stage: 'Scale',
    tags: ['EdTech', 'Equity', 'AI Tutoring'],
  },
  {
    id: 'seek-roothome',
    name: 'RootHome',
    category: 'realestate',
    description: 'Community land trusts making homes 45% more affordable without subsidy',
    gradient: 'linear-gradient(135deg, #D4A574 0%, #6B4F2A 100%)',
    coverArt: 'radial-gradient(circle at 55% 40%, rgba(212,165,116,0.5) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(126,184,168,0.3) 0%, transparent 40%)',
    members: 1200,
    founder: 'Housing Justice Lab',
    stage: 'Build',
    tags: ['Housing', 'Cooperative', 'Affordability'],
  },
  {
    id: 'seek-deepfield',
    name: 'DeepField',
    category: 'deeptech',
    description: 'Quantum-enhanced water purification targeting 500M people by 2030',
    gradient: 'linear-gradient(135deg, #7EB8A8 0%, #2D5A4E 100%)',
    coverArt: 'radial-gradient(circle at 50% 50%, rgba(126,184,168,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(3,204,218,0.3) 0%, transparent 40%)',
    members: 680,
    founder: 'Dr. Lin Wei',
    stage: 'Build',
    tags: ['Quantum', 'Water', 'Infrastructure'],
  },
  {
    id: 'seek-kinfolk',
    name: 'KinFolk',
    category: 'consumer',
    description: 'Ethical marketplace — 92% of revenue flows directly to artisan creators',
    gradient: 'linear-gradient(135deg, #FF6B8A 0%, #8B2040 100%)',
    coverArt: 'radial-gradient(circle at 40% 50%, rgba(255,107,138,0.5) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(236,0,140,0.3) 0%, transparent 40%)',
    members: 3800,
    founder: 'Artisan Collective',
    stage: 'Launch',
    tags: ['Marketplace', 'Fair Trade', 'Artisan'],
  },
];

// ── Vote (Proposals) ────────────────────────────────────────────────────────

export interface VoteProposal {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  contractType: 'KII' | 'KMS';
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  valueScore: number;
  benefitScore: number;
  endsAt: string;
  color: string;
  agentDialogue: {
    agentName: string;
    agentPresence: string;
    humanSource: string;
    position: 'for' | 'against';
    argument: string;
    category: 'value' | 'benefit';
  }[];
}

export const voteProposals: VoteProposal[] = [
  {
    id: 'prop-terra-expand',
    projectId: 'terra-ai',
    projectName: 'TerraAI',
    title: 'Expand Climate Prediction to Southeast Asia',
    description: 'Allocate 200,000 TERRA tokens to deploy prediction models in Vietnam, Cambodia, and Myanmar. Projected to serve 45,000 farming families.',
    category: 'AI',
    status: 'active',
    contractType: 'KII',
    votesFor: 1842,
    votesAgainst: 423,
    totalVoters: 2265,
    valueScore: 87,
    benefitScore: 94,
    endsAt: '2026-04-14T18:00:00Z',
    color: '#03CCDA',
    agentDialogue: [
      {
        agentName: 'TERRA-Presence',
        agentPresence: '🤖',
        humanSource: 'Dr. Amara Okafor',
        position: 'for',
        argument: 'Southeast Asian rice paddies face 30% yield loss from unpredictable monsoons. Our model has proven 89% accuracy in African conditions with similar climate patterns.',
        category: 'benefit',
      },
      {
        agentName: 'VALUE-Analyst',
        agentPresence: '📊',
        humanSource: 'Investment Committee',
        position: 'for',
        argument: 'Projected ROI of 4.2x within 18 months. Rice market alone represents $8M in preserved crop value. Token appreciation projected at 23% post-deployment.',
        category: 'value',
      },
      {
        agentName: 'RISK-Guardian',
        agentPresence: '🛡️',
        humanSource: 'Risk Assessment Board',
        position: 'against',
        argument: 'Southeast Asian regulatory landscape is fragmented. Myanmar political instability adds operational risk. Recommend a phased rollout starting with Vietnam only.',
        category: 'value',
      },
      {
        agentName: 'EQUITY-Advocate',
        agentPresence: '⚖️',
        humanSource: 'Social Impact Council',
        position: 'for',
        argument: 'This region has the highest concentration of subsistence farmers globally. Climate adaptation here directly reduces poverty for 45,000 families and protects irreplaceable rice paddy ecosystems.',
        category: 'benefit',
      },
    ],
  },
  {
    id: 'prop-equilend-cap',
    projectId: 'equitable-lending',
    projectName: 'EquiLend',
    title: 'Raise Lending Pool Cap to $10M',
    description: 'Increase the protocol lending pool from $5M to $10M to meet demand. Includes new underwriting AI model and expanded community governance.',
    category: 'Fintech',
    status: 'active',
    contractType: 'KII',
    votesFor: 3201,
    votesAgainst: 890,
    totalVoters: 4091,
    valueScore: 82,
    benefitScore: 91,
    endsAt: '2026-04-15T12:00:00Z',
    color: '#00EB7A',
    agentDialogue: [
      {
        agentName: 'EQUI-Presence',
        agentPresence: '🏦',
        humanSource: 'Maya Rodriguez',
        position: 'for',
        argument: 'Current pool is 94% utilized. We have 2,300 pending applications from verified underbanked borrowers. Expanding means 2x more small businesses launched in underserved communities.',
        category: 'benefit',
      },
      {
        agentName: 'YIELD-Engine',
        agentPresence: '💰',
        humanSource: 'Treasury Committee',
        position: 'for',
        argument: 'With 98.2% repayment rate, doubling the pool projects $350K in annual protocol revenue. EQUI token holders see proportional yield increase.',
        category: 'value',
      },
      {
        agentName: 'CAUTION-Agent',
        agentPresence: '⚠️',
        humanSource: 'Risk Committee',
        position: 'against',
        argument: 'Rapid scaling historically degrades loan quality. The new AI underwriting model is untested at this volume. Recommend incremental $2.5M increase with 90-day evaluation.',
        category: 'value',
      },
    ],
  },
  {
    id: 'prop-helix-telehealth',
    projectId: 'helix-health',
    projectName: 'Helix Health',
    title: 'Deploy 12 Appalachian Telehealth Nodes',
    description: 'Deploy AI-assisted telehealth kiosks in 12 rural Appalachian clinics. Includes training, equipment, and 2-year operational budget.',
    category: 'Healthcare',
    status: 'pending',
    contractType: 'KII',
    votesFor: 0,
    votesAgainst: 0,
    totalVoters: 0,
    valueScore: 75,
    benefitScore: 98,
    endsAt: '2026-04-20T18:00:00Z',
    color: '#EC008C',
    agentDialogue: [
      {
        agentName: 'HELIX-Presence',
        agentPresence: '🧬',
        humanSource: 'Dr. James Whitfield',
        position: 'for',
        argument: '28,000 residents currently drive 3+ hours for specialist care. Maternal mortality in these counties is 2x the national average. This saves lives.',
        category: 'benefit',
      },
      {
        agentName: 'ECON-Analyst',
        agentPresence: '📈',
        humanSource: 'Health Economics Board',
        position: 'for',
        argument: 'Projected $4.2M savings in emergency transport costs. Insurance reimbursement model makes each node self-sustaining within 14 months.',
        category: 'value',
      },
    ],
  },
  {
    id: 'prop-kms-platform',
    projectId: 'kinship-platform',
    projectName: 'Kinship Platform',
    title: 'KMS Q2 Platform Maintenance Contract',
    description: 'Quarterly maintenance contract for the Kinship platform infrastructure — security audits, node maintenance, agent runtime updates, and community support.',
    category: 'Platform',
    status: 'active',
    contractType: 'KMS',
    votesFor: 4521,
    votesAgainst: 234,
    totalVoters: 4755,
    valueScore: 90,
    benefitScore: 85,
    endsAt: '2026-04-13T23:59:00Z',
    color: '#FFCA00',
    agentDialogue: [
      {
        agentName: 'INFRA-Guardian',
        agentPresence: '🔧',
        humanSource: 'Platform Engineering',
        position: 'for',
        argument: 'Platform uptime was 99.97% last quarter. This contract funds continued security audits, ensures Solana program upgrades, and expands agent runtime capacity by 40%.',
        category: 'value',
      },
      {
        agentName: 'COMMUNITY-Voice',
        agentPresence: '🗣️',
        humanSource: 'Community Council',
        position: 'for',
        argument: 'The platform serves 15,000+ members across 23 DUNAs. Maintenance ensures all communities retain access to governance, lending, and health services without interruption.',
        category: 'benefit',
      },
    ],
  },
  {
    id: 'prop-symbiome-trial',
    projectId: 'symbiome',
    projectName: 'Symbiome',
    title: 'Phase 2 Soil Restoration in Iowa',
    description: 'Expand microbiome restoration trials to 10,000 acres of degraded Iowa farmland. Includes soil sequencing, microbe inoculation, and 3-year monitoring.',
    category: 'Biotech',
    status: 'passed',
    contractType: 'KII',
    votesFor: 2100,
    votesAgainst: 312,
    totalVoters: 2412,
    valueScore: 79,
    benefitScore: 96,
    endsAt: '2026-04-10T18:00:00Z',
    color: '#6536B4',
    agentDialogue: [
      {
        agentName: 'SYMBIO-Presence',
        agentPresence: '🧪',
        humanSource: 'BioRestore Foundation',
        position: 'for',
        argument: 'Phase 1 showed 60% yield increase and eliminated pesticide use entirely. Iowa topsoil is eroding at 5x the natural replacement rate — this reverses that trend.',
        category: 'benefit',
      },
      {
        agentName: 'MARKET-Analyst',
        agentPresence: '📊',
        humanSource: 'Agricultural Markets',
        position: 'for',
        argument: 'Regenerative premium crop pricing adds 25% revenue for participating farmers. Carbon credit generation projected at $1.2M annually from restored acreage.',
        category: 'value',
      },
    ],
  },
];

// ── Earn (Wallet) ──────────────────────────────────────────────────────────

export interface ProjectToken {
  id: string;
  projectId: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  color: string;
  icon: string;
}

export const projectTokens: ProjectToken[] = [
  { id: 'kin-token', projectId: 'kinship', name: 'Kinship', symbol: 'KIN', amount: 5200, value: 1040.00, change: 8.4, color: '#FFCA00', icon: '✦' },
  { id: 'terra-token', projectId: 'terra-ai', name: 'TerraAI', symbol: 'TERRA', amount: 1500, value: 450.00, change: 23.1, color: '#03CCDA', icon: '🤖' },
  { id: 'equi-token', projectId: 'equitable-lending', name: 'EquiLend', symbol: 'EQUI', amount: 800, value: 320.00, change: 12.5, color: '#00EB7A', icon: '🏦' },
  { id: 'helix-token', projectId: 'helix-health', name: 'Helix Health', symbol: 'HELIX', amount: 2200, value: 198.00, change: -3.2, color: '#EC008C', icon: '🧬' },
  { id: 'symbio-token', projectId: 'symbiome', name: 'Symbiome', symbol: 'SYMBIO', amount: 600, value: 180.00, change: 45.6, color: '#6536B4', icon: '🧪' },
  { id: 'civic-token', projectId: 'civicchain', name: 'CivicChain', symbol: 'CIVIC', amount: 1100, value: 165.00, change: 5.8, color: '#4ECDC4', icon: '🏛️' },
  { id: 'learn-token', projectId: 'learnloop', name: 'LearnLoop', symbol: 'LEARN', amount: 950, value: 142.50, change: 18.2, color: '#FFB347', icon: '📚' },
  { id: 'root-token', projectId: 'roothome', name: 'RootHome', symbol: 'ROOT', amount: 400, value: 80.00, change: 7.1, color: '#D4A574', icon: '🏠' },
];

export type TransactionType = 'earned-participation' | 'earned-vote-win' | 'earned-vote-loss' | 'voted' | 'purchased' | 'staked' | 'reward';

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  symbol: string;
  time: string;
  projectName: string;
}

export const walletTransactions: WalletTransaction[] = [
  { id: 't1', type: 'earned-participation', description: 'Flow session: TerraAI Climate Lab', amount: 25, symbol: 'TERRA', time: '1h ago', projectName: 'TerraAI' },
  { id: 't2', type: 'earned-vote-win', description: 'Won: Symbiome Phase 2 Proposal', amount: 150, symbol: 'SYMBIO', time: '2h ago', projectName: 'Symbiome' },
  { id: 't3', type: 'voted', description: 'Voted FOR: TerraAI SE Asia Expansion', amount: -50, symbol: 'TERRA', time: '3h ago', projectName: 'TerraAI' },
  { id: 't4', type: 'earned-participation', description: 'Chat engagement: EquiLend review', amount: 10, symbol: 'EQUI', time: '5h ago', projectName: 'EquiLend' },
  { id: 't5', type: 'purchased', description: 'Purchased HELIX tokens', amount: 500, symbol: 'HELIX', time: '1d ago', projectName: 'Helix Health' },
  { id: 't6', type: 'earned-vote-loss', description: 'Lost: CivicChain Budget Realloc', amount: -20, symbol: 'CIVIC', time: '1d ago', projectName: 'CivicChain' },
  { id: 't7', type: 'reward', description: 'Weekly participation reward', amount: 100, symbol: 'KIN', time: '2d ago', projectName: 'Kinship' },
  { id: 't8', type: 'staked', description: 'Staked in LearnLoop governance', amount: -200, symbol: 'LEARN', time: '3d ago', projectName: 'LearnLoop' },
  { id: 't9', type: 'earned-participation', description: 'Flow session: Helix Health Clinic', amount: 15, symbol: 'HELIX', time: '3d ago', projectName: 'Helix Health' },
  { id: 't10', type: 'purchased', description: 'Purchased KIN tokens', amount: 1000, symbol: 'KIN', time: '5d ago', projectName: 'Kinship' },
];

// ── Members ─────────────────────────────────────────────────────────────────

export interface Member {
  id: string;
  name: string;
  codeName: string;
  avatar: string;
  color: string;
  role: string;
  bio: string;
  presenceName: string;
  projects: string[];
  totalScore: number;
  valueScore: number;
  benefitScore: number;
  memberType: 'member' | 'guest';
}

export const members: Member[] = [
  {
    id: 'mem-amara',
    name: 'Dr. Amara Okafor',
    codeName: 'amara.terra',
    avatar: '🌍',
    color: '#03CCDA',
    role: 'Founder, TerraAI',
    bio: 'Climate scientist and AI researcher. Built TerraAI to protect smallholder farmers from climate volatility while regenerating degraded ecosystems.',
    presenceName: 'TERRA-Presence',
    projects: ['TerraAI'],
    totalScore: 4820,
    valueScore: 2100,
    benefitScore: 2720,
    memberType: 'member',
  },
  {
    id: 'mem-maya',
    name: 'Maya Rodriguez',
    codeName: 'maya.equi',
    avatar: '💚',
    color: '#00EB7A',
    role: 'Founder, EquiLend',
    bio: 'Former Wall Street quant who left finance to build fair lending infrastructure. Believes access to capital is a human right.',
    presenceName: 'EQUI-Presence',
    projects: ['EquiLend'],
    totalScore: 5340,
    valueScore: 2800,
    benefitScore: 2540,
    memberType: 'member',
  },
  {
    id: 'mem-james',
    name: 'Dr. James Whitfield',
    codeName: 'james.helix',
    avatar: '🏥',
    color: '#EC008C',
    role: 'Founder, Helix Health',
    bio: 'Rural physician who saw too many patients die from lack of access. Building telehealth infrastructure to close the gap.',
    presenceName: 'HELIX-Presence',
    projects: ['Helix Health'],
    totalScore: 3960,
    valueScore: 1560,
    benefitScore: 2400,
    memberType: 'member',
  },
  {
    id: 'mem-priya',
    name: 'Dr. Priya Sharma',
    codeName: 'priya.learn',
    avatar: '📖',
    color: '#FFB347',
    role: 'Founder, LearnLoop',
    bio: 'Education researcher from MIT. LearnLoop uses adaptive AI to personalize learning for every student, regardless of zip code.',
    presenceName: 'LEARN-Presence',
    projects: ['LearnLoop'],
    totalScore: 4200,
    valueScore: 1900,
    benefitScore: 2300,
    memberType: 'member',
  },
  {
    id: 'mem-lin',
    name: 'Dr. Lin Wei',
    codeName: 'lin.deep',
    avatar: '🔬',
    color: '#7EB8A8',
    role: 'Founder, DeepField',
    bio: 'Quantum physicist applying breakthrough purification tech to the global water crisis. Clean water for 500M people by 2030.',
    presenceName: 'DEEP-Presence',
    projects: ['DeepField'],
    totalScore: 2800,
    valueScore: 1400,
    benefitScore: 1400,
    memberType: 'member',
  },
  {
    id: 'mem-collective',
    name: 'Collective DAO',
    codeName: 'collective.open',
    avatar: '🤝',
    color: '#FFCA00',
    role: 'Founder, OpenDesk',
    bio: 'A worker-owned collective building the future of fair labor. Every worker is an owner, every decision is democratic.',
    presenceName: 'OPEN-Presence',
    projects: ['OpenDesk'],
    totalScore: 3100,
    valueScore: 1700,
    benefitScore: 1400,
    memberType: 'member',
  },
  {
    id: 'mem-govtech',
    name: 'GovTech Alliance',
    codeName: 'gov.civic',
    avatar: '🏛️',
    color: '#4ECDC4',
    role: 'Founder, CivicChain',
    bio: 'Coalition of civic technologists making government spending transparent and accountable through on-chain budgeting.',
    presenceName: 'CIVIC-Presence',
    projects: ['CivicChain'],
    totalScore: 3500,
    valueScore: 1600,
    benefitScore: 1900,
    memberType: 'member',
  },
  {
    id: 'mem-housing',
    name: 'Housing Justice Lab',
    codeName: 'housing.root',
    avatar: '🏡',
    color: '#D4A574',
    role: 'Founder, RootHome',
    bio: 'Nonprofit housing lab creating community land trusts that make homeownership permanently affordable without subsidy.',
    presenceName: 'ROOT-Presence',
    projects: ['RootHome'],
    totalScore: 2400,
    valueScore: 900,
    benefitScore: 1500,
    memberType: 'member',
  },
];

// ── Leaderboard ────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  memberId: string;
  name: string;
  avatar: string;
  totalScore: number;
  valueScore: number;
  benefitScore: number;
}

export const leaderboard: LeaderboardEntry[] = members
  .map((m, i) => ({
    rank: i + 1,
    memberId: m.id,
    name: m.name,
    avatar: m.avatar,
    totalScore: m.totalScore,
    valueScore: m.valueScore,
    benefitScore: m.benefitScore,
  }))
  .sort((a, b) => b.totalScore - a.totalScore)
  .map((entry, i) => ({ ...entry, rank: i + 1 }));

// ── Notifications ──────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  type: 'vote' | 'proposal' | 'flow' | 'chat' | 'reward' | 'member';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export const notifications: Notification[] = [
  { id: 'n1', type: 'vote', title: 'Vote ending soon', description: 'TerraAI SE Asia expansion — 2 days remaining', time: '5m ago', read: false },
  { id: 'n2', type: 'reward', title: 'Tokens earned', description: 'You earned 150 SYMBIO for winning the Symbiome vote', time: '2h ago', read: false },
  { id: 'n3', type: 'proposal', title: 'New proposal', description: 'Helix Health: Deploy 12 Appalachian Telehealth Nodes', time: '4h ago', read: false },
  { id: 'n4', type: 'chat', title: 'New message from EquiLend', description: 'Response to your lending pool question', time: '5h ago', read: true },
  { id: 'n5', type: 'flow', title: 'Flow session available', description: 'CivicChain Budget Hall is live with 56 members', time: '8h ago', read: true },
  { id: 'n6', type: 'member', title: 'New member joined', description: 'Dr. Lin Wei joined DeepField', time: '1d ago', read: true },
  { id: 'n7', type: 'vote', title: 'Vote passed', description: 'Symbiome Phase 2 Soil Restoration passed with 87% approval', time: '1d ago', read: true },
  { id: 'n8', type: 'reward', title: 'Weekly rewards', description: 'Earned 100 KIN for platform participation', time: '2d ago', read: true },
];

// ── DUNA Examples ───────────────────────────────────────────────────────────
// These illustrate how different industries would operate as DUNAs:
// - Mortgage DUNA: Agents negotiate rates, assess risk, borrowers interact through Presences
// - Realtor DUNA: Agents match buyers/sellers, negotiate terms via Vibe Contracts
// - Tech Startup DUNA: Agents manage sprints, allocate resources, investors vote on milestones
// - Consultancy DUNA: Agents pair consultants with clients, track transformation metrics
// - Healthcare Provider DUNA: Agents triage, schedule, monitor outcomes, patients interact through Presences
