# Activate Google sign-in and private saving

The frontend is ready, but `Blockday-site/auth-config.js` still needs your OAuth **Web client ID**. Never put a client secret in the website.

1. Open [Google's setup guide](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid). Create or select a Google Cloud project, configure Google Auth Platform branding/audience, and create a Web application OAuth client.
2. Add `https://blockday.vercel.app` as an Authorized JavaScript origin. For local testing, add `http://localhost:8765`. This uses the JavaScript callback, not a redirect-based login. While your audience is in Testing, add your own Gmail account as a test user.
3. Send the Web client ID ending in `.apps.googleusercontent.com` so it can be entered in `Blockday-site/auth-config.js` and deployed.
4. In your existing Sheet's Apps Script project, replace the code with this repository's `Google-Apps-Script/Code.gs`.
5. Under Project Settings → Script properties, add `OAUTH_CLIENT_ID` with exactly the same Web client ID. Leave `SESSION_SECRET` alone; the script creates it automatically.
6. Run `setupSheets` and approve access. Deploy → Manage deployments → Edit your existing Web app → New version → Deploy. Keep Execute as **Me** and access **Anyone**. Updating that existing deployment keeps your `/exec` URL unchanged.

## Where records are saved

- Browser local storage: immediate device copy, including offline changes. Clearing site data removes this copy; wait for a confirmed online save or download a backup first.
- The Google Sheet attached to the deployed Apps Script: `Blocks` contains schedules; `Ideas` contains Brainstorm notes; `Settings` contains preferences and tour completion. `DailyNotes`, `Routines`, and `PublicSchedules` support other data. Each private row is keyed by the Google account's stable identity, not a user-entered email.
- This is an **owner-managed Sheet**, located in the deploying owner's Drive. Users get separate app workspaces, not separate Google Sheets in their own Drives. The Sheet owner can read the stored data. Do not share the Sheet itself publicly.

## Verify before launch

1. Sign in using your test Gmail account. The first-sign-in tour should appear; finish or skip it.
2. Add a schedule block and a Brainstorm note. In Settings → Your saved data, wait for “saved online” and a confirmed timestamp.
3. Inspect the attached Sheet: check the `Blocks` and `Ideas` tabs for those records.
4. Sign into the same account in another browser/device: both records should restore before editing is enabled.
5. Sign into another account and verify it cannot see the first account's records.
6. Edit offline: status must say on-device only; reconnect and check that online saving succeeds.
7. Settings → How to use app → Replay app tour should work without creating any records.

Private GET loads and requests without validated authentication are rejected by the updated backend. Redeploy the script before allowing real users to sign in. Failed initial loads do not upload an empty workspace.

The current sync is snapshot-based, not collaborative real-time editing. Avoid editing the same account simultaneously on multiple devices. Device copies replaced during restore can be downloaded from Settings → Your saved data → Download previous device copy.
