const fs = require('fs');
const content = fs.readFileSync('.cache/labs/chunks/98517c4cd58cfc1a.js','utf8');
const classRe = /className:`([^`]+)`/g;
let m;
const set = new Set();
while ((m = classRe.exec(content))) {
  const value = m[1];
  if (/list|stack|card|item|row|column|drag|edit/i.test(value)) {
    set.add(value);
  }
}
console.log([...set].slice(0,120).join('\n'));
