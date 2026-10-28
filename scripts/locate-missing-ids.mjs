import child_process from 'node:child_process';

const missingIds = [
  '68a88700-03b2-b1ae-401e-bd7fd327a74c',
  'bb1d146f-3020-9314-d86a-8b5d20f602bd',
  'ec80440d-ee55-273b-2ae9-ce265c3afa17',
  '17719652-441a-8e4d-6709-ab16c3504a7d',
  '67adcfec-de99-018d-1042-48952abe5b3f',
  '29f61eb0-4f9c-cf25-09b0-73d9f161bc19',
  '9aa8b664-97ad-49c4-09c4-74aca1f730e4',
  '885795f8-d346-8011-0579-09deed66996f',
  '7809f243-3f4a-e8e3-4d39-f009bca40867',
  '2b6ca78d-f30a-dcb3-72dd-ee239194fdde',
  'd4d290b2-cf1f-2b7c-1c15-7a88dddc2d17',
  '6c3d66a0-b420-e0a5-aade-cb7ede5a2f49',
  '1b0d8c68-7925-4e4c-b357-5d041e365520',
  '77cde797-b601-13a8-b976-f135a003b6a3',
  '77cde797-b601-13a8-b976-f135a003b6b7',
  '77cde797-b601-13a8-b976-f135a003b6b8',
  'fd6444eb-66fc-2dbd-3d3a-042d56ad9114',
  'fd6444eb-66fc-2dbd-3d3a-042d56ad9128',
  'fd6444eb-66fc-2dbd-3d3a-042d56ad9129',
  'ea75087c-806d-fa5f-23d1-e85b71fbeb59',
  'ea75087c-806d-fa5f-23d1-e85b71fbeb6d',
  'ea75087c-806d-fa5f-23d1-e85b71fbeb6e',
  '07cc8b02-829c-0744-9683-1d2336d4de7f',
  'b5c4663c-31cd-207d-58f8-818a01e9e39a',
  '8acda32a-e4ec-bc3a-243e-32b1eadb1dc1',
  '844109a7-16c9-b242-3848-f6eb21546640',
  '6bffbb23-d411-347f-db2d-076268f89e48',
  '6bffbb23-d411-347f-db2d-076268f89e4a',
  'e41d84f7-eb50-c101-59a2-4cd8c62f3064',
  'e41d84f7-eb50-c101-59a2-4cd8c62f3066',
  '29aa1c23-697a-a5b6-b178-a0342072fe9f',
  '29aa1c23-697a-a5b6-b178-a0342072fea1',
  '2f849f1b-3676-ed33-20c8-0819c11eb78c',
  '2f849f1b-3676-ed33-20c8-0819c11eb78e',
  'e6ff9f79-f479-fa42-6f69-a3df18a8ef4a',
  '0edeb448-434e-b82e-3ec4-fde92a5501a2',
  'b2d391e0-fe88-288b-458e-4b23197460cd'
];

const baselineFiles = {
  'Page0eb5473046': child_process.execSync('git show manufactt-baseline:src/generated/Page0eb5473046.tsx', { encoding: 'utf8' }),
  'HomeSections': child_process.execSync('git show manufactt-baseline:src/components/sections/HomeSections.tsx', { encoding: 'utf8' }),
  'SiteChrome': child_process.execSync('git show manufactt-baseline:src/components/SiteChrome.tsx', { encoding: 'utf8' }),
};

missingIds.forEach(id => {
  for (const [name, content] of Object.entries(baselineFiles)) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes(id)) {
        // extract element snippet
        const context = lines.slice(Math.max(0, idx - 1), idx + 2).join(' ').replace(/\s+/g, ' ');
        console.log(`[${id}] in ${name}:L${idx+1}: ${context.slice(0, 140)}...`);
      }
    });
  }
});
