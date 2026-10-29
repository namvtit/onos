import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./src/generated/interactions.json', 'utf8'));
const scrollEvents = Object.values(data.events).filter(e => e.eventTypeId === 'SCROLL_INTO_VIEW');

const actionListCounts = {};
scrollEvents.forEach(e => {
  const alId = e.action?.config?.actionListId;
  actionListCounts[alId] = (actionListCounts[alId] || 0) + 1;
});

console.log('Action lists used by SCROLL_INTO_VIEW:');
console.log(actionListCounts);

for (const [alId, count] of Object.entries(actionListCounts)) {
  const list = data.actionLists[alId];
  console.log(`\nActionList: ${alId} (used ${count} times)`);
  console.log('  useFirstGroupAsInitialState:', list?.useFirstGroupAsInitialState);
  console.log('  groups count:', list?.actionItemGroups?.length);
  list?.actionItemGroups?.forEach((g, gi) => {
    console.log(`    group ${gi}:`, g.actionItems.map(item => ({
      type: item.actionTypeId,
      val: item.config.value,
      y: item.config.yValue,
      scaleY: item.config.scaleY,
      duration: item.config.duration
    })));
  });
}
