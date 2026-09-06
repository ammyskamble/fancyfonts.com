# FancyFonts Design System (DESIGN.md)

**Domain:** fancyfonts.com  
**Design Philosophy:** Sleek, modern, and expressive typography generation platform. High-contrast typography playground with fluid real-time font rendering, instant copy feedback, and a state-of-the-art dark/light UI.

---

## 1. Color Palette (OKLCH Color Space)

We utilize the `oklch` perceptual color model for consistent perceived lightness across shades and vibrant, wide-gamut accents.

### 1.1 Base & Surface Tokens

| Token | Light Mode Value | Dark Mode Value | Usage |
|---|---|---|---|
| `--background` | `oklch(0.98 0.005 260)` | `oklch(0.12 0.015 260)` | Main application canvas |
| `--foreground` | `oklch(0.18 0.02 260)` | `oklch(0.98 0.005 250)` | Primary body typography |
| `--card` | `oklch(1 0 0)` | `oklch(0.155 0.018 260)` | Elevated surfaces and font preview cards |
| `--card-foreground` | `oklch(0.18 0.02 260)` | `oklch(0.98 0.005 250)` | Text inside cards |
| `--muted` | `oklch(0.94 0.008 250)` | `oklch(0.19 0.02 260)` | Inactive pills, subtle tags, input wells |
| `--muted-foreground` | `oklch(0.46 0.03 260)` | `oklch(0.68 0.02 260)` | Secondary labels, descriptions |
| `--border` | `oklch(0.89 0.012 250)` | `oklch(0.24 0.02 260)` | Card and section borders |
| `--input` | `oklch(0.89 0.012 250)` | `oklch(0.24 0.02 260)` | Form input borders |
| `--ring` | `oklch(0.52 0.22 260)` | `oklch(0.65 0.22 255)` | Focus states and active outlines |

### 1.2 Brand Accents (Vibrant Purple & Electric Indigo)

| Token | Light Mode Value | Dark Mode Value | Usage |
|---|---|---|---|
| `--primary` | `oklch(0.55 0.24 280)` | `oklch(0.68 0.22 280)` | Primary buttons, active tabs, font highlights |
| `--primary-foreground` | `oklch(0.99 0 0)` | `oklch(0.10 0.02 280)` | Text on primary backgrounds |
| `--accent` | `oklch(0.94 0.04 290)` | `oklch(0.24 0.05 290)` | Interactive hovers, highlight backdrops |
| `--accent-foreground` | `oklch(0.35 0.18 280)` | `oklch(0.85 0.12 280)` | Highlight text / icons |
| `--success` | `oklch(0.62 0.17 145)` | `oklch(0.68 0.18 145)` | Copy success toast, confirmed actions |

---

## 2. Typography

1. **Display & Body Font:** Inter / System Sans  
   - Font family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`  
   - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
2. **Numeric & Code Font:** JetBrains Mono / Tabular Monospace  
   - Font family: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`  
3. **Unicode / Fancy Font Displays:**  
   - Direct Unicode glyph mappings with fallbacks to universal font stacks.

---

## 3. Elevation, Radius & Spacing

- **Border Radius:**
  - Standard containers / cards: `--radius: 0.75rem` (12px)
  - Interactive inputs & buttons: `0.5rem` (8px)
  - Badges & pill tags: `9999px` (Full rounded)
- **Shadows & Glassmorphism:**
  - Tool Card: Subtle border with backdrop-blur `backdrop-blur-md` and `shadow-sm` or dark-mode ambient glow.
  - Focused Element: Clean offset ring `ring-2 ring-primary/40 outline-none`.

---

## 4. Component Patterns

### 4.1 Input Text Area
- Sticky or prominent live text input with sample placeholders.
- Instant reactive conversion across all fancy font styles without submit button.

### 4.2 Font Preview Cards
- Grid / list of generated styles (e.g. Cursive, Gothic, Bubble, Small Caps, Double Struck, Glitch).
- One-click copy with immediate tactile feedback (icon transforms to `Check` with green flash).
- Favorite / bookmark action.
