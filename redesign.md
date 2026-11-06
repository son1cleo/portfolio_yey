# ratibbuilds.vercel.app: Redesign Spec

**Goal:** turn a CV-style page into a site that wins paid work and bookings from US, UK, AU and EU clients.
**Keep:** black theme, green accents, profile photo. **Budget:** free tools only.
**Current site (checked 21 Oct 2026):** one hero line, 3 project cards (DataBrief, PorteHobe AI, Physics chatbot), email, GitHub, LinkedIn. No offer, no prices, no booking, no Provetale link.

---

## 1. Research: what to borrow

| # | Example | Where found | Borrow this |
|---|---|---|---|
| 1 | [Designjoy](https://www.designjoy.co/) | Gallery staple (see [Swipefile](https://swipefile.design/ref/designjoy/)) | One-person business sold like a product: fixed price next to scope, 3-step process, founder story, FAQ, "try it for a week" risk reversal. Dark sections for pricing and booking. |
| 2 | [Signal-A Studio](https://www.awwwards.com/websites/developer-portfolio/) | Awwwards, SOTD + Developer Award, 18 Oct 2026 | Dev-led studio feel: motion with purpose, typography as the hero. |
| 3 | [Huy Phan Vol.2](https://www.awwwards.com/websites/developer-portfolio/) | Awwwards, SOTD + Developer Award, 14 Oct 2026 | A solo person presented with studio-level polish. |
| 4 | [Bruno Simon](https://bruno-simon.com/) | [Twine roundup](https://www.twine.net/blog/best-freelance-developer-portfolio-examples/) | Show the skill, don't claim it. For you: an embedded live Provetale demo. |
| 5 | [Josh W. Comeau](https://www.joshwcomeau.com/) | Twine roundup | Teaching content builds trust and traffic. For you: short "data mistake" posts that match your UGC. |
| 6 | [Brittany Chiang](https://brittanychiang.com/) | Twine and [Colorlib](https://colorlib.com/wp/developer-portfolios/) | Easy to scan in 2 minutes; 3 to 5 projects only. |
| 7 | [Anthony Fu](https://antfu.me/) | Colorlib | Every claim links to something real (repo, demo). |
| 8 | [Tania Rascia](https://www.taniarascia.com/) | Colorlib | Every project has a "Live demo" and "Source" button. |

Galleries to browse while building: [Godly](https://godly.website/), [Awwwards developer portfolios](https://www.awwwards.com/websites/developer-portfolio/), [Land-book](https://land-book.com/), [SiteInspire](https://www.siteinspire.com/), [Dribbble](https://dribbble.com/search/developer-portfolio), [Mobbin](https://mobbin.com/) (pricing and onboarding screens).

**Pattern across all of them:** offer first, proof second, price visible, one clear next step on every screen.

---

## 2. Page order and copy (home, one long page)

### 2.1 Nav (sticky)
`Work` `Services` `Process` `FAQ` + green button **Book a free call**

### 2.2 Hero
- **H1:** I turn your messy data into reports and AI apps you can trust.
- **Sub:** Data scientist and builder. I shipped Provetale, a live app where code checks every number before you read it. Your project is next.
- **Buttons:** `Book a free 15-min call` (primary, green) / `Try Provetale free` (ghost)
- **Trust strip:** "Live product in use · Replies within 24h · Works across US, UK, AU, EU time zones"
- **Right side:** your photo in a rounded frame with a small green "Available for 2 projects in Nov" pill.

### 2.3 Flagship case study: DataBrief to Provetale
- **Title:** From research engine to live product.
- **Story (3 beats):**
  1. **Problem:** AI-written data reports make up numbers.
  2. **Build:** DataBrief, an analysis engine that finds statistically surprising patterns. Lifted reasoning accuracy by 15%.
  3. **Result:** It grew into Provetale. Upload a CSV, Excel or JSON file and get a written report, in English and Bangla, where code checks every number and drops any sentence that fails.
- **Proof block:** embedded 60-second Loom or autoplay muted clip, plus live build metrics (reports generated, signups) pulled from your own numbers. Only show real numbers.
- **Buttons:** `Try it free (5 reports)` → provetale.com · `Read the build story`

### 2.4 Services and fixed-price packages
*Prices are suggestions for a new freelancer. Raise them after 3 testimonials.*

| Package | Suggested price | What they get | Time |
|---|---|---|---|
| **Data Report Audit** | $149 | Send a dataset, get a checked written report, a 20-min Loom walkthrough, and 3 next steps. | 3 days |
| **AI Feature Sprint** | $990 | One LLM feature added to an existing app (chat over docs, summaries, classification) with an evaluation set. | 1 to 2 weeks |
| **MVP Build** | from $2,500 | Next.js app with auth, database and one core AI or data workflow, deployed on Vercel. | 3 to 4 weeks |

- Under the table: "Not sure which one? Book a free call." 
- Risk reversal: "If the first delivery misses the brief, I redo it or refund 50%."

### 2.5 Other work (bento grid, problem then result)
- **PorteHobe AI.** Problem: a maths tutor model had to be checked against strong rivals. Result: evaluated on 6,000+ GSM8K questions and benchmarked against Mathstral and Gemini.
- **Physics chatbot.** Problem: students got wrong answers. Result: question-level evaluation found the weak spots, then targeted fixes improved accuracy. (Add a number if you have one.)
- **Open source tile:** GitHub stats and pinned repos.
- **Build in public tile:** latest Instagram @ratibbuilds reel.

### 2.6 Process
1. **Free call (15 min).** We pick a package.
2. **Fixed quote in 24h.** Scope, price, date in writing.
3. **Build in the open.** Loom update every 2 to 3 days.
4. **Ship and hand over.** Code, docs, and a walkthrough video.

### 2.7 About (with photo)
> I'm Midhat, a data scientist from Dhaka. I build things that have to be right, not just look right. My days run on prayer, deep work and the gym, and I document the builds on Instagram @ratibbuilds.

Small row: stack badges (Python, Next.js, LLMs, SQL), GitHub, LinkedIn.

### 2.8 FAQ
- **You're new. Why hire you?** You see the work live before you pay: Provetale, demos, and code.
- **How do time zones work?** I overlap mornings in the UK and EU, and evenings in the US and AU. Async Loom updates fill the gaps.
- **How do I pay?** Fixed price, 50% upfront and 50% on delivery, by invoice (Wise or PayPal).
- **Who owns the code?** You do, once the final payment is made.
- **Do you sign NDAs?** Yes.

### 2.9 Final CTA (full-width dark green panel)
- **H2:** Have a dataset or an idea? Let's ship it.
- Embedded Cal.com calendar + short contact form side by side.

### Extra pages (later)
`/work/provetale` (full case study), `/audit` (free audit landing page), `/notes` (short posts that match each video).

---

## 3. Proof without clients
- **Live demo:** Provetale embedded or linked on the first screen.
- **Provetale beta:** "Join the beta" counts as social proof; show real signup numbers only.
- **Build-in-public metrics:** a small "This month" card (videos posted, reports generated, commits).
- **Free first audit for a testimonial:** offer 5 free Data Report Audits in exchange for a written quote and permission to use the logo.
- **Open source:** pin 2 or 3 clean repos with READMEs.
- **Loom walkthroughs:** 2 to 3 minutes per project.
- **Before and after:** raw spreadsheet next to the finished Provetale report.
- **Spec work:** redo a public dataset (Kaggle, government open data) as a full report, framed as "What I'd tell this company".

---

## 4. Visual system

### Colour
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0A0A0A` | Page background |
| `surface` | `#121412` | Cards |
| `surface-2` | `#1A1F1B` | Hover, raised cards |
| `border` | `#262B27` | 1px card borders |
| `text` | `#EDEFEA` | Body |
| `muted` | `#8A938C` | Secondary text |
| `green` | `#22C55E` | Primary buttons, links |
| `green-bright` | `#4ADE80` | Hover, highlights |
| `green-deep` | `#0F3D24` | CTA panel, pills |
| `glow` | `rgba(34,197,94,0.15)` | Soft hero glow |

Check contrast: green on black for buttons uses black text (`#0A0A0A`) on `#22C55E`.

### Type
- **Display:** Space Grotesk (600), tight letter spacing, large sizes (56 to 80px desktop, 40px mobile).
- **Body:** Inter (400/500), 17 to 18px.
- **Mono accents:** JetBrains Mono for numbers, metrics and labels. All free on Google Fonts via `next/font`.

### Layout grid
- 12 columns, 1200px max width, 24px gutters, 4-column grid on mobile.
- 8px spacing scale. Section padding 120px desktop, 72px mobile.

### Bento grid (projects)
- Desktop: Provetale tile 2x2, PorteHobe 2x1, Physics chatbot 1x1, GitHub 1x1, Reel 1x2.
- Mobile: single column, Provetale first.
- Tiles: `surface`, 1px `border`, 20px radius, green border glow on hover.

### Motion and micro-interactions
- Fade and rise on scroll (Framer Motion, 300ms, once only).
- Counter animation for metrics (+15%, 6,000+).
- Button hover: slight lift and brighter green.
- Cursor spotlight glow on bento tiles (desktop only).
- Respect `prefers-reduced-motion`.

---

## 5. Ways to make money
- **Cal.com booking (free):** 15-min "Intro call" event; embedded in CTA and linked from the nav.
- **Contact form:** free Formspree or a Next.js route plus Resend free tier. Fields: name, email, package, budget, message.
- **Lead magnet:** "The 10-point Data Report Checklist" PDF, exchanged for an email (Resend or a free MailerLite plan).
- **Provetale routes:** hero button, case study, footer, and a "Try it on your file" button in every audit email.
- **Digital products (Gumroad or Lemon Squeezy, no monthly fee):** Notion "Client Data Audit" template ($9), LLM evaluation starter kit ($19), Next.js plus AI starter repo ($29). Suggested prices.
- **UGC to site flow:** every build video ends with one call to action ("Free audit, link in bio"). The bio link goes to the portfolio. Each video can get a matching short note on `/notes`. Day-in-the-life videos build trust; build videos sell the packages.

---

## 6. Conversion and tracking
- **Vercel Web Analytics (free Hobby tier):** add `@vercel/analytics`. Track custom events: `book_call_click`, `provetale_click`, `form_submit`, `lead_magnet_download`. Note: custom events may need a paid plan; if so, use UTM tags plus Cloudflare Web Analytics referrers.
- **UTM tags** on every link from Instagram, X and Provetale.
- **SEO basics:** title "Midhat Ratib Khan · Data reports and AI apps, built fast", meta description, Open Graph image, `sitemap.ts`, `robots.ts`, JSON-LD `Person` schema, alt text on the photo, add the site to Google Search Console.
- **Mobile-first:** most UGC traffic is mobile and opens in Instagram's in-app browser. Test the booking embed there. Primary button visible without scrolling; sticky bottom "Book a call" bar on mobile.
- **Speed:** `next/image`, no heavy 3D, Lighthouse score 90+.

---

## 7. Implementation checklist (highest impact first)
1. [ ] Rewrite the hero with the offer and add the **Book a free call** Cal.com button.
2. [ ] Add the Provetale flagship case study with a link to provetale.com.
3. [ ] Add the 3 packages with suggested prices.
4. [ ] Launch the free audit offer (5 spots) and collect testimonials.
5. [ ] Add the contact form and final CTA panel.
6. [ ] Install Vercel Analytics and UTM-tag the Instagram bio link.
7. [ ] Rebuild projects as a bento grid with problem and result copy.
8. [ ] Record Loom walkthroughs and the before and after demo.
9. [ ] Add Process, About and FAQ sections.
10. [ ] SEO: metadata, OG image, sitemap, Search Console.
11. [ ] Apply the colour tokens, fonts and motion polish.
12. [ ] Publish the lead magnet and the first Gumroad or Lemon Squeezy product.
13. [ ] Add `/notes` and pair one note with each UGC video.
