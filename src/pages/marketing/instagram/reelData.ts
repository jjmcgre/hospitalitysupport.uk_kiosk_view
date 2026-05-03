export interface Beat {
  tag?: string;
  headline: string;
  sub?: string;
  isBig?: boolean;
  durationMs: number;
  enter?: 'slam-up' | 'slam-left' | 'cut' | 'scale-in';
}

export interface ReelScript {
  id: string;
  number: string;
  title: string;
  label: string;
  description: string;
  accentColor: string;
  likes: string;
  comments: string;
  bgImage: string;
  hook: string;
  caption: string;
  hashtags: string;
  voiceScript: string;
  beats: Beat[];
}

export const reels: ReelScript[] = [
  {
    id: 'three-quid-thirty',
    number: '01',
    title: 'What £3.30 Actually Gets You',
    label: 'Price Shock',
    description: "Opens with the price. Walks through what that buys. Ends with the gut punch. Best for cold audiences.",
    accentColor: '#0d9488',
    likes: '4.2k',
    comments: '312',
    bgImage: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "£3.30 a day. I'm going to tell you exactly what that buys you.",
    caption: "£3.30 a day.\n\nA menu development chef. A GP controller. A supplier price watcher. An allergen specialist. A training manager. A compliance lead.\n\nAll of it. For the price of a coffee.\n\nHospitalitySupport.uk — link in bio.",
    hashtags: "#hospitalitybusiness #restaurantowner #publife #kitchenmanagement #foodbusiness #cheflife #hospitality #menuengineering #foodsafety #operationsmanagement",
    voiceScript: "Three pounds thirty a day. That's what I want to talk about, because I think when you hear what that actually covers, you're going to do a double take. For three pounds thirty, you get a menu development chef — sends back a full menu with recipes, portions, allergens, and GP in under an hour. You get a cost and GP controller watching your margins every single day. A supplier price watcher — every time a price moves, every dish it touches gets recoasted automatically. An allergen specialist keeping everything live, correct, and auditable. A training manager building onboarding from your actual kitchen and updating it when things change. And a compliance lead creating evidence as work happens, so when an inspection comes there's nothing to scramble for. That's six specialist roles. For three pounds thirty a day. Most operators are spending more than that on stuff that isn't even running in the background for them. Link in bio.",
    beats: [
      { isBig: true, headline: "£3.30", sub: "a day. Here's what that actually gets you.", enter: 'scale-in', durationMs: 3000 },
      { tag: 'Role 1', headline: "Menu Development Chef", sub: "Full menu. Costed. Spec'd. Allergens. Under an hour.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Role 2', headline: "Cost & GP Controller", sub: "Margins watched. Drift caught. Every day.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Role 3', headline: "Supplier Price Watcher", sub: "Price moves → every dish recoasts. Automatically.", enter: 'slam-left', durationMs: 2200 },
      { tag: 'Role 4', headline: "Allergen Specialist", sub: "Live. Correct. Auditable. Not guessed.", enter: 'slam-up', durationMs: 2000 },
      { tag: 'Role 5', headline: "Training Manager", sub: "Onboarding from your actual kitchen. Self-updating.", enter: 'slam-left', durationMs: 2200 },
      { tag: 'Role 6', headline: "Compliance Lead", sub: "Evidence built as you work. No inspection scramble.", enter: 'slam-up', durationMs: 2200 },
      { headline: "6 specialist roles.", sub: "One platform. One message away.", enter: 'cut', durationMs: 1800 },
      { isBig: true, headline: "£3.30", sub: "Per day. Per kitchen. Not per user.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
  {
    id: 'inspection-tomorrow',
    number: '02',
    title: 'Inspection Tomorrow. Zero Panic.',
    label: 'Compliance Hook',
    description: "Taps into the dread every operator feels about inspections. Real scenario, immediate tension, satisfying resolution.",
    accentColor: '#dc2626',
    likes: '6.1k',
    comments: '489',
    bgImage: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Environmental health officer turning up tomorrow. Watch what happens when you've got this running.",
    caption: "The operators who panic before an inspection are the ones who've been relying on memory and hope.\n\nHospitalitySupport.uk builds compliance evidence as work happens — not the night before.\n\nTemperature logs. Allergen records. HACCP documentation. All current. All auditable.\n\nSleep well the night before. £3.30 a day.\n\nLink in bio.",
    hashtags: "#foodsafety #eho #haccp #allergens #restaurantowner #kitchenmanagement #hospitalitybusiness #foodhygiene #compliance #cheflife",
    voiceScript: "Okay so imagine you get the call — environmental health officer, tomorrow morning, nine o'clock. For most operators that's an instant stomach drop. You're scrambling through binders, chasing staff for sign-offs, printing things off at midnight hoping nothing's missing. But here's what it looks like when you've had HospitalitySupport dot UK running in the background. You open a chat, type in inspection tomorrow, what do I need? And it comes back with a complete summary of everything — temperature logs current and complete, allergen records fully up to date, HACCP documentation auditable, training sign-offs done, all cleaning schedules logged. Because the evidence has been building as work happened. Not the night before. Not from memory. Just there, ready, correct. You sleep fine. You walk in calm. You come out with a five. That's what three pounds thirty a day buys you.",
    beats: [
      { tag: 'The call', headline: "EHO turning up tomorrow.", sub: "9am. Your stomach just dropped.", enter: 'slam-up', durationMs: 2600 },
      { tag: 'Old way', headline: "Midnight scramble.", sub: "Binders. Missing sign-offs. Printed in a panic.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'New way', headline: '"Inspection tomorrow. What do I need?"', sub: "One message. That's it.", enter: 'scale-in', durationMs: 2400 },
      { tag: 'Ready', headline: "Temp logs ✓", sub: "Current. Complete. No gaps.", enter: 'slam-up', durationMs: 1800 },
      { tag: 'Ready', headline: "Allergen records ✓", sub: "Fully up to date. Auditable.", enter: 'slam-left', durationMs: 1800 },
      { tag: 'Ready', headline: "HACCP documentation ✓", sub: "Built as work happened. Not last night.", enter: 'slam-up', durationMs: 2000 },
      { tag: 'Ready', headline: "Training sign-offs ✓", sub: "All staff. All completed.", enter: 'slam-left', durationMs: 1800 },
      { headline: "You walk in calm.", sub: "You come out with a 5.", enter: 'cut', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "Sleep well the night before.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
  {
    id: 'head-chef-resigned',
    number: '03',
    title: 'Head Chef Just Resigned.',
    label: 'Crisis Scenario',
    description: "The nightmare scenario every owner dreads. Shows exactly how the platform catches you when it happens.",
    accentColor: '#b45309',
    likes: '8.7k',
    comments: '631',
    bgImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Your head chef just handed in their notice. Friday afternoon. Service in three hours.",
    caption: "Every operator has this nightmare. The person who holds everything in their head just walks out the door.\n\nWith HospitalitySupport.uk, none of it walks out with them.\n\nEvery recipe. Every spec. Every allergen. Every process. It lives in the platform — not in one person's head.\n\nOne resignation doesn't stop service. Ever again.\n\n£3.30 a day. Link in bio.",
    hashtags: "#restaurantowner #cheflife #kitchenmanagement #hospitalitybusiness #staffretention #menuengineering #foodbusiness #hospitality #headchef #operationsmanagement",
    voiceScript: "Friday afternoon. Service in three hours. Your head chef hands in their notice. Effective immediately. And everything you're suddenly terrified about — all the recipes, the portions, the costing, the allergens, the supplier contacts, the staff training, the specials process — all of it has been living in one person's head. For most operators that's a genuine crisis. Here's what it looks like when you've got the platform running. You open it up. Every recipe is there, fully spec'd, with portions and allergens. Every dish has its GP calculation. Every supplier contact is logged. The training materials are all built and current. The new chef walks in Monday — or whoever steps up — and they've got everything they need. Nothing walked out the door. Nothing got lost. The business keeps going. That's what HospitalitySupport dot UK actually is. It's the institutional memory your business needs to survive turnover. Three pounds thirty a day.",
    beats: [
      { tag: 'Friday 3pm', headline: "Head chef just handed in their notice.", sub: "Effective immediately. Service in three hours.", enter: 'slam-up', durationMs: 2800 },
      { tag: 'What just walked out', headline: "The recipes.", sub: "The portions. The allergens. The costings. All of it.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'What just walked out', headline: "The supplier contacts.", sub: "The specials process. The staff training. Gone.", enter: 'slam-up', durationMs: 2600 },
      { tag: 'Unless', headline: "It all lives in the platform.", sub: "Not in one person's head.", enter: 'scale-in', durationMs: 2400 },
      { tag: 'Still there', headline: "Every recipe. Fully spec'd. GP calculated.", enter: 'slam-left', durationMs: 2200 },
      { tag: 'Still there', headline: "All training materials. Current.", enter: 'slam-up', durationMs: 1800 },
      { tag: 'Still there', headline: "All supplier contacts. Logged.", enter: 'slam-left', durationMs: 1800 },
      { headline: "New chef starts Monday.", sub: "Everything they need is already there.", enter: 'cut', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "Your business survives turnover. Every time.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
];
