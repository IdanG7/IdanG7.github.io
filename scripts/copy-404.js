import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy dist/index.html to dist/404.html for SPA routing on GitHub Pages
// This ensures crawlers (like LinkedIn) can see the actual app content
function copy404() {
  const distPath = path.join(__dirname, '..', 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const notFoundPath = path.join(distPath, '404.html');

  try {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✅ Copied index.html to 404.html for SPA routing');
  } catch (error) {
    console.error('❌ Error copying 404.html:', error.message);
    process.exit(1);
  }
}

copy404();
