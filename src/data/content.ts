export const SITE_URL = "https://www.ratibbuilds.com/";
export const EMAIL = "ratib@ratibbuilds.com";
export const CONTACT_DESCRIPTION = "For building systems, developing websites, and products built around data.";
export const EMAIL_FALLBACK = "midhat.ratib@gmail.com";
export const PROVETALE_URL = "https://provetale.com";
export const INSTAGRAM_URL = "https://www.instagram.com/ratibbuilds/";
export const X_URL = "https://x.com/ratibmidhat_";
export const GITHUB_URL = "https://github.com/son1cleo";
export const LINKEDIN_URL = "https://www.linkedin.com/in/midhat-ratib-khan-9969012bb";
export const MSN_URL = "https://msn-bd.org";
export const NEEL_URL = "https://neel-foring.vercel.app";
export const VOT_URL = "https://newsvault-zeta.vercel.app";

export const clientWork = [
  {
    id: "msn",
    name: "Media Support Network",
    url: MSN_URL,
    urlLabel: "msn-bd.org",
    image: "/work/msn.png",
    alt: "Media Support Network homepage for press-freedom advocacy",
    outcome: "Press-freedom advocacy · Bangladesh",
    description: "A production website built to read as credible to journalists, funders and government stakeholders in the same breath.",
    chips: ["Next.js", "TypeScript", "EN/BN"],
  },
  {
    id: "neel",
    name: "Neel Foring Foundation",
    url: NEEL_URL,
    urlLabel: "neel-foring.vercel.app",
    image: "/work/neel.png",
    alt: "Neel Foring Foundation homepage featuring its youth-led mission",
    outcome: "Youth-led foundation · Dhaka",
    description: "A website for a Dhaka-based foundation equipping young people to lead on climate, technology and human rights.",
    chips: ["Next.js"],
  },
  {
    id: "voice",
    name: "Voice of Time (সময়কণ্ঠ)",
    url: VOT_URL,
    urlLabel: "newsvault-zeta.vercel.app",
    image: "/work/voice-of-time.png",
    alt: "Voice of Time bilingual news archive homepage",
    outcome: "Bilingual news archive",
    description: "Built around one editorial rule: a story published today but dated years ago never shows up as ‘latest’; it files into the historical record.",
    chips: ["Delivered in 2 days"],
  },
];

export const edits = [
  { title: "The nights nobody sees", mp4: "/edits/reel-1.mp4", poster: "/edits/reel-1.jpg", duration: "00:26", instagramUrl: INSTAGRAM_URL },
  { title: "The vision you refuse to drop", mp4: "/edits/reel-2.mp4", poster: "/edits/reel-2.jpg", duration: "00:18", instagramUrl: INSTAGRAM_URL },
  { title: "Let’s go for a ride", mp4: "/edits/reel-3.mp4", poster: "/edits/reel-3.png", duration: "00:21", instagramUrl: INSTAGRAM_URL },
  { title: "Build without a clue", mp4: "/edits/reel-4.mp4", poster: "/edits/reel-4.png", duration: "00:24", instagramUrl: INSTAGRAM_URL },
];

export const timeline = [
  { time: "00:00–00:04", quote: "Nobody sees the 3 AM commits." },
  { time: "00:04–00:18", quote: "Just you, an open terminal, and a bug that makes no sense." },
  { time: "00:19–00:26", quote: "Then it clicks. Back to building." },
];

export const pageIndex = [
  { id: "provetale", number: "01", label: "Provetale", blurb: "My own product, in production." },
  { id: "work", number: "02", label: "Web projects", blurb: "Sites for real organizations." },
  { id: "edits", number: "03", label: "Edits", blurb: "Short-form reels, cut for pacing." },
  { id: "data", number: "04", label: "Data & AI", blurb: "LLM evaluation and analysis." },
];
