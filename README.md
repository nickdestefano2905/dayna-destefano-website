# Dayna DeStefano — Personal Website

**Version:** 0.2.0

A personal website for Dayna DeStefano — business builder, strategist, and operator.

## Project Structure

```
.
├── index.html              # Single-file website (all styles inline)
├── email-template.html     # EmailJS email template (HTML for Gmail notifications)
├── brand_assets/
│   └── logo.svg            # Brand logo
├── serve.mjs               # Local dev server (localhost:3000)
├── screenshot.mjs          # Puppeteer screenshot tool for visual QA
├── CLAUDE.md               # Claude Code instructions and design rules
├── package.json            # Dependencies (Puppeteer)
└── temporary screenshots/  # Auto-generated screenshots (git-ignored)
```

## Getting Started

```bash
npm install
node serve.mjs
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Built with Claude Code

This project uses [Claude Code](https://claude.com/claude-code) as a development partner. The `CLAUDE.md` file provides Claude with project-specific instructions including:

- **Reference-matching workflow** — When given a design reference, Claude matches layout, spacing, typography, and color exactly, then iterates using screenshots to verify accuracy.
- **Screenshot-based QA** — `screenshot.mjs` captures full-page screenshots via Puppeteer. Claude reads the screenshots directly and compares them against reference designs, calling out specific mismatches (e.g. "heading is 32px but reference shows ~24px").
- **Brand-aware design** — Claude checks `brand_assets/` for logos, color palettes, and style guides before designing, ensuring consistency.
- **Anti-generic guardrails** — Rules that prevent default/generic output: custom color palettes, layered shadows, paired typography, proper interactive states, and intentional spacing.

## Screenshots

To take a screenshot of the running site:

```bash
node screenshot.mjs http://localhost:3000
```

Screenshots save to `./temporary screenshots/screenshot-N.png` with auto-incrementing filenames. Add an optional label:

```bash
node screenshot.mjs http://localhost:3000 homepage
# → screenshot-N-homepage.png
```

## Contact Form

The contact form at the bottom of the site sends submissions to Gmail via [EmailJS](https://www.emailjs.com/). The email is formatted using a branded HTML template (`email-template.html`).

Form fields: Name, Email, What Are You Working On, and Message.

## Tech Stack

- Vanilla HTML/CSS (single file, all styles inline)
- Google Fonts (Roboto)
- EmailJS (contact form → Gmail)
- Node.js dev server (zero dependencies)
- Puppeteer (screenshot QA)
