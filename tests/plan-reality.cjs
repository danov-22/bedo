const assert=require('node:assert/strict');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH);
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),base=process.env.BEDO_TEST_BASE||'http://localhost:8766',errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>{const past=new Date();past.setDate(past.getDate()-8);const future=new Date();future.setDate(future.getDate()+1);const key=d=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;localStorage.setItem('bedo-auth-user',JSON.stringify({sub:'reality-test'}));localStorage.setItem('bedo-auth-session','session');localStorage.setItem('bedo-calendar-choice','fresh');localStorage.setItem('bedo-tour-state',JSON.stringify({completed:true}));localStorage.setItem('bedo-blocks',JSON.stringify([{id:'past',title:'Past BEDO block',date:key(past),start:8,duration:1,category:'Work',completed:false},{id:'future',title:'Future BEDO block',date:key(future),start:9,duration:2,category:'Work',status:'planned',completed:false},{id:'google',title:'Imported meeting',date:key(past),start:10,duration:1,category:'Google Calendar',source:'google-calendar',completed:false}]));});
 await page.goto(base+'/?app=1',{waitUntil:'domcontentloaded'});await page.locator('.bd-month').first().waitFor();
 assert(await page.getByText('Did you do this?').isVisible(),'overdue block asks for its outcome');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')).find(b=>b.id==='past').status),'unconfirmed');
 await page.locator('[data-view=checklist]').click();const first=page.locator('.bd-checklist article').first();assert(await first.getByText('Past BEDO block',{exact:true}).isVisible(),'old unconfirmed block remains at top of Checklist');
 await page.locator('.bd-reality-prompt [data-reality=move]').click();await page.locator('#bd-move-form').waitFor();await page.locator('#bd-move-form .bd-primary').click();
 const moved=await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')));assert.equal(moved.find(b=>b.id==='past').status,'moved');assert(moved.some(b=>b.movedFrom==='past'&&b.status==='planned'));
 await page.locator('[data-page=insights]:visible').click();await page.locator('[data-action=insights-toggle]').click();assert(await page.locator('.bd-achievement-chart').isVisible());assert(await page.locator('.bd-achievement').getByText(/follow-through/).isVisible());
 assert.equal(errors.length,0,errors.join('\n'));await browser.close();console.log('PASS plan vs reality statuses, move history, Checklist ordering and achievement chart');
})().catch(error=>{console.error(error);process.exit(1)});
