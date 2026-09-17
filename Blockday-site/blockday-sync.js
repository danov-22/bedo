/* Authenticated, local-first saving for the current Google workspace. */
(function(){
'use strict';
if(new URLSearchParams(location.search).has('demo'))return;
const url=localStorage.getItem('blockday-sync-url')||'https://script.google.com/macros/s/AKfycbyMPgUg0MQlPtHMNBZYAks0_x1VZ2HXb7_iX873gcpg9Vee2LjRIacJHs-ua33OATXH/exec';
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f;}catch(_){return f;}};
const keys={blocks:'blockday-blocks',ideas:'blockday-ideas',dailyNotes:'blockday-daily-notes',routines:'blockday-routines'};
let status={state:'local',message:'Saved on this device. Sign in with Google for cloud saving.'},initialized=false,busy=false,timer;
function notify(state,message){status={state,message,lastSavedAt:localStorage.getItem('blockday-last-sync')};dispatchEvent(new CustomEvent('blockday-sync-status'));}
function data(){return {...Object.fromEntries(Object.entries(keys).map(([k,v])=>[k,read(v,[])])),settings:[{id:'preferences',theme:read('blockday-theme','light'),profile:read('blockday-profile',{}),tour:read('blockday-tour-state',null)}]};}
async function request(action,payload){
const session=localStorage.getItem('blockday-auth-session');if(!session)throw Error('Sign in with Google to save online.');
const response=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,session,...payload}),signal:AbortSignal.timeout(25000)});
const result=await response.json();if(!response.ok||!result.ok)throw Error(result.error||'Cloud saving is unavailable.');return result;
}
async function flush(){
if(!initialized||busy||!localStorage.getItem('blockday-auth-session')||localStorage.getItem('blockday-sync-pending')!=='true')return;
if(!navigator.onLine){notify('pending','Saved on this device. Waiting for internet to save online.');return;}
busy=true;const snapshot=data(),signature=JSON.stringify(snapshot);notify('saving','Saved on this device. Saving online…');
try{const result=await request('save',{data:snapshot});localStorage.setItem('blockday-last-sync',result.savedAt||new Date().toISOString());
if(JSON.stringify(data())===signature){localStorage.removeItem('blockday-sync-pending');notify('saved','Schedules and Brainstorm notes are saved online.');}
else notify('pending','New edits are saved on this device. Saving online shortly…');
}catch(error){notify('error','Saved on this device only. '+error.message+' Retry when connected.');}
finally{busy=false;if(status.state==='pending'&&navigator.onLine)timer=setTimeout(flush,800);}
}
function changed(){localStorage.setItem('blockday-sync-pending','true');notify('pending',localStorage.getItem('blockday-auth-session')?'Saved on this device. Waiting to save online…':'Saved on this device. Sign in with Google for cloud saving.');clearTimeout(timer);timer=setTimeout(flush,700);}
async function initialize(){
if(!localStorage.getItem('blockday-auth-session')){initialized=true;return true;}
if(!navigator.onLine&&localStorage.getItem('blockday-last-sync')){initialized=true;notify('pending','Opened your device copy offline. Changes will save online when connected.');return true;}
notify('loading','Opening your saved workspace…');
try{const cloud=await request('load'),local=data(),hasCloud=Object.keys(keys).some(k=>(cloud[k]||[]).length)||(cloud.settings||[]).length;
if(hasCloud&&localStorage.getItem('blockday-sync-pending')!=='true'){
if(local.blocks.length||local.ideas.length)localStorage.setItem('blockday-recovery-'+read('blockday-auth-user',{}).sub,JSON.stringify(local));
Object.entries(keys).forEach(([k,v])=>localStorage.setItem(v,JSON.stringify(cloud[k]||[])));
if(cloud.savedAt)localStorage.setItem('blockday-last-sync',cloud.savedAt);
const prefs=(cloud.settings||[]).find(s=>s.id==='preferences');
if(prefs){if(prefs.profile)localStorage.setItem('blockday-profile',JSON.stringify(prefs.profile));if(prefs.theme)localStorage.setItem('blockday-theme',JSON.stringify(prefs.theme));if(prefs.tour)localStorage.setItem('blockday-tour-state',JSON.stringify(prefs.tour));}
}
initialized=true;if(!hasCloud||localStorage.getItem('blockday-sync-pending')==='true'){changed();await flush();}else notify('saved','Your saved schedules and Brainstorm notes are restored.');
return true;
}catch(error){notify('error','Could not open your cloud workspace. '+error.message+' Local data is safe.');return false;}
}
window.BlockdaySync={getStatus:()=>status,changed,saveNow:flush,initialize,exportData:data};
window.BlockdaySync.ready=initialize();
addEventListener('online',()=>initialized?flush():initialize().then(ok=>{if(ok)dispatchEvent(new Event('blockday-workspace-ready'));}));
setInterval(()=>{if(initialized)flush();},30000);
})();
