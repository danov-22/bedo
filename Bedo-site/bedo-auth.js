(function () {
  "use strict";
  const clientId = String(window.BEDO_GOOGLE_CLIENT_ID || "").trim();
  const credentialKey = "bedo-auth-credential";
  const userKey = "bedo-auth-user";
  const sessionKey = "bedo-auth-session";
  const privateKeys = ["bedo-blocks", "bedo-ideas", "bedo-daily-notes", "bedo-routines", "bedo-block-templates", "bedo-profile", "bedo-share", "bedo-theme", "bedo-tour-state", "bedo-last-sync", "bedo-sync-pending"];
  const demoKeys = privateKeys.concat(["bedo-theme", "bedo-reminders", "bedo-locked", "bedo-calendar-hours", "bedo-appscript", "bedo-sync-pending"]);
  const demoBackupKey = "bedo-demo-backup";
  const defaultApiUrl = window.BEDO_API_URL;
  const driveScope = "https://www.googleapis.com/auth/drive.appdata";
  let driveToken = null, driveTokenExpires = 0, driveRequest = null, calendarToken = null, calendarTokenExpires = 0, calendarRequest = null;
  function requestDriveAccess(interactive) {
    if (driveToken && Date.now() < driveTokenExpires - 60000) return Promise.resolve(driveToken);
    if (driveRequest) return driveRequest;
    driveRequest = new Promise((resolve, reject) => {
      const started=Date.now(),begin=()=>{
      if (!window.google?.accounts?.oauth2) { if(Date.now()-started<5000){setTimeout(begin,100);return;} driveRequest=null;reject(new Error("Google Drive authorization could not load."));return; }
      const client = google.accounts.oauth2.initTokenClient({ client_id: clientId, scope: driveScope, callback: response => {
        driveRequest = null;
        if (response.error || !response.access_token) { reject(new Error(response.error_description || "Google Drive access was not granted.")); return; }
        driveToken = response.access_token; driveTokenExpires = Date.now() + Number(response.expires_in || 3600) * 1000; resolve(driveToken);
      }, error_callback: () => { driveRequest = null; reject(new Error("Google Drive authorization was cancelled.")); } });
      client.requestAccessToken({ prompt: interactive ? "consent" : "" });
      };begin();
    });
    return driveRequest;
  }
  function requestCalendarAccess() {
    if (calendarToken && Date.now() < calendarTokenExpires - 60000) return Promise.resolve(calendarToken);
    if (calendarRequest) return calendarRequest;
    calendarRequest = new Promise((resolve,reject)=>{
      if(!window.google?.accounts?.oauth2){calendarRequest=null;reject(new Error('Google Calendar authorization could not load.'));return;}
      const client=google.accounts.oauth2.initTokenClient({client_id:clientId,scope:'https://www.googleapis.com/auth/calendar.readonly',callback:response=>{calendarRequest=null;if(response.error||!response.access_token){reject(new Error(response.error_description||'Google Calendar access was not granted.'));return;}calendarToken=response.access_token;calendarTokenExpires=Date.now()+Number(response.expires_in||3600)*1000;resolve(calendarToken);},error_callback:()=>{calendarRequest=null;reject(new Error('Google Calendar authorization was cancelled.'));}});
      client.requestAccessToken({prompt:'consent'});
    });
    return calendarRequest;
  }

  function decodeCredential(credential) {
    const payload = credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(atob(payload).split("").map(char => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)).join("")));
  }
  function currentUser() {
    try {
      const user = JSON.parse(localStorage.getItem(userKey) || "null");
      if (user?.sub) return user;
    } catch (_) {}
    localStorage.removeItem(credentialKey);
    localStorage.removeItem(userKey);
    return null;
  }
  function switchWorkspace(nextSub) {
    const previous = currentUser();
    const snapshot = {}; privateKeys.forEach(key => { const value = localStorage.getItem(key); if (value !== null) snapshot[key] = value; });
    if (previous?.sub) privateKeys.forEach(key => { if (snapshot[key] !== undefined) localStorage.setItem("bedo-user-" + previous.sub + "-" + key, snapshot[key]); });
    privateKeys.forEach(key => localStorage.removeItem(key));
    if (nextSub) {
      const hasSavedWorkspace = privateKeys.some(key => localStorage.getItem("bedo-user-" + nextSub + "-" + key) !== null);
      privateKeys.forEach(key => { const value = localStorage.getItem("bedo-user-" + nextSub + "-" + key); if (value !== null) localStorage.setItem(key, value); else if (!previous?.sub && !hasSavedWorkspace && snapshot[key] !== undefined && !["bedo-tour-state", "bedo-last-sync", "bedo-sync-pending"].includes(key)) localStorage.setItem(key, snapshot[key]); });
    }
  }
  function restoreDemo() {
    const raw = localStorage.getItem(demoBackupKey);
    if (!raw) return;
    let backup = {}; try { backup = JSON.parse(raw); } catch (_) {}
    demoKeys.forEach(key => localStorage.removeItem(key));
    Object.keys(backup).forEach(key => localStorage.setItem(key, backup[key]));
    localStorage.removeItem(demoBackupKey);
    localStorage.removeItem("bedo-demo-seed-version");
    localStorage.removeItem("bedo-demo-anchor-date");
  }
  function refreshDemo() {
    if (!localStorage.getItem(demoBackupKey)) return false;
    let samples; try { samples = JSON.parse(localStorage.getItem("bedo-blocks") || "[]"); } catch (_) { return false; }
    if (!Array.isArray(samples)) return false;
    const now = new Date(), today = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-");
    const anchor = localStorage.getItem("bedo-demo-anchor-date") || samples.find(b => b.id === "demo-1")?.date || today;
    const parts = String(anchor).split("-").map(Number);
    const delta = Math.round((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(parts[0], parts[1] - 1, parts[2])) / 86400000);
    if (Number.isFinite(delta) && delta !== 0) {
      samples = samples.map(block => {
        const [year, month, day] = String(block.date).split("-").map(Number), date = new Date(year, month - 1, day, 12);
        if (!Number.isFinite(date.getTime())) return block;
        date.setDate(date.getDate() + delta);
        return { ...block, date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-") };
      });
      localStorage.setItem("bedo-blocks", JSON.stringify(samples));
    }
    localStorage.setItem("bedo-demo-anchor-date", today);
    return Number.isFinite(delta) && delta !== 0;
  }
  function prepareDemo() {
    if (localStorage.getItem(demoBackupKey) && ["2", "3"].includes(localStorage.getItem("bedo-demo-seed-version"))) {
      refreshDemo();
      localStorage.setItem("bedo-demo-seed-version", "3");
      return;
    }
    if (!localStorage.getItem(demoBackupKey)) {
      const backup = {}; demoKeys.forEach(key => { const value = localStorage.getItem(key); if (value !== null) backup[key] = value; });
      localStorage.setItem(demoBackupKey, JSON.stringify(backup));
      demoKeys.forEach(key => localStorage.removeItem(key));
    }
    const now = new Date(), key = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-");
    const samples = [
      { id: "demo-1", title: "Deep work", category: "Work", start: 9 + 10 / 60, duration: 1.25, date: key, color: "green", completed: false },
      { id: "demo-2", title: "Walk + reset", category: "Wellness", start: 11 + 35 / 60, duration: .5, date: key, color: "gold", completed: true },
      { id: "demo-3", title: "Build the next thing", category: "Personal", start: 13.25, duration: 1 + 25 / 60, date: key, color: "blue", completed: false },
      { id: "demo-4", title: "Morning stretch", category: "Wellness", start: 7.5, duration: .5, date: key, completed: true },
      { id: "demo-5", title: "Team check-in", category: "Work", start: 10.75, duration: .5, date: key, completed: false },
      { id: "demo-6", title: "Lunch away from the screen", category: "Personal", start: 12.25, duration: .75, date: key, completed: false },
      { id: "demo-7", title: "Learn something new", category: "Study", start: 15, duration: .75, date: key, completed: false },
      { id: "demo-8", title: "Dinner + unwind", category: "Personal", start: 18, duration: 1, date: key, completed: false }
    ];
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    for (let offset = -7; offset < 14; offset++) {
      const day = new Date(monday); day.setDate(day.getDate() + offset);
      const date = [day.getFullYear(), day.getMonth() + 1, day.getDate()].join("-");
      if (date === key) continue;
      const weekend = day.getDay() === 0 || day.getDay() === 6;
      const plan = weekend
        ? [["Slow morning + coffee", "Personal", 8.5, 1], ["A walk outdoors", "Wellness", 10, 1], ["Creative time", "Personal", 13, 1.5], ["Read a chapter", "Study", 16, .5]]
        : [["Morning stretch", "Wellness", 7.5, .5], ["Focused project time", "Work", 9, 1.5], ["Lunch + reset", "Personal", 12, 1], ["Project follow-up", "Work", 13.5, 1], ["Learning hour", "Study", 15, .75], ["Evening walk", "Wellness", 17.5, .5]];
      plan.forEach(([title, category, start, duration], index) => samples.push({ id: `demo-week-${offset}-${index}`, title, category, start, duration, date, completed: day < new Date(now.getFullYear(), now.getMonth(), now.getDate()) && (index !== 3 || offset % 3 === 0) }));
    }
    localStorage.setItem("bedo-blocks", JSON.stringify(samples));
    localStorage.setItem("bedo-demo-seed-version", "3");
    localStorage.setItem("bedo-demo-anchor-date", key);
    localStorage.setItem("bedo-profile", JSON.stringify({ name: "Jamie", title: "Jamie’s bedo", theme: "ocean" }));
    localStorage.setItem("bedo-ideas", JSON.stringify([{ id: "demo-note-1", text: "A little idea for the weekend: take the camera out, find a new walking route, and make time for something creative.", created: new Date().toISOString() }]));
    localStorage.setItem("bedo-calendar-hours", JSON.stringify({ start: 7, end: 18 }));
    localStorage.setItem("bedo-appscript", "false");
  }
  function enterDemo() {
    prepareDemo();
    location.href = "/?demo=1";
  }
  window.BedoDemo = { enter: enterDemo, refresh: refreshDemo, exit: function () { restoreDemo(); location.href = currentUser() ? "/?app=1" : "/"; } };
  function loginScreen(configured) {
    if (document.getElementById("bedo-login")) return;
    const screen = document.createElement("main");
    screen.id = "bedo-login";
    screen.className = "login-screen";
    screen.innerHTML = '<section><div id="bedo-google-button"></div><p class="login-note"></p><p class="bd-auth-legal">By continuing, you agree to the <a href="/terms.html">Terms</a> and acknowledge the <a href="/privacy.html">Privacy Policy</a>.</p></section>';
    document.body.appendChild(screen);
    if (!configured) {
      screen.querySelector(".login-note").textContent = "Google sign-in is not available yet. Explore the demo without an account.";
      screen.querySelector("#bedo-google-button").innerHTML = '<button class="button primary" type="button" data-google-not-ready>Sign in / Register with Google</button>';
      screen.querySelector("[data-google-not-ready]").addEventListener("click", () => { screen.querySelector(".login-note").textContent = "We’re preparing Google sign-in. In the meantime, the demo is yours to explore."; });
    }
  }
  async function handleCredential(response) {
    try {
      const user = decodeCredential(response.credential);
      if (user.aud !== clientId || !user.sub) throw new Error("The Google account response was not issued for bedo.");
      const apiUrl = localStorage.getItem("bedo-sync-url") || defaultApiUrl;
      const authResponse = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "authenticate", credential: response.credential }), redirect: "follow" });
      const result = await authResponse.json();
      if (!result.ok || !result.session) throw new Error(result.error || "bedo could not create a secure session.");
      switchWorkspace(user.sub);
      localStorage.setItem(credentialKey, response.credential);
      localStorage.setItem(userKey, JSON.stringify(user));
      localStorage.setItem(sessionKey, result.session);
      localStorage.setItem("bedo-welcome-complete", "true");
      location.replace("/?app=1");
    } catch (error) {
      const note = document.querySelector(".login-note");
      if (note) note.textContent = error.message;
    }
  }
  function renderGoogleButton() {
    if (!window.google?.accounts?.id) return setTimeout(renderGoogleButton, 100);
    google.accounts.id.initialize({ client_id: clientId, callback: handleCredential, auto_select: false });
    google.accounts.id.renderButton(document.getElementById("bedo-google-button"), { theme: "outline", size: "large", shape: "pill", text: "continue_with", width: 280 });
  }
  function mountAccount(user) {
    if (!user || document.getElementById("bedo-account")) return;
    const actions = document.querySelector(".top-actions");
    if (!actions) return;
    const button = document.createElement("button");
    button.id = "bedo-account";
    button.className = "account-button";
    button.title = user.email || "Google account";
    button.innerHTML = user.picture ? '<img alt="" src="' + user.picture.replace(/"/g, "") + '">' : (user.name || "U").slice(0, 1);
    button.addEventListener("click", () => {
      signOut();
    });
    actions.prepend(button);
  }
  function signOut() {
    if (!confirm("Sign out of bedo on this device? Your local data will remain here.")) return;
    switchWorkspace(""); window.google?.accounts?.id?.disableAutoSelect(); if (driveToken) window.google?.accounts?.oauth2?.revoke(driveToken); driveToken=null;
    localStorage.removeItem(credentialKey); localStorage.removeItem(userKey); localStorage.removeItem(sessionKey); localStorage.removeItem("bedo-welcome-complete"); location.href = "/";
  }
  function switchAccount() {
    switchWorkspace(""); window.google?.accounts?.id?.disableAutoSelect(); if (driveToken) window.google?.accounts?.oauth2?.revoke(driveToken); driveToken=null;
    localStorage.removeItem(credentialKey); localStorage.removeItem(userKey); localStorage.removeItem(sessionKey); localStorage.removeItem("bedo-welcome-complete"); location.href = "/login";
  }
  window.BedoAuth = { signOut, switchAccount, currentUser, requestDriveAccess, requestCalendarAccess, hasDriveAccess:()=>Boolean(driveToken&&Date.now()<driveTokenExpires-60000) };
  const params = new URLSearchParams(location.search);
  if (params.has("demo")) prepareDemo();
  if (!params.has("demo") && localStorage.getItem(demoBackupKey)) restoreDemo();
  const user = currentUser();
  const publicLanding = !params.has("share") && !params.has("app") && !params.has("demo");
  if (user && (publicLanding || location.pathname === "/login")) { location.replace("/?app=1"); return; }
  if (!params.has("share") && (location.pathname === "/login" || publicLanding || (!user && !params.has("demo")))) {
    loginScreen(Boolean(clientId));
    if (user && location.pathname !== "/login") {
      document.getElementById("bedo-google-button").innerHTML = '<a class="button primary" href="/?app=1">Open my bedo</a>';
      document.querySelector(".login-note").textContent = "Signed in as " + (user.email || user.name || "your Google account") + ".";
    } else if (!user && clientId && location.pathname === "/login") renderGoogleButton();
  }
  if (user) {
    new MutationObserver(() => mountAccount(user)).observe(document.documentElement, { childList: true, subtree: true });
    mountAccount(user);
  }
})();
