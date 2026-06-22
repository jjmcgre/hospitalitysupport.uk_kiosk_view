export interface StaticAd {
  id: string;
  number: string;
  title: string;
  label: string;
  description: string;
  accentColor: string;
  bgStyle: 'dark-navy' | 'off-white' | 'charcoal';
  badge: string;
  headline: string;
  headlineAccent?: string;
  subheadline?: string;
  pillTags?: string[];
  trustLogos?: string[];
  trustLabel?: string;
  mockupType: 'chat' | 'dashboard' | 'phone-ui' | 'metric-cards' | 'none';
  mockupContent: MockupContent;
  ctaText: string;
  likes: string;
  comments: string;
  caption: string;
  hashtags: string;
}

export interface MockupContent {
  chatMessages?: { role: 'user' | 'assistant'; text: string }[];
  dashboardRows?: { label: string; value: string; change?: string; up?: boolean }[];
  phoneScreen?: { title: string; items: { label: string; value: string; status?: 'ok' | 'warn' | 'alert' }[] };
  metricCards?: { label: string; value: string; sub: string; color: string }[];
}

export const staticAds: StaticAd[] = [
  {
    id: 'no-profit-lost',
    number: '01',
    title: 'No Profit Lost',
    label: 'Brand Awareness',
    description: 'High-contrast awareness ad. Dark background, bold claim, trusted-by logos. Works cold.',
    accentColor: '#0d9488',
    bgStyle: 'dark-navy',
    badge: 'ServiceSupport.UK',
    headline: 'No profit',
    headlineAccent: 'lost.',
    subheadline: 'We are trusted by',
    trustLogos: ['The Pig & Anchor', 'The Bull Inn', 'Coastal Kitchen', 'Dark Horse Dining', 'Ember Group', 'Saltwater Co.'],
    trustLabel: 'and many more',
    pillTags: [],
    mockupType: 'none',
    mockupContent: {},
    ctaText: 'Learn more',
    likes: '2.1k',
    comments: '143',
    caption: "Restaurants lose margin silently. A supplier price moves. A dish drifts. A menu goes unchecked. It compounds for weeks before it shows up anywhere.\n\nServiceSupport.UK catches it live — before it costs you.\n\n£3.30 a day. Link in bio.",
    hashtags: '#hospitalitybusiness #restaurantowner #gpmargin #profitmargin #foodbusiness #kitchenmanagement #hospitality',
  },
  {
    id: 'to-help-restaurants',
    number: '02',
    title: 'To Help Restaurants With',
    label: 'Product Benefit',
    description: 'Shows the three core pillars with interactive pill tags. Clean off-white, aspirational tone.',
    accentColor: '#0284c7',
    bgStyle: 'dark-navy',
    badge: 'ServiceSupport.UK',
    headline: 'To help restaurants with:',
    pillTags: ['Certainty', 'Consistency', 'Control'],
    mockupType: 'dashboard',
    mockupContent: {
      dashboardRows: [
        { label: 'Sunday Roast GP', value: '61%', change: '+3.2%', up: true },
        { label: 'Chicken Thighs', value: '£4.20/kg', change: '+5%', up: false },
        { label: 'Weekly food cost', value: '£3,841', change: '-£220', up: true },
        { label: 'Allergen alerts', value: '0 open', change: 'All clear', up: true },
      ],
    },
    ctaText: 'Learn more',
    likes: '1.6k',
    comments: '89',
    caption: "GP live. Compliance tracked. Supplier prices monitored. Training done.\n\nServiceSupport.UK isn't software you manage — it's the operations setup that runs alongside you.\n\n£3.30 a day. Per kitchen.\n\nLink in bio.",
    hashtags: '#restaurantmanagement #operationsmanagement #hospitalitybusiness #foodbusiness #menuengineering #kitchenmanagement',
  },
  {
    id: 'healthy-profit-margin',
    number: '03',
    title: 'Making a Healthy Profit Margin',
    label: 'Problem/Solution',
    description: 'Relatable problem framing. Shows the mobile chat interface as the solution.',
    accentColor: '#0d9488',
    bgStyle: 'dark-navy',
    badge: 'ServiceSupport.UK',
    headline: 'Making a healthy',
    headlineAccent: 'profit margin',
    subheadline: "doesn't have to be that hard",
    mockupType: 'phone-ui',
    mockupContent: {
      phoneScreen: {
        title: 'GP Check',
        items: [
          { label: 'Beef Brisket', value: '58% GP', status: 'ok' },
          { label: 'Sea Bass', value: '44% GP', status: 'warn' },
          { label: 'Smoked Salmon', value: '67% GP', status: 'ok' },
          { label: 'Lamb Shank', value: '38% GP', status: 'alert' },
        ],
      },
    },
    ctaText: 'Learn more',
    likes: '3.4k',
    comments: '217',
    caption: "GP doesn't have to be something you check at month-end and wince at.\n\nOne message. Instant breakdown across every dish. Flagged when it drifts. Fixed before service.\n\n£3.30 a day. No seat licences.\n\nLink in bio.",
    hashtags: '#restaurantowner #gpmargin #foodcost #profitmargin #hospitalitybusiness #kitchenmanagement #cheflife',
  },
  {
    id: 'one-message-away',
    number: '04',
    title: 'One Message Away',
    label: 'Product Walkthrough',
    description: 'Chat interface mockup showing a real conversation. Demonstrates speed and depth of response.',
    accentColor: '#b45309',
    bgStyle: 'charcoal',
    badge: 'ServiceSupport.UK',
    headline: 'Your expert team',
    headlineAccent: 'one message away.',
    mockupType: 'chat',
    mockupContent: {
      chatMessages: [
        { role: 'user', text: 'Lamb just went up 8%. What does that do to the Sunday roast GP?' },
        { role: 'assistant', text: 'Current GP: 58% → drops to 51%. Below your 55% threshold. Switch to rolled brisket: GP restored to 62%. Or reduce portion 30g: GP 56%.' },
        { role: 'user', text: 'Switch to brisket. Update the spec sheet.' },
        { role: 'assistant', text: 'Done. Spec updated, allergens rechecked, new cost logged. Team notified.' },
      ],
    },
    ctaText: 'Learn more',
    likes: '1.9k',
    comments: '104',
    caption: "Supplier price spiked. One message. Margin protected before service.\n\nThis is what having an operations team feels like.\n\nServiceSupport.UK — £3.30 a day.\n\nLink in bio.",
    hashtags: '#restaurantowner #supplierpricing #gpmargin #foodcost #hospitalitybusiness #kitchenmanagement #menuengineering',
  },
  {
    id: 'metrics-at-a-glance',
    number: '05',
    title: 'Everything You Need to Know',
    label: 'Product Feature',
    description: 'Metric card layout showing live business health at a glance. Clean data-forward design.',
    accentColor: '#0284c7',
    bgStyle: 'dark-navy',
    badge: 'ServiceSupport.UK',
    headline: 'Your kitchen.',
    headlineAccent: 'Fully visible.',
    mockupType: 'metric-cards',
    mockupContent: {
      metricCards: [
        { label: 'Avg GP This Week', value: '61%', sub: '+3.2% vs last week', color: '#0d9488' },
        { label: 'Supplier Alerts', value: '2', sub: 'Chicken & butter flagged', color: '#f59e0b' },
        { label: 'Open Training Tasks', value: '0', sub: 'All staff signed off', color: '#0d9488' },
        { label: 'Compliance Score', value: '100%', sub: 'Inspection-ready', color: '#0d9488' },
      ],
    },
    ctaText: 'Learn more',
    likes: '1.2k',
    comments: '61',
    caption: "GP this week. Supplier alerts. Training sign-offs. Compliance status. All in one place, all current.\n\nMost operators find out about these things too late. This puts you ahead of them.\n\nServiceSupport.UK — £3.30 a day.\n\nLink in bio.",
    hashtags: '#restaurantmanagement #kitchenmanagement #operationsmanagement #hospitalitybusiness #foodcost #gpmargin',
  },
];
