const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH||path.join(process.env.TEMP,'bedo-ui-tests/node_modules/playwright'));
const base=process.env.BEDO_TEST_BASE||'http://localhost:8765';
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const client='local-test.apps.googleusercontent.com',credential='x.'+Buffer.from(JSON.stringify({aud:client,sub:'test-account',email:'test@example.test'})).toString('base64url')+'.x';
  let cloud={blocks:[{id:'cloud-block',title:'Cloud schedule',date:'2026-9-18',start:9,duration:1,category:'Work'}],ideas:[{id:'cloud-note',text:'Cloud brainstorm'}],dailyNotes:[],routines:[],settings:[{id:'preferences',profile:{name:'Cloud user'},theme:'light'}]},driveWrites=0,privateBackendWrites=0;
  await context.route('**/auth-config.js',r=>r.fulfill({contentType:'application/javascript',body:`window.BEDO_GOOGLE_CLIENT_ID=${JSON.stringify(client)};`}));
  await context.route('https://accounts.google.com/gsi/client',r=>r.fulfill({contentType:'application/javascript',body:`window.google={accounts:{id:{initialize(c){this.callback=c.callback},renderButton(el){const b=document.createElement('button');b.textContent='Test Google login';b.onclick=()=>this.callback({credential:${JSON.stringify(credential)}});el.append(b)},disableAutoSelect(){}},oauth2:{initTokenClient(c){return{requestAccessToken(){c.callback({access_token:'drive-token',expires_in:3600})}}},revoke(){}}}};`}));
  await context.route('https://script.google.com/**',async r=>{const body=r.request().postDataJSON();if(['load','save'].includes(body.action))privateBackendWrites++;const result=body.action==='authenticate'?{ok:true,session:'test-session'}:body.action==='publish'?{ok:true,token:body.token||'a'.repeat(64)}:{ok:true};await r.fulfill({contentType:'application/json',body:JSON.stringify(result)});});
  await context.route('https://www.googleapis.com/drive/v3/files?**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({files:[{id:'drive-file',name:'bedo-data.json'}]})}));
  await context.route('https://www.googleapis.com/drive/v3/files/drive-file?alt=media',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(cloud)}));
  await context.route('https://www.googleapis.com/upload/drive/v3/files/drive-file?uploadType=media',async r=>{driveWrites++;cloud=r.request().postDataJSON();await r.fulfill({contentType:'application/json',body:'{}'});});
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});await page.getByText('Test Google login',{exact:true}).click();await page.waitForURL('**/?app=1');
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('bedo-ideas')||'[]')[0]?.id==='cloud-note');
  assert.equal(privateBackendWrites,0,'private schedules never go to the app owner backend');
  await page.locator('[data-action=tour-skip]').click();
  await page.locator('#bd-fab').click();await page.locator('[name=text]').fill('Saved in my Drive');await page.locator('#bd-note-form .bd-primary').click();
  await page.waitForFunction(()=>window.BedoSync.getStatus().state==='saved');
  assert(driveWrites>0);assert(cloud.ideas.some(n=>n.text==='Saved in my Drive'));
  await page.locator('[data-page=settings]:visible').click();await page.locator('[data-settings-section=account]').click();
  assert(await page.locator('#bd-saving-card').isVisible(),'saved data is merged into Account');
  assert((await page.locator('#bd-save-status').textContent()).includes('Google Drive'));
  assert.deepEqual(errors,[]);
  await context.close();
  const localContext=await browser.newContext(),local=await localContext.newPage();
  await localContext.route('**/auth-config.js',r=>r.fulfill({contentType:'application/javascript',body:'window.BEDO_GOOGLE_CLIENT_ID="";'}));
  await local.goto(base+'/?app=1',{waitUntil:'domcontentloaded'});await local.evaluate(()=>{localStorage.setItem('bedo-auth-user',JSON.stringify({sub:'local'}));localStorage.setItem('bedo-auth-session','session');localStorage.setItem('bedo-blocks',JSON.stringify([{id:'keep-private'}]));});await local.reload({waitUntil:'domcontentloaded'});
  await local.locator('.bd-month').first().waitFor();assert.equal(await local.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks'))[0].id),'keep-private');
  await localContext.close();console.log('PASS user-owned Drive restore/save, no private backend writes, merged Account data and fast local fallback');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
