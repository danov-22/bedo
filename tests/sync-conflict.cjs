const assert=require('node:assert/strict');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH);
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage(),base=process.env.BEDO_TEST_BASE||'http://localhost:8766';
 let cloud={blocks:[{id:'remote',title:'Phone block',date:'2026-9-21',start:10,duration:1}],ideas:[],dailyNotes:[],routines:[],templates:[],settings:[],updatedAt:'2026-09-21T01:00:00.000Z',savedAt:'2026-09-21T01:00:00.000Z'},writes=0;
 await context.route('**/auth-config.js',route=>route.fulfill({contentType:'application/javascript',body:'window.BEDO_GOOGLE_CLIENT_ID="test.apps.googleusercontent.com";'}));
 await context.route('https://accounts.google.com/gsi/client',route=>route.fulfill({contentType:'application/javascript',body:'window.google={accounts:{oauth2:{initTokenClient(c){return{requestAccessToken(){c.callback({access_token:"token",expires_in:3600})}}}},id:{},revoke(){}}};'}));
 await context.route('https://www.googleapis.com/drive/v3/files?**',route=>route.fulfill({contentType:'application/json',body:'{"files":[{"id":"file"}]}'}));
 await context.route('https://www.googleapis.com/drive/v3/files/file?alt=media',route=>route.fulfill({contentType:'application/json',body:JSON.stringify(cloud)}));
 await context.route('https://www.googleapis.com/upload/drive/v3/files/file?uploadType=media',async route=>{writes++;cloud=route.request().postDataJSON();await route.fulfill({contentType:'application/json',body:'{}'});});
 await page.addInitScript(()=>{localStorage.setItem('bedo-auth-user',JSON.stringify({sub:'sync-user',email:'sync@example.test'}));localStorage.setItem('bedo-auth-session','session');localStorage.setItem('bedo-calendar-choice','fresh');localStorage.setItem('bedo-tour-state',JSON.stringify({completed:true}));localStorage.setItem('bedo-blocks',JSON.stringify([{id:'local',title:'Desktop block',date:'2026-9-21',start:9,duration:1}]));localStorage.setItem('bedo-ideas','[]');localStorage.setItem('bedo-local-updated-at','2026-09-21T02:00:00.000Z');localStorage.setItem('bedo-sync-pending','true');});
 await page.goto(base+'/?app=1',{waitUntil:'domcontentloaded'});await page.evaluate(()=>window.BedoSync.connect());await page.waitForFunction(()=>window.BedoSync?.getStatus().state==='saved');
 assert(writes>0);assert.deepEqual(new Set(cloud.blocks.map(block=>block.id)),new Set(['local','remote']),'pending desktop and online phone records are merged before upload');
 cloud={...cloud,blocks:[...cloud.blocks,{id:'new-phone',title:'New phone block',date:'2026-9-21',start:12,duration:1}],updatedAt:'2099-01-01T00:00:00.000Z',savedAt:'2099-01-01T00:00:00.000Z'};await page.evaluate(()=>window.BedoSync.refresh());await page.waitForFunction(()=>JSON.parse(localStorage.getItem('bedo-blocks')).some(block=>block.id==='new-phone'));
 await browser.close();console.log('PASS conflict-safe newest-data merge and immediate remote refresh');
})().catch(error=>{console.error(error);process.exit(1)});
