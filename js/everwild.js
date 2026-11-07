import {TYPES, TYPE_CHART, typeEffectiveness} from '../data/monster_type_chart.js';
const colors={Fire:'#ea896c',Water:'#74b6de',Grass:'#a4cf7e',Electric:'#f2d876',Ice:'#b5e0e5',Fighting:'#dbad86',Poison:'#b6a1d5',Ground:'#c3ae7d',Flying:'#a7bee8',Psychic:'#e6a6c6',Bug:'#bfca8f',Rock:'#b5a886',Ghost:'#9f9ad8',Dragon:'#979ae0',Dark:'#ada1ad',Steel:'#b9c5cb',Fairy:'#e9b5dc',Sound:'#92d6e1',Light:'#f4e4a9',Mist:'#a6dec8'};
const symbols={Fire:'✷',Water:'≈',Grass:'❧',Electric:'ϟ',Ice:'✳',Fighting:'✦',Poison:'◇',Ground:'▰',Flying:'➶',Psychic:'◈',Bug:'✿',Rock:'⬡',Ghost:'☾',Dragon:'✣',Dark:'◐',Steel:'⌘',Fairy:'✧',Sound:'♫',Light:'☼',Mist:'☁'};
const $=id=>document.getElementById(id);
const category=v=>({2:'sup',1:'neu',0.5:'res',0:'imm'})[v];
const mark=v=>({2:'2×',1:'1×',0.5:'½×',0:'0×'})[v];
const label=v=>({2:'Super effective',1:'Neutral',0.5:'Not very effective',0:'No effect'})[v];
let current='Mist';
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function tags(id,items){const root=$(id);root.replaceChildren();if(!items.length){root.append(node('span','empty','None'));return;}for(const value of items){const el=node('span','chip',value);if(colors[value])el.style.setProperty('--color',colors[value]);root.append(el);}}
function highlight(){const focus=$('matrix').classList.contains('focused');for(const cell of document.querySelectorAll('#matrix [data-a],#matrix [data-d]')){const active=cell.dataset.a===current||cell.dataset.d===current;cell.classList.toggle('on-axis',active);cell.classList.toggle('highlight',active&&!focus);}}
function selectType(type){if(!TYPE_CHART[type])return;current=type;$('type-name').textContent=type;$('type-index').textContent=String(TYPES.indexOf(type)+1).padStart(2,'0');$('type-symbol').textContent=symbols[type];$('profile').style.setProperty('--accent',colors[type]);
 const strong=TYPES.filter(t=>typeEffectiveness(type,t)===2),poor=TYPES.filter(t=>typeEffectiveness(type,t)===.5),nullTo=TYPES.filter(t=>typeEffectiveness(type,t)===0),weak=TYPES.filter(t=>typeEffectiveness(t,type)===2),resists=TYPES.filter(t=>typeEffectiveness(t,type)===.5),immune=TYPES.filter(t=>typeEffectiveness(t,type)===0);
 $('strong-count').textContent=strong.length;$('weak-count').textContent=weak.length;$('resist-count').textContent=resists.length;
 tags('strong',strong);tags('poor',poor);tags('weak',weak);tags('resists',resists);tags('immune',[...nullTo.map(t=>'No effect on '+t),...immune.map(t=>'Immune to '+t)]);
 document.querySelectorAll('.type-button').forEach(button=>{const active=button.dataset.type===type;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});highlight();
}
for(const type of TYPES){const button=node('button','type-button',type);button.type='button';button.dataset.type=type;button.style.setProperty('--color',colors[type]);button.addEventListener('click',()=>selectType(type));$('type-grid').append(button);}
$('search').addEventListener('input',event=>{const term=event.target.value.toLowerCase().trim();let n=0;document.querySelectorAll('.type-button').forEach(b=>{b.hidden=!b.dataset.type.toLowerCase().includes(term);if(!b.hidden)n++;});$('type-count').textContent=n+' of 20 types';});
const headings=node('tr');const corner=node('th','corner','ATK ↓ / DEF →');corner.scope='col';headings.append(corner);
for(const type of TYPES){const h=node('th',null,type);h.scope='col';h.dataset.d=type;headings.append(h);}$('theader').append(headings);
for(const attacker of TYPES){const row=node('tr'),h=node('th',null,attacker);h.scope='row';h.dataset.a=attacker;row.append(h);
 for(const defender of TYPES){const value=typeEffectiveness(attacker,defender);const cell=node('td',category(value),mark(value));cell.dataset.a=attacker;cell.dataset.d=defender;cell.title=attacker+' attacks '+defender+': '+mark(value)+' ('+label(value)+')';cell.setAttribute('aria-label',cell.title);row.append(cell);}$('tbody').append(row);}
$('focus').addEventListener('click',()=>{const state=$('focus').getAttribute('aria-pressed')!=='true';$('focus').setAttribute('aria-pressed',String(state));$('matrix').classList.toggle('focused',state);highlight();});
for(const id of ['attacker','defender']){for(const type of TYPES){const opt=node('option',null,type);opt.value=type;$(id).append(opt);}$(id).addEventListener('change',calculate);}
function calculate(){const v=typeEffectiveness($('attacker').value,$('defender').value);$('result-value').textContent=mark(v);$('result-text').textContent=label(v);$('result').title=$('attacker').value+' attacks '+$('defender').value+' for '+mark(v)+' damage';}
$('attacker').value='Mist';$('defender').value='Fire';calculate();selectType('Mist');
