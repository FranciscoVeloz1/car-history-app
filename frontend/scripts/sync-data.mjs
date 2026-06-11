import { readdirSync, copyFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const exportsDir = resolve(__dirname, '..', '..', 'backend', 'exports');
const destPath = resolve(__dirname, '..', 'src', 'data', 'car-history.json');

const files = readdirSync(exportsDir)
  .filter((f) => f.startsWith('car-history-') && f.endsWith('.json'))
  .sort();

const latest = files[files.length - 1];
if (!latest) {
  console.error('No car-history-*.json found in backend/exports/');
  process.exit(1);
}

mkdirSync(dirname(destPath), { recursive: true });
copyFileSync(resolve(exportsDir, latest), destPath);
console.log(`Synced: ${latest} → src/data/car-history.json`);
