const fs = require('fs');
const content = fs.readFileSync('.cache/labs/chunks/73c7ae663583c639.js','utf8');
const re = /label:"([^"]+)"/g;
const set = new Set();
let m;
while ((m = re.exec(content))) {
  set.add(m[1]);
}
console.log([...set].join('\n'));
