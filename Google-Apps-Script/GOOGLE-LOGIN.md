# Activate Google sign-in and private saving

The frontend reads your OAuth **Web client ID** from `Bedo-site/auth-config.js`. Never put a client secret in the website.

1. Create or select a Google Cloud project, configure Google Auth Platform branding/audience, and create a Web application OAuth client.
2. Add `https://b-do.vercel.app` as an Authorized JavaScript origin. For local testing, add `http://localhost:8765`. While the app is in Testing, add your Gmail account as a test user.
3. Enable the **Google Drive API** and **Google Calendar API**. Add `https://www.googleapis.com/auth/drive.appdata` and `https://www.googleapis.com/auth/calendar.readonly` to the OAuth consent configuration. Calendar access is requested separately and only if a user chooses to import existing events.
4. Put the Web client ID ending in `.apps.googleusercontent.com` in `Bedo-site/auth-config.js`.
5. In the existing Sheet's Apps Script project, replace the code with this repository's `Google-Apps-Script/Code.gs`.
6. Under Project Settings > Script properties, set `OAUTH_CLIENT_ID` to the same Web client ID. Leave `SESSION_SECRET` alone; the script creates it automatically.
7. Run `setupSheets` and approve access. Use Deploy > Manage deployments > Edit > New version > Deploy. Keep Execute as **Me** and access **Anyone**. Updating the existing deployment preserves its `/exec` URL.

## Where records are saved

- Browser local storage: immediate device copy and offline changes.
- User's Google Drive `appDataFolder`: private `bedo-data.json` with schedules, notes, preferences, and tour state.
- Apps Script Sheet: signed sessions and deliberately published read-only schedule ranges only.

## Verify before launch

1. Sign in with a test Gmail account and complete or skip the tour.
2. In Settings > Your account & data, select **Connect private Google Drive** and approve the app-data permission.
3. Add a schedule block and Brainstorm note, then wait for “Saved online.”
4. Sign in to the same account in another browser and confirm both records restore.
5. Sign in to another account and confirm it cannot see the first account's records.
6. Publish a chosen date range, open its link privately, and verify only those dates appear. Edit a shared block and confirm the public view refreshes.
7. Test offline edits, reconnect, and confirm saving resumes.

The sync is snapshot-based, not collaborative editing. Avoid editing the same account simultaneously on multiple devices. Device backups remain available in Your account & data.
