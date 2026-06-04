# Topix Marketing Site Plan

## Goal

Build a Vite React marketing site for Topix, a notes app centered on sorting notes into user-defined topics through a satisfying rolodex interface. The first viewport should communicate the product visually: a dark, glowing, animated topic rolodex inspired by the supplied app screenshot and the Apple timer picker UI.

## Core Direction

- Use Vite + React for the site.
- Make the hero the primary experience, not a generic landing page.
- Use the line `Topix is a place for` followed by animated text that updates from the active rolodex item.
- Use the example topics from the screenshot:
  - `Film Ideas`
  - `Code Projects`
  - `Cool Tech`
  - `Film Watchlist`
- Include a primary CTA for GitHub releases/downloads.
- Keep the visual style close to the app: black background, red glow, topic-colored accent dots, soft dividers, large serif-like active topic text, dimmed surrounding items, and a vertical rolodex feel.

## Visual And Interaction Plan

### Hero Layout

- Full first viewport with a dark app-like background.
- Center or slightly upper-center Topix logo/wordmark treatment.
- Large headline:
  - Static text: `Topix is a place for`
  - Dynamic text: the currently active rolodex topic.
- The rolodex animation should be the main visual element, occupying enough space to feel like the product interface.
- Ensure the next section is slightly visible below the hero on common desktop and mobile viewports.

### Rolodex Animation

- Build a vertical rotating list that resembles an Apple timer selector:
  - One active center row.
  - Dimmed rows above and below.
  - Horizontal guide lines around the active row.
  - Perspective/scale/opacity changes for depth.
- The active topic controls:
  - The dynamic headline completion.
  - The glow color.
  - The active accent dot color.
- Use a smooth looping animation, with optional hover or focus pause.
- Respect `prefers-reduced-motion` by reducing or disabling continuous movement.

### Topic Color Mapping

- `Film Ideas`: purple accent.
- `Code Projects`: red accent.
- `Cool Tech`: green accent.
- `Film Watchlist`: muted rose/purple accent.

The hero background glow should blend the active topic color into a red-black base, matching the screenshot while still changing per topic.

## Page Sections

### 1. Hero

- Animated rolodex.
- Dynamic headline.
- GitHub releases/download CTA.
- Secondary lightweight link if useful, such as `View releases`.

### 2. Product Value

- Concise section explaining the core behavior:
  - Capture notes quickly.
  - Sort them into user-defined topics.
  - Move through categories with a tactile rolodex interface.
- Use restrained layout, not card-heavy marketing filler.

### 3. Interface Highlights

- Show three focused feature blocks:
  - Topic-first organization.
  - Color-reactive glow.
  - Fast note capture and review.

### 4. Download Section

- Repeat the GitHub releases/download CTA.
- Keep the copy release-friendly so the link can point to GitHub Releases when available.

## Implementation Steps

1. Scaffold a Vite React app in the current empty workspace.
2. Add app structure and styles:
   - `src/App.jsx`
   - `src/main.jsx`
   - `src/styles.css`
3. Build a reusable `RolodexHero` component or keep it scoped in `App.jsx` if the site stays small.
4. Implement CSS-driven rolodex animation with React state tracking the active topic.
5. Add responsive desktop and mobile layouts.
6. Add accessible controls and motion preferences:
   - CTA links with clear labels.
   - Meaningful heading structure.
   - `prefers-reduced-motion` support.
7. Run install/build checks.
8. Start the local dev server and provide the preview URL.

## Open Details To Fill During Build

- Final GitHub releases/download URL.
- Whether the Topix logo should be recreated from the screenshot as a simple text mark or replaced with an official asset later.
- Whether the site should use a custom font or system fonts only for the first version.

