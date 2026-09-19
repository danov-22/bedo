/* bedo's responsive UI. Stored start/duration values remain hours for backend compatibility. */
(function () {
  'use strict';
  const root = document.getElementById('root');
  let logoSequence=0;
  const mainLogoMarkup="<svg class=\"bd-logo-svg\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2000\" zoomAndPan=\"magnify\" viewBox=\"0 0 1500 1499.999933\" height=\"2000\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.0\">\r\n  <defs>\r\n    <g />\r\n    <clipPath id=\"7cc8130902\">\r\n      <rect x=\"0\" width=\"434\" y=\"0\" height=\"141\" />\r\n    </clipPath>\r\n    <clipPath id=\"f0be134f68\">\r\n      <rect x=\"0\" width=\"1081\" y=\"0\" height=\"784\" />\r\n    </clipPath>\r\n  </defs>\r\n  <rect x=\"45\" y=\"45\" width=\"1410\" height=\"1410\" rx=\"320\" fill=\"#2c8170\" />\n  <g transform=\"matrix(1, 0, 0, 1, 540, 722)\">\r\n    <g clip-path=\"url(#7cc8130902)\">\r\n      <g fill=\"#ffffff\" fill-opacity=\"1\">\r\n        <g transform=\"translate(312.287514, 140.531359)\">\r\n          <g>\r\n            <path d=\"M 90.234375 -60.046875 L 73.234375 -20.125 C 71.609375 -21.28125 69.234375 -22.84375 66.109375 -24.8125 C 62.992188 -26.78125 55.9375 -30.304688 44.9375 -35.390625 C 33.945312 -40.484375 22.203125 -45 9.703125 -48.9375 C -2.785156 -52.875 -19.207031 -56.398438 -39.5625 -59.515625 C -59.925781 -62.640625 -81.097656 -64.203125 -103.078125 -64.203125 C -126.222656 -64.203125 -148.378906 -62.523438 -169.546875 -59.171875 C -190.722656 -55.816406 -208.132812 -51.707031 -221.78125 -46.84375 C -235.4375 -41.988281 -247.351562 -37.191406 -257.53125 -32.453125 C -267.707031 -27.710938 -275.113281 -23.601562 -279.75 -20.125 L -286.6875 -15.265625 L -303.6875 -55.1875 C -301.601562 -57.039062 -298.59375 -59.410156 -294.65625 -62.296875 C -290.726562 -65.191406 -282.113281 -70.398438 -268.8125 -77.921875 C -255.507812 -85.441406 -241.566406 -92.09375 -226.984375 -97.875 C -212.410156 -103.65625 -193.898438 -108.914062 -171.453125 -113.65625 C -149.015625 -118.40625 -126.222656 -120.78125 -103.078125 -120.78125 C -80.640625 -120.78125 -58.660156 -118.695312 -37.140625 -114.53125 C -15.617188 -110.363281 2.484375 -105.269531 17.171875 -99.25 C 31.867188 -93.238281 44.941406 -87.285156 56.390625 -81.390625 C 67.847656 -75.492188 76.351562 -70.460938 81.90625 -66.296875 Z M 90.234375 -60.046875 \" />\r\n          </g>\r\n        </g>\r\n      </g>\r\n    </g>\r\n  </g>\r\n  <g transform=\"matrix(1, 0, 0, 1, 211, 347)\">\r\n    <g clip-path=\"url(#f0be134f68)\">\r\n      <g fill=\"#ffffff\" fill-opacity=\"1\">\r\n        <g transform=\"translate(5.736635, 617.858522)\">\r\n          <g>\r\n            <path d=\"M 250.671875 -350.9375 C 282.804688 -350.9375 312.046875 -343.539062 338.390625 -328.75 C 364.742188 -313.96875 385.421875 -293.1875 400.421875 -266.40625 C 415.421875 -239.632812 422.921875 -208.460938 422.921875 -172.890625 C 422.921875 -137.328125 415.421875 -106.15625 400.421875 -79.375 C 385.421875 -52.59375 364.742188 -31.8125 338.390625 -17.03125 C 312.046875 -2.25 282.804688 5.140625 250.671875 5.140625 C 203.109375 5.140625 166.898438 -9.851562 142.046875 -39.84375 L 142.046875 0 L 46.28125 0 L 46.28125 -476.90625 L 146.546875 -476.90625 L 146.546875 -309.15625 C 171.828125 -337.007812 206.535156 -350.9375 250.671875 -350.9375 Z M 233.3125 -77.125 C 259.019531 -77.125 280.117188 -85.800781 296.609375 -103.15625 C 313.109375 -120.507812 321.359375 -143.753906 321.359375 -172.890625 C 321.359375 -202.023438 313.109375 -225.269531 296.609375 -242.625 C 280.117188 -259.976562 259.019531 -268.65625 233.3125 -268.65625 C 207.601562 -268.65625 186.5 -259.976562 170 -242.625 C 153.507812 -225.269531 145.265625 -202.023438 145.265625 -172.890625 C 145.265625 -143.753906 153.507812 -120.507812 170 -103.15625 C 186.5 -85.800781 207.601562 -77.125 233.3125 -77.125 Z M 233.3125 -77.125 \" />\r\n          </g>\r\n        </g>\r\n        <g transform=\"translate(449.220349, 617.858522)\">\r\n          <g />\r\n        </g>\r\n        <g transform=\"translate(631.112945, 617.858522)\">\r\n          <g>\r\n            <path d=\"M 398.5 -476.90625 L 398.5 0 L 302.734375 0 L 302.734375 -39.84375 C 277.878906 -9.851562 241.882812 5.140625 194.75 5.140625 C 162.1875 5.140625 132.726562 -2.140625 106.375 -16.703125 C 80.019531 -31.273438 59.34375 -52.054688 44.34375 -79.046875 C 29.351562 -106.046875 21.859375 -137.328125 21.859375 -172.890625 C 21.859375 -208.460938 29.351562 -239.742188 44.34375 -266.734375 C 59.34375 -293.734375 80.019531 -314.515625 106.375 -329.078125 C 132.726562 -343.648438 162.1875 -350.9375 194.75 -350.9375 C 238.882812 -350.9375 273.378906 -337.007812 298.234375 -309.15625 L 298.234375 -476.90625 Z M 212.109375 -77.125 C 237.390625 -77.125 258.382812 -85.800781 275.09375 -103.15625 C 291.800781 -120.507812 300.15625 -143.753906 300.15625 -172.890625 C 300.15625 -202.023438 291.800781 -225.269531 275.09375 -242.625 C 258.382812 -259.976562 237.390625 -268.65625 212.109375 -268.65625 C 186.390625 -268.65625 165.175781 -259.976562 148.46875 -242.625 C 131.757812 -225.269531 123.40625 -202.023438 123.40625 -172.890625 C 123.40625 -143.753906 131.757812 -120.507812 148.46875 -103.15625 C 165.175781 -85.800781 186.390625 -77.125 212.109375 -77.125 Z M 212.109375 -77.125 \" />\r\n          </g>\r\n        </g>\r\n      </g>\r\n    </g>\r\n  </g>\r\n</svg>";
  function logo(){const n=++logoSequence;return mainLogoMarkup.replace('#2c8170','#165bdf').replaceAll('7cc8130902','bedo-'+n+'-smile').replaceAll('f0be134f68','bedo-'+n+'-letters');}
  const demo = new URLSearchParams(location.search).has('demo');
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } };
  const write = (key, value) => {localStorage.setItem(key, JSON.stringify(value));window.BedoSync?.changed();};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateKey = d => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  const dayNumber = key => { const [y,m,d]=String(key).split('-').map(Number); return Date.UTC(y,m-1,d); };
  const fromKey = key => { const [y,m,d] = key.split('-').map(Number); return new Date(y,m-1,d,12); };
  const inputDate = key => key.split('-').map((s,i) => i ? s.padStart(2,'0') : s).join('-');
  const dateLabel = (d, options) => d.toLocaleDateString(undefined, options);
  const time = hours => { const n = Math.round(hours*60); return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`; };
  const clockTime = hours => { const n=Math.round(hours*60); return new Date(2000,0,1,Math.floor(n/60),n%60).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}); };
  const uid = () => crypto.randomUUID ? crypto.randomUUID() : `b-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const icons = { calendar:'▦', brainstorm:'✎', insights:'↗', settings:'⚙' };
  let blocks = read('bedo-blocks', []), ideas = read('bedo-ideas', []);
  let profile = read('bedo-profile', {});
  let categories = profile.categories || ['Personal','Work','Wellness','Study'];
  let page = ['brainstorm','insights','settings'].includes(location.pathname.slice(1)) ? location.pathname.slice(1) : 'calendar';
  let view = 'month', selected = new Date(), month = new Date(), filter = 'All', drag = null;
  let settingsSection='profile';
  const category = block => block.category || (block.color === 'blue' ? 'Work' : block.color === 'gold' ? 'Wellness' : 'Personal');
  const defaultCategoryColors=['#165bdf','#7042d4','#9a7200','#00843d'];
  const categoryColor=cat=>normalizeColor(profile.categoryColors?.[cat])||defaultCategoryColors[Math.max(0,categories.indexOf(cat))%4];
  const tint = cat => ['mint','lavender','peach','blue'][Math.max(0,categories.indexOf(cat))%4];
  const blockColorStyle=cat=>`--block-color:${categoryColor(cat)};--block-ink:#fff`;
  const visible = day => blocks.filter(b => b.date === dateKey(day) && (filter==='All' || category(b)===filter));
  function save() { write('bedo-blocks',blocks); write('bedo-ideas',ideas); }
  function normalizeColor(value) {
    const raw=String(value||'').trim().replace(/^#/,'');
    if (/^[0-9a-f]{3}$/i.test(raw)) return '#'+raw.split('').map(c=>c+c).join('').toLowerCase();
    return /^[0-9a-f]{6}$/i.test(raw)?'#'+raw.toLowerCase():null;
  }
  const colorRGB = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  function mixColor(color,target,amount) {
    const a=colorRGB(color),b=colorRGB(target);
    return '#'+a.map((v,i)=>Math.round(v*(1-amount)+b[i]*amount).toString(16).padStart(2,'0')).join('');
  }
  function luminance(hex) {
    const rgb=colorRGB(hex).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
    return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
  }
  function contrastColor(base,against,target) {
    const other=luminance(against);
    for(let amount=0;amount<=100;amount++) {
      const color=mixColor(base,target,amount/100),light=luminance(color);
      if ((Math.max(light,other)+.05)/(Math.min(light,other)+.05)>=4.5) return color;
    }
    return target;
  }
  function setTheme() {
    if (profile.theme === 'sand') { profile = {...profile, theme:'neutral'}; write('bedo-profile',profile); }
    document.documentElement.dataset.mode = read('bedo-theme','light');
    document.documentElement.dataset.palette = profile.theme || 'ocean';
    const tokens=['bg','card','text','muted','line','soft','primary','logo-bg','logo-ink','shadow'];
    tokens.forEach(key=>document.documentElement.style.removeProperty('--'+key));
    if(profile.theme==='custom') {
      const base=normalizeColor(profile.customColor)||'#7c5ce7',dark=read('bedo-theme','light')==='dark';
      const bg=mixColor(base,dark?'#111318':'#f5f5f8',dark?.91:.95);
      const values=dark?{
        bg,card:mixColor(base,'#1d2028',.88),text:mixColor(base,'#ffffff',.96),muted:mixColor(base,'#bdc3d0',.90),line:mixColor(base,'#373c49',.84),soft:mixColor(base,'#292e3a',.80),primary:contrastColor(base,bg,'#ffffff')
      }:{
        bg,card:mixColor(base,'#ffffff',.99),text:mixColor(base,'#20232b',.91),muted:mixColor(base,'#636978',.90),line:mixColor(base,'#e5e7ed',.90),soft:mixColor(base,'#ffffff',.86),primary:contrastColor(base,bg,'#000000')
      };
      values['logo-bg']=contrastColor(base,'#ffffff','#000000');values['logo-ink']='#ffffff';
      values.shadow=dark?'0 16px 50px #0003':`0 16px 50px ${base}15`;
      Object.entries(values).forEach(([key,value])=>document.documentElement.style.setProperty('--'+key,value));
    }
  }
  function dayCompleted(day) {
    const all = blocks.filter(b => b.date === dateKey(day));
    return all.length > 0 && all.every(b => b.completed === true);
  }
  function dayStatus(day) {
    if(!blocks.some(b=>b.date===dateKey(day)))return '';
    const completed=dayCompleted(day),now=new Date(),today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    if(!completed && new Date(day.getFullYear(),day.getMonth(),day.getDate())>=today)return '';
    const label=completed?'All blocks completed. Nice work!':'Past day with unfinished blocks. One step at a time.';
    return `<span class="bd-day-celebration bd-day-status ${completed?'bd-day-completed':'bd-day-incomplete'}" role="img" aria-label="${label}" title="${label}">${completed?'🎯':'🎗️'}</span>`;
  }
  function nav() { return ['calendar','brainstorm','insights','settings'].map(p => `<button data-page="${p}" class="${page===p?'active':''}"><span aria-hidden="true">${icons[p]}</span>${p==='calendar'?'Timeblock':p[0].toUpperCase()+p.slice(1)}</button>`).join(''); }
  function render() {
    monthObserver?.disconnect();
    setTheme();
    root.innerHTML = `<div class="bd-shell"><aside class="bd-sidebar"><a class="bd-brand" href="/"><span class="bd-logo">${logo()}</span>bedo<span class="bd-brand-dot">.</span></a><p>A little space for your day.</p><nav>${nav()}</nav><div class="bd-sidebar-note">Make room for life.<br>Not just your to-do list. ☀️</div></aside><main class="bd-main"><header class="bd-top"><a class="bd-logo" href="/" aria-label="bedo home">${logo()}</a><div class="bd-top-actions">${demo?'<button class="bd-exit" data-action="exit">← Exit demo</button>':''}<span id="bd-save-badge" class="bd-save-badge"></span><time id="bd-clock"></time><button class="bd-icon" data-action="theme" aria-label="Toggle light or dark theme">${read('bedo-theme','light')==='dark'?'☀':'☾'}</button></div></header><div class="bd-content">${page==='calendar'?calendar():page==='brainstorm'?brainstorm():page==='insights'?insights():settings()}</div></main><nav class="bd-mobile-nav">${nav()}</nav></div>`;
    if(page==='calendar'){
      const header=root.querySelector('.bd-top');header.classList.add('bd-calendar-header');
      if(profile.name?.trim()){const name=document.createElement('span');name.className='bd-display-name';name.textContent=profile.name.trim();name.title=profile.name.trim();header.querySelector('.bd-logo').after(name);}
      const share=document.createElement('button');share.className='bd-secondary bd-share-day';share.dataset.action='share-day';share.textContent='Share a day ↗';root.querySelector('.bd-content').append(share);
    }
    if(page==='settings')organizeSettings();
    tick(); mountNoteButton(); updateSavingStatus();
    document.documentElement.style.setProperty('--bd-header-height',root.querySelector('.bd-top').offsetHeight+'px');
  }
  function filters() { return `<div class="bd-filters" aria-label="Filter blocks by category">${['All',...categories].map(c=>`<button data-filter="${esc(c)}" class="${filter===c?'active':''}">${c!=='All'?`<i class="${tint(c)}"></i>`:''}${esc(c)}</button>`).join('')}</div>`; }
  function organizeSettings(){
    const content=root.querySelector('.bd-content'),form=document.getElementById('bd-settings');
    const menu=document.createElement('nav');menu.className='bd-settings-menu';menu.setAttribute('aria-label','Settings sections');
    const sections=[['profile','Profile'],['appearance','Appearance'],['account','Your account & data'],['guide','How to use'],['sharing','Sharing']];
    menu.innerHTML=sections.map(([id,label])=>`<button data-settings-section="${id}" aria-current="${settingsSection===id?'page':'false'}">${label}</button>`).join('');content.querySelector('.bd-heading').after(menu);
    const personal=document.createElement('div'),appearance=document.createElement('div');
    personal.id='bd-profile-panel';appearance.id='bd-appearance-panel';
    Array.from(form.children).forEach(el=>{if(el.classList.contains('bd-primary'))return;(el.matches('label')?personal:appearance).append(el);});
    form.prepend(personal,appearance);personal.hidden=settingsSection!=='profile';appearance.hidden=settingsSection!=='appearance';form.hidden=!['profile','appearance'].includes(settingsSection);
    document.getElementById('bd-account-card')?.append(document.getElementById('bd-saving-card'));
    const cards={'account':'bd-account-card','guide':'bd-app-guide'};
    Object.entries(cards).forEach(([section,id])=>{document.getElementById(id).hidden=settingsSection!==section;});
    let sharing=Array.from(content.children).find(el=>el.querySelector('[data-action=share]'));
    if(!sharing&&demo){sharing=document.createElement('section');sharing.className='bd-card';sharing.innerHTML='<h2>Share selected days live</h2><p>After signing in, choose a start and end date to create a live, read-only web link. Only those days are visible, and the link can be disabled anytime.</p><button class="bd-secondary" type="button" disabled>Available after sign in</button>';content.append(sharing);}
    if(sharing){sharing.id='bd-sharing-card';sharing.hidden=settingsSection!=='sharing';}
    if(!profile.theme){form.querySelectorAll('[data-palette]').forEach(button=>button.classList.remove('active'));form.querySelector('[data-palette=ocean]')?.classList.add('active');}
  }
  function calendar() {
    const title = view==='month' ? 'A little space for everything.' : dateLabel(selected,{weekday:'long',month:'long',day:'numeric'});
    return `<section class="bd-heading"><div><span class="bd-kicker">YOUR TIME, YOUR PACE ✨</span><h1>${title}</h1><p>${view==='month'?'Pick a day. Make room for what matters.':'A flexible plan. Not a perfect one.'}</p></div></section><div class="bd-toolbar"><div class="bd-segments">${['month','day','week'].map(v=>`<button data-view="${v}" class="${view===v?'active':''}">${v==='month'?'Calendar':v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</div><div class="bd-date-nav"><button data-action="prev" aria-label="Previous period">‹</button><strong>${view==='month'?dateLabel(month,{month:'long',year:'numeric'}):view==='week'?'Week of '+dateLabel(monday(),{month:'short',day:'numeric'}):dateLabel(selected,{month:'short',day:'numeric'})}</strong><button data-action="next" aria-label="Next period">›</button><button data-action="today">Today</button></div></div><p class="bd-view-swipe-hint" aria-label="Navigation tip">↔ Swipe left or right to switch Calendar, Day, and Week</p>${filters()}${view==='month'?monthStream():view==='week'?weekCalendar():dayCalendar(selected)}<p class="bd-help">${view==='month'?'Tap any date to explore and plan your day.':'Drag the ⋮⋮ handle to move a block. Changes apply to this occurrence only.'}</p>`;
  }
  function dayRundown(day) {
    const items=blocks.filter(b=>b.date===dateKey(day)).sort((a,b)=>a.start-b.start);
    return `${profile.name?.trim()?profile.name.trim()+"’s schedule":'My schedule'}\n${dateLabel(day,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}\n\n${items.length?items.map(b=>`${time(b.start)}–${time(b.start+b.duration)} · ${b.title} (${category(b)})${b.completed?' ✓':''}`).join('\n'):'No blocks planned.'}\n\nShared from bedo`;
  }
  function dayShareDialog(){
    dialog(`<h2>Share a day.</h2><p>All categories for this date. Brainstorm notes are never included. Edit the rundown before sharing.</p><label>Date<input id="bd-rundown-date" type="date" value="${selected.getFullYear()}-${String(selected.getMonth()+1).padStart(2,'0')}-${String(selected.getDate()).padStart(2,'0')}"></label><label>Text rundown<textarea id="bd-rundown" rows="9">${esc(dayRundown(selected))}</textarea></label><div class="bd-rundown-actions"><button class="bd-primary" data-action="copy-day">Copy text</button><a class="bd-secondary" id="bd-whatsapp" target="_blank" rel="noopener noreferrer">Open WhatsApp ↗</a></div><p id="bd-rundown-status" role="status">Choose a recipient in WhatsApp. Nothing is sent automatically.</p>`);
    updateWhatsApp();
  }
  function updateWhatsApp(){const link=document.getElementById('bd-whatsapp');if(link)link.href='https://wa.me/?text='+encodeURIComponent(document.getElementById('bd-rundown').value);}
  document.addEventListener('input',e=>{if(e.target.id==='bd-rundown')updateWhatsApp();});
  document.addEventListener('change',e=>{if(e.target.id==='bd-rundown-date'&&e.target.value){document.getElementById('bd-rundown').value=dayRundown(fromKey(e.target.value));updateWhatsApp();}});
  let monthObserver=null;
  function monthStream(){const months=Array.from({length:3},(_,i)=>new Date(month.getFullYear(),month.getMonth()+i,1));return `<div class="bd-month-stream"><div id="bd-month-list">${months.map(monthSection).join('')}</div><button class="bd-secondary" id="bd-more-months" data-action="later-month">Show 3 more months ↓</button></div>`;}
  function monthSection(date){return `<section class="bd-month-section" data-month="${dateKey(new Date(date.getFullYear(),date.getMonth(),1))}"><h2>${dateLabel(date,{month:'long',year:'numeric'})}</h2>${monthCalendar(date)}</section>`;}
  function addMonth(earlier=false){
    const list=document.getElementById('bd-month-list');if(!list||tourActive||document.getElementById('bd-dialog'))return;
    const edge=fromKey((earlier?list.firstElementChild:list.lastElementChild).dataset.month),next=new Date(edge.getFullYear(),edge.getMonth()+(earlier?-1:1),1),height=list.offsetHeight;
    list.insertAdjacentHTML(earlier?'afterbegin':'beforeend',monthSection(next));
    if(earlier)window.scrollBy(0,list.offsetHeight-height);
  }
  function observeMonths(){if(!('IntersectionObserver' in window))return;monthObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))addMonth();},{rootMargin:'0px'});monthObserver.observe(document.getElementById('bd-more-months'));}
  function monthCalendar(calendarMonth=month) {
    const first=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1), offset=first.getDay();
    const start=new Date(first); start.setDate(1-offset);
    let html='<div class="bd-month">'+['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d=>`<div class="bd-month-head">${d}</div>`).join('');
    for(let i=0;i<42;i++) {
      const d=new Date(start);d.setDate(start.getDate()+i);const list=visible(d),complete=dayCompleted(d);
      html+=`<button class="bd-month-day ${d.getMonth()!==calendarMonth.getMonth()?'muted':''} ${d.getMonth()===calendarMonth.getMonth()&&dateKey(d)===dateKey(new Date())?'today':''}" data-date="${dateKey(d)}" aria-label="${esc(dateLabel(d,{dateStyle:'full'}))}, ${list.length} blocks${complete?', All blocks completed. Nice work!':''}"><span class="bd-date-number">${d.getDate()}</span>${dayStatus(d)}<div class="bd-day-dots">${list.slice(0,3).map(b=>`<i class="${tint(category(b))}" style="background:${categoryColor(category(b))}"></i>`).join('')}</div><div class="bd-month-events">${list.slice(0,2).map(b=>`<small class="${tint(category(b))}" style="${blockColorStyle(category(b))}">${esc(b.title)}</small>`).join('')}${list.length>2?`<em>+${list.length-2} more</em>`:''}</div></button>`;
    }
    return html+'</div>';
  }
  function monday() { const d=new Date(selected);d.setDate(d.getDate()-d.getDay());return d; }
  function weekCalendar() {
    const start=monday(); return `<div class="bd-week-strip">${Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return `<button data-week-date="${dateKey(d)}" class="${dateKey(d)===dateKey(selected)?'active':''}"><span>${dateLabel(d,{weekday:'short'})}</span><b>${d.getDate()}</b><small>${visible(d).length} blocks</small></button>`;}).join('')}</div><div class="bd-week-grid">${Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return `<section><h3>${dateLabel(d,{weekday:'short',day:'numeric'})}</h3>${dayCalendar(d,true)}</section>`;}).join('')}</div><div class="bd-week-mobile">${dayCalendar(selected)}</div>`;
  }
  function dayCalendar(day, compact=false) {
    const list=visible(day), height=compact?50:72;
    return `<div class="bd-timeline ${compact?'compact':''}" style="--hour:${height}px"><div class="bd-time-axis">${Array.from({length:24},(_,h)=>`<span>${compact?String(h).padStart(2,'0'):clockTime(h)}</span>`).join('')}</div><div class="bd-day-track" data-track-date="${dateKey(day)}" data-hour-height="${height}">${list.map(b=>`<article class="bd-block ${tint(category(b))} ${b.completed?'done':''}" data-block="${esc(b.id)}" style="top:${Number(b.start)*height}px;height:${Math.max(42,Number(b.duration)*height-3)}px;${blockColorStyle(category(b))}"><button class="bd-drag" data-drag="${esc(b.id)}" aria-label="Drag ${esc(b.title)} to a new time">⋮⋮</button><button class="bd-block-body" data-edit="${esc(b.id)}"><strong>${esc(b.title)}</strong><small>${clockTime(b.start)} · ${Math.round(b.duration*100)/100}h</small><em>${esc(category(b))}</em></button><button class="bd-check" data-complete="${esc(b.id)}" aria-label="${b.completed?'Mark incomplete':'Complete'} ${esc(b.title)}">${b.completed?'✓':'○'}</button></article>`).join('')}${dateKey(day)===dateKey(new Date())?`<div class="bd-now" style="top:${(new Date().getHours()+new Date().getMinutes()/60)*height}px"></div>`:''}</div></div>${!list.length&&!compact?'<div class="bd-empty">A little breathing room 🌱<p>Add a block to shape this day.</p></div>':''}`;
  }
  function brainstorm() { return `<section class="bd-heading"><div><span class="bd-kicker">LESS IN YOUR HEAD 🧠</span><h1>Room for your thoughts.</h1><p>Capture the messy middle. Give an idea a time when you’re ready.</p></div></section><div class="bd-note-grid">${ideas.map(n=>`<article class="bd-note"><span class="bd-note-label">A LITTLE THOUGHT</span><p>${esc(n.text)}</p><div><button data-schedule-note="${esc(n.id)}">↗ Add to schedule</button><button data-edit-note="${esc(n.id)}" aria-label="Edit note">Edit</button><button data-delete-note="${esc(n.id)}" aria-label="Delete note">×</button></div></article>`).join('')||'<div class="bd-empty">Start with a thought ✍️<p>No sorting required. This is your space.</p></div>'}</div>`; }
  function insights() {
    const start=monday(),days=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return d;});
    const week=blocks.filter(b=>days.some(d=>b.date===dateKey(d))),done=week.filter(b=>b.completed),hours=done.reduce((sum,b)=>sum+Number(b.duration||0),0);
    return `<section class="bd-heading"><div><span class="bd-kicker">PROGRESS, NOT PRESSURE 🌻</span><h1>Your week, in motion.</h1><p>${dateLabel(start,{month:'short',day:'numeric'})} – ${dateLabel(days[6],{month:'short',day:'numeric'})}. Small steps add up.</p></div></section><div class="bd-stats"><article><span>Completed blocks</span><strong>${done.length}<small> / ${week.length}</small></strong></article><article><span>Weekly completion</span><strong>${week.length?Math.round(done.length/week.length*100):0}%</strong></article><article><span>Completed time</span><strong>${Math.round(hours*100)/100}<small>h</small></strong></article></div><section class="bd-card"><h2>Weekly motion</h2><p>Completed blocks across your week.</p><div class="bd-bars">${days.map(d=>{const all=blocks.filter(b=>b.date===dateKey(d)),complete=all.filter(b=>b.completed).length;return `<div><small>${complete}/${all.length}</small><div class="bd-bar" style="height:${all.length?Math.max(5,complete/all.length*140):5}px"></div><span>${dateLabel(d,{weekday:'short'})}</span></div>`;}).join('')}</div></section><section class="bd-card"><h2>Space for different parts of life</h2>${categories.map(c=>`<div class="bd-category-stat"><span><i class="${tint(c)}" style="background:${categoryColor(c)}"></i>${esc(c)}</span><strong>${week.filter(b=>category(b)===c&&b.completed).length} completed</strong></div>`).join('')}</section>`;
  }
  function appGuide() {
    return '<section class="bd-card bd-guide" id="bd-app-guide"><h2>How to use app</h2><p>A short, guided walk through planning, moving blocks, Brainstorm, Insights, and saving. It opens each feature and shows you where to look. Nothing in your schedule is changed.</p><button class="bd-primary" data-action="tour">Start app tour →</button><p>You can replay it here whenever you like.</p></section>';
  }
  function savingCard() {
    return `<section class="bd-card" id="bd-saving-card"><h2>Your saved data</h2><p id="bd-save-status" role="status"></p><p id="bd-save-time"></p><p>Schedules and Brainstorm notes save on this device first. Connect Google Drive once to keep a private BEDO file in your account’s hidden app-data folder. BEDO cannot browse your other Drive files.</p><button class="bd-secondary" data-action="sync-now">Save online now</button><button class="bd-secondary" data-action="export">Download my data</button><button class="bd-secondary" data-action="recovery">Download previous device copy</button></section>`;
  }
  function updateSavingStatus(){
    const status=demo?{message:'Demo changes stay on this device. No account or cloud data is changed.'}:window.BedoSync?.getStatus()||{message:'Saved on this device.'};
    const label=document.getElementById('bd-save-status');if(label)label.textContent=status.message;
    const stamp=document.getElementById('bd-save-time');if(stamp)stamp.textContent=status.lastSavedAt?'Last confirmed online save: '+new Date(status.lastSavedAt).toLocaleString(): 'No online save confirmed yet.';
    const badge=document.getElementById('bd-save-badge');if(badge){badge.textContent=demo?'Demo':status.state==='saved'?'Saved online':status.state==='saving'?'Saving…':'On device';badge.title=status.message;}
  }
  addEventListener('bedo-sync-status',updateSavingStatus);
  let tourActive=false,tourIndex=0,tourOrigin=null;
  const tourSteps=[
    ['calendar','month','Welcome to your bedo','A place for your time and your thoughts.'],
    ['calendar','month','Start with the bigger picture','Open any date to plan that day. Swipe left or right on the Timeblock page to move between Calendar, Day, and Week. 🎯 marks fully completed days; 🎗️ marks unfinished past days.'],
    ['calendar','day','Make time fit your day','Tap the floating logo, then choose Add a block or swipe the input header. Set a start time and Minutes. Tap its title to edit it. You can plan in 5-minute steps rather than whole hours.'],
    ['calendar','day','Move one moment, not your whole week','Drag the ⋮⋮ handle to move a block within its day. Other dates are untouched. Drag near the timeline’s edge to scroll.'],
    ['calendar','week','Repeat only when you want to','New blocks can repeat daily, on weekdays, or weekly for the next 4 weeks. Each occurrence is independent. Week view helps you see how your plan fits together.'],
    ['brainstorm',null,'Give your thoughts somewhere to land','Capture notes here or with the floating logo on any page. Tap it, then swipe across the input header to switch Quick note / Add a block. Hold and drag the logo to move it. “Add to schedule” turns a note into a block without removing the note.'],
    ['insights',null,'See your progress, not just your plans','Check off finished blocks to build your weekly completion and motion stats. Insights follows the week containing the calendar day you selected.'],
    ['settings',null,'Know where everything is saved','Look under “Your saved data” for a confirmed online save time. Offline edits stay on your device and retry when connected. Download a copy any time.'],
    ['settings',null,'Share only the days you choose','Open Sharing to select a start and end date. BEDO creates a live, read-only web link for those days only. Brainstorm notes and the rest of your schedule stay private, and you can disable the link anytime.'],
    ['settings',null,'Make this space yours','Choose a theme or custom hex color, name your categories, and use account controls here. Replay this tour anytime from “How to use app”.']
  ];
  function showTour(){
    const [nextPage,nextView,title,body]=tourSteps[tourIndex];page=nextPage;if(nextView)view=nextView;if(page==='settings')settingsSection=tourIndex===7?'account':tourIndex===8?'sharing':'appearance';render();
    window.scrollTo({top:0});
    dialog(`<span class="bd-kicker">A LITTLE WALKTHROUGH · ${tourIndex+1} / ${tourSteps.length}</span><h2 id="bd-tour-title">${title}</h2><p>${body}</p><div class="bd-tour-progress" aria-hidden="true">${tourSteps.map((_,i)=>`<i class="${i===tourIndex?'active':''}"></i>`).join('')}</div><div class="bd-tour-actions"><button class="bd-secondary" data-action="tour-skip">Skip tour</button>${tourIndex?'<button class="bd-secondary" data-action="tour-back">Back</button>':''}<button class="bd-primary" data-action="tour-next">${tourIndex===tourSteps.length-1?'Finish':'Next'}</button></div>`);
    const layer=document.getElementById('bd-dialog');layer.classList.add('bd-tour-layer');layer.querySelector('[role=dialog]').setAttribute('aria-labelledby','bd-tour-title');layer.querySelector('[data-action=tour-next]').focus({preventScroll:true});
    requestAnimationFrame(()=>positionTour());
  }
  const tourTargets=['.bd-heading','.bd-toolbar','#bd-fab','.bd-timeline','.bd-week-mobile,.bd-week-grid','.bd-note-grid','.bd-stats','#bd-account-card','#bd-sharing-card','#bd-settings'];
  function positionTour(){
    document.querySelectorAll('.bd-tour-highlight').forEach(el=>el.classList.remove('bd-tour-highlight'));
    const layer=document.querySelector('.bd-tour-layer');if(!tourActive||!layer)return;
    const target=Array.from(document.querySelectorAll(tourTargets[tourIndex])).find(el=>el.getBoundingClientRect().height>0)||document.querySelector('.bd-heading');if(!target)return;
    target.classList.add('bd-tour-highlight');
    const top=document.querySelector('.bd-top').getBoundingClientRect().height+12;
    if(target.id!=='bd-fab')window.scrollBy({top:target.getBoundingClientRect().top-top,behavior:'instant'});
    else {
      const fab=target.getBoundingClientRect(),sheetHeight=layer.querySelector('.bd-dialog').offsetHeight;
      target.style.right='auto';target.style.bottom='auto';target.style.left=fab.left+'px';target.style.top=Math.max(top,innerHeight-sheetHeight-fab.height-36)+'px';
    }
    const rect=target.getBoundingClientRect(),sheet=layer.querySelector('.bd-dialog').getBoundingClientRect();
    const frame=document.createElement('div');frame.className='bd-tour-frame';frame.setAttribute('aria-hidden','true');
    layer.querySelector('.bd-tour-frame')?.remove();layer.prepend(frame);
    Object.assign(frame.style,{left:Math.max(4,rect.left-6)+'px',top:Math.max(top-6,rect.top-6)+'px',width:Math.min(innerWidth-8,rect.width+12)+'px',height:Math.max(0,Math.min(rect.bottom+6,sheet.top-14)-Math.max(top-6,rect.top-6))+'px'});
  }
  addEventListener('resize',()=>{if(tourActive)positionTour();});
  function startTour(){tourOrigin={page,view,settingsSection};tourIndex=0;tourActive=true;showTour();}
  function endTour(skipped=false){tourActive=false;write('bedo-tour-state',{version:1,completed:true,skipped});document.getElementById('bd-dialog')?.remove();document.getElementById('bd-fab')?.remove();if(tourOrigin){page=tourOrigin.page;view=tourOrigin.view;settingsSection=tourOrigin.settingsSection;}render();document.querySelector('[data-action=tour]')?.focus({preventScroll:true});}
  function downloadData(recovery=false){
    const account=window.BedoAuth?.currentUser(),snapshot=recovery?read('bedo-recovery-'+account?.sub,null):window.BedoSync?.exportData()||{blocks,ideas,profile};
    if(!snapshot){dialog('<h2>No previous device copy.</h2><p>No replaced local workspace has been kept on this device.</p>');return;}
    const url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=recovery?'bedo-previous-device-copy.json':'bedo-backup.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function settings() {
    const palettes = {ocean:'Blue',berry:'Red',sage:'Green',neutral:'White neutral'};
    return `<section class="bd-heading"><div><span class="bd-kicker">MAKE YOURSELF AT HOME 🏡</span><h1>Your bedo.</h1><p>A personal space, in your colors.</p></div></section><form id="bd-settings" class="bd-card"><label>Display name<input name="name" maxlength="40" value="${esc(profile.name||'')}"></label><h2>A color that feels like you</h2><div class="bd-palettes">${Object.entries(palettes).map(([c,label])=>`<button type="button" data-palette="${c}" class="${c} ${(profile.theme||'sage')===c?'active':''}" aria-label="${label} theme" title="${label}"></button>`).join('')}</div><div class="bd-custom-theme"><label for="bd-custom-hex">Custom color <small>Your color, throughout the whole app.</small></label><div class="bd-custom-color-row"><input id="bd-custom-color" type="color" aria-label="Pick custom theme color" value="${normalizeColor(profile.customColor)||'#7c5ce7'}"><input id="bd-custom-hex" name="customColor" type="text" maxlength="7" spellcheck="false" autocapitalize="off" pattern="#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})" value="${normalizeColor(profile.customColor)||'#7c5ce7'}" aria-describedby="bd-custom-status" placeholder="#7c5ce7"></div><button type="button" class="bd-secondary" data-action="custom-color" aria-pressed="${profile.theme==='custom'}">Use custom color</button><p id="bd-custom-status" role="status">Hex code or color picker. Works in light and dark mode.</p></div><label>Categories <small>Separate with commas. Existing blocks keep their category.</small><input name="categories" value="${esc(categories.join(', '))}" maxlength="200"></label><div class="bd-category-colors"><h2>Category label colors</h2>${categories.map((c,i)=>`<label><span>${esc(c)}</span><input type="color" name="categoryColor${i}" value="${categoryColor(c)}"></label>`).join('')}</div><button class="bd-primary">Save preferences</button></form><section class="bd-card" id="bd-account-card"><h2>Your account</h2><p>${demo?'You’re exploring a disposable demo. No cloud data is changed.':esc(window.BedoAuth?.currentUser()?.email||'Continue with Google for your personal workspace.')}</p>${demo?'<button class="bd-secondary" data-action="exit">Exit demo</button>':'<a class="bd-secondary" href="/login">Sign in with Google</a><button class="bd-secondary" data-action="connect-drive">Connect private Google Drive</button><button class="bd-secondary" data-action="switch">Switch account</button><button class="bd-secondary" data-action="signout">Sign out</button>'}</section>${appGuide()}${savingCard()}${!demo?'<section class="bd-card"><h2>Private until you share</h2><p>Publish a read-only snapshot. Anyone with the link can see it; disable it whenever you like.</p><button class="bd-secondary" data-action="share">Share schedule</button></section>':''}`;
  }
  function shareDialog() {
    const share=read('bedo-share',{}),today=inputDate(dateKey(selected));
    dialog(`<h2>Share selected days live.</h2><p>Only blocks inside this date range are public. Brainstorm notes and the rest of your calendar stay private. The web view updates after your changes save.</p><div class="bd-form-row"><label>From<input id="bd-share-from" type="date" value="${share.from||today}"></label><label>To<input id="bd-share-to" type="date" value="${share.to||today}"></label></div><button class="bd-primary" data-action="publish">${share.token?'Update live access':'Create live web link'}</button>${share.token?'<button class="bd-secondary" data-action="unpublish">Disable current link</button>':''}<p id="bd-share-status" role="status">${share.url?`<a href="${esc(share.url)}" target="_blank" rel="noopener">Open live schedule ↗</a>`:'You decide which days are visible.'}</p>`);
  }
  async function publishShare(disable=false) {
    const status=document.getElementById('bd-share-status'),session=localStorage.getItem('bedo-auth-session'),current=read('bedo-share',{});
    if(!session){status.textContent='Sign in with Google before sharing.';return;}
    const from=document.getElementById('bd-share-from')?.value||current.from,to=document.getElementById('bd-share-to')?.value||current.to;
    if(!disable&&(!from||!to||from>to)){status.textContent='Choose a valid date range.';return;}
    status.textContent=disable?'Disabling link…':'Creating live view…';
    try{
      const fromDay=dayNumber(from),toDay=dayNumber(to),chosen=blocks.filter(b=>dayNumber(b.date)>=fromDay&&dayNumber(b.date)<=toDay).map(({id,title,start,duration,date,category,completed})=>({id,title,start,duration,date,category,completed}));
      const body=disable?{action:'unpublish',session,token:current.token}:{action:'publish',session,token:current.token,data:{profile:{name:profile.name,title:profile.title,categoryColors:profile.categoryColors},blocks:chosen,from,to}};
      const result=await (await fetch(localStorage.getItem('bedo-sync-url')||window.BEDO_API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)})).json();
      if(!result.ok)throw Error(result.error||'Sharing could not be completed.');
      if(disable){localStorage.removeItem('bedo-share');status.textContent='Link disabled.';return;}
      const url=location.origin+'/?share='+encodeURIComponent(result.token),share={token:result.token,url,from,to,live:true};localStorage.setItem('bedo-share',JSON.stringify(share));
      status.innerHTML=`<a href="${esc(url)}" target="_blank" rel="noopener">Open live schedule ↗</a><br><input readonly aria-label="Live schedule link" value="${esc(url)}">`;
      navigator.clipboard?.writeText(url).catch(()=>{});
    }catch(error){status.textContent=error.message;}
  }
  function dialog(content) { document.getElementById('bd-dialog')?.remove(); const layer=document.createElement('div');layer.id='bd-dialog';layer.className='bd-dialog-layer';layer.innerHTML=`<section class="bd-dialog" role="dialog" aria-modal="true"><button class="bd-dialog-close" data-action="close" aria-label="Close dialog">×</button>${content}</section>`;document.body.appendChild(layer);layer.querySelector('input,textarea')?.focus(); }
  function blockDialog(id, text='') {
    const b=blocks.find(b=>b.id===id),day=b?.date||dateKey(selected);
    dialog(`<h2>${b?'Edit this block':'Make a little room.'}</h2><p>${b?'Only this occurrence will change.':'Give something important a place in your day.'}</p><form id="bd-block-form" data-id="${esc(id||'')}"><label>What’s the plan?<input name="title" required maxlength="120" value="${esc(b?.title||text)}" placeholder="A little deep work"></label><label>Day<input name="date" type="date" required value="${inputDate(day)}"></label><div class="bd-form-row"><label>Start time<input name="start" type="time" step="300" required value="${time(b?.start??9)}"></label><label>Minutes<input name="minutes" type="number" min="5" max="1440" step="5" required value="${Math.round((b?.duration??1)*60)}"></label></div><label>Category<select name="category">${[...new Set([...categories,category(b||{})])].map(c=>`<option ${category(b||{})===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>${b?'<p class="bd-help">To create a new repeat series, add a new block. Dragging or editing does not alter other occurrences.</p>':'<label>Repeat<select name="repeat"><option value="none">Does not repeat</option><option value="daily">Daily · next 4 weeks</option><option value="weekdays">Weekdays · next 4 weeks</option><option value="weekly">Weekly · next 4 weeks</option></select></label>'}<div class="bd-form-actions">${b?`<button type="button" class="bd-danger" data-delete-block="${esc(id)}">Delete this block</button>`:''}<button class="bd-primary">Save block</button></div><p class="bd-form-error" role="alert"></p></form>`);
  }
  function noteDialog(id) { const n=ideas.find(n=>n.id===id);dialog(`<h2>A little thought.</h2><p>Ideas, reminders, a maybe. It all belongs here.</p><form id="bd-note-form" data-id="${esc(id||'')}"><label>Your note<textarea name="text" required rows="7" maxlength="10000">${esc(n?.text||'')}</textarea></label><button class="bd-primary">Save note</button></form>`); }
  document.addEventListener('submit',event=>{
    const form=event.target;if(!['bd-block-form','bd-note-form','bd-settings'].includes(form.id))return;event.preventDefault();const values=new FormData(form);
    if(form.id==='bd-block-form') {
      const [h,m]=String(values.get('start')).split(':').map(Number),start=h+m/60,duration=Number(values.get('minutes'))/60;
      if(!values.get('title').trim()||!Number.isFinite(start)||duration<=0||start+duration>24){form.querySelector('.bd-form-error').textContent='Keep the block inside this day, ending by midnight.';return;}
      const d=fromKey(values.get('date')),date=dateKey(d),id=form.dataset.id,old=blocks.find(b=>b.id===id);
      const record={...old,id:id||uid(),title:values.get('title').trim(),start,duration,date,category:values.get('category'),completed:old?.completed||false};
      if(id) blocks=blocks.map(b=>b.id===id?record:b);else {
        const repeat=values.get('repeat');record.recurring=repeat!=='none';blocks.push(record);
        for(let i=1;i<28&&repeat!=='none';i++){const next=new Date(d);next.setDate(d.getDate()+i);if(repeat==='weekly'&&i%7!==0||repeat==='weekdays'&&[0,6].includes(next.getDay()))continue;blocks.push({...record,id:uid(),date:dateKey(next),recurring:true});}
      }
      selected=d;view='day';page='calendar';
    } else if(form.id==='bd-note-form') { const text=values.get('text').trim();if(!text)return;const id=form.dataset.id;if(id)ideas=ideas.map(n=>n.id===id?{...n,text}:n);else ideas.unshift({id:uid(),text,created:new Date().toISOString()}); }
    else { if(profile.theme==='custom'){const color=normalizeColor(values.get('customColor'));if(!color)return;profile={...profile,customColor:color};} profile={...profile,name:values.get('name').trim(),categories:[...new Set(values.get('categories').split(',').map(c=>c.trim()).filter(Boolean))].slice(0,12)};categories=profile.categories.length?profile.categories:['Personal','Work'];profile.categories=categories;profile.categoryColors=Object.fromEntries(categories.map((c,i)=>[c,normalizeColor(values.get('categoryColor'+i))||profile.categoryColors?.[c]||defaultCategoryColors[i%4]]));write('bedo-profile',profile); }
    save();document.getElementById('bd-dialog')?.remove();render();
  });
  document.addEventListener('click',async event=>{
    const b=event.target.closest('button,a');if(!b)return;
    if(b.dataset.page){page=b.dataset.page;render();window.scrollTo(0,0);}
    if(b.dataset.view){view=b.dataset.view;render();window.scrollTo(0,0);}
    if(b.dataset.date){selected=fromKey(b.dataset.date);month=new Date(selected);view='day';render();window.scrollTo(0,0);}
    if(b.dataset.weekDate){selected=fromKey(b.dataset.weekDate);render();window.scrollTo(0,0);}
    if(b.dataset.filter){filter=b.dataset.filter;render();}
    if(b.dataset.edit)blockDialog(b.dataset.edit);
    if(b.dataset.complete){blocks=blocks.map(x=>x.id===b.dataset.complete?{...x,completed:!x.completed}:x);save();render();}
    if(b.dataset.deleteBlock){blocks=blocks.filter(x=>x.id!==b.dataset.deleteBlock);save();document.getElementById('bd-dialog')?.remove();render();}
    if(b.dataset.scheduleNote){const n=ideas.find(n=>n.id===b.dataset.scheduleNote);blockDialog(null,n?.text.slice(0,120));}
    if(b.dataset.editNote)noteDialog(b.dataset.editNote);
    if(b.dataset.deleteNote&&confirm('Delete this note?')){ideas=ideas.filter(n=>n.id!==b.dataset.deleteNote);save();render();}
    if(b.dataset.palette){profile={...profile,theme:b.dataset.palette};write('bedo-profile',profile);setTheme();document.querySelectorAll('.bd-palettes [data-palette]').forEach(p=>p.classList.toggle('active',p===b));document.querySelector('[data-action="custom-color"]')?.setAttribute('aria-pressed','false');const field=document.getElementById('bd-custom-hex');if(field&&!normalizeColor(field.value)){field.value=normalizeColor(profile.customColor)||'#7c5ce7';field.removeAttribute('aria-invalid');}}
    const action=b.dataset.action;
    if(action==='earlier-month')addMonth(true);if(action==='later-month')for(let i=0;i<3;i++)addMonth();
    if(b.dataset.settingsSection){settingsSection=b.dataset.settingsSection;render();window.scrollTo({top:0});root.querySelector(`[data-settings-section="${settingsSection}"]`).focus({preventScroll:true});}
    if(action==='share-day')dayShareDialog();
    if(action==='copy-day'){const field=document.getElementById('bd-rundown'),status=document.getElementById('bd-rundown-status');try{await navigator.clipboard.writeText(field.value);status.textContent='Copied. Paste it into any chat.';}catch{field.focus();field.select();status.textContent='Select and copy the text above to share it.';}}
    if(action==='tour')startTour();
    if(action==='tour-next'){if(tourIndex===tourSteps.length-1)endTour();else{tourIndex++;showTour();}}
    if(action==='tour-back'){tourIndex=Math.max(0,tourIndex-1);showTour();}
    if(action==='tour-skip'||action==='close'&&tourActive)endTour(true);
    if(action==='sync-now'){window.BedoSync?.changed();window.BedoSync?.saveNow();}
    if(action==='connect-drive'){const status=document.getElementById('bd-save-status');if(status)status.textContent='Opening Google Drive permission…';await window.BedoSync?.connect();updateSavingStatus();}
    if(action==='export')downloadData();if(action==='recovery')downloadData(true);
    if(action==='custom-color'){
      const field=document.getElementById('bd-custom-hex'),color=normalizeColor(field.value),status=document.getElementById('bd-custom-status');
      if(!color){status.textContent='Enter a valid hex color, like #7C5CE7.';field.setAttribute('aria-invalid','true');field.focus();return;}
      field.value=color;field.removeAttribute('aria-invalid');document.getElementById('bd-custom-color').value=color;
      profile={...profile,theme:'custom',customColor:color};write('bedo-profile',profile);setTheme();
      document.querySelectorAll('.bd-palettes [data-palette]').forEach(p=>p.classList.remove('active'));b.setAttribute('aria-pressed','true');status.textContent='Your custom color is applied and saved.';
    }
    if(action==='close')document.getElementById('bd-dialog')?.remove();
    if(action==='exit')window.BedoDemo?.exit();if(action==='switch')window.BedoAuth?.switchAccount();if(action==='signout')window.BedoAuth?.signOut();
    if(action==='share')shareDialog();if(action==='publish')publishShare();if(action==='unpublish')publishShare(true);
    if(action==='theme'){write('bedo-theme',read('bedo-theme','light')==='dark'?'light':'dark');render();}
    if(action==='today'){selected=new Date();month=new Date();render();}
    if(action==='prev'||action==='next'){const delta=action==='prev'?-1:1;if(view==='month')month=new Date(month.getFullYear(),month.getMonth()+delta,1);else selected.setDate(selected.getDate()+delta*(view==='week'?7:1));render();}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(tourActive)endTour(true);else document.getElementById('bd-dialog')?.remove();}});
  document.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;const layer=document.getElementById('bd-dialog');if(!layer)return;
    const controls=Array.from(layer.querySelectorAll('button,a[href],input,select,textarea')).filter(el=>!el.disabled&&el.getClientRects().length);
    if(!controls.length)return;const first=controls[0],last=controls[controls.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
  document.addEventListener('input',event=>{
    if(!['bd-custom-color','bd-custom-hex'].includes(event.target.id))return;
    const field=document.getElementById('bd-custom-hex'),picker=document.getElementById('bd-custom-color');
    if(event.target===picker)field.value=picker.value;else {const color=normalizeColor(field.value);if(color)picker.value=color;}
    field.removeAttribute('aria-invalid');document.getElementById('bd-custom-status').textContent='Choose “Use custom color” to apply and save.';
  });
  document.addEventListener('pointerdown',event=>{
    const handle=event.target.closest('[data-drag]');if(!handle||event.button!==0)return;
    const block=blocks.find(b=>b.id===handle.dataset.drag),element=handle.closest('.bd-block'),track=element.parentElement;
    const timeline=track.parentElement;
    drag={id:block.id,date:block.date,start:Number(block.start),duration:Number(block.duration),y:event.clientY,height:Number(track.dataset.hourHeight),element,handle,pointer:event.pointerId,moved:false,timeline,scrollStart:window.scrollY};handle.setPointerCapture(event.pointerId);element.classList.add('dragging');event.preventDefault();
  });
  document.addEventListener('pointermove',event=>{
    if(!drag||drag.pointer!==event.pointerId)return;
    if(event.clientY<root.querySelector('.bd-top').offsetHeight+35)window.scrollBy(0,-12);
    if(event.clientY>innerHeight-(innerWidth<=760?105:35))window.scrollBy(0,12);
    const delta=event.clientY-drag.y+window.scrollY-drag.scrollStart;
    drag.next=Math.max(0,Math.min(24-drag.duration,Math.round((drag.start+delta/drag.height)*12)/12));drag.moved ||= Math.abs(delta)>3;drag.element.style.top=drag.next*drag.height+'px';
  });
  document.addEventListener('pointerup',event=>{
    if(!drag||drag.pointer!==event.pointerId)return;
    if(drag.moved)blocks=blocks.map(b=>b.id===drag.id&&b.date===drag.date?{...b,start:drag.next}:b);
    drag=null;save();render();
  });
  document.addEventListener('pointercancel',()=>{if(drag){drag=null;render();}});
  let viewSwipe=null;
  document.addEventListener('pointerdown',event=>{if(page!=='calendar'||event.target.closest('button,a,input,select,textarea,.bd-block'))return;viewSwipe={id:event.pointerId,x:event.clientX,y:event.clientY};});
  document.addEventListener('pointerup',event=>{if(!viewSwipe||viewSwipe.id!==event.pointerId)return;const dx=event.clientX-viewSwipe.x,dy=event.clientY-viewSwipe.y;viewSwipe=null;if(Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.4)return;const views=['month','day','week'],index=views.indexOf(view),next=Math.max(0,Math.min(2,index+(dx<0?1:-1)));if(next!==index){view=views[next];render();window.scrollTo(0,0);}});
  let deviceDay = dateKey(new Date());
  function tick(){
    const now=new Date(),today=dateKey(now);
    if(today!==deviceDay){
      const previous=deviceDay;deviceDay=today;
      if(demo && window.BedoDemo?.refresh()) blocks=read('bedo-blocks',[]);
      if(dateKey(selected)===previous){selected=now;month=new Date(now);}
      render();return;
    }
    const clock=document.getElementById('bd-clock');if(clock)clock.textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    document.querySelectorAll('.bd-now').forEach(line=>{line.style.top=(now.getHours()+now.getMinutes()/60)*Number(line.parentElement.dataset.hourHeight)+'px';});
  }
  setInterval(tick,1000);
  function quickInput(initial=read('bedo-quick-action','note')){
    let mode=initial==='block'?'block':'note';
    const drafts={};
    function open(){
      if(mode==='block')blockDialog();else noteDialog();
      const layer=document.getElementById('bd-dialog'),panel=layer.querySelector('.bd-dialog'),form=panel.querySelector('form');
      layer.classList.add('bd-quick-layer');
      if(drafts[mode])for(const [key,value] of Object.entries(drafts[mode])){const field=form.elements.namedItem(key);if(field)field.value=value;}
      const header=document.createElement('div');header.className='bd-quick-header';
      header.innerHTML='<div class="bd-quick-tabs" role="group" aria-label="Quick input type"><button type="button" data-quick-mode="note" aria-pressed="'+(mode==='note')+'">Quick note</button><button type="button" data-quick-mode="block" aria-pressed="'+(mode==='block')+'">Add a block</button></div><p class="bd-swipe-hint">↔ Swipe across this header to change input</p>';
      panel.prepend(header);
      const change=next=>{if(next===mode)return;drafts[mode]=Object.fromEntries(new FormData(form));mode=next;write('bedo-quick-action',mode);open();document.querySelector('[data-quick-mode="'+mode+'"]').focus({preventScroll:true});};
      let start=null,swiped=false;
      header.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{if(!swiped)change(button.dataset.quickMode);}));
      header.addEventListener('pointerdown',e=>{swiped=false;start={x:e.clientX,y:e.clientY,id:e.pointerId};if(!e.target.closest('button'))header.setPointerCapture(e.pointerId);});
      header.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>24&&Math.abs(dy)<24){swiped=true;change(mode==='note'?'block':'note');}});
      header.addEventListener('pointercancel',()=>{start=null;});
      header.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();change(mode==='note'?'block':'note');}});
    }
    open();
  }
  function mountNoteButton(){
    if(document.getElementById('bd-fab'))return;
    const fab=document.createElement('button');fab.id='bd-fab';fab.className='bd-fab bd-quick-logo';fab.setAttribute('aria-label','Open Quick note or Add a block. Hold and drag to move.');fab.title='Quick input · hold and drag to move';fab.innerHTML=logo();document.body.appendChild(fab);
    const place=(x,y)=>{fab.style.right='auto';fab.style.bottom='auto';fab.style.left=Math.max(8,Math.min(innerWidth-fab.offsetWidth-8,x))+'px';fab.style.top=Math.max(72,Math.min(innerHeight-fab.offsetHeight-(innerWidth<=760?86:8),y))+'px';};
    const position=read('bedo-quick-note-position',null);if(position)place(position.x,position.y);
    let pointer=null,suppress=false;
    fab.addEventListener('pointerdown',e=>{if(e.button!==0)return;const rect=fab.getBoundingClientRect();pointer={id:e.pointerId,x:e.clientX,y:e.clientY,left:rect.left,top:rect.top,time:performance.now()};suppress=false;fab.setPointerCapture(e.pointerId);});
    fab.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;if(Math.hypot(dx,dy)>6){suppress=true;if(performance.now()-pointer.time>=300||Math.abs(dy)>22)place(pointer.left+dx,pointer.top+dy);}});
    fab.addEventListener('pointerup',()=>{if(suppress)write('bedo-quick-note-position',{x:fab.offsetLeft,y:fab.offsetTop});pointer=null;});
    fab.addEventListener('pointercancel',()=>{pointer=null;suppress=true;});
    fab.addEventListener('click',()=>{if(suppress){suppress=false;return;}quickInput();});
    addEventListener('resize',()=>{if(fab.style.left)place(fab.offsetLeft,fab.offsetTop);});
    mountIdleHint(fab);
  }
  let idleHintTimer=null,idleDismissTimer=null,lastHintAt=-Infinity,hintIndex=0;
  function mountIdleHint(fab){
    clearTimeout(idleHintTimer);
    const bubble=document.getElementById('bd-idle-hint')||document.createElement('div');bubble.id='bd-idle-hint';bubble.className='bd-idle-hint';bubble.hidden=true;bubble.setAttribute('role','status');if(!bubble.isConnected)document.body.appendChild(bubble);
    function reset(){bubble.hidden=true;clearTimeout(idleHintTimer);clearTimeout(idleDismissTimer);idleHintTimer=setTimeout(()=>{
      if(!fab.isConnected||document.hidden||tourActive||document.getElementById('bd-dialog')||document.body.classList.contains('bd-landing-open'))return;
      if(performance.now()-lastHintAt<180000){reset();return;}
      lastHintAt=performance.now();bubble.textContent=['Got a thought to write?','Need a block to add?'][hintIndex++%2];bubble.hidden=false;
      const rect=fab.getBoundingClientRect(),left=Math.max(8,Math.min(innerWidth-bubble.offsetWidth-8,rect.left+rect.width/2-bubble.offsetWidth/2));
      bubble.style.left=left+'px';bubble.style.top=Math.max(8,rect.top-bubble.offsetHeight-12)+'px';bubble.style.setProperty('--hint-arrow',rect.left+rect.width/2-left+'px');
      idleDismissTimer=setTimeout(reset,7000);
    },45000);}
    if(window.bedoIdleController)window.bedoIdleController.abort();const controller=new AbortController();window.bedoIdleController=controller;
    for(const event of ['pointerdown','pointermove','keydown','scroll','visibilitychange'])document.addEventListener(event,reset,{passive:true,capture:true,signal:controller.signal});
    reset();
  }
  function landing() {
    const screen=document.getElementById('bedo-login');if(!screen)return;
    const google=screen.querySelector('#bedo-google-button'),note=screen.querySelector('.login-note');
    document.body.classList.add('bd-landing-open');screen.className='bd-landing';screen.innerHTML=`<nav class="bd-landing-nav"><a class="bd-brand" href="/"><span class="bd-logo">${logo()}</span>bedo.</a><div><a href="#features">Features</a><a href="#support">Support</a><a href="/login" class="bd-secondary">Sign in</a></div></nav><section class="bd-hero"><span class="bd-pill">A little structure. A lot more breathing room. 🌱</span><h1>Make time feel<br>like <span>yours again.</span></h1><p>A bright little planner for your thoughts, your time,<br class="bd-desktop-break"> and all the things that make a day feel like you.</p><div class="bd-hero-actions"><button class="bd-primary" id="bd-demo-cta">Try the demo app <span>↗</span></button><a class="bd-secondary" href="/login">Continue with Google</a></div><small>No pressure. Explore with a disposable demo.</small><div class="bd-preview"><div class="bd-preview-nav"><span class="bd-logo">${logo()}</span><b>Your little daily space</b><span>☀️</span></div><div class="bd-preview-content"><div class="bd-preview-left"><span>THURSDAY, YOUR WAY</span><h2>Make room for<br>what matters.</h2><div class="bd-mini-days">${['M','T','W','T','F','S','S'].map((d,i)=>`<span class="${i===3?'active':''}">${d}<b>${14+i}</b></span>`).join('')}</div><div class="bd-preview-thought"><span>💭 A little thought</span><p>That idea for the weekend?<br>Give it a little space.</p></div></div><div class="bd-preview-plan"><article class="lavender"><small>9:10 — 10:25 · Work</small><b>Focus on the good stuff ✨</b></article><article class="peach"><small>11:35 — 12:05 · Wellness</small><b>A walk. A breath. A reset. 🌿</b></article><article class="mint"><small>13:15 — 14:40 · Personal</small><b>Build the next little thing ☀️</b></article></div></div></div></section><section class="bd-bedo-intro" aria-labelledby="bedo-intro-title"><span class="bd-kicker">A LITTLE DIFFERENT. STILL YOU.</span><h2 id="bedo-intro-title">Which one are you?</h2><div class="bd-bedo-types"><article><h3>Do you DO BE DO BE DO?</h3><p>Jump in. Figure it out. Keep going.</p></article><span class="bd-bedo-or">or</span><article><h3>Do you BE DO BE DO BE?</h3><p>Think it through. Then make it happen.</p></article></div><p class="bd-bedo-either">Either way, BEDO.</p><p class="bd-bedo-meaning">Brainstorm. Envision. Do. Observe.</p></section><section id="features" class="bd-landing-features"><span class="bd-kicker">SIMPLE ON PURPOSE</span><h2>A place for the whole day.<br>Not just the busy parts.</h2><div>${[['🗓️','See the bigger picture','Start with your calendar. Open a day and shape it with flexible blocks.'],['💭','Let your thoughts breathe','Capture notes in Brainstorm, then give the right ideas a place in your schedule.'],['💼','Every part of your life','Personal, work, study, or something all your own. Categories keep your view focused.'],['↗️','Notice your momentum','Weekly completion and motion help you see progress without the pressure.'],['🪴','Move with real life','Drag a block to a new time. Repeated days stay just as you planned them.'],['🔒','A personal little space','Continue with Google for your own workspace. Demo changes stay in the demo.']].map(([i,t,p])=>`<article><span>${i}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></section><section id="support" class="bd-landing-price bd-support"><span class="bd-pill">A LITTLE SUPPORT ✨</span><h2>Enjoying BEDO?</h2><p>BEDO is a small independent project and free to use.<br>If you’d like to support its development, you can leave a little something for future updates.</p><div class="bd-support-actions"><a class="bd-primary" href="https://teer.id/danovski_" target="_blank" rel="noopener">🇮🇩 Support locally · Trakteer ↗</a><a class="bd-secondary" href="https://ko-fi.com/danovski_" target="_blank" rel="noopener">🌏 Support internationally · Ko-fi ↗</a></div><small>Thank you for your support!</small></section><section class="bd-google-entry"><h2>Your day, privately yours.</h2><p>Use your Google account to continue.</p><div id="bd-google-slot"></div></section><footer class="bd-landing-footer">bedo. <span>A little space for your day. ☀️</span></footer>`;
    const supportActions=screen.querySelector('.bd-support-actions'),supportTitle=document.createElement('h3');
    supportTitle.textContent='Support with Trakteer or Ko-fi';supportActions.before(supportTitle);
    const supportLinks=supportActions.querySelectorAll('a');
    supportLinks[0].setAttribute('aria-label','Support BEDO with Trakteer');supportLinks[0].title='Trakteer';supportLinks[0].innerHTML='<svg class="bd-support-logo bd-trakteer-logo" viewBox="0 0 80 64" role="img" aria-label="Trakteer"><circle cx="28" cy="9" r="6"/><circle cx="47" cy="7" r="4"/><path d="M17 18h44l-5 37c-.5 4-4 7-8 7H30c-4 0-7.5-3-8-7z"/><path class="heart" d="M39 49S26 41 26 32c0-7 9-9 13-3 4-6 13-4 13 3 0 9-13 17-13 17z"/></svg>';
    supportLinks[1].setAttribute('aria-label','Support BEDO with Ko-fi');supportLinks[1].title='Ko-fi';supportLinks[1].innerHTML='<svg class="bd-support-logo bd-kofi-logo" viewBox="0 0 88 64" role="img" aria-label="Ko-fi"><path d="M8 14h58v31c0 10-8 17-18 17H26C16 62 8 55 8 45z"/><path class="handle" d="M66 20h5c17 0 17 25 0 25h-5"/><path class="heart" d="M37 46S20 36 20 25c0-9 12-12 17-4 5-8 17-5 17 4 0 11-17 21-17 21z"/></svg>';
    screen.querySelector('.bd-hero>small').textContent='Try out the demo and see how it works.';
    const anywhere=document.createElement('section');anywhere.className='bd-anywhere';anywhere.innerHTML='<span class="bd-pill">NO APP STORE NEEDED</span><h2>Use BEDO anywhere.</h2><p>Open it in your browser or install it from the browser to your home screen. Your device copy stays available online or offline—even in airplane mode. Cloud saving and live sharing resume when you reconnect.</p><div><span>🌐 Use in your browser</span><span>📲 Install from the browser</span><span>✈️ Plan offline</span></div>';screen.querySelector('#support').before(anywhere);
    if(location.pathname!=='/login'&&!google.children.length)google.innerHTML='<a class="button" href="/login">Continue with Google</a>';
    document.getElementById('root').inert=true;screen.querySelector('#bd-google-slot').append(google,note);screen.querySelector('#bd-demo-cta').addEventListener('click',()=>window.BedoDemo.enter());
    if(location.pathname==='/login')screen.querySelector('.bd-google-entry').scrollIntoView();
  }
  const shared=new URLSearchParams(location.search).get('share');
  if(shared){
    root.innerHTML='<div class="bd-empty">Loading shared schedule…</div>';
    const loadShared=()=>fetch((localStorage.getItem('bedo-sync-url')||window.BEDO_API_URL)+'?action=public&token='+encodeURIComponent(shared)+'&t='+Date.now()).then(r=>r.json()).then(r=>{
      if(!r.ok)throw Error(r.error);const data=r.data||{};profile={...profile,...(data.profile||{})};const items=(data.blocks||[]).sort((a,b)=>a.date.localeCompare(b.date)||a.start-b.start),dates=[...new Set(items.map(b=>b.date))];
      root.innerHTML=`<main class="bd-shared"><span class="bd-logo">${logo()}</span><p class="bd-kicker">LIVE READ-ONLY SCHEDULE</p><h1>${esc(data.profile?.title||data.profile?.name||'Shared bedo')}</h1><p>${esc(data.from||'')} ${data.to&&data.to!==data.from?'– '+esc(data.to):''}</p>${dates.map(date=>`<section><h2>${esc(date)}</h2>${items.filter(b=>b.date===date).map(b=>`<article class="bd-card" style="${blockColorStyle(category(b))}"><small>${clockTime(b.start)} – ${clockTime(b.start+b.duration)} · ${esc(category(b))}</small><h3>${esc(b.title)}</h3></article>`).join('')}</section>`).join('')||'<div class="bd-empty">No blocks are shared for these days.</div>'}<p class="bd-help">This live view refreshes automatically.</p></main>`;
    }).catch(e=>root.innerHTML=`<div class="bd-empty">${esc(e.message)}</div>`);
    loadShared();setInterval(loadShared,60000);return;
  }
  function openWorkspace(){
    blocks=read('bedo-blocks',[]);ideas=read('bedo-ideas',[]);profile=read('bedo-profile',{});categories=profile.categories||['Personal','Work','Wellness','Study'];render();landing();
    if(!demo&&!tourActive&&localStorage.getItem('bedo-auth-session')&&!read('bedo-tour-state',{}).completed&&!document.getElementById('bedo-login'))startTour();
  }
  function loadingFailed(){root.innerHTML='<main class="bd-shared"><h1>Your device copy is safe.</h1><p>We could not open your saved cloud workspace. Retry before editing so we do not overwrite it with an empty plan.</p><button class="bd-primary" id="bd-retry-workspace">Retry</button><button class="bd-secondary" data-action="export">Download device copy</button><button class="bd-secondary" data-action="signout">Sign out</button></main>';document.getElementById('bd-retry-workspace').onclick=async()=>{if(await window.BedoSync.initialize())openWorkspace();else loadingFailed();};}
  openWorkspace();
  if(!demo&&localStorage.getItem('bedo-auth-session')&&!document.getElementById('bedo-login')) window.BedoSync.ready.then(ok=>{if(ok)openWorkspace();});
  addEventListener('bedo-workspace-ready',openWorkspace);
})();
