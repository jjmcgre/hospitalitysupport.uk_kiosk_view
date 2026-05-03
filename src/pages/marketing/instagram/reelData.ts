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
    voiceScript: "So here's the reality of running a hospitality business right now. You're trying to cover everything — menu development, cost control, allergens, training, compliance — with a team that's already stretched. That's what HospitalitySupport dot UK actually fixes. You've got a menu development chef who'll build you a full menu, costed, spec'd, allergens sorted, in under an hour. A cost and GP controller keeping an eye on your margins before they drift. A supplier watcher — so the moment a price moves, every dish recoasts automatically, you know straight away. An allergen specialist making sure everything's live, correct, and auditable — not just guessed at. A training manager building onboarding from your actual kitchen setup, and updating it whenever the menu changes. A compliance lead creating evidence as the work happens, so there's no scramble when an inspection comes. A wine and bar specialist helping your staff upsell with confidence. And front of house support so your team always has the live menu and never has to say I'll just check in the kitchen. That's eight roles. One platform. Three pounds thirty a day — per kitchen, not per user.",
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
    voiceScript: "So it's Sunday morning, you're just checking the supplier portal before the week kicks off, and you notice lamb shoulder's gone up eight percent. Three other lines have moved too, and there's been no email, no call, nothing. So you just send one message — lamb just went up, what does that do to the Sunday roast GP? And it comes back almost immediately. Current GP on that dish is fifty-eight percent, but with the new price it drops to fifty-one. That's below your threshold. And straight away you've got three options in front of you — swap to rolled brisket and the GP goes back up to sixty-two, trim the portion by thirty grams and you're at fifty-six, or put the price up a pound fifty and land at fifty-nine. You pick the one that works, the spec updates, the cost gets logged, done. Then the supplier watcher flags two more — chicken thighs up five percent, butter up twelve. Both sorted before anyone's even arrived. Before a single dish went out wrong. That's three pounds thirty a day.",
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
    voiceScript: "Right, so it's Monday morning, two new starters have just walked in, and you need both of them on section by Wednesday. The old way? You'd get them shadowing someone for a few days, hand them a printed menu, and just kind of hope for the best — then spend most of Friday correcting everything they got wrong. The new way is you send one message. Something like — I've got two new starters today, build me an onboarding plan for both of them. And what comes back is a proper structured plan, built from your actual live menu and how your kitchen actually runs, broken down role by role, day by day. Day one covers kitchen standards — food safety, HACCP, allergen awareness — but it's not a generic template, it's aligned to how you specifically do things. By day three they're going through the menu dish by dish, specs, allergens, presentation. Week two it moves into skill progression, matched to what they're actually going to face in service. And if the menu changes? The training updates automatically. No chasing anyone, no outdated PDFs getting passed around. Both of them come out the other side trained, compliant, and ready to go. Three pounds thirty a day. The knowledge stays in the business even when the people don't.",
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
