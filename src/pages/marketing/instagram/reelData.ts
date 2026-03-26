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
    title: "What's Actually in Your Pocket",
    label: 'Product Walkthrough',
    description: "Full team walkthrough — shows every specialist role. Best for cold audiences who don't know the product.",
    accentColor: '#0d9488',
    likes: '1.4k',
    comments: '118',
    bgImage: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "You're running a kitchen with 2 staff, rising supplier costs, and no head chef. Here's what we built for that.",
    caption: "Most hospitality businesses are one resignation away from crisis. HospitalitySupport.uk is the operations team you can't afford to hire — built into your business from day one.\n\nMenu development. Cost control. Allergen compliance. Training. Supplier monitoring. Front of house. Bar. All of it. One message away.\n\n£3.30 a day. No seat licences. No HR. No sick days.\n\nLink in bio.",
    hashtags: "#hospitalitybusiness #restaurantowner #publife #kitchenmanagement #foodbusiness #cheflife #hospitality #menuengineering #foodsafety #operationsmanagement",
    voiceScript: "You're running a hospitality business. Margins tight. Staff turning over. No one to call. Meet HospitalitySupport dot UK. A full operations team, built into your business. Menu development chef — full menu, costed, spec'd, allergens — under an hour. Cost and GP controller — margin drift caught before you feel the hit. Supplier watcher — prices move, this catches it instantly. Allergen specialist — live, correct, auditable. Training manager — onboarding built from your actual kitchen, updates itself. Compliance lead — no inspection scramble. Wine and bar specialist — upsell confident, yield tracked. Front of house — always knows the live menu. Eight specialists. One team. Three pounds thirty a day. Not per user. Per kitchen.",
    beats: [
      { headline: "You're running a hospitality business.", sub: "Margins tight. Staff turning over. No one to call.", enter: 'slam-up', durationMs: 2800 },
      { tag: 'Meet the team', headline: "HospitalitySupport.uk", sub: "A full operations team built into your business.", enter: 'scale-in', durationMs: 2400 },
      { tag: 'Chef', headline: "Menu Development Chef", sub: "Full menu built under an hour. Recipe. Portion. Allergens. GP.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'Finance', headline: "Cost & GP Controller", sub: "Margin drift caught before you feel the hit.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Procurement', headline: "Supplier Price Watcher", sub: "Prices move. This catches it instantly.", enter: 'slam-left', durationMs: 2000 },
      { tag: 'Safety', headline: "Allergen Specialist", sub: "Live. Correct. Auditable. Not guessed.", enter: 'slam-up', durationMs: 2000 },
      { tag: 'Training', headline: "Training Manager", sub: "Onboarding built from your actual kitchen. Updates itself.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Compliance', headline: "Compliance Lead", sub: "No inspection scramble. Evidence created as work happens.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Bar', headline: "Wine & Bar Specialist", sub: "Staff confident to upsell. Yield tracked.", enter: 'slam-left', durationMs: 2000 },
      { tag: 'FOH', headline: "Front of House", sub: "Always knows the live menu. Fewer 'I'll check' moments.", enter: 'slam-up', durationMs: 2200 },
      { headline: "8 specialists.", sub: "One team. One message away.", enter: 'cut', durationMs: 1800 },
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
    hook: "Lamb just went up 8%. Here's exactly what happened next.",
    caption: "Supplier prices move silently. And by the time you notice, the margin's already gone.\n\nHospitalitySupport.uk catches price changes in real time — flags which dishes are affected, by how much, and gives you three fixes before service.\n\nOne message. 30 seconds. Margin protected.\n\n£3.30 a day. Link in bio.",
    hashtags: "#restaurantowner #kitchenmanagement #foodcost #gpmargin #cheflife #hospitality #supplierpricing #menuengineering #foodbusiness #publife",
    voiceScript: "Sunday morning. You check your supplier portal before the week starts. Lamb shoulder — up eight percent. Three other lines moved. No email. No warning. You send one message: lamb just went up, what's the GP impact on the Sunday roast? Cost controller responds immediately. Current dish GP: fifty-eight percent. New price brings it to fifty-one. Below threshold. Three options back. Switch to rolled brisket — GP restored to sixty-two. Reduce portion by thirty grams — GP back to fifty-six. Or increase price by one fifty — GP to fifty-nine. Supplier watcher flags two more. Chicken thighs up five. Butter up twelve. All three sorted. Before the team arrived. Before a single dish was costed wrong. Three pounds thirty a day. Margin protected, continuously.",
    beats: [
      { tag: 'Real scenario', headline: "Sunday morning.", sub: "You check your supplier portal before the week starts.", enter: 'slam-up', durationMs: 2600 },
      { tag: 'Price spike', headline: "Lamb shoulder: up 8%.", sub: "Three other lines also moved. No email. No warning.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'One message', headline: '"What\'s the GP impact on the Sunday roast?"', enter: 'slam-up', durationMs: 2200 },
      { tag: 'Instant analysis', headline: "Current GP: 58%", sub: "New price: 51%. Below your threshold.", enter: 'scale-in', durationMs: 2200 },
      { tag: 'Three options', headline: "① Rolled brisket — GP 62%", sub: "② Reduce portion 30g — GP 56%\n③ Raise price £1.50 — GP 59%", enter: 'slam-up', durationMs: 3000 },
      { tag: 'Proactive', headline: "Watcher flags two more.", sub: "Chicken thighs up 5%. Butter up 12%.", enter: 'slam-left', durationMs: 2200 },
      { headline: "All three sorted.", sub: "Before a single dish was costed wrong.", enter: 'cut', durationMs: 2000 },
      { isBig: true, headline: "£3.30", sub: "Margin protected. Continuously.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
  {
    id: 'new-starter',
    number: '03',
    title: 'Two New Starters. Zero Stress.',
    label: 'Training & Onboarding',
    description: "The chaos of onboarding is a pain every operator knows. This hits that nerve and shows the exact solution.",
    accentColor: '#b45309',
    likes: '2.3k',
    comments: '191',
    bgImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Two new starters Monday. Fully trained before their first shift. I didn't do a thing.",
    caption: "High turnover is the hospitality constant. The problem isn't hiring — it's the cost of constantly re-training people who leave six weeks later.\n\nHospitalitySupport.uk builds training from your actual operation. Menus, processes, standards — all of it. Updates automatically when anything changes. Staff train themselves. You get completion alerts.\n\nNo more tribal knowledge walking out the door.\n\n£3.30 a day. Link in bio.",
    hashtags: "#stafftraining #hospitalitystaff #restaurantmanager #kitchenstaff #onboarding #foodsafety #hospitalitylife #cheftraining #teammanagement #hospitality",
    voiceScript: "Monday morning. Two new starters. You need them on section by Wednesday. Old way: shadow someone for three days. Print a menu. Hope for the best. Spend Friday correcting mistakes. New way: one message. Two new KPs starting Monday — build me an onboarding plan. Training manager responds instantly. Structured plan built from your live menu and actual kitchen setup. Role-specific. Day by day. Day one: kitchen standards. Food safety, HACCP, allergen awareness — aligned to how you actually operate. Day three: menu knowledge. Dish by dish. Specs, allergens, presentation. Day two week two: skill progression. Tasks matched to what they'll face in service. When the menu changes — training updates automatically. No chasing. No outdated PDFs. You got completion alerts. Both trained. Compliant. Ready. You didn't lift a finger. Three pounds thirty a day. Knowledge stays, even when people don't.",
    beats: [
      { headline: "Monday morning.", sub: "Two new starters. On section by Wednesday.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Old way', headline: "Shadow someone. Print a menu. Hope for the best.", sub: "Spend Friday correcting mistakes.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'New way', headline: "One message.", sub: '"Build me an onboarding plan for both."', enter: 'scale-in', durationMs: 2200 },
      { tag: 'Instant', headline: "Structured plan.", sub: "Built from your live menu. Role-specific. Day by day.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Day 1', headline: "Kitchen standards.", sub: "Food safety. HACCP. Allergen awareness. How you actually operate.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Day 3', headline: "Menu knowledge.", sub: "Dish by dish. Specs. Allergens. Written to their level.", enter: 'slam-up', durationMs: 2200 },
      { tag: 'Week 2', headline: "Skill progression.", sub: "Tasks matched to what they'll face in service.", enter: 'slam-left', durationMs: 2200 },
      { headline: "Menu changes?", sub: "Training updates automatically. No chasing. No outdated PDFs.", enter: 'cut', durationMs: 2400 },
      { tag: 'Done', headline: "Both trained. Compliant. Ready.", sub: "You didn't lift a finger.", enter: 'slam-up', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "Knowledge stays. Even when people don't.", enter: 'scale-in', durationMs: 3200 },
    ],
  },
];
