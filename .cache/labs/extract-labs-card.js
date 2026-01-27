const fs = require('fs');
const content = fs.readFileSync('.cache/labs/chunks/73c7ae663583c639.js','utf8');
const re = /children:\"([^\"]+)\"/g;
const set = new Set();
let m;
while ((m = re.exec(content))) {
  const text = m[1];
  if (/All|UI|Motion|Performance|Systems|WIP|Explore|Coming Soon|LIVE|EXPERIMENTAL|Preview/i.test(text)) {
    set.add(text);
  }
}
console.log([...set].join('\n'));
