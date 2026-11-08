'use strict';
/* Everwild — offline browser character / NPC sheets. Import/export JSON for backups. */
const KEY='everwild-sheets-v1',MODE=document.body.dataset.mode==='npcs'?'npcs':'characters',IS_NPC=MODE==='npcs';
const A=[['str','Strength'],['dex','Dexterity'],['con','Constitution'],['int','Intelligence'],['wis','Wisdom'],['cha','Charisma']];
const SK=[['Acrobatics','dex'],['Animal Handling','wis'],['Arcana','int'],['Athletics','str'],['Deception','cha'],['History','int'],['Insight','wis'],['Intimidation','cha'],['Investigation','int'],['Medicine','wis'],['Nature','int'],['Perception','wis'],['Performance','cha'],['Persuasion','cha'],['Religion','int'],['Sleight of Hand','dex'],['Stealth','dex'],['Survival','wis']];
const COND=['Blinded','Charmed','Deafened','Frightened','Grappled','Incapacitated','Invisible','Paralyzed','Petrified','Poisoned','Prone','Restrained','Stunned','Unconscious'];
const XP=[0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000];
const $=id=>document.getElementById(id),clamp=(x,a,b)=>Math.min(b,Math.max(a,Math.trunc(Number(x)||0)));
let db={version:1,characters:[],npcs:[],selected:{characters:null,npcs:null}};
const num={level:[1,20],hp:[0,99999],maxHp:[1,99999],tempHp:[0,99999],currency:[0,999999999],xp:[0,99999999],ac:[0,99],speed:[0,1000],hitDie:[4,12],hitDice:[0,20],exhaustion:[0,6],deathSuccess:[0,3],deathFail:[0,3],attackBonus:[-50,50],xpReward:[0,999999]};
const txt=['name','rank','origin','starter','quest','attackName','damageDice','notes','role','location','faction','disposition'];
const uid=()=>globalThis.crypto?.randomUUID?.()||'record-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const mk=(tag,cls,text)=>{let e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
function template(){return {id:uid(),name:'',level:1,rank:'Unassigned',origin:'',hp:20,maxHp:20,tempHp:0,currency:0,starter:'',quest:'None',attributes:{str:null,dex:null,con:null,int:null,wis:null,cha:null},xp:0,ac:10,speed:30,hitDie:8,hitDice:1,deathSuccess:0,deathFail:0,saves:[],skills:[],conditions:[],exhaustion:0,attackName:'Basic attack',attackBonus:0,damageDice:'1d6',notes:'',role:'',location:'',faction:'',disposition:'Neutral',xpReward:0,log:[],createdAt:Date.now()};}
function normalize(v){
 if(!v||typeof v!=='object'||Array.isArray(v))return null;let r=template();
 for(let k of txt)if(typeof v[k]==='string')r[k]=v[k].slice(0,k==='notes'?25000:800);
 for(let [k,[a,b]] of Object.entries(num))if(Number.isFinite(v[k]))r[k]=clamp(v[k],a,b);
 if(![4,6,8,10,12].includes(r.hitDie))r.hitDie=8;
 if(typeof v.id==='string'&&v.id.length<110&&v.id)r.id=v.id;
 for(let [k] of A){let n=v.attributes?.[k];r.attributes[k]=Number.isInteger(n)&&n>=1&&n<=30?n:null;}
 for(let [k,allowed] of [['saves',A.map(x=>x[0])],['skills',SK.map(x=>x[0])],['conditions',COND]])if(Array.isArray(v[k]))r[k]=[...new Set(v[k].filter(x=>allowed.includes(x)))];
 if(Array.isArray(v.log))r.log=v.log.filter(x=>x&&typeof x.label==='string'&&typeof x.result==='string').slice(0,12).map(x=>({label:x.label.slice(0,120),result:x.result.slice(0,160)}));
 r.hp=clamp(r.hp,0,r.maxHp);r.hitDice=clamp(r.hitDice,0,r.level);return r;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(db));$('save-status').textContent='● Saved on this device';$('save-status').classList.remove('warning');}catch(e){$('save-status').textContent='⚠ Not saved — export a backup';$('save-status').classList.add('warning');}}
