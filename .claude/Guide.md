---
name: moneyhound-uiux
description: >
  UI/UX design guidelines for the MoneyHound platform. Use this skill whenever
  building, reviewing, or modifying any frontend component, page, or interface
  for MoneyHound — including the marketing site, customer dashboard, developer
  portal, or Angular component library.

  Trigger this skill for any of the following:
  - Building new Angular components or pages
  - Reviewing or critiquing existing UI designs
  - Writing CSS, SCSS, or Tailwind for MoneyHound
  - Choosing colors, fonts, spacing, or layout patterns
  - Writing UI copy, labels, error messages, or empty states
  - Implementing motion, transitions, or animations
  - Any question about how something should look or feel in MoneyHound
---

# MoneyHound UI/UX Design Guidelines

Design system for the MoneyHound Synthetic Financial Data Platform.
Covers the marketing site, customer dashboard, and developer portal.
Framework: Angular 18 + SCSS.

---

## Design Principles

Three non-negotiable principles that govern every decision:

**1. Precise**
Every element earns its place. MoneyHound handles financial crime data —
decorative noise dilutes signal. If it doesn't communicate something, remove it.

**2. Trustworthy**
Dark surfaces, gold accents, and monospace data typography signal
professionalism to compliance teams and data scientists. Consistency
builds trust faster than decoration.

**3. Fast to Understand**
A data scientist must read a simulation result in under 10 seconds.
Information hierarchy is non-negotiable. The most important number
is always the biggest and brightest.

> **The one rule:** If a compliance officer can't find the most important
> number on a screen within 3 seconds, the layout has failed. Hierarchy
> always wins over decoration.

---

## Color System

### CSS Variables

```scss
:root {
  // Backgrounds
  --black:    #080A0F;   // Page background
  --surface:  #0E1118;   // Cards, panels, nav
  --surface2: #141820;   // Hover states, code backgrounds
  --border:   #1E2430;   // Dividers, card borders
  --border2:  #2A3344;   // Stronger borders, input outlines

  // Brand
  --gold:      #F0B429;                    // Primary CTAs, key data, brand
  --gold-dim:  #C49022;                    // Premium tier borders
  --gold-glow: rgba(240, 180, 41, 0.12);  // Focus rings, callout backgrounds

  // Semantic
  --green:     #00E5A0;                   // Success, enterprise tier, safe states
  --green-dim: rgba(0, 229, 160, 0.10);  // Green callout backgrounds
  --red:       #FF4D6D;                   // Errors, fraud flags, danger states
  --blue:      #7DD3FC;                   // Code syntax, info states
  --purple:    #C084FC;                   // Not used in UI — reserved for syntax only

  // Text
  --text:  #E8EAF0;  // Headings, primary body
  --text2: #B0B8C8;  // Descriptions, secondary content
  --muted: #6B7280;  // Labels, hints, metadata

  --white: #FFFFFF;
}
```

### Color Usage Rules

| Color | When to Use | Never Use For |
|---|---|---|
| `--gold` | Primary CTAs, key metrics, brand elements, active nav | Decoration, backgrounds, secondary elements |
| `--green` | Success states, enterprise tier, safe/pass signals | General text, decorative accents |
| `--red` | Fraud flags, errors, danger actions, failed states | Warnings — use gold for warnings |
| `--blue` | Code syntax highlighting only | UI elements |
| `--purple` | Code syntax highlighting only | Any UI element |
| `--muted` | Labels, hints, timestamps, metadata | Body text — use `--text2` instead |

> **Critical rule:** Never use gold decoratively. It must always signal
> something actionable — a button, a key metric, or a premium feature.
> Overuse dilutes its meaning entirely.

> **Never use color as the only differentiator.** Always pair color with
> a label, icon, or pattern. This applies especially to fraud/safe states.

---

## Typography

### Typeface Stack

Three typefaces. Three roles. No substitutions.

