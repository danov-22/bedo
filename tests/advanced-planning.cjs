const assert=require('node:assert/strict');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH);
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),base=process.env.BEDO_TEST_BASE||'http://localhost:8766';
 await page.goto(base+'/?demo=1',{waitUntil:'domcontentloaded'});await page.locator('.bd-month').first().waitFor();
 await page.locator('[data-page=insights]:visible').click();await page.locator('[data-action=insights-toggle]').click();assert(await page.locator('.bd-achievement').isVisible());
 for(const period of ['week','month','year']){await page.locator(`[data-insight-period=${period}]`).click();assert.equal(await page.locator(`[data-insight-period=${period}]`).getAttribute('class'),'active');}
 await page.locator('[data-page=calendar]:visible').click();await page.locator('[data-view=day]').click();await page.locator('#bd-fab').click();await page.locator('[data-quick-mode=block]').click();
 await page.locator('[name=title]').fill('Monthly review');await page.locator('[name=repeat]').selectOption('monthly');await page.locator('[name=locked]').check();await page.locator('#bd-block-form .bd-primary').click();
 let records=await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')).filter(b=>b.title==='Monthly review'));assert(records.length>=11&&records.length<=12,'monthly repeat creates up to twelve valid monthly dates');assert(records.every(b=>b.locked));
 assert(await page.locator('[data-block="'+records[0].id+'"] [data-drag]').isDisabled(),'locked block cannot be dragged');
 await page.locator('#bd-fab').click();await page.locator('#bd-block-form').waitFor();await page.locator('[name=title]').fill('Seasonal planning');await page.locator('[name=repeat]').selectOption('yearly');
 const months=page.locator('[name=repeatMonth]');const checked=await months.evaluateAll(els=>els.findIndex(el=>el.checked));await months.nth((checked+3)%12).check();await page.locator('#bd-block-form .bd-primary').click();
 records=await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')).filter(b=>b.title==='Seasonal planning'));assert(records.length>=4,'yearly repeat supports multiple chosen months');
 await page.locator('[data-page=brainstorm]:visible').click();await page.locator('#bd-fab').click();await page.locator('[data-quick-mode=note]').click();await page.locator('[name=text]').fill('A private thought');await page.locator('[name=private]').check();await page.locator('#bd-note-form .bd-primary').click();
 const privateNote=page.locator('.bd-note-private').first();assert(await privateNote.isVisible());assert.equal(await privateNote.getByText('A private thought').count(),0);await privateNote.getByText('Reveal').click();await page.getByText('A private thought').waitFor();
 await browser.close();console.log('PASS extended insights, monthly/yearly recurrence, block locking and private note reveal');
})().catch(error=>{console.error(error);process.exit(1)});
