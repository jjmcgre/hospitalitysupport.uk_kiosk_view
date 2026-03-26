export interface Slide {
  text: string;
  subtext?: string;
  highlight?: string;
  big?: boolean;
}

export interface ReelCampaign {
  id: string;
  number: string;
  title: string;
  hook: string;
  cta: string;
  label: string;
  description: string;
  slides: Slide[];
  accentColor: string;
  likes: string;
  comments: string;
}

export const reels: ReelCampaign[] = [
  {
    id: 'supplier-spike',
    number: '01',
    title: 'The Sunday Supplier Spike',
    hook: "Your lamb just went up 8%. Here's what we did about it — in under 30 seconds.",
    cta: 'Link in bio. Try it free.',
    label: 'Margin Protection',
    description: 'Targets operators who\'ve been hit with sudden supplier price increases. High pain, high relevance.',
    accentColor: '#0d9488',
    likes: '847',
    comments: '63',
    slides: [
      { text: 'Sunday morning.', subtext: 'You open your email.' },
      { text: 'Supplier email.', subtext: 'Lamb up 8%.', highlight: 'Price increase' },
      { text: 'You send one message.', subtext: 'To your HospitalitySupport.uk team.' },
      { text: '30 seconds.', subtext: 'Three options back.', highlight: 'Adjusted portion · Switched cut · Updated price' },
      { text: 'GP protected.', subtext: 'Menu updated. Done before the team arrived.' },
      { big: true, text: '£3.30', subtext: 'per day', highlight: 'HospitalitySupport.uk' },
    ],
  },
  {
    id: 'new-starter',
    number: '02',
    title: 'The New Starter Problem',
    hook: "Two new starters Monday. Fully trained before their first shift — without me doing anything.",
    cta: 'See how it works. Link in bio.',
    label: 'Training & Onboarding',
    description: 'Speaks directly to the chaos of onboarding. Every operator has lost hours to this.',
    accentColor: '#0284c7',
    likes: '1.2k',
    comments: '91',
    slides: [
      { text: 'Monday.', subtext: 'Two new starters.' },
      { text: 'One message.', subtext: 'To your operations team.', highlight: 'Via WhatsApp' },
      { text: 'Training plans built.', subtext: 'Allergen modules. Menu knowledge. Service standards.' },
      { text: 'On their phones.', subtext: 'Before their first shift. They trained themselves.' },
      { text: 'I got completion alerts.', subtext: "I didn't lift a finger." },
      { big: true, text: '£3.30', subtext: 'per day', highlight: 'HospitalitySupport.uk' },
    ],
  },
  {
    id: 'coffee-reveal',
    number: '03',
    title: 'The £3.30 Reveal',
    hook: "How much does a daily coffee cost vs. the mistakes it stops?",
    cta: 'HospitalitySupport.uk — link in bio.',
    label: 'Price Anchoring',
    description: 'Pure price anchoring against the cost of a coffee. Disarms the "too expensive" objection before it forms.',
    accentColor: '#b45309',
    likes: '2.1k',
    comments: '147',
    slides: [
      { text: '£3.30 a day.', subtext: 'That\'s it. That\'s the price.' },
      { text: 'A full hospitality operations team.', subtext: 'In your pocket.' },
      { text: 'Menu development chef.', subtext: 'Cost controller. Compliance lead.', highlight: 'All included' },
      { text: 'Training manager.', subtext: 'Allergen specialist. Always available.' },
      { text: 'No payroll.', subtext: 'No politics. No sick days.' },
      { big: true, text: '£3.30', subtext: 'per day', highlight: 'HospitalitySupport.uk' },
    ],
  },
];
