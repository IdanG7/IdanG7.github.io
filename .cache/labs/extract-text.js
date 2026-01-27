const fs = require('fs');
const content = fs.readFileSync('.cache/labs/chunks/98517c4cd58cfc1a.js','utf8');
const re = /children:"([^"]+)"/g;
let m;
const set = new Set();
while ((m = re.exec(content))) {
  set.add(m[1]);
}
fs.writeFileSync('.cache/labs/lab-texts.txt', [...set].join('\n'));
console.log('count', set.size);