```scss
// Display — identity, authority, headings
$font-display: 'Syne', sans-serif;

// Body — clarity, readability, descriptions
$font-body: 'DM Sans', sans-serif;

// Data — precision, code, technical labels
$font-mono: 'DM Mono', monospace;
```

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
```

> **Never use:** Inter, Roboto, Arial, or system fonts. They undermine
> the brand and produce generic AI-era aesthetics.

### Type Scale

| Token | Font | Size | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | Syne | 52–88px | 800 | -2px | Hero headlines |
| `display-lg` | Syne | 40–52px | 800 | -2px | Page titles |
| `heading-1` | Syne | 32px | 800 | -1px | Section headings |
| `heading-2` | Syne | 22–28px | 700 | -0.5px | Card titles, sub-headings |
| `heading-3` | Syne | 17–20px | 700 | 0 | Component titles |
| `body-lg` | DM Sans | 16–18px | 400 | 0 | Hero descriptions |
| `body` | DM Sans | 15px | 400 | 0 | Standard body text |
| `body-sm` | DM Sans | 13–14px | 400 | 0 | Secondary text |
| `label` | DM Mono | 11–12px | 400–500 | 1–3px | Section labels, metadata |
| `data` | DM Mono | 13–14px | 400 | 0 | Transaction IDs, amounts |
| `code` | DM Mono | 13px | 400 | 0 | Code blocks |

### Line Height

| Context | Line Height |
|---|---|
| Display / headings | 1.0–1.1 |
| Sub-headings | 1.2–1.3 |
| Body text | 1.65–1.7 |
| Code / monospace | 1.7–1.8 |

### DM Mono Usage Rule

Use `DM Mono` for all of the following — without exception:

- Transaction IDs (`TXN-MH-00421`)
- API keys (`mh_live••••••••`)
- Amounts (`$9,800.00`)
- Timestamps (`2026-04-16 02:14 UTC`)
- Section labels (`ANOMALY SIGNALS · 3 OF 5 ACTIVE`)
- Behavioral scores (`0.82`)
- Code examples
- Nav labels in sidebar

---

## Spacing System

Base unit: **8px**. All spacing is a multiple of 8.

```scss
$space-xs:  4px;   // Internal component gaps
$space-sm:  8px;   // Tight spacing, icon gaps
$space-md:  12px;  // Input padding, badge padding
$space-lg:  16px;  // Component internal padding
$space-xl:  24px;  // Card padding, grid gaps
$space-2xl: 32px;  // Section sub-padding
$space-3xl: 48px;  // Section padding
$space-4xl: 64px;  // Hero padding, major sections
$space-5xl: 80–100px; // Full section vertical padding
```

### Grid System

- **Columns:** 12-column grid
- **Gutter:** 24px
- **Max width:** 1280px
- **Sidebar width:** 260px (fixed)

| Layout Context | Columns | Horizontal Padding |
|---|---|---|
| Marketing hero | Full width | 48–64px |
| Dashboard content | 12-col grid | 32px |
| Card grids | 2–3 col | 24px gap |
| Form sections | 6 col max | 32px vertical rhythm |
| Mobile | 1 col | 24px |

---

## Border Radius

```scss
$radius-sm:  6px;   // Small buttons, badges
$radius-md:  8px;   // Inputs, buttons
$radius-lg:  10–12px; // Cards, panels
$radius-xl:  16px;  // Large cards, pricing panels
$radius-full: 9999px; // Pills, badges with dots
```

---

## Components

### Buttons

**Four variants. One primary per screen. Never two primary buttons side by side.**

```scss
// Primary — gold, one per page
.btn-primary {
  background: var(--gold);
  color: var(--black);
  font-family: $font-display;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: $radius-md;
  border: none;

  &:hover {
    background: #FFD166;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240, 180, 41, 0.3);
  }
}

// Secondary — outlined
.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border2);

  &:hover {
    border-color: var(--text2);
    background: var(--surface2);
  }
}

