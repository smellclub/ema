---
name: Emanuel Yordi
description: An editorial studio portfolio on ivory and black, with a fine serif, one electric-blue accent and a lot of purposeful motion that shows how Emanuel works.
colors:
  paper: "#f4f1ea"
  paper-soft: "#ebe7dd"
  ink: "#0f0f11"
  ink-soft: "#1a1a1e"
  muted: "#625e57"
  line: "#d9d4c8"
  accent: "#2b44ff"
  sky: "#a3b0ff"
  on-accent: "#ffffff"
  error: "#c4122f"
typography:
  display:
    fontFamily: "Instrument Serif, var(--font-instrument-serif), serif"
    fontWeight: 400
    letterSpacing: "-0.025em"
    lineHeight: 0.92
  body:
    fontFamily: "Instrument Sans, var(--font-instrument-sans), sans-serif"
    fontSize: "1.125rem"
    lineHeight: 1.625
rounded:
  control: "9999px"
  window: "1rem"
  card: "1.25rem"
---

# Design System: Emanuel Yordi

## Overview

**Creative North Star: "Editorial studio in motion"**

Set on 2026-10-06 after Emanuel turned down the blue and tangerine "studio" pass and asked for something professional and elegant, with plenty of animation so visitors can see how he works. The page alternates ivory and black sections. Huge Instrument Serif headings carry the voice, and an italic word in electric blue (sky on black) is the brand's only accent. Motion is the portfolio's proof of skill, so it is rich but always smooth (expo and power3 eases) and never decorative noise.

## Colors

- **Ivory paper** is the ground, and **ink** floods whole sections: Work, Services, Contact, Footer, the preloader and the mobile menu.
- **Electric blue** appears only as accent words in italic, the availability dot, the hover fill on service rows, the WhatsApp circle, the cursor label and the process digits. On black it becomes **sky**.
- Muted and line are the neutrals. Red is used only for form errors.

## Typography

- Instrument Serif 400 for display, very large (up to 10.5rem in the hero and 16rem for "Hablemos"). Each heading puts one word in italic as an accent.
- Instrument Sans for reading, labels and buttons.
- Eyebrows are small uppercase labels with a short leading rule, numbered "01 — Trabajos".

## Components

- **Buttons** are pills (`.btn`, `.btn-light`, `.btn-outline`). On hover the fill rises from the bottom and the label rolls up (`<Roll>`).
- **Links** use `.link-line`: the underline exits right and redraws from the left.
- **Lists instead of cards**: services, off-screen interests and FAQ are hairline rows. Service rows fill blue on hover and unfold on click.
- **Fields** are underline-only, editorial style.
- **Header** is transparent with `mix-blend-difference`, so it reads on both ivory and black.

## Motion inventory

- Preloader: the name rises letter by letter, a counter runs 000 to 100, then the curtain lifts as its curved bottom edge flattens.
- Hero: letter-by-letter title, a rotating italic word (vender, reservar, crecer), a fan of phone mockups that opens and follows the mouse with depth, and the hero recedes on scroll.
- Marquee: serif band whose speed and direction follow scroll velocity, with a skew.
- Work: pinned horizontal gallery on desktop, with a counter, a progress bar, image parallax inside each frame and a full-page screenshot scroll on hover. On mobile it stacks and each frame unclips.
- Live demo: a browser window tilts in 3D and straightens on scroll. Style chips re-sweep the mini site.
- About: the manifesto lights up word by word, list rules draw in and rows slide on hover.
- Process: pinned stage with a rolling giant digit and steps that cross-fade, snapping per step.
- Contact: letter-by-letter "Hablemos." and a magnetic WhatsApp circle. Footer wordmark reveals letter by letter.
- Custom difference-blend cursor with labels ("Ver", "Escribime").
- Everything is static under prefers-reduced-motion. Pinned layouts only switch on through JS (`data-h="on"`), so without JS they stay normal lists.

## Gotcha

Never put a CSS `transition-transform` on an element GSAP animates: the two fight and leave it stuck mid-way. Animate an outer wrapper and put hover transforms on an inner element.
