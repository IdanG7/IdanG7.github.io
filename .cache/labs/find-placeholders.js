const fs = require('fs');
const path = require('path');
const dir = '.cache/labs/chunks';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const re = /placeholder:"([^"]+)"/g;
  let m;
  while ((m = re.exec(content))) {
    console.log(`${file}: ${m[1]}`);
  }
}
