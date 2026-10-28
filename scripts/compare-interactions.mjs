import fs from 'node:fs';
import path from 'node:path';
import child_process from 'node:child_process';

const interactions = JSON.parse(fs.readFileSync('src/generated/interactions.json', 'utf8'));

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(full);
  });
  return results;
}

const files = walk('src/components');
let totalWIds = 0;
const fileMap = {};
const foundIds = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const ids = Array.from(content.matchAll(/data-w-id=\{?["']([^"']+)["']\}?/g)).map(m => m[1]);
  if (ids.length) {
    fileMap[f] = ids.length;
    totalWIds += ids.length;
    ids.forEach(id => foundIds.add(id));
  }
});

console.log('Total data-w-ids found in src/components:', totalWIds);
console.log('Unique data-w-ids in src/components:', foundIds.size);
console.log('Distribution by file:', fileMap);

// Check Baseline Home Page
const baseline = child_process.execSync('git show manufactt-baseline:src/generated/Page0eb5473046.tsx', { encoding: 'utf8' });
const baselineHomeSections = child_process.execSync('git show manufactt-baseline:src/components/sections/HomeSections.tsx', { encoding: 'utf8' });
const baselineSiteChrome = child_process.execSync('git show manufactt-baseline:src/components/SiteChrome.tsx', { encoding: 'utf8' });

const baselineAll = baseline + '\n' + baselineHomeSections + '\n' + baselineSiteChrome;
const baselineWIds = Array.from(baselineAll.matchAll(/data-w-id=\{?["']([^"']+)["']\}?/g)).map(m => m[1]);
const uniqueBaselineIds = new Set(baselineWIds);

console.log('\nTotal data-w-ids in Baseline Homepage (Page0eb5473046 + HomeSections + SiteChrome):', baselineWIds.length);
console.log('Unique data-w-ids in Baseline Homepage:', uniqueBaselineIds.size);

const missingIds = Array.from(uniqueBaselineIds).filter(id => !foundIds.has(id));
console.log('\nMISSING data-w-ids from current components:', missingIds.length);
console.log('Missing IDs list:', missingIds);

// Find which interactions in interactions.json are broken
const brokenEvents = [];
for (const [eventId, event] of Object.entries(interactions.events)) {
  const targetId = event.target?.id?.split('|').at(-1);
  if (targetId && missingIds.includes(targetId)) {
    brokenEvents.push({ eventId, eventType: event.eventTypeId, targetId, action: event.action?.config?.actionListId });
  }
}

console.log(`\nBroken interactions because trigger elements are missing data-w-id: ${brokenEvents.length}`);
brokenEvents.forEach(b => console.log(`  - [${b.eventType}] Event ${b.eventId} (target: ${b.targetId}) -> action: ${b.action}`));
