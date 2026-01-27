const fs = require('fs');
const path = require('path');
const dir = '.cache/labs/chunks';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
const keywords = ['All','UI','Motion','Performance','Systems','WIP'];
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const hits = keywords.filter(word => content.includes(`"${word}"`));
  if (hits.length) {
    console.log(file + ': ' + hits.join(', '));
  }
}
