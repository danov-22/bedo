const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH || path.join(process.env.TEMP,'bedo-ui-tests/node_modules/playwright'));
const base=process.env.BEDO_TEST_BASE||'http://localhost:8765';
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const client='local-test.apps.googleusercontent.com',credential='x.'+Buffer.from(JSON.stringify({aud:client,sub:'test-account',email:'test@example.test'})).toString('base64url')+'.x';
  let cloud={blocks:[{id:'cloud-block',title:'Cloud schedule',date:'2026-9-18',start:9,duration:1}],ideas:[{id:'cloud-note',text:'Cloud brainstorm'}],settings:[{id:'preferences',profile:{name:'Cloud user'},theme:'light'}],savedAt:'2026-09-18T01:00:00Z'},failSave=false,saves=0;
  await context.route('**/auth-config.js',r=>r.fulfill({contentType:'application/javascript',body:`window.BEDO_GOOGLE_CLIENT_ID=${JSON.stringify(client)};`}));
  await context.route('https://accounts.google.com/gsi/client',r=>r.fulfill({contentType:'application/javascript',body:`window.google={accounts:{id:{initialize(c){this.callback=c.callback},renderButton(el){const b=document.createElement('button');b.textContent='Test Google login';b.onclick=()=>this.callback({credential:${JSON.stringify(credential)}});el.append(b)},disableAutoSelect(){}}}};`}));
  await context.route('https://script.google.com/**',async r=>{
   const body=r.request().postDataJSON();let result;
   if(body.action==='authenticate')result={ok:true,session:'test-session',userId:'google-test-account'};
   else {assert.equal(body.session,'test-session');if(body.action==='load')result={ok:true,...cloud};else if(body.action==='save'){saves++;if(failSave)result={ok:false,error:'Test save unavailable'};else {cloud={...body.data,savedAt:new Date().toISOString()};result={ok:true,savedAt:cloud.savedAt};}}else throw Error('Unexpected action');}
   await r.fulfill({contentType:'application/json',body:JSON.stringify(result)});
  });
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.getByText('Test Google login',{exact:true}).click();
  await page.waitForURL('**/?app=1');await page.locator('#bd-tour-title').waitFor();
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-ideas'))[0].id),'cloud-note','Google login restores notes before first tour');
  assert.equal(saves,0,'existing cloud is not overwritten at startup');
  await page.locator('[data-action=tour-next]').click();await page.locator('[data-action=tour-back]').click();
  for(let i=0;i<9;i++)await page.locator('[data-action=tour-next]').click();
  assert.equal(await page.locator('#bd-tour-title').count(),0);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-tour-state')).completed),true);
  await page.locator('[data-page=settings]:visible').click();
  await page.locator('[data-action=tour]').click();await page.locator('[data-action=tour-skip]').click();
  await page.locator('#bd-fab').click();await page.locator('[name=text]').fill('Saved brainstorm note');await page.locator('#bd-note-form .bd-primary').click();
  await page.waitForFunction(()=>window.BedoSync.getStatus().state==='saved');
  assert(cloud.ideas.some(n=>n.text==='Saved brainstorm note'),'Brainstorm saves to authenticated cloud');
  assert(cloud.blocks.some(b=>b.id==='cloud-block'),'schedule is retained while saving notes');
  assert(cloud.settings[0].tour.completed,'tour completion is saved');
  await page.locator('[data-page=settings]:visible').click();assert((await page.locator('#bd-save-time').textContent()).includes('Last confirmed'));
  failSave=true;await page.locator('#bd-fab').click();await page.locator('[name=text]').fill('Keep on device if save fails');await page.locator('#bd-note-form .bd-primary').click();
  await page.waitForFunction(()=>window.BedoSync.getStatus().state==='error');
  assert.equal(await page.evaluate(()=>localStorage.getItem('bedo-sync-pending')),'true');
  assert(await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-ideas')).some(n=>n.text==='Keep on device if save fails')));
  failSave=false;await page.locator('[data-action=sync-now]').click();await page.waitForFunction(()=>window.BedoSync.getStatus().state==='saved');
  assert(cloud.ideas.some(n=>n.text==='Keep on device if save fails'),'retry saves pending notes');
  await page.reload({waitUntil:'domcontentloaded'});await page.locator('.bd-month').waitFor();assert.equal(await page.locator('#bd-tour-title').count(),0,'tour does not repeat after completion');
  assert.deepEqual(errors,[]);await context.close();
  const failure=await browser.newContext(),bad=await failure.newPage();let failedSaves=0;
  await failure.route('**/auth-config.js',r=>r.fulfill({contentType:'application/javascript',body:'window.BEDO_GOOGLE_CLIENT_ID="";'}));
  await failure.route('https://script.google.com/**',r=>{if(r.request().postDataJSON().action==='save')failedSaves++;return r.fulfill({contentType:'application/json',body:JSON.stringify({ok:false,error:'Unavailable'})});});
  await bad.goto(base+'/',{waitUntil:'domcontentloaded'});await bad.evaluate(()=>{localStorage.setItem('bedo-auth-user',JSON.stringify({sub:'failure-test'}));localStorage.setItem('bedo-auth-session','failure-session');localStorage.setItem('bedo-blocks',JSON.stringify([{id:'keep-private'}]));});
  await bad.goto(base+'/?app=1',{waitUntil:'domcontentloaded'});await bad.locator('#bd-retry-workspace').waitFor();
  assert.equal(failedSaves,0,'failed initial load never uploads an empty plan');assert.equal(await bad.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks'))[0].id),'keep-private');
  await failure.close();console.log('PASS Google callback, authenticated restore/save, first tour/replay, failure preservation and retry');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
