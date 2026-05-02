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
    id: 'pov-kitchen',
    number: '01',
    title: 'POV: Your kitchen just ran itself',
    label: 'POV Format',
    description: 'First-person hook. Morning routine. Notification reveal. Very native to TikTok algorithm.',
    accentColor: '#0d9488',
    bgImage: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "POV: You're a chef-owner and your phone just sorted your GP before you even got to work.",
    voiceScript: "POV. 6:45am. You're not even in yet. Your operations team already flagged that your chicken dish dropped 4 GP points overnight. They already recommended a portion adjustment. They already updated the spec. You walk in. Everything's sorted. That's HospitalitySupport dot UK. Three pounds thirty a day. Always on.",
    beats: [
      { headline: "POV: 6:45am.", sub: "You're not even in yet.", enter: 'slam-up', durationMs: 2600 },
      { tag: 'Overnight', headline: "Chicken dish dropped 4 GP points.", sub: "Caught. Flagged. While you slept.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Already done', headline: "Portion adjustment recommended.", sub: "Spec already updated.", enter: 'slam-up', durationMs: 2200 },
      { headline: "You walk in.", sub: "Everything's sorted.", enter: 'cut', durationMs: 2000 },
      { isBig: true, headline: "£3.30", sub: "Always on. Per day. Per kitchen.", enter: 'scale-in', durationMs: 3200 },
    ],
    captionLines: [
      "POV: You're a chef-owner and your phone just sorted your GP before you even got to work.",
      "",
      "6:45am. Not even in yet.",
      "Chicken dish dropped 4 GP points overnight.",
      "Portion adjustment already recommended.",
      "Spec already updated.",
      "",
      "You walk in. Everything's sorted.",
      "",
      "That's HospitalitySupport.uk.",
      "£3.30 a day. Always on.",
      "",
      "Link in bio.",
    ],
    hashtags: "#hospitality #restaurantowner #cheflife #kitchenmanagement #foodbusiness #gpmargin #foodcost #pov #hospitalitytiktok #publife",
    capCutTips: [
      "Use 'Kitchen Morning' or 'Busy Chef' B-roll from your phone",
      "Add notification sound effect on beat 2",
      "Use bold white text on black background — TikTok native style",
      "No music — voice only performs better for service-based brands",
      "End frame: static logo + website for 1.5 seconds",
    ],
  },
  {
    id: 'hospitality-math',
    number: '02',
    title: 'Hospitality maths nobody does',
    label: 'Text-on-Screen',
    description: "Fast cuts. Hook-heavy. Text-on-screen. Numbers create pattern interrupt — stops scroll instantly.",
    accentColor: '#dc2626',
    bgImage: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "The maths quietly costing hospitality businesses thousands every month.",
    voiceScript: "One dish drops 5 GP points. Sells 40 covers a week. That's six hundred pounds a month. Gone quietly. One new hire gets allergens wrong. One complaint. One inspection. That's not a fine. That's a closure. One chef leaves. Menu knowledge leaves with them. Retraining. Mistakes. Lost covers. HospitalitySupport dot UK stops all three. Every day. For three pounds thirty.",
    beats: [
      { tag: 'The maths', headline: "1 dish drops 5 GP points.", sub: "40 covers a week. £600/month. Gone quietly.", enter: 'slam-up', durationMs: 2800 },
      { tag: 'The risk', headline: "1 hire gets allergens wrong.", sub: "1 complaint. 1 inspection. That's not a fine.", enter: 'slam-left', durationMs: 2600 },
      { headline: "That's a closure.", enter: 'cut', durationMs: 1800 },
      { tag: 'The cost', headline: "1 chef leaves.", sub: "Menu knowledge leaves too. Retraining. Mistakes. Lost covers.", enter: 'slam-up', durationMs: 2800 },
      { headline: "HospitalitySupport.uk", sub: "Stops all three. Every day.", enter: 'scale-in', durationMs: 2400 },
      { isBig: true, headline: "£3.30", sub: "Per day. Protects everything.", enter: 'scale-in', durationMs: 3200 },
    ],
    captionLines: [
      "The maths quietly costing hospitality businesses thousands every month.",
      "",
      "1 dish drops 5 GP points.",
      "40 covers a week.",
      "That's £600/month — gone quietly.",
      "",
      "1 new hire gets allergens wrong.",
      "1 complaint. 1 inspection.",
      "That's not a fine. That's a closure.",
      "",
      "1 chef leaves.",
      "Menu knowledge leaves with them.",
      "Retraining. Mistakes. Lost covers.",
      "",
      "HospitalitySupport.uk stops all three.",
      "Every day. For £3.30.",
      "",
      "Link in bio.",
    ],
    hashtags: "#restaurantowner #foodsafety #allergens #kitchenmanagement #foodcost #gpmargin #hospitalitybusiness #cheflife #hospitality #tiktokbusiness",
    capCutTips: [
      "Use fast-cut style — 0.5s black flash between each beat",
      "Red and white text only — high contrast = stops scroll",
      "Add cash register or calculator sound effects",
      "No background music — dramatic silence works harder here",
      "Final frame: white text on black — 'HospitalitySupport.uk — Link in bio'",
    ],
  },
  {
    id: 'two-starters',
    number: '03',
    title: 'Two starters. On section by Wednesday.',
    label: 'Problem → Solution',
    description: "High turnover is the hospitality constant. Before/after format. Resonates with every manager.",
    accentColor: '#b45309',
    bgImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    hook: "Two new starters Monday. Both on section by Wednesday. This is how.",
    voiceScript: "Two new starters. Monday. You need both on section by Wednesday. Old way: shadow someone for three days. Print a menu. Hope for the best. New way: one message. Build me an onboarding plan for both. Structured plan — built from your live menu, your actual kitchen setup, role-specific, day by day. Menu changes? Training updates automatically. No chasing. No outdated PDFs. Both trained. Compliant. Ready. Three pounds thirty a day. Knowledge stays in the business — even when people don't.",
    beats: [
      { headline: "Monday morning.", sub: "Two new starters. On section by Wednesday.", enter: 'slam-up', durationMs: 2400 },
      { tag: 'Old way', headline: "Shadow someone. Print a menu.", sub: "Hope for the best. Fix mistakes on Friday.", enter: 'slam-left', durationMs: 2800 },
      { tag: 'New way', headline: '"Build me an onboarding plan."', sub: "One message. That's it.", enter: 'scale-in', durationMs: 2400 },
      { tag: 'Built from your kitchen', headline: "Role-specific. Day by day.", sub: "Live menu. Your allergens. Your standards.", enter: 'slam-up', durationMs: 2400 },
      { headline: "Menu changes?", sub: "Training updates automatically. No chasing.", enter: 'slam-left', durationMs: 2400 },
      { tag: 'Done', headline: "Both trained. Compliant. Ready.", sub: "Standards protected.", enter: 'slam-up', durationMs: 2200 },
      { isBig: true, headline: "£3.30", sub: "Knowledge stays — even when people don't.", enter: 'scale-in', durationMs: 3200 },
    ],
    captionLines: [
      "Two new starters Monday. Both on section by Wednesday.",
      "This is how we structured it.",
      "",
      "Old way:",
      "Shadow someone for three days.",
      "Print a menu. Hope for the best.",
      "Spend Friday fixing what they got wrong.",
      "",
      "New way:",
      "One message → 'Build me an onboarding plan'",
      "Built from your live menu.",
      "Role-specific. Day by day.",
      "Updates automatically when the menu changes.",
      "",
      "Both trained. Compliant. Ready for service.",
      "",
      "HospitalitySupport.uk — £3.30/day.",
      "Knowledge stays in the business, even when people don't.",
      "",
      "Link in bio.",
    ],
    hashtags: "#stafftraining #onboarding #hospitalitystaff #kitchenstaff #restaurantmanager #foodsafety #cheftraining #hospitality #hospitalitylife #teammanagement",
    capCutTips: [
      "Split screen works well — left: 'old way chaos', right: 'new way calm'",
      "Use kitchen B-roll during the 'old way' section",
      "Amber/orange tones match the brand — apply warm LUT",
      "Add subtle kitchen ambience audio — low, not distracting",
      "Bold sticker text overlay for the 'One message' beat — native TikTok style",
    ],
  },
];
