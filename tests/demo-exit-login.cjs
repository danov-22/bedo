const assert=require('node:assert/strict');
const {chromium}=require(process.env.BEDO_PLAYWRIGHT_PATH);
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
 const base=process.env.BEDO_TEST_BASE||'http://localhost:8766';
 await context.route(base+'/login',async route=>{const response=await context.request.get(base+'/');await route.fulfill({status:200,contentType:'text/html',body:await response.text()});});
 await context.route('https://accounts.google.com/gsi/client',route=>route.fulfill({contentType:'application/javascript',body:'window.google={accounts:{id:{initialize(){window.googleInitializeCount=(window.googleInitializeCount||0)+1},renderButton(el){el.textContent="Google button"},disableAutoSelect(){}},oauth2:{}}};'}));
 await page.goto(base+'/',{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>window.googleInitializeCount||0),0,'public landing does not initialize Google Identity');
 await page.locator('#bd-demo-cta').click();await page.waitForTimeout(500);assert(page.url().includes('?demo=1'),`demo opens (${page.url()}; ${errors.join('; ')})`);await page.locator('[data-action=exit]').click();await page.waitForURL(base+'/');await page.waitForTimeout(300);
 assert.equal(await page.evaluate(()=>window.googleInitializeCount||0),0,'exiting demo does not initialize Google sign-in');
 await page.locator('.bd-hero-actions a[href="/login"]').click();await page.waitForURL('**/login');await page.waitForTimeout(500);
 const state=await page.evaluate(()=>({initialized:window.googleInitializeCount||0,hasGoogle:Boolean(window.google),title:document.title,scripts:[...document.scripts].map(s=>s.src)}));assert.equal(state.initialized,1,`Google Identity initializes after an intentional sign-in action (${JSON.stringify(state)}; ${errors.join('; ')})`);
 assert.equal(await page.getByText('Google button').count(),1,'the deliberate login page renders the Google button');
 await browser.close();console.log('PASS demo exit stays on landing and Google sign-in is intentional');
})().catch(error=>{console.error(error);process.exit(1)});
