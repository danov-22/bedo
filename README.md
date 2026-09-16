# Blockday

Blockday is a calm, self-hostable time-blocking planner for daily schedules, weekly routines, brainstorm notes, and momentum tracking.

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

This app is designed to be exported as static files. Build it with:

```bash
pnpm --filter @workspace/blockday run build
```

Upload `dist/public` to a static web host. The Google Sheets connector and setup steps are in `google-apps-script/SETUP.md`.

## Launch configuration

The September redesign uses `Blockday-site/blockday-app.js` and `blockday-app.css` as the visible interface. The legacy minified bundle and enhancement styles remain on disk for reference but are no longer loaded. Authentication and background sync remain in their separate existing scripts.

The planner opens in Calendar view. Choose a day to open its timeline, or use Week for a seven-day overview (a day selector on phones/tablets). Drag a block by its handle with touch or a mouse; only that dated occurrence changes. Explicit daily, weekday, or weekly repeats create four weeks of independent occurrences. Categories are stored per block and editable in Settings. Brainstorm notes can become blocks; Insights use completed blocks for the selected week. Existing block records and storage keys are preserved.

Browser regression coverage is in `tests/redesign.cjs`; it uses Playwright with installed Chrome, a local server on port 8765, and temporary screenshots outside the repository.

1. Create a Google OAuth Web client and add the production site as an authorized JavaScript origin.
2. Paste the client ID into `Blockday-site/auth-config.js`.
3. Deploy `Google-Apps-Script/Code.gs` as a web app and set its `OAUTH_CLIENT_ID` script property to the same client ID.
4. Replace the Apps Script deployment URL in `blockday-auth.js`, `blockday-sync.js`, and `blockday-product.js`.

The landing page currently presents Rp50.000 as a launch target. Payment and purchase-entitlement enforcement are intentionally not enabled until a payment provider and refund policy are selected.
