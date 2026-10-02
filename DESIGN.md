---
name: Emanuel Yordi
description: A white sticker sheet printed in two vinyls, electric blue and black, where every element is a die-cut sticker you can peel.
colors:
  paper: "#ffffff"
  paper-soft: "#f2f4fa"
  ink: "#0d0f1a"
  muted: "#5b6075"
  line: "#d9dceb"
  line-strong: "#b9bed6"
  accent: "#1f3bff"
  accent-deep: "#1427c9"
  accent-on-ink: "#9fb0ff"
  on-accent: "#ffffff"
  error: "#c4122f"
  error-ink: "#b00f2a"
  error-wash: "#fff5f6"
typography:
  display:
    fontFamily: "Bagel Fat One, var(--font-bagel), sans-serif"
    fontSize: "clamp(4.5rem, 7.2vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bagel Fat One, var(--font-bagel), sans-serif"
    fontSize: "clamp(3rem, 10vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bagel Fat One, var(--font-bagel), sans-serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Familjen Grotesk, var(--font-familjen), sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Familjen Grotesk, var(--font-familjen), sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Familjen Grotesk, var(--font-familjen), sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  check: "0.4rem"
  sticker: "0.32em"
  control: "0.9rem"
  card: "1.4rem"
  panel: "1.75rem"
  sheet: "2rem"
  full: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter: "40px"
  section-mobile: "112px"
  section: "160px"
  stack: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-ink-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-accent}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13.6px 16px"
  chip:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  sticker-blue:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sticker}"
  sticker-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sticker}"
  sticker-white:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sticker}"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  nav-link-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
---

# Design System: Emanuel Yordi

## Overview

**Creative North Star: "The Sticker Sheet"**

The site is a sheet of die-cut stickers, the thing every small Uruguayan business prints to brand its packaging. White backing paper carries faint dashed die-lines; on it sit stickers printed in two vinyls, electric blue and black, each with a thick white cut edge, a soft shadow lifting it off the paper, and a slight tilt. Headings are words stuck down as stickers; cards, buttons, step markers, FAQ rows and contact links are stickers too. Whole sections can flood into a full blue sheet where white stickers carry the content.

The world is tactile and playful, not decorative: stickers can be peeled and thrown (drag with inertia), project cards curl a corner on hover, and every sticker that enters the screen arrives with a "slap", dropping from large with a bounce and a twist, while the plain text around it simply rises into place. Density is generous: big section padding, few elements per viewport, type at poster scale. The build rejects both the dark big-type portfolio it replaced and the cool white Swiss grid.

**Key Characteristics:**
- White paper, two vinyls (electric blue, black), nothing else chromatic.
- Every sticker has a thick white die-cut edge and a soft, downward offset shadow.
- Stickers tilt slightly, alternating direction, and straighten on hover or open.
- Fat rounded display letters (Bagel Fat One), always uppercase; a grotesk (Familjen Grotesk) for reading.
- Dashed die-lines mark cuts, separators, and the hole a peeled sticker leaves.
- Stickers slap in, text rises; one signature interaction (drag and throw), one card gesture (corner peel).

## Colors

A white sheet printed in exactly two vinyls, with cool blue-grey neutrals that read as paper and die-cut marks.

### Primary
- **Electric Blue Vinyl** (accent): the brand's one strong color. Blue stickers, primary buttons, the full-sheet sections (Services, Contact, mobile menu, preloader curtain), the process die-line, focus rings, selection, caret, scrollbar thumb, checkbox fill and icon tint inside white stickers.
- **Pressed Blue** (accent-deep): the hover and press state of blue buttons only.

