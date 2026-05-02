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
    id: 'whats-in-the-pocket',
    number: '01',
    title: "Eight Roles. One Platform.",
    label: 'Product Walkthrough',
    description: "Full team walkthrough — shows every specialist role. Best for cold audiences who don't know the product.",
    accentColor: '#0d9488',
    likes: '1.4k',
    comments: '118',
    bgImage: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Running a kitchen short-staffed with supplier costs going up? Here's what changed when we stopped doing it manually.",
    caption: "Most hospitality businesses are one resignation away from the whole thing falling on one person.\n\nHospitalitySupport.uk is the operations setup you can't afford to build — but now you don't have to.\n\nMenu development. Cost control. Allergen compliance. Training. Supplier monitoring. Front of house. All of it. One message.\n\n£3.30 a day. Per kitchen.\n\nLink in bio.",
    hashtags: "#hospitalitybusiness #restaurantowner #publife #kitchenmanagement #foodbusiness #cheflife #hospitality #menuengineering #foodsafety #operationsmanagement",
    voiceScript: "Running a hospitality business right now means covering a lot of ground with not enough people. Here's what HospitalitySupport dot UK actually gives you. A menu development chef — full menu, costed, spec'd, allergens, under an hour. A cost and GP controller — margin drift caught before it hits your P and L. A supplier watcher — price moves, you know instantly, every dish recoasts. An allergen specialist — live, correct, auditable, not guessed. A training manager — onboarding built from your actual kitchen, updates when menus change. A compliance lead — evidence created as work happens, no inspection scramble. A wine and bar specialist — staff confident to upsell, yield tracked. And front of house — always knows the live menu, always has the allergen answer. Eight roles. One platform. Three pounds thirty a day. Per kitchen, not per user.",
    beats: [
      { headline: "Running a kitchen short-staffed?", sub: "Supplier costs up. No head chef. Still expected to run the same service.", enter: 'slam-up', durationMs: 2800 },
      { tag: 'The platform', headline: "HospitalitySupport.uk", sub: "Eight operational roles built into your business.", enter: 'scale-in', durationMs: 2400 },
      { tag: 'Chef', headline: "Menu Development", sub: "Full menu built in under an hour. Recipe. Portion. Allergens. GP.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'Finance', headline: "Cost & GP Control", sub: "Margin drift caught before it hits your P&L.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Procurement', headline: "Supplier Price Watcher", sub: "Price moves. Every linked dish recoasts. Instantly.", enter: 'slam-left', durationMs: 2000 },
      { tag: 'Safety', headline: "Allergen Specialist", sub: "Live. Correct. Auditable. Not guessed.", enter: 'slam-up', durationMs: 2000 },
      { tag: 'Training', headline: "Training Manager", sub: "Onboarding from your actual kitchen. Updates when menus change.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Compliance', headline: "Compliance Lead", sub: "Evidence created as work happens. No inspection scramble.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Bar', headline: "Wine & Bar", sub: "Staff confident to upsell. Yield tracked.", enter: 'slam-left', durationMs: 2000 },
      { tag: 'FOH', headline: "Front of House", sub: "Always has the live menu. Never 'I'll just check in the kitchen.'", enter: 'slam-up', durationMs: 2200 },
      { headline: "8 roles.", sub: "One platform. One message away.", enter: 'cut', durationMs: 1800 },
      { isBig: true, headline: "£3.30", sub: "per day — per kitchen, not per user", enter: 'scale-in', durationMs: 3200 },
    ],
  },
  {
    id: 'supplier-spike',
    number: '02',
    title: 'The Sunday Supplier Spike',
    label: 'Supplier & Margin',
    description: "Targeted at operators stung by supplier price increases. High pain point, immediate relevance.",
    accentColor: '#0284c7',
    likes: '987',
    comments: '74',
    bgImage: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Lamb went up 8% on a Sunday morning. Here's exactly what happened in the next 90 seconds.",
    caption: "Supplier prices move without warning. And by the time most operators notice, the margin's already gone.\n\nHospitalitySupport.uk catches price changes the moment they happen — shows you which dishes are affected, by how much, and gives you options before service.\n\nOne message. Under two minutes. Margin sorted.\n\n£3.30 a day. Link in bio.",
    hashtags: "#restaurantowner #kitchenmanagement #foodcost #gpmargin #cheflife #hospitality #supplierpricing #menuengineering #foodbusiness #publife",
    voiceScript: "Sunday morning. You check the supplier portal before the week starts. Lamb shoulder — up eight percent. Three other lines moved. No email. No call. You send one message: lamb just went up — what does that do to the Sunday roast GP? Back in seconds. Current dish GP: fifty-eight percent. New price takes it to fifty-one. That's below your threshold. Three options come back. Switch to rolled brisket — GP goes back to sixty-two. Trim the portion by thirty grams — GP lands at fifty-six. Or push the price up one fifty — GP at fifty-nine. You pick one. The spec updates. Cost gets logged. Then the supplier watcher flags two more. Chicken thighs up five. Butter up twelve. Both sorted before anyone arrives. Before a single dish went out wrong. That's three pounds thirty a day.",
    beats: [
      { tag: 'Real scenario', headline: "Sunday morning.", sub: "You check the supplier portal before the week starts.", enter: 'slam-up', durationMs: 2600 },
      { tag: 'Price spike', headline: "Lamb shoulder: up 8%.", sub: "Three other lines moved. No email. No call.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'One message', headline: '"What does that do to the Sunday roast GP?"', enter: 'slam-up', durationMs: 2200 },
      { tag: 'Instant', headline: "Current GP: 58%", sub: "New price takes it to 51%. Below your threshold.", enter: 'scale-in', durationMs: 2200 },
      { tag: 'Three options', headline: "① Rolled brisket — GP 62%", sub: "② Reduce portion 30g — GP 56%\n③ Raise price £1.50 — GP 59%", enter: 'slam-up', durationMs: 3000 },
      { tag: 'Already done', headline: "Spec updated. Cost logged.", sub: "Watcher flags two more — chicken up 5%, butter up 12%.", enter: 'slam-left', durationMs: 2200 },
      { headline: "All sorted.", sub: "Before anyone arrived. Before a single dish went out wrong.", enter: 'cut', durationMs: 2000 },
      { isBig: true, headline: "£3.30", sub: "Margin protected — every time a price moves.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
  {
    id: 'new-starter',
    number: '03',
    title: 'Two New Starters. On Section by Wednesday.',
    label: 'Training & Onboarding',
    description: "The chaos of onboarding is a pain every operator knows. Shows the exact solution without the fluff.",
    accentColor: '#b45309',
    likes: '2.3k',
    comments: '191',
    bgImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Two new starters Monday. Both on section by Wednesday. This is how we structured it.",
    caption: "High turnover is the hospitality constant. The real cost isn't hiring — it's re-training the same basics every six weeks while standards drift.\n\nHospitalitySupport.uk builds training from your actual operation. Your menus. Your processes. Your allergens. Updates automatically when anything changes.\n\nCompletion tracked. Standards protected. Knowledge doesn't walk out when the person does.\n\n£3.30 a day. Link in bio.",
    hashtags: "#stafftraining #hospitalitystaff #restaurantmanager #kitchenstaff #onboarding #foodsafety #hospitalitylife #cheftraining #teammanagement #hospitality",
    voiceScript: "Monday morning. Two new starters. You need both on section by Wednesday. Old way: shadow someone for three days. Print a menu. Hope for the best. Spend Friday fixing what they got wrong. New way: one message. Two new KPs starting Monday — build me an onboarding plan. Structured plan comes back immediately. Built from your live menu and your actual kitchen setup. Role-specific. Day by day. Day one: kitchen standards. Food safety, HACCP, allergen awareness — not a generic template, aligned to how you actually run the kitchen. Day three: menu knowledge. Dish by dish. Specs, allergens, presentation standards. Week two: skill progression. Tasks matched to what they'll actually face in service. Menu changes? Training updates automatically — no chasing, no outdated PDFs getting handed around. Both completed. Compliant. Ready for service. Three pounds thirty a day. Knowledge stays in the business, even when people don't.",
    beats: [
      { headline: "Monday morning.", sub: "Two new starters. On section by Wednesday.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Old way', headline: "Shadow someone. Print a menu. Hope for the best.", sub: "Spend Friday fixing what they got wrong.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'New way', headline: "One message.", sub: '"Build me an onboarding plan for both."', enter: 'scale-in', durationMs: 2200 },
      { tag: 'Instant', headline: "Structured plan.", sub: "Built from your live menu. Role-specific. Day by day.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Day 1', headline: "Kitchen standards.", sub: "Food safety. HACCP. Allergens. How you actually run the kitchen.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Day 3', headline: "Menu knowledge.", sub: "Dish by dish. Specs. Allergens. Presentation standards.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Week 2', headline: "Skill progression.", sub: "Tasks matched to what they'll face in service.", enter: 'slam-left', durationMs: 2200 },
      { headline: "Menu changes?", sub: "Training updates automatically. No chasing. No outdated PDFs.", enter: 'cut', durationMs: 2400 },
      { tag: 'Done', headline: "Both trained. Compliant. Ready.", sub: "Standards protected. Knowledge stays in the business.", enter: 'slam-up', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "Knowledge stays — even when people don't.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
];
