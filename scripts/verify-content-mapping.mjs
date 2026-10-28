import fs from 'node:fs';
import cp from 'node:child_process';
import crypto from 'node:crypto';
import ts from 'typescript';

const baseline = 'b85079d329df16414d1ed2bf6810f521290e4a05';
const readBaseline = file => cp.execFileSync('git', ['show', `${baseline}:${file}`], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
const files = [
  ...fs.readdirSync('src/generated').filter(file => file.endsWith('.tsx')).map(file => `src/generated/${file}`),
  'src/components/SiteChrome.tsx', 'src/components/sections/HomeSections.tsx', 'src/components/ContactForm.tsx',
];
const contentAttributes = new Set(['src', 'srcSet', 'alt', 'title', 'href', 'placeholder', 'value', 'aria-label', 'data-target', 'data-poster-url', 'data-video-urls', 'data-lightbox']);
function structure(source, file) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (ast.parseDiagnostics.length) throw new Error(`Invalid TSX: ${file}`);
  const nodes = [];
  function walk(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node;
      const attributes = opening.attributes.properties.flatMap(property => {
        if (!ts.isJsxAttribute(property)) return [property.getText(ast)];
        const name = property.name.text;
        if (contentAttributes.has(name)) return [];
        if (name === 'style') {
          const value = property.initializer?.expression;
          if (!value || !ts.isObjectLiteralExpression(value)) throw new Error(`Unsupported style in ${file}`);
          const locked = value.properties.filter(item => item.name?.text !== 'backgroundImage').map(item => item.getText(ast));
          return locked.length ? [`style:${locked.join(',')}`] : [];
        }
        return [property.getText(ast)];
      });
      nodes.push({ tag: opening.tagName.getText(ast), attributes });
      if (ts.isJsxElement(node)) {
        node.children.forEach(walk);
        nodes.push({ close: opening.tagName.getText(ast) });
      }
      return;
    }
    ts.forEachChild(node, walk);
  }
  walk(ast);
  return nodes;
}
const structureFailures = [];
for (const file of files) {
  if (JSON.stringify(structure(readBaseline(file), file)) !== JSON.stringify(structure(fs.readFileSync(file, 'utf8'), file))) structureFailures.push(file);
}
const tracked = cp.execFileSync('git', ['ls-tree', '-r', '--name-only', baseline], { encoding: 'utf8' }).trim().split('\n');
const protectedFiles = tracked.filter(file => /\.css$/.test(file) || file.startsWith('raw-webflow/') || file.startsWith('audit/qa/') || file.startsWith('public/assets/') || ['src/lib/site-controls.ts', 'src/lib/source-animations.ts', 'src/components/SiteRuntime.tsx', 'src/generated/interactions.json', 'audit/route-manifest.json'].includes(file));
const changed = new Set(cp.execFileSync('git', ['diff', '--name-only', baseline], { encoding: 'utf8' }).trim().split('\n'));
const preservationFailures = protectedFiles.filter(file => changed.has(file) || !fs.existsSync(file));
const source = fs.readFileSync('audit/content-mapping/onos-source.html', 'utf8');
const sourceChecks = ['50+', '2019', '705', 'onospod.com@gmail.com', '+84986385112', 'American Ventures'].every(value => source.includes(value));
const sourceAssets = JSON.parse(fs.readFileSync('audit/content-mapping/assets.json', 'utf8'));
const mediaFailures = sourceAssets.filter(item => !fs.existsSync(`public${item.local}`) || crypto.createHash('sha256').update(fs.readFileSync(`public${item.local}`)).digest('hex') !== item.sha256);
const result = {
  baseline,
  branch: cp.execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim(),
  backupCommit: cp.execFileSync('git', ['rev-parse', 'backup/onos-before-manufactt-restore-20261028'], { encoding: 'utf8' }).trim(),
  checkedTemplatesAndComponents: files.length,
  structureFailures,
  cssFilesUnchanged: tracked.filter(file => /\.css$/.test(file)).length,
  rawAndOriginalQaFilesUnchanged: tracked.filter(file => file.startsWith('raw-webflow/') || file.startsWith('audit/qa/')).length,
  originalAssetsUnchanged: tracked.filter(file => file.startsWith('public/assets/')).length,
  preservationFailures,
  verifiedSourceFactsPresent: sourceChecks,
  sourceAssetHashFailures: mediaFailures,
  genuinePhotosMatchingBackup: sourceAssets.filter(item => item.matchesBackup).length,
};
fs.writeFileSync('audit/content-mapping/design-lock.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (structureFailures.length || preservationFailures.length || mediaFailures.length || !sourceChecks) process.exitCode = 1;