// Danger — destructive actions only
.btn-danger {
  background: rgba(255, 77, 109, 0.15);
  color: var(--red);
  border: 1px solid rgba(255, 77, 109, 0.3);
}

// Ghost — tertiary, cancel, dismiss
.btn-ghost {
  background: transparent;
  color: var(--text2);

  &:hover {
    color: var(--text);
    background: var(--surface2);
  }
}
```

**Button sizes:**

| Size | Padding | Font Size | Radius |
|---|---|---|---|
| sm | 8px 16px | 12px | 6px |
| default | 12px 24px | 14px | 8px |
| lg | 16px 32px | 16px | 10px |

**Button states:**

- **Disabled:** `opacity: 0.4`, `cursor: not-allowed`
- **Loading:** Show inline text label + dot indicator. Never just a spinner.
- **Active/pressed:** `transform: translateY(0)` — cancel the lift

> **Rule:** Danger buttons always require a confirmation step before
> execution. Never perform destructive actions on single click.

---

### Badges & Tags

Badges communicate status, tier, and anomaly signals. Always pair color
with a text label. Never color alone.

```scss
// Base badge
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-family: $font-mono;
  font-size: 11px;
}

// Variants
.badge-gold    { background: var(--gold-glow);              color: var(--gold);  border: 1px solid rgba(240,180,41,0.2); }
.badge-green   { background: var(--green-dim);              color: var(--green); border: 1px solid rgba(0,229,160,0.2); }
.badge-red     { background: rgba(255, 77, 109, 0.10);     color: var(--red);   border: 1px solid rgba(255,77,109,0.2); }
.badge-muted   { background: var(--surface2);               color: var(--muted); border: 1px solid var(--border); }
```

**Semantic usage:**

| Context | Badge | Color |
|---|---|---|
| Free tier | Free | Muted |
| Premium tier | ● Premium | Gold |
| Enterprise tier | ● Enterprise | Green |
| Simulation complete | ● Complete | Green |
| Simulation processing | ● Processing | Gold |
| Simulation failed | ● Failed | Red |
| Fraud flag active | FRAUD | Red |
| AML typology | Structuring / Mule Network | Red |
| Anomaly flagged | ⏰ Time / 📍 Location | Red |
| Anomaly elevated | 💰 Amount | Gold |
| Anomaly normal | 📱 Device / 💳 Balance | Muted |

---

### Forms & Inputs

**Label always above. Hint always below. Error message always below hint.**
Never use placeholder text as a substitute for a label.

```scss
.input {
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: $radius-md;
  padding: 12px 16px;
  color: var(--text);
  font-family: $font-body;
  font-size: 14px;
  width: 100%;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: var(--muted); }

  &:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px var(--gold-glow);
  }

  &.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.input-label {
  font-family: $font-mono;
  font-size: 11px;
  color: var(--text2);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.input-hint      { font-size: 12px; color: var(--muted); margin-top: 6px; }
.input-error-msg { font-size: 12px; color: var(--red);   margin-top: 6px; }
```

---

### Motion

All transitions use these durations and easings:

```scss
$ease-default: ease;
$ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
$ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);

$duration-fast:   150ms;  // Hover fades, opacity
$duration-base:   200ms;  // Lift, scale, color changes
$duration-medium: 300ms;  // Fade in, slide
$duration-slow:   400ms;  // Page transitions, modals
```

**Interaction patterns:**

| Pattern | Duration | Easing | Use |
|---|---|---|---|
| Hover lift | 200ms | ease | Cards, buttons |
| Spring scale | 200ms | spring | Icon buttons, badges |
| Fade in | 300ms | ease | Modals, dropdowns |
| Slide up | 400ms | ease-out | Page section reveals |
| Skeleton pulse | 1.5s infinite | ease-in-out | Loading states |

**Motion rules:**

- Never animate more than 2 elements simultaneously
- Stagger sequential reveals by 80–120ms
- Duration above 400ms feels slow for a data product — avoid
- Always respect `prefers-reduced-motion`:

```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Cards

