---
name: Technical Precision Dashboard
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#454557'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#757589'
  outline-variant: '#c5c5da'
  surface-tint: '#303dff'
  primary: '#000ccd'
  on-primary: '#ffffff'
  primary-container: '#1e2bfa'
  on-primary-container: '#c1c5ff'
  inverse-primary: '#bec2ff'
  secondary: '#5b5e6d'
  on-secondary: '#ffffff'
  secondary-container: '#dfe1f3'
  on-secondary-container: '#616473'
  tertiary: '#7c1000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a71900'
  on-tertiary-container: '#ffb8a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bec2ff'
  on-primary-fixed: '#00036b'
  on-primary-fixed-variant: '#000fe9'
  secondary-fixed: '#dfe1f3'
  secondary-fixed-dim: '#c3c6d7'
  on-secondary-fixed: '#181b28'
  on-secondary-fixed-variant: '#434654'
  tertiary-fixed: '#ffdad3'
  tertiary-fixed-dim: '#ffb4a5'
  on-tertiary-fixed: '#3e0400'
  on-tertiary-fixed-variant: '#8e1400'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  display-bold:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  numerical-callout:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 24px
  gutter: 16px
  card-padding: 20px
  sidebar-width: 260px
  topbar-height: 64px
---

## Brand & Style
The design system is engineered for high-performance data monitoring and enterprise technical management. The personality is efficient, clinical, and precise, utilizing a modern **Minimalist** foundation with **Technical/Futuristic** typographic accents. 

The aesthetic prioritizes clarity and rapid information processing. It avoids traditional elevation cues like shadows in favor of tonal layering and structured geometry. The emotional response is one of controlled authority and systematic reliability.

## Colors
The palette is anchored by a high-intensity **Solid Cobalt Blue** (#1E2BFA) used for critical data points, active states, and primary actions. 

- **Canvas:** A cool, pale lavender-white (#F0F2F5) provides a clean, non-distracting foundation.
- **Surfaces:** Use pure white (#FFFFFF) for structural elements like the Sidebar and Top Bar to differentiate global navigation from content.
- **Accents:** A light tinted version of the primary cobalt is used for tracks, hover states, and inactive progress bars.
- **Status Banner:** A subtle cream background with centered cobalt text is reserved for global system announcements.

## Typography
This design system utilizes a dual-font strategy to balance character with legibility. 

- **Headings & Numbers:** Use **Space Grotesk**. Its geometric quirks reinforce the technical nature of the data. All headlines should be sentence case. Important numerical callouts must be bold and rendered in the primary cobalt blue.
- **Body & Interface:** Use **Inter**. This provides a neutral, highly readable experience for long-form data, labels, and UI controls.
- **Header Decoration:** Main section headers feature a short, 4px thick solid cobalt underline rule aligned to the left.

## Layout & Spacing
The system employs a **Fluid Grid** model for the main content area, while navigation remains fixed.

- **Sidebar:** Fixed at 260px on the left. White background.
- **Top Bar:** Fixed at 64px height. White background with a subtle 1px border at the bottom.
- **Content Area:** Elements are organized into a 12-column responsive grid with 16px gutters.
- **Spacing Rhythm:** Use a 4px base unit. Card internal padding is set to 20px to maintain a spacious, breathable layout despite high data density.

## Elevation & Depth
Depth is communicated through color contrast and layering rather than shadows. 

- **Level 0 (Canvas):** The #F0F2F5 background.
- **Level 1 (Cards):** Flat fills using a slightly lighter or tinted lavender-white than the canvas. No borders, no shadows.
- **Level 2 (Navigation):** Pure white surfaces for Sidebar and Top Bar.
- **Focus States:** High-contrast cobalt outlines or thick left-edge bars for active menu items.

## Shapes
The shape language is modern and approachable but retains a professional edge.

- **Cards:** Use a 12px or 14px corner radius.
- **Pills:** Search bars and status badges should be fully rounded (pill-shaped).
- **Interactive Elements:** Buttons and input fields follow the standard 8px (rounded-lg) radius to match the card aesthetic.

## Components
- **Cards:** Flat, borderless surfaces with 14px radius. Content is grouped by clear Space Grotesk sub-headers.
- **Sidebar:** Icons and labels are black or dark grey. The active state includes a 4px solid cobalt bar on the far-left edge and a light cobalt tint across the entire menu item width.
- **Top Bar:** Features a centered pill-shaped search input. Icons (notifications, user, settings) are rendered in solid cobalt blue.
- **Progress Bars:** Use a thick 8px track. The fill is solid cobalt, and the background track is a 10% opacity version of the same blue. Labels and values are placed directly above the bar.
- **Status Banner:** A full-width, low-height strip at the very top of the interface. Background is a quiet cream, with centered cobalt text and a thin translucent border on the bottom edge.
- **Numerical Callouts:** Large-scale numbers in Space Grotesk Bold, specifically colored in solid cobalt to draw immediate visual attention.