function notice(message,error=false){const e=$('notice');e.hidden=false;e.textContent=message;e.className='sheet-notice'+(error?' is-error':'');}
function load(){try{let raw=localStorage.getItem(KEY);if(!raw)return;let data=JSON.parse(raw);if(!data||typeof data!=='object')return;for(let mode of ['characters','npcs'])if(Array.isArray(data[mode]))db[mode]=data[mode].slice(0,500).map(normalize).filter(Boolean);if(data.selected&&typeof data.selected==='object')for(let mode of ['characters','npcs'])if(typeof data.selected[mode]==='string')db.selected[mode]=data.selected[mode];}catch(e){notice('Could not read existing browser data. Restore a JSON backup if necessary.',true);}}
const current=()=>db[MODE].find(x=>x.id===db.selected[MODE])||null;
const title=()=>IS_NPC?'NPC':'Character';
const mod=n=>n===null||n===undefined?null:Math.floor((n-10)/2);
const plus=n=>n===null?'—':n>=0?'+'+n:String(n);
const proficiency=l=>2+Math.floor((l-1)/4);
const nextXP=l=>l<20?XP[l]:XP[19];
function dice(sides){const c=globalThis.crypto;if(c?.getRandomValues){let x=new Uint32Array(1),limit=Math.floor(4294967296/sides)*sides;do{c.getRandomValues(x);}while(x[0]>=limit);return x[0]%sides+1;}return Math.floor(Math.random()*sides)+1;}
function roll(formula,variant='normal'){let m=String(formula).replace(/\s+/g,'').match(/^(\d{0,2})d(4|6|8|10|12|20|100)([+-]\d{1,3})?$/i);if(!m)return null;let n=m[1]?Number(m[1]):1,sides=Number(m[2]),bonus=Number(m[3]||0);if(n<1||n>30)return null;let values=Array.from({length:n},()=>dice(sides)),picked=values,detail='['+values.join(', ')+']';if(n===1&&sides===20&&variant!=='normal'){let extra=dice(20);picked=[variant==='advantage'?Math.max(values[0],extra):Math.min(values[0],extra)];detail='['+values[0]+', '+extra+' → '+picked[0]+']';}return {total:picked.reduce((a,b)=>a+b,0)+bonus,detail:detail+(bonus?' '+plus(bonus):'')};}
function rollmode(){return $('roll-mode')?.value.toLowerCase()||'normal';}
function recordRoll(label,result){let r=current();if(!r)return;if(!result){notice('Enter dice such as 1d20+3, 2d6, or 1d8-1.',true);return;}r.log.unshift({label,result:result.detail+' = '+result.total});r.log=r.log.slice(0,12);save();renderLog();notice(label+': '+result.total);}
function check(label,bonus){if(bonus===null){notice('Assign the required ability score first.',true);return;}recordRoll(label,roll('1d20'+(bonus>=0?'+':'')+bonus,rollmode()));}
function adjust(kind){let r=current();if(!r)return;let amt=clamp($('health-amount').value,1,99999);if(kind==='damage'){let absorbed=Math.min(r.tempHp,amt);r.tempHp-=absorbed;r.hp=Math.max(0,r.hp-(amt-absorbed));}else{r.hp=Math.min(r.maxHp,r.hp+amt);if(r.hp>0)r.deathSuccess=r.deathFail=0;}save();render();notice(kind==='heal'?'Healed '+amt+' HP.':'Applied '+amt+' damage (temporary HP absorbed first).');}
function shortRest(){let r=current();if(!r)return;if(r.hitDice<1){notice('No hit dice left. Long rest to regain some.',true);return;}let rolled=roll('1d'+r.hitDie),con=mod(r.attributes.con)||0,gain=Math.max(0,rolled.total+con);r.hitDice--;r.hp=Math.min(r.maxHp,r.hp+gain);if(r.hp>0)r.deathSuccess=r.deathFail=0;recordRoll('Hit die / short rest',{total:gain,detail:rolled.detail+' '+plus(con)});render();notice('Spent 1 hit die and restored '+gain+' HP.');}
function longRest(){let r=current();if(!r)return;if(!confirm('Complete a long rest? This restores health, clears temporary HP and death saves, and recovers spent hit dice.'))return;let n=Math.max(1,Math.floor(r.level/2));r.hp=r.maxHp;r.tempHp=0;r.deathSuccess=r.deathFail=0;r.hitDice=Math.min(r.level,r.hitDice+n);save();render();notice('Long rest completed; recovered up to '+n+' hit dice.');}
function deathSave(){let r=current();if(!r||r.hp>0)return;if(r.deathSuccess===3||r.deathFail===3){notice('Death save outcome reached; reset before rolling again.',true);return;}let n=dice(20);if(n===20){r.hp=1;r.deathSuccess=r.deathFail=0;}else if(n===1)r.deathFail=Math.min(3,r.deathFail+2);else if(n>=10)r.deathSuccess++;else r.deathFail++;recordRoll('Death save',{total:n,detail:'d20 ['+n+']'});render();}
function newRecord(){let r=template();db[MODE].unshift(r);db.selected[MODE]=r.id;save();render();$('name-input')?.focus();}
function selectRecord(id){db.selected[MODE]=id;save();render();}
function duplicateRecord(){let r=current();if(!r)return;let copy=normalize(r);copy.id=uid();copy.name=(r.name||'Unnamed '+title())+' (Copy)';copy.log=[];db[MODE].unshift(copy);db.selected[MODE]=copy.id;save();render();}
function deleteRecord(){let r=current();if(!r||!confirm('Permanently delete this '+title().toLowerCase()+' from this browser? Export first if needed.'))return;db[MODE]=db[MODE].filter(x=>x.id!==r.id);db.selected[MODE]=db[MODE][0]?.id||null;save();render();notice(title()+' removed.');}
function renderRoster(){
 let root=$('roster'),q=$('roster-search').value.trim().toLowerCase();root.replaceChildren();$('roster-count').textContent=db[MODE].length+' saved';
 let found=db[MODE].filter(r=>(r.name+' '+r.origin+' '+r.rank+' '+r.role+' '+r.location).toLowerCase().includes(q));
 if(!found.length)root.append(mk('p','roster-empty',q?'No matching records.':'No sheets saved yet.'));
 for(let r of found){let b=mk('button','roster-item'+(r.id===db.selected[MODE]?' selected':''));b.type='button';b.dataset.record=r.id;
 let avatar=mk('span','roster-avatar',(r.name.trim()[0]||'✧').toUpperCase()),info=mk('span','roster-info'),name=mk('strong',null,r.name||'Unnamed '+title()),sub=mk('small',null,'Level '+r.level+' · '+r.hp+'/'+r.maxHp+' HP');
 info.append(name,sub);b.append(avatar,info,mk('span','chevron','›'));root.append(b);}
}
const field=(label,key,type='text',placeholder='')=>'<label class="s-field"><span>'+label+'</span><input data-field="'+key+'" type="'+type+'"'+(type==='number'?' step="1"':'')+(placeholder?' placeholder="'+placeholder+'"':'')+'></label>';
const select=(label,key,values)=>'<label class="s-field"><span>'+label+'</span><select data-field="'+key+'">'+values.map(v=>'<option value="'+v+'">'+v+'</option>').join('')+'</select></label>';
const card=(title,body,cls='')=>'<section class="s-card '+cls+'"><h3>'+title+'</h3>'+body+'</section>';
const scoreTiles=()=>A.map(([k,name])=>'<div class="score-tile"><label>'+name+'<input type="number" min="1" max="30" placeholder="—" data-ability="'+k+'"></label><div class="score-bottom"><strong id="mod-'+k+'">—</strong><button type="button" data-check="'+k+'">Roll ↗</button></div></div>').join('');
const saves=()=>A.map(([k,name])=>'<div class="check-row"><label><input type="checkbox" data-save="'+k+'"> '+name+'</label><span id="save-'+k+'">—</span><button type="button" data-save-roll="'+k+'">Roll</button></div>').join('');
const skills=()=>SK.map(([name,a])=>'<div class="check-row"><label><input type="checkbox" data-skill="'+name+'"> '+name+' <small>'+a.toUpperCase()+'</small></label><span data-skill-score="'+name+'">—</span><button type="button" data-skill-roll="'+name+'">Roll</button></div>').join('');
const conditions=()=>COND.map(c=>'<label class="condition"><input type="checkbox" data-condition="'+c+'"> '+c+'</label>').join('');
function render(){
 renderRoster();let r=current(),root=$('sheet');
 if(!r){root.innerHTML='<div class="empty-state"><span>✦</span><h2>Your chronicle begins here</h2><p>Create a '+title().toLowerCase()+' to track health, stats, dice, notes and more. You can save multiple sheets on this device.</p><button type="button" class="s-btn gold" data-main="new">+ Create '+title()+'</button></div>';return;}
 let details=IS_NPC?'<div class="field-grid">'+field('Role / occupation','role')+field('Origin / species','origin')+field('Location','location')+field('Faction','faction')+field('Class rank','rank')+select('Disposition','disposition',['Neutral','Friendly','Hostile','Unknown'])+field('Level','level','number')+field('Currency','currency','number')+'</div>':'<div class="field-grid">'+field('Origin','origin')+field('Class rank','rank')+field('Level','level','number')+field('Currency','currency','number')+field('Starter monster','starter')+field('Active quest','quest')+'</div>';
 let xp='<div class="xp"><div class="xp-label"><strong>Experience</strong><span id="xp-text"></span></div><div class="meter slim"><div id="xp-meter" class="meter-fill"></div></div><div class="field-grid two">'+field('Total XP','xp','number')+(IS_NPC?field('XP reward','xpReward','number'):'<p class="small-note align-bottom">Uses D&amp;D 5e cumulative XP thresholds. Character level remains manually controlled.</p>')+'</div></div>';
 let health='<div class="health-heading"><div><small>HEALTH / HIT POINTS</small><div class="health-numbers" id="hp-text">20 / 20</div><span id="hp-status">Ready</span></div><div class="heart">♥</div></div><div id="hp-progress" class="meter hp" role="progressbar" aria-label="Current hit points" aria-valuemin="0" aria-valuemax="20" aria-valuenow="20"><div class="meter-fill" id="hp-fill"></div></div><div class="health-legend"><span id="hp-percent"></span><span id="temp-text"></span></div><div class="field-grid three">'+field('Current HP','hp','number')+field('Maximum HP','maxHp','number')+field('Temporary HP','tempHp','number')+'</div><div class="hp-actions"><label for="health-amount">Amount</label><input type="number" id="health-amount" value="5" min="1" max="99999"><button type="button" class="s-btn damage" data-action="damage">− Damage</button><button type="button" class="s-btn heal" data-action="heal">+ Heal</button></div>';
 let combat='<div class="stat-strip"><div><span>ARMOR CLASS</span><strong id="ac-value"></strong></div><div><span>INITIATIVE</span><strong id="init-value"></strong></div><div><span>SPEED</span><strong id="speed-value"></strong></div><div><span>PROFICIENCY</span><strong id="prof-value"></strong></div></div><div class="field-grid three">'+field('Armor class','ac','number')+field('Speed','speed','number')+select('Hit die','hitDie',['4','6','8','10','12'])+'</div><div class="action-row"><button type="button" class="s-btn dim" data-action="initiative">⚄ Initiative</button><button type="button" class="s-btn dim" data-action="short">◈ Spend Hit Die</button><button type="button" class="s-btn dim" data-action="long">☾ Long Rest</button></div><p class="small-note">Hit dice remaining: <strong id="hit-dice-value"></strong>. Short rest spends one die and heals its roll + Constitution modifier; long rest restores health and up to half your level in spent dice (minimum one).</p>';
 let attack='<div class="field-grid three">'+field('Attack name','attackName')+field('Attack bonus','attackBonus','number')+field('Damage dice','damageDice','text','1d6+3')+'</div><div class="action-row"><button type="button" class="s-btn dim" data-action="attack">⚔ Attack roll</button><button type="button" class="s-btn dim" data-action="damage-roll">✷ Damage roll</button></div>';
 let death='<div class="death" id="death-block"><div class="death-header"><strong>Death saving throws</strong><span id="death-status"></span></div><div class="death-lines"><div>Successes <span id="death-success"></span></div><div>Failures <span id="death-fail"></span></div></div><div class="action-row"><button type="button" class="s-btn dim" data-action="death">Roll death save</button><button type="button" class="s-btn dim" data-action="death-clear">Reset saves</button></div><p class="small-note">10+ succeeds, a natural 1 is two failures, and a natural 20 restores 1 HP. Three successes stabilize; three failures indicate death.</p></div>';
 let dicePanel='<div class="field-grid two"><label class="s-field"><span>Dice expression</span><input id="dice-input" type="text" value="1d20" placeholder="2d6+3"></label><label class="s-field"><span>d20 roll mode</span><select id="roll-mode"><option>Normal</option><option>Advantage</option><option>Disadvantage</option></select></label></div><div class="action-row"><button type="button" class="s-btn gold" data-action="dice">⚄ Roll Dice</button></div><div class="roll-log-head"><h4>Recent rolls</h4><button type="button" class="text-button" data-action="clear-log">Clear</button></div><div id="roll-log" class="roll-log"></div>';
 root.innerHTML='<div class="sheet-heading"><div><span class="kicker">'+(IS_NPC?'NPC DOSSIER':'ADVENTURER CHARACTER SHEET')+'</span><input id="name-input" data-field="name" type="text" maxlength="800" placeholder="'+(IS_NPC?'Unnamed NPC':'Unnamed Adventurer')+'" aria-label="'+title()+' name"><p id="character-sub"></p></div><div class="sheet-heading-buttons"><button type="button" class="s-btn dim" data-main="duplicate">Duplicate</button><button type="button" class="s-btn trash" data-main="delete">Delete</button></div></div>'
 +card('♥ Health & Vitality',health,'health-card')
 +'<div class="sheet-columns"><div class="sheet-column">'
 +card(IS_NPC?'◈ NPC Information':'◈ Character Information',details+xp)
 +card('⚔ Combat & Rest',combat)
 +card('⚔ Attacks',attack)
 +card('◉ Ability Scores','<p class="small-note">Unassigned attributes stay blank until you enter them. Ability modifiers are calculated automatically.</p><div class="score-grid">'+scoreTiles()+'</div>')
 +'</div><div class="sheet-column">'
 +card('◇ Saving Throws','<p class="small-note">Check proficient saves to add your proficiency bonus.</p><div class="check-list">'+saves()+'</div>')
 +card('✧ Skills','<p class="small-note">Checkboxes add proficiency to the linked ability modifier.</p><div class="check-list">'+skills()+'</div>')
 +card('✣ Conditions','<div class="condition-grid">'+conditions()+'</div><div class="field-grid two">'+field('Exhaustion (0–6)','exhaustion','number')+'<p class="small-note align-bottom">Condition effects are tracked manually.</p></div>')
 +(IS_NPC?'':card('☩ Death Saves',death))
 +card('⚄ Dice Roller',dicePanel)
 +card('✒ Notes','<label class="s-field"><span>Notes, abilities, equipment &amp; story</span><textarea data-field="notes" rows="7" placeholder="Your campaign notes…"></textarea></label>')
 +'</div></div>';
 root.querySelectorAll('[data-field]').forEach(e=>e.value=r[e.dataset.field]??'');
 root.querySelectorAll('[data-ability]').forEach(e=>e.value=r.attributes[e.dataset.ability]??'');
 root.querySelectorAll('[data-save]').forEach(e=>e.checked=r.saves.includes(e.dataset.save));
 root.querySelectorAll('[data-skill]').forEach(e=>e.checked=r.skills.includes(e.dataset.skill));
 root.querySelectorAll('[data-condition]').forEach(e=>e.checked=r.conditions.includes(e.dataset.condition));
 refresh();
}
function refresh(){
 let r=current();if(!r)return;let pct=100*r.hp/r.maxHp;
 $('hp-text').textContent=r.hp+' / '+r.maxHp;$('hp-percent').textContent=Math.round(pct)+'% HP';$('temp-text').textContent='+'+r.tempHp+' temporary HP';
 $('hp-status').textContent=r.hp===0?'Down · 0 HP':r.hp===r.maxHp?'Full health':pct<=25?'Critical':pct<=50?'Wounded':'In fighting shape';
 $('hp-fill').style.width=pct+'%';$('hp-fill').classList.toggle('low',pct<=25);$('hp-progress').setAttribute('aria-valuenow',r.hp);$('hp-progress').setAttribute('aria-valuemax',r.maxHp);
 $('character-sub').textContent='Level '+r.level+' · Class Rank: '+(r.rank||'Unassigned');
 $('ac-value').textContent=r.ac;$('init-value').textContent=plus(mod(r.attributes.dex)||0);$('speed-value').textContent=r.speed;$('prof-value').textContent=plus(proficiency(r.level));$('hit-dice-value').textContent=r.hitDice+' / '+r.level;
 for(let [key] of A){let a=mod(r.attributes[key]);$('mod-'+key).textContent=plus(a);$('save-'+key).textContent=plus(a===null?null:a+(r.saves.includes(key)?proficiency(r.level):0));}
 for(let [name,key] of SK){let a=mod(r.attributes[key]);let value=a===null?null:a+(r.skills.includes(name)?proficiency(r.level):0);let element=rootSkill(name);if(element)element.textContent=plus(value);}
 $('xp-text').textContent=r.level===20?'Level 20 · maximum level':r.xp.toLocaleString()+' / '+nextXP(r.level).toLocaleString()+' XP';
 let lower=XP[r.level-1],upper=nextXP(r.level);$('xp-meter').style.width=(r.level===20?100:Math.max(0,Math.min(100,100*(r.xp-lower)/(upper-lower))))+'%';
 if(!IS_NPC){$('death-block').classList.toggle('not-downed',r.hp>0);$('death-status').textContent=r.hp>0?'Not needed':r.deathFail===3?'Dead':r.deathSuccess===3?'Stable':'At 0 HP';for(let [key,id] of [['deathSuccess','death-success'],['deathFail','death-fail']]){let el=$(id);el.replaceChildren();for(let i=0;i<3;i++)el.append(mk('i',i<r[key]?'marked':''));}}
 renderLog();
}
function rootSkill(name){return [...document.querySelectorAll('[data-skill-score]')].find(e=>e.dataset.skillScore===name);}
function renderLog(){let root=$('roll-log'),r=current();if(!root)return;root.replaceChildren();if(!r.log.length){root.append(mk('p','small-note','Roll history appears here.'));return;}for(let item of r.log){let row=mk('div','log-item');row.append(mk('strong',null,item.label),mk('span',null,item.result));root.append(row);}}
function edit(e){
 let r=current();if(!r)return;
 if(e.dataset.field){let key=e.dataset.field;if(!(key in r))return;if(key in num){let [a,b]=num[key];r[key]=clamp(e.value,a,b);}else r[key]=e.value.slice(0,key==='notes'?25000:800);
 if(key==='maxHp'||key==='hp')r.hp=Math.min(r.hp,r.maxHp);
 if(key==='level')r.hitDice=Math.min(r.hitDice,r.level);
 if(key==='hitDie'&&![4,6,8,10,12].includes(r.hitDie))r.hitDie=8;
 if(key==='hp'&&r.hp>0)r.deathSuccess=r.deathFail=0;
 }else if(e.dataset.ability){let v=Number(e.value);r.attributes[e.dataset.ability]=e.value!==''&&Number.isInteger(v)&&v>=1&&v<=30?v:null;}
 else{for(let [data,prop] of [['save','saves'],['skill','skills'],['condition','conditions']]){let v=e.dataset[data];if(v){r[prop]=r[prop].filter(x=>x!==v);if(e.checked)r[prop].push(v);break;}}}
 save();refresh();
 if(['name','origin','rank','level','hp','maxHp','role','location'].includes(e.dataset.field))renderRoster();
}
function handleAction(action){let r=current();if(!r)return;
 if(action==='damage'||action==='heal')return adjust(action);
 if(action==='short')return shortRest();
 if(action==='long')return longRest();
 if(action==='death')return deathSave();
 if(action==='death-clear'){r.deathSuccess=r.deathFail=0;save();render();return;}
 if(action==='initiative')return check('Initiative',mod(r.attributes.dex)||0);
 if(action==='attack')return check(r.attackName||'Attack',r.attackBonus);
 if(action==='damage-roll')return recordRoll((r.attackName||'Attack')+' damage',roll(r.damageDice));
 if(action==='dice')return recordRoll('Dice: '+$('dice-input').value,roll($('dice-input').value,rollmode()));
 if(action==='clear-log'){if(confirm('Clear roll history for this sheet?')){r.log=[];save();renderLog();}return;}
}
$('sheet').addEventListener('click',e=>{
 let b=e.target.closest('button');if(!b)return;
 if(b.dataset.main==='new')return newRecord();
 if(b.dataset.main==='duplicate')return duplicateRecord();
 if(b.dataset.main==='delete')return deleteRecord();
 if(b.dataset.action)return handleAction(b.dataset.action);
 let r=current();if(!r)return;
 if(b.dataset.check){let k=b.dataset.check;return check(A.find(x=>x[0]===k)[1]+' check',mod(r.attributes[k]));}
 if(b.dataset.saveRoll){let k=b.dataset.saveRoll,m=mod(r.attributes[k]);return check(A.find(x=>x[0]===k)[1]+' saving throw',m===null?null:m+(r.saves.includes(k)?proficiency(r.level):0));}
 if(b.dataset.skillRoll){let name=b.dataset.skillRoll,k=SK.find(x=>x[0]===name)?.[1],m=mod(r.attributes[k]);return check(name+' check',m===null?null:m+(r.skills.includes(name)?proficiency(r.level):0));}
});
$('sheet').addEventListener('input',e=>{if(e.target.matches('input[type=text][data-field],textarea[data-field]'))edit(e.target);});
$('sheet').addEventListener('change',e=>{if(e.target.matches('input[type=text][data-field],textarea[data-field]'))return;if(e.target.matches('[data-field],[data-ability],[data-save],[data-skill],[data-condition]'))edit(e.target);});
$('roster').addEventListener('click',e=>{let b=e.target.closest('[data-record]');if(b)selectRecord(b.dataset.record);});
$('roster-search').addEventListener('input',renderRoster);
$('new-button').addEventListener('click',newRecord);
$('copy-button').addEventListener('click',duplicateRecord);
$('export-button').addEventListener('click',()=>{
 let payload={format:'everwild-sheet-backup',version:1,exportedAt:new Date().toISOString(),characters:db.characters,npcs:db.npcs};
 let url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),link=mk('a');link.href=url;link.download='everwild-sheets-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 notice('Exported '+db.characters.length+' player sheets and '+db.npcs.length+' NPC sheets.');});
$('import-button').addEventListener('click',()=>$('import-input').click());
$('import-input').addEventListener('change',async e=>{
 let file=e.target.files?.[0];e.target.value='';if(!file)return;if(file.size>5000000){notice('Backup exceeds 5 MB.',true);return;}
 try{let payload=JSON.parse(await file.text());if(payload.format!=='everwild-sheet-backup'||payload.version!==1||!Array.isArray(payload.characters)||!Array.isArray(payload.npcs))throw Error('Invalid Everwild backup format');
 let clean={characters:payload.characters.slice(0,500).map(normalize).filter(Boolean),npcs:payload.npcs.slice(0,500).map(normalize).filter(Boolean)};
 if(!confirm('Import '+clean.characters.length+' characters and '+clean.npcs.length+' NPCs? Matching record IDs will be updated; other sheets will remain.'))return;
 for(let mode of ['characters','npcs']){let byId=new Map(db[mode].map(x=>[x.id,x]));for(let r of clean[mode])byId.set(r.id,r);db[mode]=[...byId.values()];}
 if(!current())db.selected[MODE]=db[MODE][0]?.id||null;save();render();notice('Import complete. Both character collections restored.');
 }catch(err){notice('Import failed: '+err.message,true);}
});
load();if(!db[MODE].some(x=>x.id===db.selected[MODE]))db.selected[MODE]=db[MODE][0]?.id||null;save();render();
