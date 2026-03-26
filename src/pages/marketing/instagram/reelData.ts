export interface Slide {
  heading: string;
  body?: string;
  tag?: string;
  stat?: string;
  statLabel?: string;
  isBig?: boolean;
  isCta?: boolean;
}

export interface ReelCampaign {
  id: string;
  number: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string;
  label: string;
  description: string;
  slides: Slide[];
  accentColor: string;
  likes: string;
  comments: string;
}

export const reels: ReelCampaign[] = [
  {
    id: 'whats-in-the-pocket',
    number: '01',
    title: "What's Actually in Your Pocket",
    hook: "You're running a kitchen with 2 staff, rising supplier costs, and no head chef. Here's what we built for that.",
    caption:
      "Most hospitality businesses are one resignation away from crisis. HospitalitySupport.uk is the operations team you can't afford to hire — built into your business from day one.\n\nMenu development. Cost control. Allergen compliance. Training. Supplier monitoring. Front of house. Bar. All of it. One message away.\n\n£3.30 a day. No seat licences. No HR. No sick days.\n\nLink in bio.",
    hashtags:
      "#hospitalitybusiness #restaurantowner #publife #kitchenmanagement #foodbusiness #cheflife #hospitality #menuengineering #foodsafety #operationsmanagement",
    label: 'Product Walkthrough',
    description:
      "Full team walkthrough — shows every specialist role and what they actually do. Best for cold audiences who don\'t know the product.",
    accentColor: '#0d9488',
    likes: '1.4k',
    comments: '118',
    slides: [
      {
        heading: 'You\'re running a hospitality business.',
        body: 'Margins tight. Staff turning over. No one to call.',
        tag: 'Sound familiar?',
      },
      {
        heading: 'HospitalitySupport.uk',
        body: 'A full operations team. Built into your business.',
        tag: 'Not software. A team.',
      },
      {
        heading: 'Menu Development Chef',
        body: 'Full menu built in under an hour. Every dish with recipe, portion size, allergens, and GP — designed around your kitchen\'s actual skill level.',
        tag: 'Chef',
      },
      {
        heading: 'Cost & GP Controller',
        body: 'Dishes costed live. Margin drift caught early. Fixes recommended before you feel the hit.',
        tag: 'Finance',
      },
      {
        heading: 'Supplier & Price Watcher',
        body: 'Supplier prices move — this catches it instantly. Which dishes are affected. By how much. What to do.',
        tag: 'Procurement',
      },
      {
        heading: 'Allergen & Compliance Specialist',
        body: 'Allergens calculated from ingredients. Not copy-pasted. Not guessed. Live. Correct. Auditable.',
        tag: 'Safety',
      },
      {
        heading: 'Training Manager',
        body: 'Onboarding built from real roles. Updates automatically when menus or processes change. Knowledge stays — even when people don\'t.',
        tag: 'Training',
      },
      {
        heading: 'Compliance Lead',
        body: 'Live visibility of what\'s compliant, what\'s drifting, and what\'s missing. Evidence created as work happens. No inspection scramble.',
        tag: 'Compliance',
      },
      {
        heading: 'Wine & Bar Specialist',
        body: 'Bar and wine lists aligned with your pricing and margin. Yield loss flagged. Substitutions managed. Staff confident to upsell.',
        tag: 'Bar',
      },
      {
        heading: 'Front of House Specialist',
        body: 'FOH knowledge always matches the live menu. Fewer "I\'ll check" moments. Better service. Better guest confidence.',
        tag: 'FOH',
      },
      {
        heading: 'All 8 specialists.',
        body: 'Working from the same live reality. Nothing duplicated. Nothing forgotten.',
        tag: 'One team.',
      },
      {
        isBig: true,
        heading: '£3.30',
        body: 'per day',
        stat: 'Per kitchen. Not per user.',
        statLabel: 'HospitalitySupport.uk',
      },
    ],
  },
  {
    id: 'supplier-spike',
    number: '02',
    title: 'The Sunday Supplier Spike',
    hook: "Lamb just went up 8%. Here's exactly what happened next.",
    caption:
      "Supplier prices move silently. And by the time you notice, the margin's already gone.\n\nHospitalitySupport.uk catches price changes in real time — flags which dishes are affected, by how much, and gives you three fixes before service.\n\nOne message. 30 seconds. Margin protected.\n\n£3.30 a day. Link in bio.",
    hashtags:
      "#restaurantowner #kitchenmanagement #foodcost #gpmargin #cheflife #hospitality #supplierpricing #menuengineering #foodbusiness #publife",
    label: 'Supplier & Margin',
    description:
      "Targeted at operators who\'ve been stung by supplier price increases. High pain point, immediate relevance.",
    accentColor: '#0284c7',
    likes: '987',
    comments: '74',
    slides: [
      {
        heading: 'Sunday morning.',
        body: 'You check your supplier portal before the week starts.',
        tag: 'Real scenario',
      },
      {
        heading: 'Lamb shoulder: up 8%.',
        body: 'Three other lines also moved. No email. No warning.',
        tag: 'Price spike',
      },
      {
        heading: 'You send one message.',
        body: '"Lamb just went up 8% — what\'s the GP impact on the Sunday roast and what are my options?"',
        tag: 'WhatsApp',
      },
      {
        heading: 'Cost & GP Controller responds.',
        body: 'Current dish GP: 58%. With new price: 51%. Below your threshold.',
        tag: 'Instant analysis',
      },
      {
        heading: 'Three options back.',
        body: '① Switch to rolled brisket — GP restored to 62%.\n② Reduce portion by 30g — GP back to 56%.\n③ Increase price by £1.50 — GP to 59%.',
        tag: 'Real choices',
      },
      {
        heading: 'Supplier Watcher flags two more.',
        body: 'Chicken thighs up 5%. Butter up 12%. Two other dishes now below threshold.',
        tag: 'Proactive alert',
      },
      {
        heading: 'All three sorted.',
        body: 'Before the team arrived. Before a single dish was costed wrong.',
        tag: 'Done.',
      },
      {
        heading: 'No spreadsheets.',
        body: 'No calls to a cost consultant. No guessing. No late surprises.',
        tag: 'No drama.',
      },
      {
        isBig: true,
        heading: '£3.30',
        body: 'per day',
        stat: 'Margin protected. Continuously.',
        statLabel: 'HospitalitySupport.uk',
      },
    ],
  },
  {
    id: 'new-starter',
    number: '03',
    title: 'Two New Starters. Zero Stress.',
    hook: "Two new starters Monday. Fully trained before their first shift. I didn't do a thing.",
    caption:
      "High turnover is the hospitality constant. The problem isn't hiring — it's the cost of constantly re-training people who leave six weeks later.\n\nHospitalitySupport.uk builds training from your actual operation. Menus, processes, standards — all of it. Updates automatically when anything changes. Staff train themselves. You get completion alerts.\n\nNo more tribal knowledge walking out the door.\n\n£3.30 a day. Link in bio.",
    hashtags:
      "#stafftraining #hospitalitystaff #restaurantmanager #kitchenstaff #onboarding #foodsafety #hospitalitylife #cheftraining #teammanagement #hospitality",
    label: 'Training & Onboarding',
    description:
      "The chaos of onboarding is a pain every operator knows. This hits that nerve and shows the exact solution.",
    accentColor: '#b45309',
    likes: '2.3k',
    comments: '191',
    slides: [
      {
        heading: 'Monday morning.',
        body: 'Two new starters. You need them on section by Wednesday.',
        tag: 'Every week.',
      },
      {
        heading: 'Old way:',
        body: 'Shadow someone for three days. Print out a menu. Hope for the best. Spend Friday correcting mistakes.',
        tag: 'Not good enough.',
      },
      {
        heading: 'One message.',
        body: '"I have two new KPs starting Monday — one moving to chef in 4 weeks. Build me an onboarding plan for both."',
        tag: 'WhatsApp',
      },
      {
        heading: 'Training Manager responds.',
        body: 'Structured plan built from your live menu and actual kitchen setup. Role-specific. Day by day.',
        tag: 'Instant',
      },
      {
        heading: 'Day 1: Kitchen standards.',
        body: 'Food safety. HACCP. Allergen awareness. Cleaning schedules. All aligned to how you actually operate.',
        tag: 'Compliance baked in',
      },
      {
        heading: 'Day 3: Menu knowledge.',
        body: 'Dish by dish. Specs. Allergens. Presentation. Portion. Written to their level — not copied from a template.',
        tag: 'Your menu. Their language.',
      },
      {
        heading: 'Week 2: Skill progression.',
        body: 'Moving from prep to section. Tasks matched to what they\'ll actually face in service.',
        tag: 'Real progression',
      },
      {
        heading: 'When the menu changes?',
        body: 'Training updates automatically. No chasing. No outdated PDFs.',
        tag: 'Always current',
      },
      {
        heading: 'You got completion alerts.',
        body: 'Both trained. Compliant. Ready. You didn\'t lift a finger.',
        tag: 'Done before Wednesday.',
      },
      {
        isBig: true,
        heading: '£3.30',
        body: 'per day',
        stat: 'Knowledge stays. Even when people don\'t.',
        statLabel: 'HospitalitySupport.uk',
      },
    ],
  },
];
