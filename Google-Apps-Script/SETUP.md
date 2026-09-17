# Google sign-in and private saving

Follow [GOOGLE-LOGIN.md](GOOGLE-LOGIN.md) for the current setup, deployment, storage locations, and verification checklist.

The current app uses authenticated, account-separated saving to the owner-managed Sheet attached to the deployed Apps Script. An anonymous user ID or email address is not sufficient authentication. Never expose private records through a GET endpoint or share the Sheet publicly.

Required configuration:

- Website: Google OAuth Web client ID in `Blockday-site/auth-config.js`.
- Apps Script: the same ID in the `OAUTH_CLIENT_ID` script property.
- Backend: redeploy this repository's current `Code.gs` as a new version of the existing Web app.

Schedules are stored in `Blocks`; Brainstorm notes are stored in `Ideas`. Settings shows a confirmed online save time and allows downloading a device backup. Google sign-in does not create a Sheet in each user's own Drive.
