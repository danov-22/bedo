/* Upgrade earlier product storage without rewriting user-authored content. */
(function(){
  'use strict';
  const previous=['block','day'].join(''),next='bedo';
  if(localStorage.getItem('bedo-storage-version')==='1')return;
  const rename=key=>key.replaceAll(previous,next);
  function snapshotKeys(value){
    if(Array.isArray(value))return value.map(snapshotKeys);
    if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key.startsWith(previous+'-')?rename(key):key,snapshotKeys(item)]));
    return value;
  }
  const copies=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);if(!key.startsWith(previous+'-'))continue;
    const target=rename(key);if(localStorage.getItem(target)!==null)continue;
    let value=localStorage.getItem(key);
    if(key===previous+'-demo-backup'||key.includes('-recovery-')){try{value=JSON.stringify(snapshotKeys(JSON.parse(value)));}catch(_){}}
    copies.push([target,value]);
  }
  copies.forEach(([key,value])=>localStorage.setItem(key,value));
  localStorage.setItem('bedo-storage-version','1');
  if('caches' in window)caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(previous+'-')).map(key=>caches.delete(key))));
})();
