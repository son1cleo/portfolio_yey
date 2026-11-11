# Portfolio design

Mode: Experience. A personal record of software, data, and AI work.

## Visual system

- Ground: #090b0a. Text: #f4f4ef. Secondary text: #aaaead. Accent: #55e792.
- Belleza headings, Open Sans body, Fira Code for build-log paths, stacks, and timestamps. All fonts use next/font.
- One 1120px content width, 32px desktop gutters, 24px phone gutters.
- Full-width opaque 62px sticky header. No other sticky navigation.
- Sections use 96px vertical padding on desktop and 64px on phones.
- Shared PortfolioCard: 12px radius, one border, flexible content, footer anchored with auto margin.
- Website records use a Radix-backed shadcn-style accordion. The rows expose organization type, stack, and verified live status.

## Motion and access

Only direct interaction moves: a 200ms accordion expansion, 160ms collapse, 2px linked-card hover, small link press feedback. Reduced motion removes movement. Navigation is static. Mobile navigation uses a native modal dialog for focus containment and Escape support. Interactive text links have at least 44px height.

## Content

Keep the exact hero sentence supplied by the owner. No location or university reference in the hero. The sole homepage project-status statement is the shared DataBrief / Provetale description in Experiments. Case-study narratives use past tense. Public sample reports are linked; the private Provetale repository is not.
