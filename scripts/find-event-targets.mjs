import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./src/generated/interactions.json', 'utf8'));
const targetIds = [
  '8094fac9-4cf8-16af-6b25-90966716d9c7',
  '2a6fecb6-c324-2a47-4e56-63bf9666fe76',
  '272f39e4-51eb-e15a-5d52-d0b9bb610f28',
  '2b4c5a0b-3ea6-4725-2cf9-ba9aec94d192',
  '2421dafb-c91b-f351-19c3-69d4e8192796',
  'd283640d-fc6a-1283-2d22-21620e76ddab',
  '9807520c-65b7-e828-71bd-909a6cfe1841',
  '65ddfbf8-98dc-79d4-6020-0e2cf17451cf'
];

targetIds.forEach(id => {
  console.log(`\n=== TARGET ID: ${id} ===`);
  const matchingEvents = Object.values(data.events).filter(e => {
    if (e.target?.id?.includes(id)) return true;
    const list = data.actionLists[e.action?.config?.actionListId];
    return list?.actionItemGroups?.some(g => g.actionItems.some(item => item.config?.target?.id?.includes(id)));
  });

  matchingEvents.forEach(e => {
    console.log(`Event ID: ${e.id}, Type: ${e.eventTypeId}`);
    console.log(`  Event Target:`, JSON.stringify(e.target));
    console.log(`  Event Config:`, JSON.stringify(e.config));
    console.log(`  ActionList:`, e.action?.config?.actionListId);
  });
});
