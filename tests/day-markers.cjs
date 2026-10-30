const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('Bedo-site/bedo-app.js', 'utf8');
const helpers = source.slice(source.indexOf('  const dayEmojis='), source.indexOf('  function dialog(content)'));
let stored, rendered = 0, removed = 0;
const context = vm.createContext({
  profile: {},
  dateKey: d => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
  fromKey: key => { const [y,m,d] = key.split('-').map(Number); return new Date(y,m-1,d,12); },
  esc: value => String(value).replaceAll('<','&lt;'),
  document: {getElementById: id => id === 'bd-marker-date' ? {value:'2026-11-12',reportValidity:()=>true} : {remove:()=>removed++}},
  write: (key,value) => {stored = JSON.parse(JSON.stringify(value)); assert.equal(key,'bedo-profile');},
  render: () => rendered++
});
vm.runInContext(helpers, context);
assert.equal(vm.runInContext('dayEmojis.length', context), 24);
assert.equal(vm.runInContext('new Set(dayEmojis).size', context),24);
vm.runInContext('setDayEmoji(dayEmojis[1])',context);
assert.equal(stored.dayEmojis['2026-11-12'],'\u{1f389}');
assert.match(vm.runInContext('dayMarker(new Date(2026,10,12))',context), /Day emoji:/);
assert.equal(vm.runInContext('dayMarker(new Date(2026,10,13))',context),'');
vm.runInContext('setDayEmoji(dayEmojis[2])',context);
assert.equal(stored.dayEmojis['2026-11-12'],'\u{1f382}');
vm.runInContext('setDayEmoji(null)',context);
assert.deepEqual(stored.dayEmojis,{});
assert.equal(rendered,3);assert.equal(removed,3);
const css=fs.readFileSync('Bedo-site/bedo-app.css','utf8');
for(const match of css.matchAll(/font-size:(\d+(?:\.\d+)?)px/g))assert(Number(match[1])>=14,match[0]);
console.log('PASS 24 distinct emojis, save/replace/remove, per-date display, and 14px minimum text');
