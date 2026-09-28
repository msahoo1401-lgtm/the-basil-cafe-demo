# Project Rules: The Basil Cafe & Restro (Bhubaneswar) — Pitch Demo

## 1. Business Reality & Target Audience
- Client: The Basil Cafe & Restro, Plot K7/92, Ghatikia, Kalinganagar, Bhubaneswar 751029.
- Identity: 100% Pure Vegetarian & Vegan-friendly cafe, women-owned, sunlit botanical interior with indoor plants, board games, books, Mandala/Lippan art workshops, and two friendly resident dogs (Radha & Rani).
- Primary Conversion: Direct WhatsApp Table & Workshop Bookings to `+918018491379` + Interactive QR Table Menu with live "Sold Out" status.

## 2. Mobile-First + Desktop Responsive Architecture
- Design strictly for 390px mobile screens first (thumb-zone navigation, compact horizontal menu cards, sticky bottom action dock, bottom-sheet modals).
- Include `md:` and `lg:` Tailwind classes in the same pass so desktop users see a balanced 12-column editorial layout (`max-w-6xl mx-auto`).
- Add `pb-28 md:pb-12` to the main page container so the fixed mobile bottom bars never cover footer content.

## 3. Color Palette & Typography (Zero Visual AI Slop)
- Primary Background: `#F6F3EC` (Warm Oat — never use pure `#FFFFFF` for page background)
- Secondary Card Surface: `#E9EFEA` (Pale Sage) and `#EDE8DF` (Warm Linen)
- Primary Brand / Headings / Primary Buttons: `#1B3B2B` (Deep Basil Leaf)
- Appetite & Badge Accent: `#C86446` (Terracotta Clay)
- Body Text: `#222623` (Espresso Charcoal) | Muted Text: `#5A635D`
- Official Indian Pure Veg Indicator: `#008000` green dot inside a green square border.
- Fonts: `Fraunces` (Google Font, serif) for headings; `Plus Jakarta Sans` (sans-serif) for body, buttons, and prices. Always use `tabular-nums` on `₹` prices.
- BANNED VISUAL PATTERNS: No neon green Tailwind gradients, no generic 3-icon feature cards, no online shopping cart/checkout drawer, no fake Unsplash faces.

## 4. Copywriting Rules (petergyang/no-ai-slop)
- Ban binary contrasts ("It's not X, it's Y", "More than just a cafe").
- Ban throat-clearing openers and puffery ("Nestled in the heart of", "A symphony of flavors", "Crafted to perfection", "A testament to").
- Never use Lorem Ipsum. Write concrete, factual descriptions of Kalinganagar, first-floor stair access, Radha & Rani, and actual menu items.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