### Secondary
- **Black Vinyl** (ink): black stickers, all body text on paper, the secondary button, the black packing tape, the notebook lid, and the footer.
- **Blue on Black** (accent-on-ink): the light blue used for links and hover on black grounds (footer links, the error panel's link), where full-strength blue would lose contrast.

### Neutral
- **Backing Paper** (paper): the page ground and the face of white stickers.
- **Tinted Paper** (paper-soft): chips, browser-chrome bars on project cards, preloader track, quiet hover fills.
- **Pencil Grey** (muted): secondary paragraphs and meta text on paper (passes 4.5:1 on white).
- **Die-Cut Grey** (line): dashed die-lines, kiss-cut holes, field borders, the hairline that outlines white stickers on white paper.
- **Pressed Die-Cut** (line-strong): field hover border and the unchecked checkbox border.

### Functional
- **Error Red** (error): invalid field and checkbox borders; **Error Red Ink** (error-ink) for error message text; **Error Wash** (error-wash) for the invalid field fill. Never decorative.

### Named Rules
**The Two Vinyls Rule.** Only blue and black are printed on the sheet. No third chromatic hue enters the palette; red exists only for form errors.

**The Full Sheet Rule.** When a section floods, it floods blue, edge to edge, and its content rides on white stickers. Black appears as stickers, tape, the notebook lid and the footer, never as a full content section.

## Typography

**Display Font:** Bagel Fat One (via next/font, single weight 400)
**Body Font:** Familjen Grotesk (via next/font, variable weights)

**Character:** Bagel's fat, rounded letters look like they were cut from vinyl; the grotesk underneath is plain enough to read on a phone but has more character than a system face.

### Hierarchy
- **Display** (400, clamp(3.1rem, 14.5vw, 5.5rem) on phones up to clamp(4.5rem, 7.2vw, 7.5rem) on desktop, line-height 1, uppercase): the hero headline, one sticker per line. The preloader, the sliding "Hablemos" row (13 to 18vw) and the footer wordmark run larger.
- **Headline** (400, clamp(3rem, 10vw, 6rem), line-height 1.05, uppercase): section headings. Contact and the FAQ run a step smaller (up to 4.25 to 5rem).
- **Title** (400, 2.25rem rising to 3rem at md, line-height 1, uppercase): service names, process steps, notebook stickers. Project names run larger at clamp(2.75rem, 6vw, 4.75rem).
- **Lead** (Familjen 600, 1.75rem rising to 3rem at md, line-height 1.15 to 1.2, -0.02em): the About manifesto that lights up word by word.
- **Body** (Familjen 400, 1.125rem, line-height 1.625): paragraphs, capped at 40 to 46ch inside cards and around 24rem (max-w-sm) beside headings. Secondary copy uses muted on paper, ink at 75 to 80% inside stickers, white at 85% on blue.
- **Label** (Familjen 600, 1rem): buttons, form labels, nav links, FAQ questions (scaled to 1.25 to 1.5rem), small text stickers.

### Named Rules
**The Vinyl Letter Rule.** Bagel Fat One is display only: always uppercase, weight 400 with font-synthesis off and -0.01em tracking. Paragraphs, labels and form text are always Familjen Grotesk.

**The Stuck Word Rule.** A section heading sets one word or short phrase as a sticker (blue, black or white, tilted 2 to 3 degrees, padded 0.2em), and the rest of the heading sits on the paper as plain display type.

## Layout

A centered sheet capped at 1600px, with 20px gutters on phones and 40px from md up. Sections breathe: 112px vertical padding on phones, 160px from md. Composition is asymmetric and loose rather than a strict grid: the hero splits 1.25fr / 1fr, project rows use a 12-column grid (7 / 5) that alternates sides, service cards stagger across 7 / 5 columns with vertical offsets, the notebook lid places stickers absolutely on desktop and stacks them in a 2-column grid below lg.

Sections are separated by a dashed die-line along their top edge, not by background changes, except where a section floods blue. The header is fixed, transparent, and hides on scroll down; its nav is a floating pill. Below md the nav becomes a full-screen blue sheet of white sticker links.

Mobile first: large stickers drag only at lg with a fine pointer, so touch scrolling never gets trapped; small loose stickers drag everywhere. The process die-line runs vertically on phones and horizontally from md.

## Elevation & Depth

Depth is physical: a sticker is a thin layer stuck on paper. Every sticker carries a white die-cut ring (a zero-blur box-shadow spread) plus two soft, downward shadows tinted with ink. While dragged, the sticker lifts: it scales to 1.06 and its shadow deepens and drops. Large photographic cards (project frames, the phone mockup, the notebook lid) use one long, soft, negatively spread drop shadow. Nothing uses hard offset shadows; nothing glows.

### Shadow Vocabulary
- **Sticker at rest** (`0 0 0 var(--sticker-edge) #fff, 0 0.12em 0.2em calc(var(--sticker-edge) - 0.02em) rgb(13 15 26 / 0.12), 0 0.35em 0.7em -0.1em rgb(13 15 26 / 0.22)`): blue and black stickers.
- **White sticker at rest** (`0 0 0 1px var(--color-line), 0 0.12em 0.2em rgb(13 15 26 / 0.1), 0 0.35em 0.7em -0.1em rgb(13 15 26 / 0.2)`): white stickers, which read by a hairline and shadow instead of a white ring.
- **Lifted** (`0 0 0 var(--sticker-edge) #fff, 0 1.2em 1.6em -0.3em rgb(13 15 26 / 0.35)`): a sticker while it is held.
- **Button** (`0 0 0 4px #fff, 0 3px 5px 2px rgb(13 15 26 / 0.1), 0 10px 18px -6px rgb(13 15 26 / 0.3)`), deepening on hover to `0 0 0 4px #fff, 0 22px 28px -12px rgb(13 15 26 / 0.45)`.
- **Card drop** (`0 0 0 1px var(--color-line), 0 30px 50px -28px rgb(13 15 26 / 0.45)`): project screenshot frames.
- **Field focus** (`0 0 0 4px rgb(31 59 255 / 0.15)`): a soft blue halo on focused inputs.

### Named Rules
**The White Edge Rule.** A colored sticker always has its white cut edge: 0.14em by default, 4px on buttons, 7px on service cards, 3px on small badges. A white sticker on white paper swaps the edge for a 1px die-cut grey hairline.

**The Soft Lift Rule.** Shadows are soft, ink-tinted and fall downward. Depth grows only when something is lifted (drag, hover on buttons).

## Shapes

Corners are rounded like a die-cut: text stickers at 0.32em so the radius scales with the type, controls (buttons, fields) at 0.9rem, project frames and FAQ rows at 1.4rem, large white panels (service cards, the contact form) at 1.75rem, the hero generator and notebook lid at 2rem. Round stickers (the logo, process numbers, the FAQ toggle, the spinning "Hecho en Uruguay" badge) are full circles; chips and nav links are pills. The "Demo gratis" burst is a 14-point star with a white stroke.

Dashed lines are the sheet's cut marks: 2px dashed die-cut grey for section separators, the kiss-cut hole a peeled sticker leaves behind, the hero generator's border, and a dashed outline 12px outside each project frame; the process line is the same dash in blue.

### Named Rules
**The Slight Tilt Rule.** Stickers sit tilted, between 0.6 and 6 degrees, alternating direction between neighbors. Hover, focus or opening straightens them to 0.

## Components

### Buttons
Buttons are stickers too: tactile, tilted, peel-and-press.
- **Shape:** gently rounded (0.9rem), white 4px cut edge, resting at -1.2deg.
- **Primary:** blue with white label, 600 weight, arrow icon trailing. Padding scales with role (16px 28px in the hero, 12px 24px in cards, 10px 20px in the header).
- **Hover / Focus:** straightens to 0deg, rises 3px, turns pressed blue, shadow deepens; the trailing arrow nudges right (or rotates 45deg for external links). Press scales to 0.96. Focus is the global 3px blue outline, 3px offset.
- **Ink variant:** black, turning blue on hover; used for "Ver la web" next to a project.
- **Outline:** a pill with a 2px inset ink ring and ink label, filling black on hover; the secondary action beside an ink button.
- **Quiet text action:** pill, muted label with icon, paper-soft fill on hover (the sticker reset).
- **Text link:** ink label with a 2px blue underline offset 6px, thickening to 4px on hover.

### Chips
- **Style:** tinted paper pills, 14px medium text, ink at 75%. In service cards they lead with a blue check icon.
- **State:** static; no selection state.

### Cards / Containers
- **Project frame:** a white sticker frame (1.4rem, 10 to 12px padding) holding a paper-soft browser chrome and a screenshot that scrolls the whole site on hover. Tilted ±1.5deg, straightening on hover. A tag sticker overlaps the top edge ("Demo · negocio inventado" in black, real work in blue), a phone mockup sticker overlaps a bottom corner, and the top-right corner peels.
- **Service card:** white sticker on the blue sheet (1.75rem, 7px edge, 28 to 36px padding), tilted, with the peel corner grounded in blue.
- **FAQ row:** a white sticker `details` (1.4rem), tilted ±0.8deg, straightening when open; the toggle is a small round blue sticker whose plus rotates 45deg.
- **Notebook lid:** a black slab (2rem) with blue and white stickers stuck on it, draggable on desktop.

### Inputs / Fields
- **Style:** white, 2px die-cut grey border, 0.9rem radius, 13.6px 16px padding, 17px text, blue caret. Selects carry a blue chevron.
- **Hover / Focus:** border goes to pressed die-cut grey on hover; on focus the border turns blue with a soft 4px blue halo. A field filled from elsewhere on the page flashes a blue ring outward.
- **Error:** red border on an error-wash fill, message in error red ink below.
- **Checkbox:** a mini sticker (1.4rem, 0.4rem radius) that turns blue with a white check and tilts -6deg when checked.

### Navigation
- **Desktop:** a floating white pill (90% paper with blur, line hairline and soft shadow) of 600-weight links in ink at 75%; hover fills the link blue with white text. The logo is a round blue "EY" sticker that rotates -12deg on hover. "Hablemos" is a primary button.
- **Mobile:** a round black menu button; the menu opens as a full blue sheet whose links are large white display stickers, tilted alternately, slapping in on open.

### Signature: Stickers and Tape
- **Text sticker:** blue, black or white vinyl, padded around display or label type, with the white edge and tilt.
- **Loose stickers:** round spinning badge, burst star, basketball and small text stickers scattered around the hero; they drag and throw with inertia, leave a dashed kiss-cut hole behind, and a reset action sticks them back.
- **Packing tape:** two full-bleed bands, blue and black, crossed at -2deg and 3deg, carrying uppercase display words and four-point stars, running in opposite directions (42s loop).

### Motion
- **Slap:** the entrance for every sticker. From scale 1.45, rotated ±9deg alternating, transparent, to rest in 0.55s on back.out(2.4), staggered about 0.09s, triggered once at 80% viewport.
- **Rise:** the companion entrance for non-sticker text (intros, project copy, process steps): up 24 to 40px from transparent on expo.out, 0.7 to 0.9s.
- **Peel and straighten:** cubic-bezier(0.16, 1, 0.3, 1), 0.35 to 0.7s.
- **Lift and drop:** lift to 1.06 in 0.2s, drop back on back.out(3) in 0.45s.
- Under prefers-reduced-motion every animation, scrub and transition above is switched off.

## Do's and Don'ts

### Do:
- **Do** give every blue or black sticker its white cut edge (0.14em, 4px on buttons) and the soft downward shadow.
- **Do** tilt stickers between 0.6 and 6 degrees, alternate direction between neighbors, and straighten them on hover, focus or open.
- **Do** set one word of each section heading as a sticker (The Stuck Word Rule).
- **Do** flood a section in blue when it needs to stand apart, and carry its content on white stickers with the peel ground set to blue.
- **Do** bring stickers in with the slap and plain text in with the rise.
- **Do** use the 2px rounded-stroke SVG icon set for arrows, checks, WhatsApp and Instagram.
- **Do** keep large-sticker dragging to desktop with a fine pointer; keep small stickers draggable everywhere.
- **Do** honor prefers-reduced-motion by stopping all motion.

### Don't:
- **Don't** introduce a third chromatic hue; red is reserved for form errors.
- **Don't** use hard, unblurred offset shadows; this sheet's depth is soft.
- **Don't** set paragraphs, labels or form text in Bagel Fat One, or let the browser synthesize a bold for it.
- **Don't** flood a content section in black; black lives in stickers, tape, the notebook lid and the footer.
- **Don't** use text glyph arrows or emoji in place of the SVG icons.
- **Don't** invent a third entrance gesture beside slap and rise.
