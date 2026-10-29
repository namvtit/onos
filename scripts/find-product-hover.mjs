import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./src/generated/interactions.json', 'utf8'));

console.log('Searching for product-image-wrapper in interactions.json...');

for (const [id, e] of Object.entries(data.events)) {
  const str = JSON.stringify(e);
  if (str.includes('product-image') || str.includes('product-info-main')) {
    console.log(`\nEvent ${id}: ${e.eventTypeId}`);
    console.log('  Target:', e.target);
    const al = data.actionLists[e.action?.config?.actionListId];
    console.log('  ActionList:', e.action?.config?.actionListId);
    al?.actionItemGroups?.forEach((g, gi) => {
      console.log(`    Group ${gi}:`, g.actionItems.map(item => ({
        type: item.actionTypeId,
        target: item.config.target,
        hVal: item.config.heightValue,
        hUnit: item.config.heightUnit,
        duration: item.config.duration
      })));
    });
  }
}
