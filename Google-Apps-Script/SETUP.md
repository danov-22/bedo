# Google sign-in, private Drive saving, and public sharing

Follow [GOOGLE-LOGIN.md](GOOGLE-LOGIN.md) for the complete setup and verification checklist.

BEDO keeps schedules, Brainstorm notes, preferences, and tour state in each signed-in user's hidden Google Drive `appDataFolder`. The browser also keeps an immediate device copy for speed and offline use. Apps Script stores signed sessions and only schedule ranges a user deliberately publishes.

Required configuration:

- Website: Google OAuth Web client ID in `Bedo-site/auth-config.js`.
- Google Cloud: enable Google Drive API and add `https://www.googleapis.com/auth/drive.appdata` to the OAuth consent configuration.
- Apps Script: place the same client ID in the `OAUTH_CLIENT_ID` script property.
- Backend: deploy the current `Code.gs` as a new version of the existing Web app.

The private Drive file is `bedo-data.json`. It is app-owned data and is not shown among normal Drive files. Apps Script rejects private workspace `load` and `save` actions.
