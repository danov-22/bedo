/* Blockday's responsive UI. Stored start/duration values remain hours for backend compatibility. */
(function () {
  'use strict';
  const root = document.getElementById('root');
  const demo = new URLSearchParams(location.search).has('demo');
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateKey = d => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  const fromKey = key => { const [y,m,d] = key.split('-').map(Number); return new Date(y,m-1,d,12); };
  const inputDate = key => key.split('-').map((s,i) => i ? s.padStart(2,'0') : s).join('-');
  const dateLabel = (d, options) => d.toLocaleDateString(undefined, options);
  const time = hours => { const n = Math.round(hours*60); return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`; };
  const clockTime = hours => { const n=Math.round(hours*60); return new Date(2000,0,1,Math.floor(n/60),n%60).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}); };
  const uid = () => crypto.randomUUID ? crypto.randomUUID() : `b-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const icons = { calendar:'▦', brainstorm:'✎', insights:'↗', settings:'⚙' };
  let blocks = read('blockday-blocks', []), ideas = read('blockday-ideas', []);
  let profile = read('blockday-profile', {});
  let categories = profile.categories || ['Personal','Work','Wellness','Study'];
  let page = ['brainstorm','insights','settings'].includes(location.pathname.slice(1)) ? location.pathname.slice(1) : 'calendar';
  let view = 'month', selected = new Date(), month = new Date(), filter = 'All', drag = null;
  const category = block => block.category || (block.color === 'blue' ? 'Work' : block.color === 'gold' ? 'Wellness' : 'Personal');
  const tint = cat => ['mint','lavender','peach','blue'][Math.max(0,categories.indexOf(cat))%4];
  const visible = day => blocks.filter(b => b.date === dateKey(day) && (filter==='All' || category(b)===filter));
  function save() { write('blockday-blocks',blocks); write('blockday-ideas',ideas); }
  function setTheme() {
    if (profile.theme === 'sand') { profile = {...profile, theme:'neutral'}; write('blockday-profile',profile); }
    document.documentElement.dataset.mode = read('blockday-theme','light');
    document.documentElement.dataset.palette = profile.theme || 'sage';
  }
  function dayCompleted(day) {
    const all = blocks.filter(b => b.date === dateKey(day));
    return all.length > 0 && all.every(b => b.completed === true);
  }
  function nav() { return ['calendar','brainstorm','insights','settings'].map(p => `<button data-page="${p}" class="${page===p?'active':''}"><span aria-hidden="true">${icons[p]}</span>${p==='calendar'?'Timeblock':p[0].toUpperCase()+p.slice(1)}</button>`).join(''); }
  function render() {
    const scrollPositions = new Map(Array.from(document.querySelectorAll('.bd-day-track')).map(track=>[track.dataset.trackDate,track.parentElement.scrollTop]));
    setTheme();
    root.innerHTML = `<div class="bd-shell"><aside class="bd-sidebar"><a class="bd-brand" href="/"><span class="bd-logo"></span>blockday<span class="bd-brand-dot">.</span></a><p>A little space for your day.</p><nav>${nav()}</nav><div class="bd-sidebar-note">Make room for life.<br>Not just your to-do list. ☀️</div></aside><main class="bd-main"><header class="bd-top"><a class="bd-logo" href="/" aria-label="Blockday home"></a><div class="bd-top-actions">${demo?'<button class="bd-exit" data-action="exit">← Exit demo</button>':''}<time id="bd-clock"></time><button class="bd-icon" data-action="theme" aria-label="Toggle light or dark theme">${read('blockday-theme','light')==='dark'?'☀':'☾'}</button></div></header><div class="bd-content">${page==='calendar'?calendar():page==='brainstorm'?brainstorm():page==='insights'?insights():settings()}</div></main><nav class="bd-mobile-nav">${nav()}</nav></div>`;
    tick(); mountNoteButton();
    requestAnimationFrame(() => document.querySelectorAll('.bd-timeline').forEach(timeline => {
      const track=timeline.querySelector('.bd-day-track');
      const list=blocks.filter(b=>b.date===track.dataset.trackDate);
      const first=list.length?Math.max(0,Math.min(...list.map(b=>Number(b.start)))-1):7;
      timeline.scrollTop=scrollPositions.get(track.dataset.trackDate) ?? first*Number(track.dataset.hourHeight);
    }));
  }
  function filters() { return `<div class="bd-filters" aria-label="Filter blocks by category">${['All',...categories].map(c=>`<button data-filter="${esc(c)}" class="${filter===c?'active':''}">${c!=='All'?`<i class="${tint(c)}"></i>`:''}${esc(c)}</button>`).join('')}</div>`; }
  function calendar() {
    const title = view==='month' ? 'A little space for everything.' : dateLabel(selected,{weekday:'long',month:'long',day:'numeric'});
    return `<section class="bd-heading"><div><span class="bd-kicker">YOUR TIME, YOUR PACE ✨</span><h1>${title}</h1><p>${view==='month'?'Pick a day. Make room for what matters.':'A flexible plan. Not a perfect one.'}</p></div><button class="bd-primary" data-action="add">＋ Add block</button></section><div class="bd-toolbar"><div class="bd-segments">${['month','day','week'].map(v=>`<button data-view="${v}" class="${view===v?'active':''}">${v==='month'?'Calendar':v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</div><div class="bd-date-nav"><button data-action="prev" aria-label="Previous period">‹</button><strong>${view==='month'?dateLabel(month,{month:'long',year:'numeric'}):view==='week'?'Week of '+dateLabel(monday(),{month:'short',day:'numeric'}):dateLabel(selected,{month:'short',day:'numeric'})}</strong><button data-action="next" aria-label="Next period">›</button><button data-action="today">Today</button></div></div>${filters()}${view==='month'?monthCalendar():view==='week'?weekCalendar():dayCalendar(selected)}<p class="bd-help">${view==='month'?'Tap any date to explore and plan your day.':'Drag the ⋮⋮ handle to move a block. Changes apply to this occurrence only.'}</p>`;
  }
  function monthCalendar() {
    const first=new Date(month.getFullYear(),month.getMonth(),1), offset=(first.getDay()+6)%7;
    const start=new Date(first); start.setDate(1-offset);
    let html='<div class="bd-month">'+['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d=>`<div class="bd-month-head">${d}</div>`).join('');
    for(let i=0;i<42;i++) {
      const d=new Date(start);d.setDate(start.getDate()+i);const list=visible(d),complete=dayCompleted(d);
      html+=`<button class="bd-month-day ${d.getMonth()!==month.getMonth()?'muted':''} ${dateKey(d)===dateKey(new Date())?'today':''}" data-date="${dateKey(d)}" aria-label="${esc(dateLabel(d,{dateStyle:'full'}))}, ${list.length} blocks${complete?', All blocks completed. Nice work!':''}"><span>${d.getDate()}</span>${complete?'<i class="bd-day-celebration" role="img" aria-label="All blocks completed. Nice work!" title="All done. A little win worth celebrating!">😊</i>':''}<div class="bd-day-dots">${list.slice(0,3).map(b=>`<i class="${tint(category(b))}"></i>`).join('')}</div><div class="bd-month-events">${list.slice(0,2).map(b=>`<small class="${tint(category(b))}">${esc(b.title)}</small>`).join('')}${list.length>2?`<em>+${list.length-2} more</em>`:''}</div></button>`;
    }
    return html+'</div>';
  }
  function monday() { const d=new Date(selected);d.setDate(d.getDate()-(d.getDay()+6)%7);return d; }
  function weekCalendar() {
    const start=monday(); return `<div class="bd-week-strip">${Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return `<button data-week-date="${dateKey(d)}" class="${dateKey(d)===dateKey(selected)?'active':''}"><span>${dateLabel(d,{weekday:'short'})}</span><b>${d.getDate()}</b><small>${visible(d).length} blocks</small></button>`;}).join('')}</div><div class="bd-week-grid">${Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return `<section><h3>${dateLabel(d,{weekday:'short',day:'numeric'})}</h3>${dayCalendar(d,true)}</section>`;}).join('')}</div><div class="bd-week-mobile">${dayCalendar(selected)}</div>`;
  }
  function dayCalendar(day, compact=false) {
    const list=visible(day), height=compact?50:72;
    return `<div class="bd-timeline ${compact?'compact':''}" style="--hour:${height}px"><div class="bd-time-axis">${Array.from({length:24},(_,h)=>`<span>${compact?String(h).padStart(2,'0'):clockTime(h)}</span>`).join('')}</div><div class="bd-day-track" data-track-date="${dateKey(day)}" data-hour-height="${height}">${list.map(b=>`<article class="bd-block ${tint(category(b))} ${b.completed?'done':''}" data-block="${esc(b.id)}" style="top:${Number(b.start)*height}px;height:${Math.max(42,Number(b.duration)*height-3)}px"><button class="bd-drag" data-drag="${esc(b.id)}" aria-label="Drag ${esc(b.title)} to a new time">⋮⋮</button><button class="bd-block-body" data-edit="${esc(b.id)}"><strong>${esc(b.title)}</strong><small>${clockTime(b.start)} · ${Math.round(b.duration*100)/100}h</small><em>${esc(category(b))}</em></button><button class="bd-check" data-complete="${esc(b.id)}" aria-label="${b.completed?'Mark incomplete':'Complete'} ${esc(b.title)}">${b.completed?'✓':'○'}</button></article>`).join('')}${dateKey(day)===dateKey(new Date())?`<div class="bd-now" style="top:${(new Date().getHours()+new Date().getMinutes()/60)*height}px"></div>`:''}</div></div>${!list.length&&!compact?'<div class="bd-empty">A little breathing room 🌱<p>Add a block to shape this day.</p></div>':''}`;
  }
  function brainstorm() { return `<section class="bd-heading"><div><span class="bd-kicker">LESS IN YOUR HEAD 🧠</span><h1>Room for your thoughts.</h1><p>Capture the messy middle. Give an idea a time when you’re ready.</p></div><button class="bd-primary" data-action="note">＋ New note</button></section><div class="bd-note-grid">${ideas.map(n=>`<article class="bd-note"><span class="bd-note-label">A LITTLE THOUGHT</span><p>${esc(n.text)}</p><div><button data-schedule-note="${esc(n.id)}">↗ Add to schedule</button><button data-edit-note="${esc(n.id)}" aria-label="Edit note">Edit</button><button data-delete-note="${esc(n.id)}" aria-label="Delete note">×</button></div></article>`).join('')||'<div class="bd-empty">Start with a thought ✍️<p>No sorting required. This is your space.</p></div>'}</div>`; }
  function insights() {
    const start=monday(),days=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return d;});
    const week=blocks.filter(b=>days.some(d=>b.date===dateKey(d))),done=week.filter(b=>b.completed),hours=done.reduce((sum,b)=>sum+Number(b.duration||0),0);
    return `<section class="bd-heading"><div><span class="bd-kicker">PROGRESS, NOT PRESSURE 🌻</span><h1>Your week, in motion.</h1><p>${dateLabel(start,{month:'short',day:'numeric'})} – ${dateLabel(days[6],{month:'short',day:'numeric'})}. Small steps add up.</p></div></section><div class="bd-stats"><article><span>Completed blocks</span><strong>${done.length}<small> / ${week.length}</small></strong></article><article><span>Weekly completion</span><strong>${week.length?Math.round(done.length/week.length*100):0}%</strong></article><article><span>Completed time</span><strong>${Math.round(hours*100)/100}<small>h</small></strong></article></div><section class="bd-card"><h2>Weekly motion</h2><p>Completed blocks across your week.</p><div class="bd-bars">${days.map(d=>{const all=blocks.filter(b=>b.date===dateKey(d)),complete=all.filter(b=>b.completed).length;return `<div><small>${complete}/${all.length}</small><div class="bd-bar" style="height:${all.length?Math.max(5,complete/all.length*140):5}px"></div><span>${dateLabel(d,{weekday:'short'})}</span></div>`;}).join('')}</div></section><section class="bd-card"><h2>Space for different parts of life</h2>${categories.map(c=>`<div class="bd-category-stat"><span><i class="${tint(c)}"></i>${esc(c)}</span><strong>${week.filter(b=>category(b)===c&&b.completed).length} completed</strong></div>`).join('')}</section>`;
  }
  function appGuide() {
    const tips = [
      ['Move just this block', 'In Day or Week view, drag the ⋮⋮ handle to change a block’s time in 5-minute steps. You can drag near the timeline’s edge to scroll. Other dates, including repeated occurrences, stay untouched.'],
      ['Give a block the time it needs', 'Tap the block’s title to edit its start time and Minutes. Blocks can be short or long, but must end by midnight on the chosen day.'],
      ['Repeat without locking your week', 'When adding a new block, choose Daily, Weekdays, or Weekly in Repeat. This creates the next 4 weeks of separate occurrences; editing or deleting one does not change the others.'],
      ['See one part of life at a time', 'Use the category chips above the calendar to filter your blocks. Add your own comma-separated categories in Settings. “All” brings everything back; filtering never deletes a block.'],
      ['Turn a thought into a plan', 'In Brainstorm, choose “Add to schedule” on a note. It pre-fills a new block without removing the original note. The floating pencil captures notes from any page—drag it to a comfortable spot.'],
      ['Notice your weekly motion', 'Insights follows the week containing your selected calendar day. Its completed time counts finished blocks, not just planned hours. Check off blocks to see your progress build.'],
      ['Celebrate a little win', 'When every block on a day is checked off, a 😊 appears on that date in the calendar. It counts every category, even while you are viewing just one. Unchecking a block removes the celebration.'],
      ['Share a view, not your workspace', 'After signing in, “Share schedule” publishes a read-only snapshot. Your private Brainstorm notes stay private. Later edits do not update that snapshot; publish again to share a newer view, or disable its link.']
    ];
    return '<section class="bd-card bd-guide" id="bd-app-guide"><h2>How to use app</h2><p>A few little things that make this space more useful. Open a tip to explore.</p>'+tips.map(([title,body])=>`<details><summary>${esc(title)}</summary><p>${esc(body)}</p></details>`).join('')+'</section>';
  }
  function settings() {
    const palettes = {sage:'Green',ocean:'Blue',berry:'Red',neutral:'White neutral'};
    return `<section class="bd-heading"><div><span class="bd-kicker">MAKE YOURSELF AT HOME 🏡</span><h1>Your Blockday.</h1><p>A personal space, in your colors.</p></div></section><form id="bd-settings" class="bd-card"><label>Display name<input name="name" maxlength="40" value="${esc(profile.name||'')}"></label><h2>A color that feels like you</h2><div class="bd-palettes">${Object.entries(palettes).map(([c,label])=>`<button type="button" data-palette="${c}" class="${c} ${(profile.theme||'sage')===c?'active':''}" aria-label="${label} theme" title="${label}"></button>`).join('')}</div><label>Categories <small>Separate with commas. Existing blocks keep their category.</small><input name="categories" value="${esc(categories.join(', '))}" maxlength="200"></label><button class="bd-primary">Save preferences</button></form><section class="bd-card" id="bd-account-card"><h2>Your account</h2><p>${demo?'You’re exploring a disposable demo. No cloud data is changed.':esc(window.BlockdayAuth?.currentUser()?.email||'Continue with Google for your personal workspace.')}</p>${demo?'<button class="bd-secondary" data-action="exit">Exit demo</button>':'<a class="bd-secondary" href="/login">Sign in with Google</a><button class="bd-secondary" data-action="switch">Switch account</button><button class="bd-secondary" data-action="signout">Sign out</button>'}</section>${appGuide()}${!demo?'<section class="bd-card"><h2>Private until you share</h2><p>Publish a read-only snapshot. Anyone with the link can see it; disable it whenever you like.</p><button class="bd-secondary" data-action="share">Share schedule</button></section>':''}`;
  }
  function shareDialog() {
    const share=read('blockday-share',{});
    dialog(`<h2>Share a little view.</h2><p>A snapshot of your blocks, never your private brainstorm notes.</p><label class="bd-checkbox"><input type="checkbox" id="bd-share-notes"> Include daily notes</label><button class="bd-primary" data-action="publish">Publish snapshot</button>${share.token?'<button class="bd-secondary" data-action="unpublish">Disable current link</button>':''}<p id="bd-share-status" role="status">${share.url?`<a href="${esc(share.url)}" target="_blank" rel="noopener">Open current shared schedule ↗</a>`:'You control what gets shared.'}</p>`);
  }
  async function publishShare(disable=false) {
    const status=document.getElementById('bd-share-status'),session=localStorage.getItem('blockday-auth-session');
    if(!session){status.textContent='Sign in with Google before sharing.';return;}
    const share=read('blockday-share',{});status.textContent=disable?'Disabling link…':'Publishing snapshot…';
    try{
      const body=disable?{action:'unpublish',session,token:share.token}:{action:'publish',session,data:{profile,blocks:blocks.map(({id,title,start,duration,date,category})=>({id,title,start,duration,date,category})),dailyNotes:document.getElementById('bd-share-notes').checked?read('blockday-daily-notes',[]):[]}};
      const response=await fetch(localStorage.getItem('blockday-sync-url')||'https://script.google.com/macros/s/AKfycbyMPgUg0MQlPtHMNBZYAks0_x1VZ2HXb7_iX873gcpg9Vee2LjRIacJHs-ua33OATXH/exec',{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)}),result=await response.json();
      if(!result.ok)throw new Error(result.error||'Sharing could not be completed.');
      if(disable){localStorage.removeItem('blockday-share');status.textContent='Link disabled.';return;}
      const url=location.origin+'/?share='+encodeURIComponent(result.token);write('blockday-share',{token:result.token,url});status.innerHTML=`<a href="${esc(url)}" target="_blank" rel="noopener">Open shared schedule ↗</a><br><input readonly aria-label="Shared schedule link" value="${esc(url)}">`;
      if(navigator.clipboard)navigator.clipboard.writeText(url).catch(()=>{});
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
    else { profile={...profile,name:values.get('name').trim(),categories:[...new Set(values.get('categories').split(',').map(c=>c.trim()).filter(Boolean))].slice(0,12)};categories=profile.categories.length?profile.categories:['Personal','Work'];profile.categories=categories;write('blockday-profile',profile); }
    save();document.getElementById('bd-dialog')?.remove();render();
  });
  document.addEventListener('click',event=>{
    const b=event.target.closest('button,a');if(!b)return;
    if(b.dataset.page){page=b.dataset.page;render();window.scrollTo(0,0);}
    if(b.dataset.view){view=b.dataset.view;render();}
    if(b.dataset.date){selected=fromKey(b.dataset.date);view='day';render();}
    if(b.dataset.weekDate){selected=fromKey(b.dataset.weekDate);render();}
    if(b.dataset.filter){filter=b.dataset.filter;render();}
    if(b.dataset.edit)blockDialog(b.dataset.edit);
    if(b.dataset.complete){blocks=blocks.map(x=>x.id===b.dataset.complete?{...x,completed:!x.completed}:x);save();render();}
    if(b.dataset.deleteBlock){blocks=blocks.filter(x=>x.id!==b.dataset.deleteBlock);save();document.getElementById('bd-dialog')?.remove();render();}
    if(b.dataset.scheduleNote){const n=ideas.find(n=>n.id===b.dataset.scheduleNote);blockDialog(null,n?.text.slice(0,120));}
    if(b.dataset.editNote)noteDialog(b.dataset.editNote);
    if(b.dataset.deleteNote&&confirm('Delete this note?')){ideas=ideas.filter(n=>n.id!==b.dataset.deleteNote);save();render();}
    if(b.dataset.palette){profile={...profile,theme:b.dataset.palette};write('blockday-profile',profile);setTheme();document.querySelectorAll('[data-palette]').forEach(p=>p.classList.toggle('active',p===b));}
    const action=b.dataset.action;
    if(action==='add')blockDialog();if(action==='note')noteDialog();if(action==='close')document.getElementById('bd-dialog')?.remove();
    if(action==='exit')window.BlockdayDemo?.exit();if(action==='switch')window.BlockdayAuth?.switchAccount();if(action==='signout')window.BlockdayAuth?.signOut();
    if(action==='share')shareDialog();if(action==='publish')publishShare();if(action==='unpublish')publishShare(true);
    if(action==='theme'){write('blockday-theme',read('blockday-theme','light')==='dark'?'light':'dark');render();}
    if(action==='today'){selected=new Date();month=new Date();render();}
    if(action==='prev'||action==='next'){const delta=action==='prev'?-1:1;if(view==='month')month=new Date(month.getFullYear(),month.getMonth()+delta,1);else selected.setDate(selected.getDate()+delta*(view==='week'?7:1));render();}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('bd-dialog')?.remove();});
  document.addEventListener('pointerdown',event=>{
    const handle=event.target.closest('[data-drag]');if(!handle||event.button!==0)return;
    const block=blocks.find(b=>b.id===handle.dataset.drag),element=handle.closest('.bd-block'),track=element.parentElement;
    const timeline=track.parentElement;
    drag={id:block.id,date:block.date,start:Number(block.start),duration:Number(block.duration),y:event.clientY,height:Number(track.dataset.hourHeight),element,handle,pointer:event.pointerId,moved:false,timeline,scrollStart:timeline.scrollTop};handle.setPointerCapture(event.pointerId);element.classList.add('dragging');event.preventDefault();
  });
  document.addEventListener('pointermove',event=>{
    if(!drag||drag.pointer!==event.pointerId)return;
    const rect=drag.timeline.getBoundingClientRect();
    if(event.clientY<rect.top+35)drag.timeline.scrollTop-=12;
    if(event.clientY>rect.bottom-35)drag.timeline.scrollTop+=12;
    const delta=event.clientY-drag.y+drag.timeline.scrollTop-drag.scrollStart;
    drag.next=Math.max(0,Math.min(24-drag.duration,Math.round((drag.start+delta/drag.height)*12)/12));drag.moved ||= Math.abs(delta)>3;drag.element.style.top=drag.next*drag.height+'px';
  });
  document.addEventListener('pointerup',event=>{
    if(!drag||drag.pointer!==event.pointerId)return;
    if(drag.moved)blocks=blocks.map(b=>b.id===drag.id&&b.date===drag.date?{...b,start:drag.next}:b);
    drag=null;save();render();
  });
  document.addEventListener('pointercancel',()=>{if(drag){drag=null;render();}});
  let deviceDay = dateKey(new Date());
  function tick(){
    const now=new Date(),today=dateKey(now);
    if(today!==deviceDay){
      const previous=deviceDay;deviceDay=today;
      if(demo && window.BlockdayDemo?.refresh()) blocks=read('blockday-blocks',[]);
      if(dateKey(selected)===previous){selected=now;month=new Date(now);}
      render();return;
    }
    const clock=document.getElementById('bd-clock');if(clock)clock.textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    document.querySelectorAll('.bd-now').forEach(line=>{line.style.top=(now.getHours()+now.getMinutes()/60)*Number(line.parentElement.dataset.hourHeight)+'px';});
  }
  setInterval(tick,1000);
  function mountNoteButton(){
    if(document.getElementById('bd-fab'))return;
    const fab=document.createElement('button');fab.id='bd-fab';fab.className='bd-fab';fab.setAttribute('aria-label','Capture a quick note. Drag to move.');fab.title='Quick note · drag to move';fab.innerHTML='✎';document.body.appendChild(fab);
    const place=(x,y)=>{fab.style.right='auto';fab.style.bottom='auto';fab.style.left=Math.max(8,Math.min(innerWidth-63,x))+'px';fab.style.top=Math.max(8,Math.min(innerHeight-63,y))+'px';};
    const position=read('blockday-quick-note-position',null);if(position)place(position.x,position.y);
    let pointer=null,moved=false;
    fab.addEventListener('pointerdown',e=>{const rect=fab.getBoundingClientRect();pointer={id:e.pointerId,x:e.clientX,y:e.clientY,left:rect.left,top:rect.top};moved=false;fab.setPointerCapture(e.pointerId);});
    fab.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;moved ||= Math.hypot(dx,dy)>4;if(moved)place(pointer.left+dx,pointer.top+dy);});
    fab.addEventListener('pointerup',()=>{if(moved)write('blockday-quick-note-position',{x:fab.offsetLeft,y:fab.offsetTop});pointer=null;});
    fab.addEventListener('pointercancel',()=>{pointer=null;moved=true;});
    fab.addEventListener('click',()=>{if(moved){moved=false;return;}noteDialog();});
    addEventListener('resize',()=>{if(fab.style.left)place(fab.offsetLeft,fab.offsetTop);});
  }
  function landing() {
    const screen=document.getElementById('blockday-login');if(!screen)return;
    const google=screen.querySelector('#blockday-google-button'),note=screen.querySelector('.login-note');
    screen.className='bd-landing';screen.innerHTML=`<nav class="bd-landing-nav"><a class="bd-brand" href="/"><span class="bd-logo"></span>blockday.</a><div><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="/login" class="bd-secondary">Sign in</a></div></nav><section class="bd-hero"><span class="bd-pill">A little structure. A lot more breathing room. 🌱</span><h1>Make time feel<br>like <span>yours again.</span></h1><p>A bright little planner for your thoughts, your time,<br class="bd-desktop-break"> and all the things that make a day feel like you.</p><div class="bd-hero-actions"><button class="bd-primary" id="bd-demo-cta">Try the demo app <span>↗</span></button><a class="bd-secondary" href="/login">Continue with Google</a></div><small>No pressure. Explore with a disposable demo.</small><div class="bd-preview"><div class="bd-preview-nav"><span class="bd-logo"></span><b>Your little daily space</b><span>☀️</span></div><div class="bd-preview-content"><div class="bd-preview-left"><span>THURSDAY, YOUR WAY</span><h2>Make room for<br>what matters.</h2><div class="bd-mini-days">${['M','T','W','T','F','S','S'].map((d,i)=>`<span class="${i===3?'active':''}">${d}<b>${14+i}</b></span>`).join('')}</div><div class="bd-preview-thought"><span>💭 A little thought</span><p>That idea for the weekend?<br>Give it a little space.</p></div></div><div class="bd-preview-plan"><article class="lavender"><small>9:10 — 10:25 · Work</small><b>Focus on the good stuff ✨</b></article><article class="peach"><small>11:35 — 12:05 · Wellness</small><b>A walk. A breath. A reset. 🌿</b></article><article class="mint"><small>13:15 — 14:40 · Personal</small><b>Build the next little thing ☀️</b></article></div></div></div></section><section id="features" class="bd-landing-features"><span class="bd-kicker">SIMPLE ON PURPOSE</span><h2>A place for the whole day.<br>Not just the busy parts.</h2><div>${[['🗓️','See the bigger picture','Start with your calendar. Open a day and shape it with flexible blocks.'],['🫧','Let your thoughts breathe','Capture notes in Brainstorm, then give the right ideas a place in your schedule.'],['🌈','Every part of your life','Personal, work, study, or something all your own. Categories keep your view focused.'],['↗️','Notice your momentum','Weekly completion and motion help you see progress without the pressure.'],['🪴','Move with real life','Drag a block to a new time. Repeated days stay just as you planned them.'],['🔒','A personal little space','Continue with Google for your own workspace. Demo changes stay in the demo.']].map(([i,t,p])=>`<article><span>${i}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></section><section id="pricing" class="bd-landing-price"><span class="bd-pill">YOURS TO GROW WITH ✨</span><h2>One purchase.<br>Access continuous updates.</h2><p>No tiers. No subscription. Planned launch price: <b>Rp50.000.</b></p><a class="bd-primary" href="/login">Register with Google ↗</a><small>Purchasing is not open yet. Take the demo for a spin.</small></section><section class="bd-google-entry"><h2>Your day, privately yours.</h2><p>Use your Google account to continue.</p><div id="bd-google-slot"></div></section><footer class="bd-landing-footer">blockday. <span>A little space for your day. ☀️</span></footer>`;
    screen.querySelector('#bd-google-slot').append(google,note);screen.querySelector('#bd-demo-cta').addEventListener('click',()=>window.BlockdayDemo.enter());
    if(location.pathname==='/login')screen.querySelector('.bd-google-entry').scrollIntoView();
  }
  const shared=new URLSearchParams(location.search).get('share');
  if(shared){root.innerHTML='<div class="bd-empty">Loading shared schedule…</div>';fetch((localStorage.getItem('blockday-sync-url')||'https://script.google.com/macros/s/AKfycbyMPgUg0MQlPtHMNBZYAks0_x1VZ2HXb7_iX873gcpg9Vee2LjRIacJHs-ua33OATXH/exec')+'?action=public&token='+encodeURIComponent(shared)).then(r=>r.json()).then(r=>{if(!r.ok)throw new Error(r.error);root.innerHTML=`<main class="bd-shared"><span class="bd-logo"></span><h1>${esc(r.data.profile?.title||'Shared Blockday')}</h1>${r.data.blocks.map(b=>`<article class="bd-card"><small>${esc(b.date)} · ${clockTime(b.start)}</small><h2>${esc(b.title)}</h2></article>`).join('')}</main>`;}).catch(e=>root.innerHTML=`<div class="bd-empty">${esc(e.message)}</div>`);return;}
  render();landing();
})();