```scss
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: $radius-lg;
  padding: $space-xl;  // 24px
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  }
}

// Premium card variant
.card-premium {
  border-color: var(--gold-dim);
  background: linear-gradient(145deg, var(--surface2) 0%, rgba(240,180,41,0.04) 100%);
}

// Enterprise card variant
.card-enterprise {
  border-color: rgba(0, 229, 160, 0.3);
  background: linear-gradient(145deg, var(--surface2) 0%, rgba(0,229,160,0.04) 100%);
}
```

---

### Code Blocks

```scss
.code-block {
  background: var(--black);
  border: 1px solid var(--border);
  border-radius: $radius-lg;
  overflow: hidden;
}

.code-header {
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.code-body {
  padding: 20px 24px;
  font-family: $font-mono;
  font-size: 13px;
  line-height: 1.8;
  overflow-x: auto;
}
```

**Syntax colors (inside code blocks only):**

```scss
.c-key  { color: #7DD3FC; }   // Object keys
.c-str  { color: #86EFAC; }   // String values
.c-num  { color: var(--gold); } // Numbers
.c-bool { color: #F9A8D4; }   // Booleans
.c-label { color: var(--green); } // Comments, labels
.c-muted { color: var(--muted); } // Brackets, punctuation
```

---

## Data Display Formatting

All transaction data, anomaly scores, and simulation results must follow
these rules exactly. Consistency here is critical for analyst trust.

| Data Type | Format | Example |
|---|---|---|
| Transaction ID | DM Mono, uppercase | `TXN-MH-00421` |
| Customer ID | DM Mono, uppercase | `CUST-7741` |
| Amount | DM Mono, 2dp, currency prefix, comma separator | `$9,800.00` |
| Fraud flag | Red badge — never a raw boolean | `🔴 FRAUD` |
| Behavioral score | 0.00–1.00, color bar (red above 0.7) | `0.82` |
| Timestamp | ISO 8601, UTC explicit | `2026-04-16 02:14 UTC` |
| Percentage | 1 decimal place max | `2.3%` |
| Large numbers | Comma separator, abbreviated above 1M | `1.25M` |
| API key | Prefix visible, rest masked | `mh_live••••••••` |
| Fraud rate | Percentage with 2dp | `2.00%` |
| AML typology | Capitalized, red badge | `Structuring` |

---

## Voice & Tone

MoneyHound speaks to data scientists and compliance professionals.
**Precise. Confident. Direct.** Never casual. Never corporate.

### Three Tone Rules

**1. Precise — use specific numbers and technical terms**
```
✓ "3.2x spike vs 90-day average"
✗ "Unusual transaction amount detected"
```

**2. Direct — state the finding, then the implication**
```
✓ "Structuring pattern. 4 deposits in 48h."
✗ "This transaction may potentially indicate possible structuring behavior."
```

**3. Expert — use AML terminology without definition**
```
✓ "CTR threshold breach — smurfing pattern"
✗ "This is below the amount that needs to be reported to the government"
```

### Error Messages

Error messages must be specific and actionable. Never vague.

```
✓ "Fraud rate must be between 0.1% and 50%."
✓ "API key not found. Generate a new key in Settings → API."
✓ "Jurisdiction 'XX' not supported. Use NG, GB, US, or EU."

✗ "Something went wrong. Please try again."
✗ "Oops! That didn't work."
✗ "Error code 422."
```

### Empty States

Every empty state must have:
1. A brief explanation of why it's empty
2. A single clear action to resolve it

```
✓ "No simulations yet. Generate your first dataset to get started."
   [Generate Dataset →]

✗ "No data available."
```

### Labels and Section Headers

Use DM Mono, uppercase, letter-spacing 2–3px for all section labels:

```
ANOMALY SIGNALS · 3 OF 5 ACTIVE
SIMULATION STATUS
KYC RISK TIER
```

