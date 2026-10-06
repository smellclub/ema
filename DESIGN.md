---
name: Emanuel Yordi
description: A design studio that shows you your website before you pay; the browser window is the motif, electric blue fills whole blocks and tangerine marks the details.
colors:
  paper: "#fafaf7"
  paper-soft: "#f0f1f6"
  ink: "#0a0c18"
  night: "#11152b"
  muted: "#565b6f"
  line: "#e2e3ea"
  accent: "#2b44ff"
  accent-deep: "#1a2fd6"
  accent-soft: "#e8ebff"
  sky: "#8c9cff"
  hot: "#ff5c28"
  on-accent: "#ffffff"
  error: "#c4122f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, var(--font-bricolage), sans-serif"
    fontWeight: 700
    letterSpacing: "-0.045em"
    lineHeight: 0.95
  body:
    fontFamily: "Familjen Grotesk, var(--font-familjen), sans-serif"
    fontSize: "1.125rem"
    lineHeight: 1.625
rounded:
  control: "9999px"
  field: "0.9rem"
  window: "1rem"
  card: "1.5rem"
  panel: "2rem"
---

# Design System: Emanuel Yordi

## Overview

**Creative North Star: "Your site, live"**

Replaced the sticker sheet on 2026-10-06 because Emanuel asked for something more professional that kept the animations and good colors. The site now reads like a small design studio: calm warm-white paper, big tight display type, and a browser window as the recurring motif (the live demo in the hero, every project frame, the preloader's address bar). The hero's live demo is the signature: the visitor types their business name, picks a color, and sees their website (name, URL, buttons) change on the spot.

## Colors

- **Electric blue (accent)** is the brand color and is used boldly: the hero demo panel, the whole Services block, primary buttons, accent words in headings, process dots.
- **Tangerine (hot)** is the detail color: the marker underline under "vender.", eyebrow dots, project numbers, marquee stars, the "Gratis" badge, the reading progress bar's end. Only on large text or on dark grounds (it is 3:1 on paper).
- **Ink / night** are the dark zones: marquee, contact, footer, mobile menu, preloader. On them blue becomes **sky** for contrast.
- Paper and paper-soft are the neutrals; line is the hairline border. Red only for form errors.

## Typography

- Bricolage Grotesque 700 for display, tight tracking (-0.045em), sentence case (no all-caps).
- Familjen Grotesk for everything readable.
- Eyebrows: small uppercase label with a tangerine dot, numbered "(01) Trabajos".

## Components

- **Buttons** are pills; on hover a second color slides up from the bottom (`.btn`, `.btn-ink`, `.btn-light`, `.btn-outline`). Header and hero CTAs are magnetic.
- **Browser window** (`.browser`, `.browser-bar`): rounded 1rem, soft long shadow, first dot tangerine.
- **Chips** (`.chip`): white pills with a hairline border.
- **Service cards**: white on the blue block with a mouse-following spotlight (`.spotlight`).
- **FAQ**: hairline-separated `details`, round plus that turns blue and rotates; content height animates where supported.

## Motion

- **Title reveal**: every section title rises line by line from behind a mask (GSAP SplitText, `revealTitle`).
- **Rise**: text and cards rise 36 to 60px with expo.out (`riseIn`).
- **Project frames** unclip as you scroll; the phone mockup moves with parallax; on hover the screenshot scrolls the whole site.
- Hero: blue panel wipes up, demo window drops in and tilts with the mouse, floats idle; marker underline draws under "vender.".
- Process line draws with scroll and each dot fills blue when reached.
- Marquee runs continuously and pauses on hover. Preloader types the URL, fills a bar and lifts like a curtain (first visit only).
- Under prefers-reduced-motion everything is static and the marker shows immediately.

## Don'ts

- No blurred gradient blobs, no glassmorphism, no stock icons in pastel circles.
- No tangerine for small text on paper.
- Don't add a third strong hue.
