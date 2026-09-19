const assert=require('node:assert/strict');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH);
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),page=await context.newPage(),scopes=[];
 const base=process.env.BEDO_TEST_BASE||'http://localhost:8766',start=new Date(Date.now()+86400000);start.setHours(10,30,0,0);const end=new Date(start.getTime()+5400000);
 await context.route('**/auth-config.js',r=>r.fulfill({contentType:'application/javascript',body:'window.BEDO_GOOGLE_CLIENT_ID="calendar-test.apps.googleusercontent.com";'}));
 await context.route('https://accounts.google.com/gsi/client',r=>r.fulfill({contentType:'application/javascript',body:'window.google={accounts:{id:{initialize(){},renderButton(){},disableAutoSelect(){}},oauth2:{initTokenClient(c){return{requestAccessToken(){window.requestedScope=c.scope;c.callback({access_token:c.scope.includes("calendar")?"calendar-token":"drive-token",expires_in:3600})}}},revoke(){}}}};'}));
 await context.route('https://www.googleapis.com/calendar/v3/calendars/primary/events?**',async r=>{assert.equal(r.request().headers().authorization,'Bearer calendar-token');scopes.push('calendar');await r.fulfill({contentType:'application/json',body:JSON.stringify({items:[{id:'meeting-1',summary:'Existing meeting',start:{dateTime:start.toISOString()},end:{dateTime:end.toISOString()}},{id:'all-day',summary:'Holiday',start:{date:start.toISOString().slice(0,10)},end:{date:end.toISOString().slice(0,10)}}]})});});
 await context.route('https://www.googleapis.com/drive/v3/files?**',r=>r.fulfill({contentType:'application/json',body:'{"files":[]}'}));
 await page.goto(base+'/?app=1',{waitUntil:'domcontentloaded'});await page.evaluate(()=>{localStorage.setItem('bedo-auth-user',JSON.stringify({sub:'calendar-user'}));localStorage.setItem('bedo-auth-session','session');localStorage.setItem('bedo-tour-state',JSON.stringify({completed:true}));});await page.reload({waitUntil:'domcontentloaded'});
 await page.getByRole('heading',{name:'Bring your existing schedule?'}).waitFor();assert.equal(await page.getByRole('button',{name:'Start fresh'}).count(),1);
 await page.getByRole('button',{name:'Use my Google Calendar'}).click();await page.waitForFunction(()=>localStorage.getItem('bedo-calendar-choice')==='import');
 const imported=await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')).filter(block=>block.source==='google-calendar'));
 assert.equal(imported.length,1);assert.equal(imported[0].title,'Existing meeting');assert.equal(imported[0].category,'Google Calendar');assert.equal(imported[0].duration,1.5);assert.equal(scopes.length,1);
 await browser.close();console.log('PASS optional read-only Google Calendar import, fresh-start choice, timed event mapping and all-day skip');
})().catch(error=>{console.error(error);process.exit(1)});
