// Shared static content for BOOSTER MAG (fictional social proof, nav config, etc.)

export const BRAND = "BOOSTER MAG";

export const SERVICES = [
  {
    platform: "instagram",
    label: "Instagram",
    items: [
      { service: "followers", label: "Followers", desc: "Grow your follower count fast" },
      { service: "likes", label: "Likes", desc: "Boost engagement on posts" },
      { service: "views", label: "Views", desc: "More reach on Reels & videos" },
    ],
  },
  {
    platform: "tiktok",
    label: "TikTok",
    items: [
      { service: "followers", label: "Followers", desc: "Build a loyal fanbase" },
      { service: "likes", label: "Likes", desc: "More love on your clips" },
      { service: "views", label: "Views", desc: "Go viral on the FYP" },
    ],
  },
];

export const BENEFITS = [
  "🚀 Boost Your Reach",
  "📊 Track Your Growth",
  "📈 Build Social Proof",
  "✨ Spark Authentic Engagement",
  "🌍 Expand Your Audience",
  "🔥 Go Viral Fast",
  "💼 Enhance Professional Image",
];

export const HOW_IT_WORKS = [
  {
    n: 1,
    title: "Select Your Growth Plan",
    desc: "Choose the amount of followers you want to gain.",
  },
  {
    n: 2,
    title: "Enter Your Username",
    desc: "No password required — 100% secure.",
  },
  {
    n: 3,
    title: "Watch Real Followers Roll In",
    desc: "Growth begins instantly — safely and automatically.",
  },
];

export const FEATURES = [
  {
    title: "Organic Growth",
    desc: "Fast, organic growth starts within 24 hours after purchase.",
    icon: "sprout",
  },
  {
    title: "High Quality",
    desc: "We ensure top-quality growth by engaging with fresh, relevant users.",
    icon: "gem",
  },
  {
    title: "Affordable",
    desc: "We offer the best prices on the market, guaranteed.",
    icon: "badge-dollar-sign",
  },
];

export const TESTIMONIALS = [
  {
    name: "@maya.codes",
    role: "Content Creator",
    followers: "182k",
    quote:
      "BOOSTER MAG is the secret weapon every creator needs. My growth went from a trickle to a flood overnight!",
    img: "https://images.pexels.com/photos/7676486/pexels-photo-7676486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Marcus Lane",
    role: "Entrepreneur",
    followers: "2.1M",
    quote:
      "The results speak for themselves. This is the future of social growth — clean, fast, and effective.",
    img: "https://images.pexels.com/photos/7676405/pexels-photo-7676405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "@thevibecheck",
    role: "Influencer",
    followers: "540k",
    quote:
      "I was skeptical at first, but BOOSTER MAG really delivers. My engagement is through the roof now.",
    img: "https://images.pexels.com/photos/7676486/pexels-photo-7676486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Sasha Rivera",
    role: "Affiliate Marketer",
    followers: "76k",
    quote:
      "My follower count skyrocketed, engagement soared, and brand deals started rolling in. Game changer!",
    img: "https://images.pexels.com/photos/7676405/pexels-photo-7676405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Devon Park",
    role: "Streamer",
    followers: "119k",
    quote:
      "BOOSTER MAG is the only reason my posts still get seen. It's like a cheat code for reach.",
    img: "https://images.pexels.com/photos/7676486/pexels-photo-7676486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export const CLIENTS = [
  "NOVA MEDIA",
  "PIXELWAVE",
  "HYPE HOUSE",
  "TRENDLY",
  "CLOUTLAB",
  "VIRALWORKS",
];

export const FAQS = [
  {
    q: "What is BOOSTER MAG?",
    a: "BOOSTER MAG is a demo social-media growth platform. We showcase how targeted growth campaigns are ordered and tracked. This is a demo experience — no real followers are delivered and no real charges occur.",
  },
  {
    q: "What payment methods do you accept?",
    a: "This is a demo checkout. The card form is simulated and no real charge is ever made. Orders are stored so you can track their (simulated) progress.",
  },
  {
    q: "Will this harm my social media page?",
    a: "This is a simulated demo, so nothing touches your real account. In the demo flow we only ask for a username to show how tracking works.",
  },
  {
    q: "How long does it take to receive my followers?",
    a: "In this demo, growth is simulated and ramps up over a few minutes to an hour depending on delivery speed. Track progress live in the Dashboard.",
  },
  {
    q: "How do I cancel a subscription?",
    a: "Open the Dashboard, look up your order by email, and use the Cancel Renewal button on subscription orders.",
  },
  {
    q: "How can I contact the team?",
    a: "Reach us any time via the Contact page or the floating chat bubble in the corner.",
  },
];

export const STATUS_META = {
  pending: { label: "Pending", color: "amber", desc: "Order received — starting soon" },
  processing: { label: "Processing", color: "blue", desc: "Warming up your campaign" },
  growing: { label: "Growing", color: "purple", desc: "Followers are rolling in" },
  completed: { label: "Completed", color: "lime", desc: "All delivered — enjoy!" },
  canceled: { label: "Canceled", color: "red", desc: "This order was canceled" },
};

export function formatNum(n) {
  return (n || 0).toLocaleString("en-US");
}

export function money(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}