---

## Accessibility

WCAG 2.1 AA minimum. All components must meet these standards.

| Rule | Requirement |
|---|---|
| Color contrast | 4.5:1 minimum for body text. 3:1 for large text and UI components |
| Focus states | All interactive elements must have gold focus ring. Never suppress outline |
| Keyboard navigation | Full tab order. Modals trap focus. ESC always closes |
| Screen readers | Icons need `aria-label`. Status badges need `role="status"`. Tables need `thead scope` |
| Motion | All animations respect `prefers-reduced-motion`. Static fallback for every animation |
| Error messages | Use `aria-live="polite"` for inline validation. Never color alone |
| Loading states | Use `aria-busy="true"` on loading containers |

**Focus ring standard:**
```scss
&:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--gold-glow);
  border-color: var(--gold);
}
```

---

## Icons

Use **Lucide Icons** as the primary icon library.

| Size | Use |
|---|---|
| 24×24px | Default UI icons |
| 20×20px | Compact UI, tables |
| 16×16px | Inline with text |

Stroke weight: **1.5px**

**Color rules:**
- Icons inherit `currentColor` by default
- Gold only for primary action icons
- Green for success/safe state icons
- Red for error/risk/fraud icons
- Never use decorative colors on functional icons

**Required icons and their use:**

| Icon | Use |
|---|---|
| `shield` | KYC, compliance, security |
| `alert-triangle` | Fraud flag, warning |
| `activity` | Transaction monitoring |
| `database` | Simulation datasets |
| `key` | API keys |
| `zap` | Kafka streaming, real-time |
| `globe` | Jurisdiction |
| `bar-chart-2` | Analytics, scoring |
| `download` | Export dataset |
| `user` | Customer profile, KYC |

---

## Do's and Don'ts

### Always Do

- Use gold exclusively for primary CTAs and key metrics
- Use DM Mono for all transaction IDs, API keys, amounts, and labels
- Use the 8px spacing scale for all layout decisions
- Label every anomaly signal with a human-readable reason
- Show empty states with a clear action to resolve them
- Use skeleton loaders for async data — never spinners on full pages
- Keep error messages specific and actionable
- Pair every color signal with a text label

### Never Do

- Use gold decoratively — it loses meaning if overused
- Use Inter, Roboto, or system fonts
- Place two primary buttons on the same screen
- Use color alone to communicate fraud status
- Animate more than 2 elements simultaneously
- Show raw API error objects or stack traces to users
- Use purple gradients or generic AI-era aesthetics
- Use placeholder text as a substitute for a label
- Suppress focus outlines

---

## Angular-Specific Notes

### SCSS Variables File

All CSS variables and SCSS tokens live in `libs/ui/src/styles/_variables.scss`.
Import in component styles with:

```scss
@use 'variables' as *;
```

### Component Naming Convention

```
mh-[component-name]

Examples:
mh-button
mh-badge
mh-simulation-card
mh-anomaly-signal
mh-transaction-row
```

### Shared Library

All reusable components live in `libs/ui/`. Never duplicate a component
between `marketing` and `dashboard` apps — always extract to the shared lib.

### Theme Application

Apply the dark theme at the root level:

```scss
// apps/dashboard/src/styles/global.scss
body {
  background: var(--black);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

---

## Quick Reference Cheatsheet

```
BACKGROUNDS    --black · --surface · --surface2
BORDERS        --border · --border2
BRAND          --gold (action) · --green (success) · --red (danger)
TEXT           --text · --text2 · --muted
FONTS          Syne (headings) · DM Sans (body) · DM Mono (data)
SPACING        4 · 8 · 12 · 16 · 24 · 32 · 48 · 64px
RADIUS         6 · 8 · 10–12 · 16 · 9999px
MOTION         150 · 200 · 300 · 400ms
GRID           12-col · 24px gutter · 1280px max
```