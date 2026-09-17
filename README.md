# bedo

bedo is a calm, self-hostable time-blocking planner for daily schedules, weekly routines, brainstorm notes, and momentum tracking.

## Features

- Day, week, and month planning views
- Editable time blocks with categories and completion states
- Brainstorm room with quick-note capture
- Convert ideas into scheduled blocks
- Saved habit templates for one-tap routines
- Daily notes, completion percentage, and streaks
- Browser reminder support
- Light and dark themes
- Optional lock for private in-app writing
- Optional Google Sheets sync through Apps Script
- Google-only accounts with isolated on-device workspaces
- Personal identity and four color themes
- Revocable, read-only schedule sharing links
- Five-minute start and duration precision

## Self-hosting

This repository serves static files directly; no package build is required. Preview locally with:

```bash
python -m http.server 8765 --directory Bedo-site
```

Upload `Bedo-site` to a static web host, or deploy the repository root with the supplied Vercel rewrites. The Google Sheets connector and setup steps are in `Google-Apps-Script/SETUP.md`.

## Launch configuration

The September redesign uses `Bedo-site/bedo-app.js` and `bedo-app.css` as the visible interface. The legacy minified bundle and enhancement styles remain on disk for reference but are no longer loaded. Authentication and background sync remain in their separate existing scripts.

The planner opens in Calendar view. Choose a day to open its timeline, or use Week for a seven-day overview (a day selector on phones/tablets). Drag a block by its handle with touch or a mouse; only that dated occurrence changes. Explicit daily, weekday, or weekly repeats create four weeks of independent occurrences. Categories are stored per block and editable in Settings. Brainstorm notes can become blocks; Insights use completed blocks for the selected week. Existing block records and storage keys are preserved.

Browser regression coverage is in `tests/redesign.cjs`; it uses Playwright with installed Chrome, a local server on port 8765, and temporary screenshots outside the repository.

1. Create a Google OAuth Web client and add the production site as an authorized JavaScript origin.
2. Paste the client ID into `Bedo-site/auth-config.js`.
3. Deploy `Google-Apps-Script/Code.gs` as a web app and set its `OAUTH_CLIENT_ID` script property to the same client ID.
4. Replace the Apps Script deployment URL in `bedo-auth.js`, `bedo-sync.js`, and `bedo-product.js`.

The landing page currently presents Rp50.000 as a launch target. Payment and purchase-entitlement enforcement are intentionally not enabled until a payment provider and refund policy are selected.
