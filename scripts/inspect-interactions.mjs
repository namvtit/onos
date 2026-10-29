import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./src/generated/interactions.json', 'utf8'));
const scrollEvents = Object.values(data.events).filter(e => e.eventTypeId === 'SCROLL_INTO_VIEW');
console.log('Total SCROLL_INTO_VIEW events:', scrollEvents.length);

scrollEvents.forEach((e, idx) => {
  const list = data.actionLists[e.action?.config?.actionListId];
  console.log(`\n[${idx}] Event ID: ${e.id}`);
  console.log('  Event Target:', JSON.stringify(e.target));
  console.log('  Event Config:', JSON.stringify(e.config));
  console.log('  ActionList:', e.action?.config?.actionListId, 'useFirstGroup:', list?.useFirstGroupAsInitialState);
  list?.actionItemGroups?.forEach((g, gi) => {
    console.log(`    Group ${gi}:`, g.actionItems.map(item => ({
      type: item.actionTypeId,
      target: item.config.target,
      val: item.config.value,
      y: item.config.yValue,
      duration: item.config.duration,
      delay: item.config.delay
    })));
  });
});
