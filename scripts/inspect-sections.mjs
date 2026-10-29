import child_process from 'node:child_process';

const page = child_process.execSync('git show manufactt-baseline:src/generated/Page0eb5473046.tsx', { encoding: 'utf8' });
const match = page.match(/<section className=\{"blog-section section-spacing-bottom"\}[\s\S]*?<\/section>/);
if (match) {
  console.log('--- BLOG SECTION IN BASELINE ---');
  console.log(match[0].slice(0, 2000));
}


