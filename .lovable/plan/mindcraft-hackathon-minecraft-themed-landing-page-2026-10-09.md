# Mindcraft Hackathon — Minecraft-themed landing page

Build a single-page hackathon site inspired by innohacks.live, using your uploaded assets, with the Minecraft wave GIF following the mouse cursor.

## What you'll see

- **Hero**: full-screen voxel BIET campus sunset image as the background, with a dark overlay so text stays readable. Pixel-style title "MINDCRAFT HACKATHON", tagline, date chip, and a "Register" button styled like a Minecraft button.
- **Mouse-following GIF**: the Minecraft "Hello" wave sticker floats and smoothly trails the mouse cursor across the whole page (lerped follow with a slight lag, like the reference site). It flips direction based on movement and stays above content without blocking clicks.
- **Navbar** (matching your screenshot): dark bar, logo + "MINDCRAFT HACKATHON" in pixel font, links: Home, About, Flow, Details, Rules, Prizes, FAQ — smooth-scrolling to page sections, active link highlighted in green.
- **Music player bar** (matching your screenshot): "WORLD: OVERWORLD SUNSET FOREST" label, track number, progress bar, prev/play/music/mute buttons. Plays a chiptune-style loop (generated audio or silent placeholder if no audio file — visual player fully working).
- **Sections**: About, Flow (event timeline), Details, Rules, Prizes, FAQ — all in the dark Minecraft theme with pixel headings and dirt-block/green-accent styling.
- **Footer** with placeholder contact/social links.

## Technical details

- Uploads become CDN assets via lovable-assets (campus PNG, wave GIF); navbar/music-bar screenshots are design references only, not embedded.
- Pixel font (e.g. "Press Start 2P" / VT323) loaded via `<link>` in `__root.tsx`; theme tokens added to `src/styles.css` (dark background, Minecraft green accent) — no hardcoded colors in components.
- Cursor follower: a fixed-position component using `requestAnimationFrame` lerp; `pointer-events: none`; hidden on touch devices.
- Single route `src/routes/index.tsx` with anchor sections; route `head()` gets proper title/description/og tags.
- No backend needed — pure frontend.

## Note on the reference site

innohacks.live renders its backgrounds via JavaScript, so its image files can't be cleanly extracted — but your uploaded campus image covers the hero background, so nothing is missing.
