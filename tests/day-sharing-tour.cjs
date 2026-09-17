const assert=require('node:assert/strict');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH);
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:360,height:640}});
 await page.goto((process.env.BEDO_TEST_BASE||'http://localhost:8766')+'/?demo=1');
 await page.locator('.bd-month').waitFor();
 await page.locator('.bd-mobile-nav [data-page=settings]').click();
 await page.locator('[name=name]').fill('Jamie');
 await page.locator('#bd-settings .bd-primary').click();
 await page.locator('.bd-mobile-nav [data-page=calendar]').click();
 assert.equal(await page.locator('.bd-greeting').textContent(),'Hello, Jamie.');
 await page.locator('[data-action=share-day]').click();
 const draft=await page.locator('#bd-rundown').inputValue();
 assert(draft.startsWith('Jamie’s schedule\n'));
 assert(draft.includes('Shared from bedo'));
 const count=await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')).length);
 await page.locator('#bd-rundown').fill('My edited rundown & lunch');
 assert.equal(await page.locator('#bd-whatsapp').getAttribute('href'),'https://wa.me/?text='+encodeURIComponent('My edited rundown & lunch'));
 await page.locator('#bd-rundown-date').fill('2099-01-01');
 assert((await page.locator('#bd-rundown').inputValue()).includes('No blocks planned.'));
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('bedo-blocks')).length),count);
 await page.locator('[data-action=close]').click();
 await page.locator('.bd-mobile-nav [data-page=settings]').click();
 await page.locator('[data-action=tour]').click();
 for(let i=0;i<9;i++){
   await page.waitForTimeout(100);
   const bounds=await page.locator('.bd-tour-layer .bd-dialog').boundingBox();
   assert(bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=361&&bounds.y+bounds.height<=641,'tour panel fits mobile screen');
   assert(await page.locator('.bd-tour-frame').count(),'target is highlighted');
   const next=await page.locator('[data-action=tour-next]').boundingBox();
   assert(next.y+next.height<=640,'Next remains visible');
   await page.locator('[data-action=tour-next]').click();
 }
 assert.equal(await page.locator('.bd-tour-frame').count(),0);
 await browser.close();console.log('PASS display name, editable day/WhatsApp rundown, empty day, non-mutating sharing and 360×640 tour');
})().catch(e=>{console.error(e);process.exit(1)});
