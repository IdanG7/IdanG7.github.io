const fs = require('fs');
const path = require('path');
const dir = '.cache/labs/chunks';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
const results = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const re = /children:"([^"]+)"/g;
  let m;
  while ((m = re.exec(content))) {
    const text = m[1];
    if (/list|item|drag|edit|shuffle|remove|add|gesture|stack|order|task/i.test(text)) {
      results.push({ file, text });
    }
  }
}
for (const entry of results) {
  console.log(`${entry.file}: ${entry.text}`);
}
