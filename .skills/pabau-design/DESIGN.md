# pabau DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 9
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![pabau Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a cool tone. Depth is expressed through layered shadows and subtle surface color variation. Typography pairs **dashicons** for display/headings with **Satoshi** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **5px base grid** (standard density), with scale: 5, 10, 15, 20, 25, 30, 35, 40px. The palette is predominantly monochromatic with **#54b2d3** as the single accent color — used sparingly for interactive elements and emphasis. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| circle-fill-color | `#1e1b18` | background | Page background, darkest surface |
| circle-fill-color | `#000000` | surface | Card and panel backgrounds |
| circle-fill-color | `#ffffff` | text-primary | Headings and body text |
| brand-gray | `#3d3d46` | text-muted | Captions, placeholders, secondary info |
| e-global-color-text | `#4b5563` | border | Dividers, card borders, outlines |
| e-global-color-accent | `#54b2d3` | accent | CTAs, links, focus rings, active states |
| e-global-color-42eeb8a | `#eef9ff` | info | Informational highlights |
| unknown | `#2badd4` | unknown | Palette color |
| brand-color | `#1ab4d7` | unknown | Palette color |
| unknown | `#24bee1` | unknown | Palette color |
| unknown | `#1a2539` | unknown | Palette color |
| unknown | `#8b95a8` | unknown | Palette color |
| e-global-color-db8e565 | `#eaecf0` | unknown | Palette color |
| unknown | `#111826` | unknown | Palette color |
| unknown | `#6c757d` | unknown | Palette color |
| unknown | `#838383` | unknown | Palette color |
| e-global-color-f71d171 | `#40a0c1` | unknown | Palette color |
| unknown | `#646464` | unknown | Palette color |
| unknown | `#037cd2` | unknown | Palette color |
| e-global-color-01b9bb0 | `#c9ecff` | unknown | Palette color |

### CSS Variable Tokens

```css
--border-radius: 0;
--border-top-width: 0px;
--border-right-width: 0px;
--border-bottom-width: 0px;
--border-left-width: 0px;
--border-style: initial;
--border-color: initial;
--border-block-start-width: var(--border-top-width);
--border-block-end-width: var(--border-bottom-width);
--border-inline-start-width: var(--border-left-width);
--border-inline-end-width: var(--border-right-width);
--border-inline-start-width: var(--border-right-width);
--border-inline-end-width: var(--border-left-width);
--e-global-color-primary: #1E1B18;
--e-global-color-secondary: #35CCFF;
--e-global-color-accent: #54B2D3;
--e-global-typography-primary-font-family: "Satoshi";
--e-global-typography-primary-font-weight: 600;
--e-global-typography-secondary-font-family: "Satoshi";
--e-global-typography-secondary-font-weight: 400;
```


---

## 3. Typography Rules

**Font Stack:**
- **Satoshi** — Heading 1, Heading 2, Heading 3
- **dashicons** — Body, Caption
- **DM Mono** — Code

**Font Sources:**

```css
@font-face {
  font-family: "dashicons";
  src: url("https://pabau.com/wp-includes/fonts/dashicons.eot?99ac726223c749443b642ce33df8b800");
  font-weight: 400;
}
@font-face {
  font-family: "Satoshi";
  src: url("https://pabau.com/wp-content/uploads/2022/08/Satoshi-Bold.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "Satoshi";
  src: url("https://pabau.com/wp-content/uploads/2022/08/Satoshi-Italic.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "DM Mono";
  src: url("https://pabau.com/wp-content/uploads/fonts/dm-mono/DMMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Satoshi | 100px | 700 |
| Heading 2 | Satoshi | 64px | 700 |
| Heading 3 | Satoshi | 59px | 700 |
| Body | dashicons | 16px | 400 |
| Caption | dashicons | 14px | 400 |
| Code | DM Mono | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **Satoshi** for body/UI text, **dashicons** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (3)

**Card** — `html`
- Variants: `row-img`, `row-copy`, `container`, `inner`, `img`

**Badge** — `html`

**List** — `html`

### Data Input (1)

**Button** — `html`
- Variants: `n`, `cta`
- Animation: 

### Overlay (1)

**Modal** — `html`

### Media (2)

**Image** — `html`

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 5px
- **Spacing scale:** 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
- **Border radius:** .25rem, 2px, 3px, 4px, 4.63px, 5px, 6px, 8px, 8.377px, 10px, 10%, 12px, 12.573px, 13.5px, 14px, 16px, 17px, 18px, 20px, 23.824px, 24px, 25px, 30px, 36px, 40px, 41px, 50px, 56px, 59px, 75.956px, 100px, inherit, unset, 127.778px
- **Max content width:** 1100px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 2.5-5px | Tight: related items within a group |
| 10px | Medium: between groups |
| 15-20px | Wide: between sections |
| 30px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `inset 0-1px 0 rgba(0,0,0,.102)`
- `inset 0 0 0 1px rgba(0,0,0,.1)`
- `0 0 0 2px #fff`

### Raised — cards, buttons, interactive elements

- `0 1px 4px 0 rgba(99,131,241,.68),0-1px 2.8px 0 rgba(43,173,212,.25)`
- `0 1px 4px 2px #D2EAFF inset`
- `0 .35rem 0 currentColor`

### Floating — dropdowns, popovers, modals

- `0 0 10px 0 rgba(0,0,0,.05)`
- `0 1px 3px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.03)`
- `0 1px 16.9px 2px rgba(210,234,255,.8) inset,0 1px 4px 2px #D2EAFF inset,0 10.268px 13.398px 0 rgba(87,177,255,.22),0 3.714px 4.846px 0 rgba(87,177,255,.15),0 0 0 4px #E0E9F2,0 0 0 5px #FFF`

### Overlay — full-screen overlays, top-level dialogs

- `0 4px 32px 0 rgba(0,0,0,.16)`
- `1.899px 1.77px 8.174px 0 rgba(255,255,255,.13) inset,1.007px .939px 4.087px 0 rgba(255,255,255,.13) inset`
- `0 12px 32px 0 rgba(0,0,0,.1)`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 9, 10, 20, 99, 100, 999, 1000, 1040, 1050, 1100, 9999, 10000, 100000, 2222222`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes pvc-loading`
- `@keyframes shimmer`
- `@keyframes spin`
- `@keyframes pabau-scroll`
- `@keyframes pabau-scroll-reverse`
- `@keyframes pabau-tools-slide-right`
- `@keyframes pabau-tools-slide-left`
- `@keyframes expandSlider`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#54b2d3` for interactive elements (buttons, links, focus rings)
- Use `#1e1b18` as the primary page background
- Pair **Satoshi** (body) with **dashicons** (display) — these are the only allowed fonts
- Follow the **5px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, 2px, 3px, 4px, 4.63px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Satoshi and dashicons and DM Mono
- Don't use arbitrary spacing values — stick to multiples of 5px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| xs | 400px | css |
| xs | 479px | css |
| xs | 480px | css |
| sm | 540px | css |
| sm | 575px | css |
| sm | 576px | css |
| sm | 600px | css |
| md | 689px | css |
| md | 767px | css |
| md | 768px | css |
| lg | 772px | css |
| lg | 900px | css |
| lg | 960px | css |
| lg | 991px | css |
| lg | 992px | css |
| lg | 1024px | css |
| xl | 1025px | css |
| xl | 1161px | css |
| xl | 1195px | css |
| xl | 1200px | css |
| xl | 1260px | css |
| xl | 1272px | css |
| xl | 1280px | css |
| 2xl | 1326px | css |
| 2xl | 1340px | css |
| 2xl | 1360px | css |
| 2xl | 1380px | css |
| 2xl | 1400px | css |
| 2xl | 1405px | css |
| 2xl | 1420px | css |
| 2xl | 1440px | css |
| 2xl | 1460px | css |
| 2xl | 1550px | css |
| 2xl | 1600px | css |
| 2xl | 1720px | css |
| 2xl | 1800px | css |
| 2xl | 99999px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #000000
Border: 1px solid #4b5563
Radius: 18px
Padding: 20px
Font: Satoshi
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #54b2d3, text white
Ghost: bg transparent, border #4b5563
Padding: 10px 20px
Radius: 18px
Hover: opacity 0.9 or lighter shade
Focus: ring with #54b2d3
```

### Build a Page Layout

```
Background: #1e1b18
Max-width: 1100px, centered
Grid: 5px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #000000
Label: #3d3d46 (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #1e1b18
Input border: 1px solid #4b5563
Focus: border-color #54b2d3
Label: #3d3d46 12px
Spacing: 20px between fields
Radius: 18px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Satoshi, type scale from Section 3
4. Spacing: 5px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
