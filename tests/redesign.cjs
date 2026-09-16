/* Run: node tests/redesign.cjs. Playwright is installed in a temporary tools directory. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(path.join(process.env.TEMP, 'blockday-ui-tests/node_modules/playwright'));
const base = process.env.BLOCKDAY_TEST_BASE || 'http://localhost:8765';
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    for (const [name,width,height] of [['mobile',390,844],['tablet',820,1180],['desktop',1440,1000]]) {
      const context=await browser.newContext({viewport:{width,height},hasTouch:name!=='desktop'});
      const page=await context.newPage(),errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(base+'/',{waitUntil:'domcontentloaded'});
      await page.locator('.bd-hero').waitFor();
      assert.equal(await page.evaluate(()=>document.querySelector('.bd-landing').scrollWidth<=innerWidth),true,'landing fits viewport');
      await page.screenshot({path:path.join(process.env.TEMP,`blockday-landing-${name}.png`)});
      await page.evaluate(()=>localStorage.setItem('blockday-blocks',JSON.stringify([{id:'real-private',title:'Original personal data',date:'2026-9-1',start:8,duration:1}])));
      await page.locator('#bd-demo-cta').click();
      await page.waitForURL('**/?demo=1');
      await page.locator('.bd-month').waitFor();
      assert.equal(await page.locator('.bd-segments [data-view=month]').getAttribute('class'),'active');
      await page.locator('.bd-month-day.today').click();
      await page.locator('.bd-block').first().waitFor();
      assert.equal(await page.locator('.bd-block').count(),8);
      assert(await page.evaluate(()=>JSON.parse(localStorage.getItem('blockday-blocks')).length>=78),'two weeks of demo blocks');
      await page.screenshot({path:path.join(process.env.TEMP,`blockday-day-${name}.png`)});
      await page.evaluate(()=>{const data=JSON.parse(localStorage.getItem('blockday-blocks'));data.push({...data[0],id:'other-day-occurrence',date:'2026-10-1',recurring:true});localStorage.setItem('blockday-blocks',JSON.stringify(data));});
      await page.reload({waitUntil:'domcontentloaded'});await page.locator('.bd-month-day.today').click();
      const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('blockday-blocks')));
      const handle=page.locator('[data-drag="demo-1"]'),box=await handle.boundingBox();
      await page.mouse.move(box.x+box.width/2,box.y+15);await page.mouse.down();await page.mouse.move(box.x+box.width/2,box.y+87,{steps:10});await page.mouse.up();
      const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('blockday-blocks')));
      assert(Math.abs(after[0].start-before[0].start-1)<.001,'drag moves block by one hour');
      assert.equal(after[0].date,before[0].date,'drag retains date');
      assert.deepEqual(after.slice(1),before.slice(1),'other occurrences stay unchanged');
      if(name==='mobile'){
        const touch=await context.newCDPSession(page),target=await page.locator('[data-drag="demo-1"]').boundingBox();
        const x=target.x+target.width/2,y=target.y+15;
        await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
        await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y+36}]});
        await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        const touched=await page.evaluate(()=>JSON.parse(localStorage.getItem('blockday-blocks')));
        assert(Math.abs(touched[0].start-after[0].start-.5)<.001,'touch drag moves by half an hour');
        assert.deepEqual(touched.slice(1),after.slice(1),'touch drag preserves other days');
      }
      await page.locator('[data-filter=Work]').click();assert.equal(await page.locator('.bd-block').count(),2);
      await page.locator('[data-filter=All]').click();
      await page.locator('[data-action=add]').click();
      await page.locator('[name=title]').fill('Repeated test');await page.locator('[name=repeat]').selectOption('weekly');
      await page.locator('#bd-block-form .bd-primary').click();
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('blockday-blocks')).filter(b=>b.title==='Repeated test').length),4);
      await page.locator('.bd-segments [data-view=week]').click();await page.locator('.bd-week-strip').waitFor();
      await page.locator('[data-page=brainstorm]:visible').click();await page.locator('.bd-note').waitFor();
      await page.locator('#bd-fab').click();await page.locator('[name=text]').fill('A fresh thought');await page.locator('#bd-note-form .bd-primary').click();
      assert.equal(await page.locator('.bd-note').count(),2);
      await page.locator('[data-schedule-note]').first().click();assert.equal(await page.locator('[name=title]').inputValue(),'A fresh thought');
      await page.locator('[data-action=close]').click();
      await page.locator('[data-page=insights]:visible').click();await page.locator('.bd-bars').waitFor();
      await page.locator('[data-page=settings]:visible').click();await page.locator('[data-palette=berry]').click();
      await page.waitForTimeout(1200);assert.equal(await page.evaluate(()=>document.documentElement.dataset.palette),'berry');
      const surfaces=[];
      for(const mode of ['light','dark']){
        if(await page.evaluate(()=>document.documentElement.dataset.mode)!==mode) await page.locator('[data-action=theme]').click();
        for(const palette of ['sage','ocean','berry','sand']){
          await page.locator(`[data-palette=${palette}]`).click();
          const colors=await page.evaluate(()=>({bg:getComputedStyle(document.body).backgroundColor,card:getComputedStyle(document.querySelector('.bd-card')).backgroundColor,logo:getComputedStyle(document.querySelector('.bd-logo'),'::after').backgroundColor,logoBg:getComputedStyle(document.querySelector('.bd-logo')).backgroundColor}));
          assert.notEqual(colors.bg,colors.card,'background and cards have distinct colors');
          assert.notEqual(colors.logo,colors.logoBg,'logo lettering contrasts with tile');
          surfaces.push(colors.bg);
          await page.screenshot({path:path.join(process.env.TEMP,`blockday-theme-${name}-${mode}-${palette}.png`)});
        }
      }
      assert.equal(new Set(surfaces).size,8,'all palettes have distinct light/dark backgrounds');
      assert((await (await page.request.get(base+'/logo-glyph.svg')).text()).includes('>b-d<'),'new logo glyph served');
      await page.reload({waitUntil:'domcontentloaded'});
      assert.equal(await page.evaluate(()=>document.documentElement.dataset.palette),'sand','palette survives reload');
      assert.equal(await page.evaluate(()=>document.documentElement.dataset.mode),'dark','dark mode survives reload');
      await page.locator('[data-page=settings]:visible').click();
      const fab=await page.locator('#bd-fab').boundingBox();await page.mouse.move(fab.x+20,fab.y+20);await page.mouse.down();await page.mouse.move(fab.x-80,fab.y-80,{steps:6});await page.mouse.up();
      assert.equal(await page.locator('#bd-dialog').count(),0,'dragging FAB does not open dialog');
      assert(await page.evaluate(()=>Boolean(localStorage.getItem('blockday-quick-note-position'))),'FAB position saved');
      await page.locator('#bd-fab').click();await page.locator('#bd-note-form').waitFor();await page.locator('[data-action=close]').click();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'app fits viewport');
      await page.locator('.bd-exit').click();await page.waitForURL(base+'/');
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('blockday-blocks'))[0].id),'real-private','demo exit restores original data');
      assert.deepEqual(errors,[],`no page errors at ${name} width`);
      console.log(`PASS ${name}: landing, demo, calendar/day/week, drag isolation, repeat, filters, notes, insights, theme, demo restore`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
