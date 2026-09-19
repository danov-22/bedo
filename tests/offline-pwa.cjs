const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH||path.join(process.env.TEMP,'blockday-ui-tests/node_modules/playwright'));
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({serviceWorkers:'allow',viewport:{width:390,height:844}}),page=await context.newPage();
 const base=process.env.BEDO_TEST_BASE||'http://localhost:8766';
 await page.goto(base+'/',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
 await page.reload({waitUntil:'networkidle'});await context.setOffline(true);await page.goto(base+'/?demo=1',{waitUntil:'domcontentloaded'});
 await page.locator('.bd-month').first().waitFor();assert(await page.locator('.bd-view-swipe-hint').isVisible(),'Timeblock loads from the offline app shell');
 await page.locator('#bd-fab').click();await page.locator('[name=text]').fill('Airplane idea');await page.locator('#bd-note-form .bd-primary').click();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-ideas')).some(note=>note.text==='Airplane idea')),true,'offline edits stay on device');
 await browser.close();console.log('PASS installable app shell and local editing work in airplane mode');
})().catch(error=>{console.error(error);process.exit(1)});
