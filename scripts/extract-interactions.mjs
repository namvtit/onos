import fs from 'node:fs';
import vm from 'node:vm';
const path = 'public/assets/b50a798d709c-webflow.schunk.c1050d341df384dc.js';
const source = fs.readFileSync(path,'utf8');
const start=source.indexOf('.init({events:')+6;
let depth=0, quote='', escape=false, end=start;
for(let i=start;i<source.length;i++){
 const c=source[i];
 if(quote){if(escape)escape=false;else if(c==='\\')escape=true;else if(c===quote)quote='';continue;}
 if(c==='"'||c==="'"){quote=c;continue;}
 if(c==='{')depth++;if(c==='}'&&--depth===0){end=i+1;break;}
}
// Static object literal only; no Webflow runtime or downloaded code is executed.
const config=vm.runInNewContext('('+source.slice(start,end)+')',Object.create(null),{timeout:1000});
fs.mkdirSync('src/generated',{recursive:true});
fs.writeFileSync('src/generated/interactions.json',JSON.stringify(config));
const count=(values,key)=>values.reduce((a,x)=>(a[x[key]]=(a[x[key]]||0)+1,a),{});
console.log('Events',count(Object.values(config.events),'eventTypeId'));
console.log('Actions',count(Object.values(config.actionLists).flatMap(x=>[...(x.actionItemGroups||[]),...(x.continuousParameterGroups||[]).flatMap(y=>y.continuousActionGroups)].flatMap(y=>y.actionItems)),'actionTypeId'));
fs.writeFileSync('audit/interactions-summary.json',JSON.stringify({events:count(Object.values(config.events),'eventTypeId'),actionLists:Object.values(config.actionLists).map(x=>({id:x.id,title:x.title})),mediaQueries:config.site.mediaQueries},null,2));
