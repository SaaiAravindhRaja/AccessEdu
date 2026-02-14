# AccessEdu

AccessEdu is an AI-assisted accessibility suite that turns educational content into inclusive study formats for students with visual, hearing, dyslexia, and ADHD needs. The centerpiece, **Access Pack Studio**, converts a single lesson into multiple accessible outputs in seconds.

## Highlights
- **Access Pack Studio**: One input generates screen-reader alt text, lecture summaries, dyslexia-friendly reading, and ADHD focus notes.
- **Live Lecture Captioning**: Speech-to-text capture with structured summaries.
- **Vision Aid**: Detailed image/diagram descriptions optimized for screen readers.
- **Dyslexia Mode**: OpenDyslexic typography, adjustable spacing, and overlays.
- **ADHD Mode**: Chunked summaries with progress tracking.
- **Global Accessibility Settings**: Persistent preferences for contrast, motion, reading speed, and font choices.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API (optional for live mode)
- Web Speech API (browser-native speech recognition)

## Quick Start
```bash
npm install
npm run dev
```
Open `http://localhost:3000` to view the app.

## Live AI vs Demo Mode
All tools work in **Demo Mode** without API keys. To enable live AI, provide an OpenAI API key inside each mode.

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Accessibility Notes
- Keyboard-first navigation and visible focus states
- High-contrast and reduced-motion support
- Adjustable reading speed for text-to-speech

## Project Structure
```
src/
  app/                 # Routes and layout
  components/          # UI and feature components
  lib/                 # AI, speech, and storage utilities
```

## Deployment
Deploy on Vercel or any Next.js-compatible platform. For production AI, configure environment variables or supply keys via UI.

---
Built for The Merge 2026 Hackathon.
