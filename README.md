# bedo

bedo is a calm, self-hostable time-blocking planner for schedules, brainstorm notes, and weekly momentum tracking.

## Features

- Day, week, and month planning views
- Editable time blocks with categories and completion states
- Brainstorm room with quick-note capture
- Convert ideas into scheduled blocks
- Independent recurring blocks
- Weekly completion and completed-time insights
- Light and dark themes
- Optional Google Sheets sync through Apps Script
- Google-only accounts with isolated on-device workspaces
- Personal identity and four color themes
- Revocable, read-only schedule sharing links
- Five-minute start and duration precision
- Editable day rundowns to copy or open in WhatsApp
- Replayable mobile-friendly tour and sectioned Settings
- Blinking logo quick input: click first, then swipe the panel header or use tabs/arrow keys to switch Quick note / Add block. Drafts survive switching; hold and drag the floating logo to reposition.
- White surfaces with vivid green, blue, and red accents; stronger gray neutral and matching dark themes

## Self-hosting

This repository serves static files directly; no package build is required. Preview locally with:

```bash
python -m http.server 8765 --directory Bedo-site
```

Upload `Bedo-site` to a static web host, or deploy the repository root with the supplied Vercel rewrites. The Google Sheets connector and setup steps are in `Google-Apps-Script/SETUP.md`.

## Launch configuration

`Bedo-site/` contains the current frontend, original SVG logo, and configuration. Authentication, sync, and storage migration remain separate scripts. Unused legacy bundles, styles, and alternate logos have been removed; they remain recoverable from Git history. `service-worker.js` retires old installations rather than caching private data.

The planner opens in Calendar view. Choose a day to open its timeline, or use Week for a seven-day overview (a day selector on phones/tablets). Drag a block by its handle with touch or a mouse; only that dated occurrence changes. Explicit daily, weekday, or weekly repeats create four weeks of independent occurrences. Categories are stored per block and editable in Settings. Brainstorm notes can become blocks; Insights use completed blocks for the selected week. Existing block records and storage keys are preserved.

Browser regression coverage is in `tests/redesign.cjs`; it uses Playwright with installed Chrome, a local server on port 8765, and temporary screenshots outside the repository.

1. Create a Google OAuth Web client and add the production site as an authorized JavaScript origin.
2. Paste the client ID into `Bedo-site/auth-config.js`.
3. Deploy `Google-Apps-Script/Code.gs` as a web app and set its `OAUTH_CLIENT_ID` script property to the same client ID.
4. Set the Apps Script deployment URL once in `Bedo-site/app-config.js`. A deliberate `bedo-sync-url` device override remains supported for self-hosting.

## File layout

- `Bedo-site/`: deployable frontend; `app-config.js` holds the backend endpoint and `auth-config.js` the Google client ID.
- `Google-Apps-Script/`: backend and deployment instructions.
- `tests/`: regression tests.
- Root `vercel.json`: production routing.

Local browser diagnostic profiles are excluded from new Git additions. Existing tracked profiles have not been deleted or rewritten because they may contain personal browser data. Ignoring does not untrack existing files.

The landing page currently presents Rp50.000 as a launch target. Payment and purchase-entitlement enforcement are intentionally not enabled until a payment provider and refund policy are selected.
