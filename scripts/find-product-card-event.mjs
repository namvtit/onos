import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./src/generated/interactions.json', 'utf8'));
const targetId = '65983724-c324-f214-e8de-a17118ba2ece';

console.log(`Searching for ${targetId}...`);

for (const [id, e] of Object.entries(data.events)) {
  const str = JSON.stringify(e);
  if (str.includes(targetId)) {
    console.log(`\nEvent ${id}: ${e.eventTypeId}`);
    console.log('  Target:', e.target);
    const al = data.actionLists[e.action?.config?.actionListId];
    console.log('  ActionList:', e.action?.config?.actionListId);
    al?.actionItemGroups?.forEach((g, gi) => {
      console.log(`    Group ${gi}:`, JSON.stringify(g.actionItems, null, 2));
    });
  }
}
