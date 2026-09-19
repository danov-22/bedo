/**
 * bedo authenticated sessions and explicitly public schedule sharing.
 * See GOOGLE-LOGIN.md for setup. Configure OAUTH_CLIENT_ID and redeploy.
 * Private schedules and notes live in each user's Google Drive app-data folder.
 * This Sheet stores signed sessions and only explicitly published date ranges.
 */

var SHEET_NAMES = ["PublicSchedules"];
var MAX_CELL_LENGTH = 45000;

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "health";
  if (action === "health") {
    return jsonOutput_({
      ok: true,
      app: "bedo",
      message: "bedo sync is ready."
    });
  }
  if (action === "load") {
    return jsonOutput_({ ok: false, error: "Private records require an authenticated POST request." });
  }
  if (action === "public") {
    return jsonOutput_(loadPublicSchedule_(String((e.parameter && e.parameter.token) || "")));
  }
  return jsonOutput_({ ok: false, error: "Unknown action." });
}

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (body.action === "authenticate") {
      return jsonOutput_(createSession_(String(body.credential || "")));
    }
    var userId = resolveUserId_(body);
    if (body.action === "load" || body.action === "save") throw new Error("Private data is stored in the user's Google Drive, not this Sheet.");
    if (body.action === "publish") {
      return jsonOutput_(publishSchedule_(userId, body.data || {}, String(body.token || "")));
    }
    if (body.action === "unpublish") {
      return jsonOutput_(unpublishSchedule_(userId, String(body.token || "")));
    }
    return jsonOutput_({ ok: false, error: "Unknown action." });
  } catch (error) {
    return jsonOutput_({ ok: false, error: String(error.message || error) });
  }
}

/**
 * Publishing and disabling a link require a signed session. The stable Google
 * `sub` claim owns that link, so callers cannot replace another user's share.
 */
function resolveUserId_(body) {
  var clientId = PropertiesService.getScriptProperties().getProperty("OAUTH_CLIENT_ID");
  if (!clientId) throw new Error("Configure OAUTH_CLIENT_ID before using private cloud storage.");
  if (body.session) return validateSession_(String(body.session));
  var credential = String(body.credential || "");
  if (!credential) throw new Error("Sign in with Google before syncing.");
  return "google-" + String(validateGoogleCredential_(credential).sub);
}

function validateGoogleCredential_(credential) {
  var clientId = PropertiesService.getScriptProperties().getProperty("OAUTH_CLIENT_ID");
  if (!clientId) throw new Error("Google login is not configured for this Sheet.");
  var response = UrlFetchApp.fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(credential), {
    muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200) throw new Error("The Google sign-in has expired. Sign in again.");
  var token = JSON.parse(response.getContentText());
  if (String(token.aud) !== String(clientId)) throw new Error("This sign-in was not issued for bedo.");
  if (!token.sub || Number(token.exp || 0) * 1000 <= Date.now()) throw new Error("The Google sign-in has expired.");
  if (String(token.email_verified) !== "true") throw new Error("Use a verified Google account.");
  return token;
}

function createSession_(credential) {
  var token = validateGoogleCredential_(credential);
  var properties = PropertiesService.getScriptProperties();
  var secret = properties.getProperty("SESSION_SECRET");
  if (!secret) {
    secret = Utilities.getUuid() + Utilities.getUuid();
    properties.setProperty("SESSION_SECRET", secret);
  }
  var payload = Utilities.base64EncodeWebSafe(JSON.stringify({
    sub: String(token.sub),
    exp: Date.now() + 180 * 24 * 60 * 60 * 1000
  })).replace(/=+$/, "");
  return { ok: true, session: payload + "." + signSession_(payload, secret), userId: "google-" + String(token.sub) };
}

function validateSession_(session) {
  var parts = session.split(".");
  var secret = PropertiesService.getScriptProperties().getProperty("SESSION_SECRET");
  if (parts.length !== 2 || !secret || signSession_(parts[0], secret) !== parts[1]) throw new Error("Your bedo session is invalid. Sign in again.");
  var payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString());
  if (!payload.sub || Number(payload.exp || 0) <= Date.now()) throw new Error("Your bedo session has expired. Sign in again.");
  return "google-" + String(payload.sub);
}

function signSession_(payload, secret) {
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(payload, secret)).replace(/=+$/, "");
}

function setupSheets() {
  getOrCreateSheets_();
  return jsonOutput_({ ok: true, message: "bedo tabs are ready." });
}

function publishSchedule_(userId, data, requestedToken) {
  var sheet = getOrCreateSheets_().PublicSchedules;
  var token = String(requestedToken || "");
  var values = sheet.getDataRange().getValues(), ownedRow = 0;
  if (token) for (var i = 1; i < values.length; i++) if (String(values[i][0]) === userId && String(values[i][1]) === token) ownedRow = i + 1;
  if (!ownedRow) { deleteUserRows_(sheet, userId, ""); token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, ""); }
  var safeData = { profile: data.profile || {}, blocks: Array.isArray(data.blocks) ? data.blocks : [], from: String(data.from || ""), to: String(data.to || "") };
  var payload = JSON.stringify(safeData);
  if (payload.length > MAX_CELL_LENGTH) throw new Error("This schedule is too large to share. Share fewer notes or blocks.");
  if (ownedRow) sheet.getRange(ownedRow, 1, 1, 4).setValues([[userId, token, payload, new Date().toISOString()]]);
  else sheet.appendRow([userId, token, payload, new Date().toISOString()]);
  return { ok: true, token: token };
}

function loadPublicSchedule_(token) {
  if (!/^[a-f0-9]{64}$/i.test(token)) return { ok: false, error: "This shared link is invalid." };
  var values = getOrCreateSheets_().PublicSchedules.getDataRange().getValues();
  for (var index = 1; index < values.length; index++) {
    if (String(values[index][1]) === token) {
      try { return { ok: true, data: JSON.parse(String(values[index][2])) }; }
      catch (error) { return { ok: false, error: "This shared schedule could not be read." }; }
    }
  }
  return { ok: false, error: "This shared link was disabled or does not exist." };
}

function unpublishSchedule_(userId, token) {
  deleteUserRows_(getOrCreateSheets_().PublicSchedules, userId, token);
  return { ok: true };
}

function deleteUserRows_(sheet, userId, token) {
  var values = sheet.getDataRange().getValues();
  for (var rowIndex = values.length - 1; rowIndex >= 1; rowIndex--) {
    if (String(values[rowIndex][0]) === userId && (!token || String(values[rowIndex][1]) === token)) sheet.deleteRow(rowIndex + 1);
  }
}

function getOrCreateSheets_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = {};
  SHEET_NAMES.forEach(function(name) {
    var sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["userId", "recordId", "payload", "updatedAt"]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }
    sheets[name] = sheet;
  });
  return sheets;
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
