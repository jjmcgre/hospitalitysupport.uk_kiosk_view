export interface TikTokBeat {
  tag?: string;
  headline: string;
  sub?: string;
  isBig?: boolean;
  durationMs: number;
  enter?: 'slam-up' | 'slam-left' | 'cut' | 'scale-in' | 'slide-right';
}

export interface TikTokVideo {
  id: string;
  number: string;
  title: string;
  label: string;
  description: string;
  accentColor: string;
  bgImage: string;
  hook: string;
  voiceScript: string;
  beats: TikTokBeat[];
  captionLines: string[];
  hashtags: string;
  capCutTips: string[];
}

export const tiktokVideos: TikTokVideo[] = [
  {
    id: 'what-does-this-actually-do',
    number: '01',
    title: 'What does this actually do?',
    label: 'Explainer Hook',
    description: "Starts by asking the question the viewer already has. Answers it fast, with energy. Best for cold audiences.",
    accentColor: '#0d9488',
    bgImage: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Someone just asked me what ServiceSupport.UK actually does. Here's the honest answer.",
    voiceScript: "So someone messaged me asking what ServiceSupport dot UK actually does, right, because the name doesn't fully explain it. And the honest answer is — it's like having six experienced people on your team who are available all day every day and only cost you three pounds thirty. You message it like you'd message a colleague. Something like — lamb just went up, what does that do to my Sunday roast GP? And it comes back immediately. Current GP, what it drops to, and three options to fix it. Or you say — I've got a new starter Monday, build me an onboarding plan. And it sends back a proper structured plan built from your actual live menu, your kitchen setup, role by role, day by day. Or you say — inspection tomorrow, what do I need? And it pulls together everything you need to know is in order. It's not software you manage. It's not a dashboard you log into and check. It's genuinely just there when you need it, doing the operational work you don't have the headcount to do yourself. Three pounds thirty a day.",
    beats: [
      { tag: 'The question', headline: '"What does it actually do?"', sub: "Honestly? Here's the answer.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Like messaging a colleague', headline: '"Lamb just went up."', sub: '"What does that do to my Sunday roast GP?"', enter: 'slam-left', durationMs: 2600 },
      { tag: 'Back in seconds', headline: "Current GP. What it drops to.", sub: "Three options to fix it. Done.", enter: 'scale-in', durationMs: 2400 },
      { tag: 'Or', headline: '"New starter Monday."', sub: '"Build me an onboarding plan."', enter: 'slam-up', durationMs: 2200 },
      { tag: 'Back in seconds', headline: "Structured plan.", sub: "Built from your live menu. Role-specific. Day by day.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Or', headline: '"Inspection tomorrow."', sub: '"What do I need?"', enter: 'slam-up', durationMs: 2000 },
      { tag: 'Back in seconds', headline: "Everything in order.", sub: "Logged. Auditable. Ready.", enter: 'slam-left', durationMs: 2200 },
      { headline: "Not a dashboard.", sub: "Not software you manage. Just there when you need it.", enter: 'cut', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "Six roles. One message away.", enter: 'scale-in', durationMs: 3200 },
    ],
    captionLines: [
      "Someone asked me what ServiceSupport.UK actually does.",
      "",
      "Honest answer:",
      "It's six experienced people available all day,",
      "for £3.30.",
      "",
      "Message it like a colleague:",
      "→ 'Lamb went up — what does that do to my GP?'",
      "→ 'New starter Monday — build me an onboarding plan'",
      "→ 'Inspection tomorrow — what do I need?'",
      "",
      "Not a dashboard. Not software you manage.",
      "Just there. Doing the work.",
      "",
      "ServiceSupport.UK",
      "£3.30 a day. Link in bio.",
    ],
    hashtags: "#hospitality #restaurantowner #cheflife #kitchenmanagement #foodbusiness #gpmargin #hospitalityuk #publife #restaurantlife #smallbusiness",
    capCutTips: [
      "Film yourself talking to camera for the first 2 seconds — authenticity hooks",
      "Cut to text-on-screen beats for each 'message' example",
      "Use green ticks and reaction emojis as sticker overlays natively",
      "Keep it under 45 seconds — this format drops off at 60s",
      "Add low kitchen ambience underneath — feels grounded, not corporate",
    ],
  },
  {
    id: 'the-friday-call',
    number: '02',
    title: 'The Friday Call',
    label: 'Narrative Drama',
    description: "Story format. Builds real tension. The Friday afternoon dread every operator has felt. Huge relatability.",
    accentColor: '#dc2626',
    bgImage: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Friday 4pm. Head chef calls in sick. Service starts in two hours. This is what actually happened.",
    voiceScript: "Friday, four o'clock, service starts at six, and your head chef has just called in sick. Real situation. And for most operators, what follows is two hours of pure chaos — ringing round, covering gaps, guessing at allergens because the person who knew them isn't there, hoping the new kid knows how the specials work, praying nothing gets sent out wrong. But when you've got HospitalitySupport dot UK, here's what actually happens. You open the chat. You type: chef just called in sick, who can cover what and what do I need the team to know before service? And back comes a full service brief. The live menu with every allergen listed. The specials breakdown. Which dishes have recent costing changes. Any supplier swaps made this week that the team needs to know about. You print it, pin it, brief the team in ten minutes instead of two hours of panic. Service goes out. Nothing wrong. No complaints. Nobody guessing. That's not a fluke. That's what happens when the knowledge lives in the platform and not just in people's heads. Three pounds thirty a day.",
    beats: [
      { tag: 'Friday 4pm', headline: "Head chef just called in sick.", sub: "Service starts at 6. Two hours.", enter: 'slam-up', durationMs: 2800 },
      { tag: 'Old way', headline: "Two hours of chaos.", sub: "Ringing round. Guessing allergens. Hoping for the best.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'New way', headline: '"Chef sick. What does the team need before service?"', enter: 'scale-in', durationMs: 2400 },
      { tag: 'Back in seconds', headline: "Live menu. Every allergen listed.", enter: 'slam-up', durationMs: 2000 },
      { tag: 'Back in seconds', headline: "Specials breakdown.", sub: "Supplier swaps this week. Costing changes.", enter: 'slam-left', durationMs: 2200 },
      { headline: "Print it. Pin it.", sub: "Team briefed in 10 minutes.", enter: 'cut', durationMs: 2000 },
      { headline: "Service goes out.", sub: "Nothing wrong. No complaints. Nobody guessing.", enter: 'slam-up', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "The knowledge lives in the platform. Not just in people.", enter: 'scale-in', durationMs: 3200 },
    ],
    captionLines: [
      "Friday. 4pm. Head chef just called in sick.",
      "Service starts at 6.",
      "",
      "Old way:",
      "Two hours of chaos.",
      "Guessing allergens. Hoping nobody orders the wrong thing.",
      "",
      "New way:",
      "'Chef sick. What does the team need before service?'",
      "",
      "→ Live menu with every allergen",
      "→ Specials breakdown",
      "→ Supplier swaps this week",
      "→ Recent costing changes",
      "",
      "Team briefed in 10 minutes.",
      "Service went out. Nothing wrong.",
      "",
      "£3.30 a day. ServiceSupport.UK",
      "Link in bio.",
    ],
    hashtags: "#restaurantowner #cheflife #kitchenlife #hospitalityuk #foodsafety #allergens #kitchenmanagement #restaurantmanager #hospitality #servicelife",
    capCutTips: [
      "Open on a phone ringing — real tension, stops the scroll",
      "Use clock graphics to show the 2-hour countdown",
      "Red for 'old way' section, green ticks for 'new way' — instant visual contrast",
      "Dramatic silence on the 'Two hours of chaos' beat",
      "End on a calm kitchen — warm tones, contrast with the chaos",
    ],
  },
  {
    id: 'show-me-the-numbers',
    number: '03',
    title: 'Show me the numbers',
    label: 'ROI Breakdown',
    description: "Pure numbers. Stops the scroll. Hospitality operators are obsessed with GP — this speaks their language directly.",
    accentColor: '#b45309',
    bgImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Let me show you the numbers on why this pays for itself before breakfast.",
    voiceScript: "Okay let's just do the numbers, because I think this is where it gets really obvious. Average kitchen has what, fifteen to twenty dishes on the menu. If just three of those dishes have drifted two GP points each — which happens all the time when supplier prices move and nobody recalculates — that's money going out quietly every single week. On thirty covers a dish, two GP points is roughly forty quid a week per dish. Three dishes, that's a hundred and twenty pounds a week you don't even know you're losing. That's over six grand a year. On margin drift alone. Then there's the training cost — every time someone leaves and you retrain, that's easily a couple of hundred quid in management time, wasted shifts, and mistakes during the learning period. And compliance — one failed inspection, lowest outcome, is a closure notice. Even a minor one costs you in lost trade and remedial work. ServiceSupport dot UK costs three pounds thirty a day. That's just under twenty-four pounds a week. The margin drift alone covers it in the first week. Everything else — the training, the compliance, the allergen management, the supplier monitoring — that's all on top. This isn't a cost. It's just maths.",
    beats: [
      { tag: 'The maths', headline: "3 dishes drift 2 GP points.", sub: "30 covers each. That's £120/week. Gone quietly.", enter: 'slam-up', durationMs: 2800 },
      { tag: 'Annually', headline: "£6,240 a year.", sub: "From margin drift alone. Before you even noticed.", enter: 'slam-left', durationMs: 2600 },
      { tag: 'Add training', headline: "1 person leaves.", sub: "Retraining costs: management time, mistakes, wasted shifts.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Add compliance', headline: "1 failed inspection.", sub: "Closure notice. Lost trade. Remedial work.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'The fix', headline: "ServiceSupport.UK", sub: "Catches all of it. Every day.", enter: 'scale-in', durationMs: 2400 },
      { headline: "Cost: £23.10/week.", sub: "Margin drift alone covers it in week one.", enter: 'cut', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "This isn't a cost. It's just maths.", enter: 'scale-in', durationMs: 3200 },
    ],
    captionLines: [
      "Let me do the numbers.",
      "",
      "3 dishes drift 2 GP points.",
      "30 covers each, per week.",
      "That's £120/week — gone quietly.",
      "£6,240 a year. From margin drift alone.",
      "",
      "Add: 1 person leaves every few months.",
      "Retraining, mistakes, wasted management time.",
      "",
      "Add: 1 failed inspection.",
      "Even a minor one costs you in closure and lost trade.",
      "",
      "ServiceSupport.UK catches all of it.",
      "Every day.",
      "",
      "Cost: £3.30/day. £23.10/week.",
      "The margin drift covers it in week one.",
      "",
      "This isn't a cost. It's just maths.",
      "Link in bio.",
    ],
    hashtags: "#restaurantowner #gpmargin #foodcost #hospitality #kitchenmanagement #restaurantbusiness #hospitalityuk #cheflife #profitmargin #foodbusiness",
    capCutTips: [
      "Use large white numbers on black — nothing else in frame during the maths beats",
      "Add a cash register sound on the £6,240 reveal",
      "Slow zoom in on the final £3.30 frame — make them sit with it",
      "No background music during the numbers — silence creates tension",
      "Optional: show a calculator screen as B-roll during the maths section",
    ],
  },
];
