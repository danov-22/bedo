const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const previous=['block','day'].join('')+'-';
const records=new Map([
 [previous+'blocks',JSON.stringify([{id:'old-block',title:'Keep user-authored wording',date:'2026-9-18'}])],
 [previous+'ideas',JSON.stringify([{id:'old-note',text:'Keep this note exactly'}])],
 [previous+'auth-session','signed-session'],
 [previous+'user-123-'+previous+'blocks','account-snapshot'],
 [previous+'demo-backup',JSON.stringify({[previous+'blocks']:'original-private-records'})],
 ['bedo-profile',JSON.stringify({name:'Newer profile'})],
 [previous+'profile',JSON.stringify({name:'Older profile'})]
]);
const localStorage={get length(){return records.size},key:i=>Array.from(records.keys())[i],getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,String(v))};
const context={localStorage,window:{}};vm.createContext(context);
const source=fs.readFileSync('Bedo-site/storage-migration.js','utf8');vm.runInContext(source,context);
assert.equal(records.get('bedo-blocks'),records.get(previous+'blocks'));
assert.equal(records.get('bedo-ideas'),records.get(previous+'ideas'));
assert.equal(records.get('bedo-auth-session'),'signed-session');
assert.equal(records.get('bedo-user-123-bedo-blocks'),'account-snapshot');
assert.equal(JSON.parse(records.get('bedo-demo-backup'))['bedo-blocks'],'original-private-records');
assert.equal(JSON.parse(records.get('bedo-profile')).name,'Newer profile','newer data is never overwritten');
records.delete('bedo-blocks');vm.runInContext(source,context);assert.equal(records.has('bedo-blocks'),false,'old data does not reappear after sign-out');
console.log('PASS saved-data migration: schedules, notes, sessions, account snapshots, demo backup and one-time safety');
