(()=>{'use strict';const DATA='data/pokedex.json';const TYPES={Normal:'#deded1',Fire:'#f7c5a0',Water:'#b8d9f6',Grass:'#b9dfb0',Electric:'#f6e69d',Ice:'#c2eaf1',Fighting:'#e3b1a5',Dark:'#c3b9ce',Psychic:'#f4b9d2',Poison:'#d4b4df',Ground:'#e5d3ac',Rock:'#d8ceae',Flying:'#c9d7f1',Bug:'#d9e5a4',Ghost:'#d0c9e6',Steel:'#cfd9df',Dragon:'#b9c5f3',Fairy:'#f6d2e8'};const $=s=>document.querySelector(s);const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const num=n=>'#'+String(n).padStart(3,'0');const stats=[['hp','HP'],['attack','Attack'],['defense','Defense'],['special_attack','Sp. Attack'],['special_defense','Sp. Defense'],['speed','Speed']];const legacy={1:'Fierce Chibi Wolf Pokémon Card.png',2:'002-Wolvigor.png',3:'003-Wolvage.png',4:'004-Solcub.png',5:'#005 Solbruin.png',6:'#006 Solursus.png',7:'#007 Ripplet.png',8:'#008 Ripplash.png',9:'#009 Riptorrent.png',10:'#010 Foliko.png',11:'#011 Folisk.png',12:'#012 Foliraptor.png',13:'#013 Kivolt.png',14:'#015 Kivarion.png',15:'#014 Kivarra.png',16:'#016 Arctix.png',17:'#017 Arctivar.png',18:'#018 Arctivale.png',19:'019_Joeyjab.png',20:'020_Rookick.png',21:'021_Kangarush.png'};function art(p){const source=p.images?.solo||p.images?.standard||p.images?.artwork||legacy[p.number]||p.images?.concept||'';if(!source)return '';if(/^https?:\/\//i.test(source))return source;return source.split('/').map(encodeURIComponent).join('/')}function artHTML(p){let path=art(p);return '<div class="artwork" style="--art:'+escape(TYPES[p.type1]||'#e9eee3')+'">'+(path?'<img src="'+escape(path)+'" alt="'+escape(p.name)+' artwork" loading="lazy" onerror="this.remove();this.parentElement.insertAdjacentHTML(\'beforeend\',\'<span class=&quot;placeholder&quot;>Artwork Coming Soon</span>\')">':'<span class="placeholder">Artwork Coming Soon</span>')+'</div>'}function badges(p){return [p.type1,p.type2].filter(Boolean).map(t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>').join('')}function bst(p){return stats.reduce((n,[k])=>n+(Number(p.base_stats?.[k])||0),0)}function card(p){return '<a class="poke-card" href="pokemon.html?id='+p.number+'">'+artHTML(p)+'<div class="card-body"><span class="number">'+num(p.number)+'</span><h2>'+escape(p.name)+'</h2><div class="types">'+badges(p)+'</div><div class="details"><span>'+escape(p.height_m??'—')+' m · '+escape(p.weight_kg??'—')+' kg</span><span>Stage '+escape(p.stage??'—')+'</span></div></div></a>'}async function load(){let r=await fetch(DATA,{cache:'no-store'});if(!r.ok)throw Error('Pokédex data unavailable');let d=await r.json();if(!Array.isArray(d.pokemon))throw Error('Invalid Pokédex data');return d.pokemon.slice().sort((a,b)=>a.number-b.number)}function home(pokemon){let root=$('#dex'),search=$('#search'),type=$('#typeFilter'),stage=$('#stageFilter'),sort=$('#sort');let names=[...new Set(pokemon.flatMap(p=>[p.type1,p.type2].filter(Boolean)))].sort();type.innerHTML='<option value="">All types</option>'+names.map(t=>'<option>'+escape(t)+'</option>').join('');let state={};try{state=JSON.parse(sessionStorage.getItem('everwild-return')||'{}')}catch{}search.value=state.search||'';type.value=state.type||'';stage.value=state.stage||'';sort.value=state.sort||'number';let limit=state.limit||24;function filtered(){let q=search.value.trim().toLowerCase();let arr=pokemon.filter(p=>(!q||p.name.toLowerCase().includes(q)||String(p.number).includes(q))&&(!type.value||[p.type1,p.type2].includes(type.value))&&(!stage.value||String(p.stage)===stage.value));let key=sort.value,reverse=key.startsWith('-');if(reverse)key=key.slice(1);arr.sort((a,b)=>{let v=key==='name'?a.name.localeCompare(b.name):key==='number'?a.number-b.number:key==='bst'?bst(a)-bst(b):(Number(a.base_stats?.[key])||0)-(Number(b.base_stats?.[key])||0);return reverse?-v:v});return arr}function render(){let arr=filtered(),shown=arr.slice(0,limit);root.innerHTML=shown.map(card).join('')||'<div class="panel">No Pokémon found. Try clearing your search or filters.</div>';$('#count').textContent='Showing '+shown.length+' of '+arr.length+' Pokémon';$('#progress').style.width=(arr.length?shown.length/arr.length*100:0)+'%';$('#loadMore').hidden=shown.length>=arr.length;sessionStorage.setItem('everwild-return',JSON.stringify({search:search.value,type:type.value,stage:stage.value,sort:sort.value,limit,scroll:window.scrollY}))}for(let el of [search,type,stage,sort])el.addEventListener(el===search?'input':'change',()=>{limit=24;render()});$('#reset').onclick=()=>{search.value='';type.value='';stage.value='';sort.value='number';limit=24;render()};$('#loadMore').onclick=()=>{limit+=24;render()};root.addEventListener('click',e=>{if(e.target.closest('a'))sessionStorage.setItem('everwild-return',JSON.stringify({search:search.value,type:type.value,stage:stage.value,sort:sort.value,limit,scroll:window.scrollY}))});render();if(state.scroll){requestAnimationFrame(()=>window.scrollTo(0,state.scroll))}}function solcubProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},custom=(p.custom_moves||[]).find(m=>m.name==='Ember Claw'),normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';$('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo"><a href="pokemon.html?id=4"><strong>#004 Solcub</strong><span>Base form</span></a><strong>→ Level 18 →</strong><a href="pokemon.html?id=5"><strong>#005 Solbruin</strong><span>Stage 2</span></a><strong>→ Level 36 →</strong><a href="pokemon.html?id=6"><strong>#006 Solursus</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Fire-Type Attacks',[
   ['Super Effective','Grass, Ice, Bug, Steel','2×',['Grass','Ice','Bug','Steel']],
   ['Not Very Effective','Fire, Water, Rock, Dragon','½×',['Fire','Water','Rock','Dragon']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]
  ]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Water, Ground, Rock','2×',['Water','Ground','Rock']],
   ['Resistances','Fire, Grass, Ice, Bug, Steel, Fairy','½×',['Fire','Grass','Ice','Bug','Steel','Fairy']],
   ['Immunities','None','—',[]],
   ['All Other Types','Neutral','1×',[]]
  ]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'+g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'+(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'+escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>'<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')+'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>'<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')+'</td><td>'+(row.exp_to_next==null?'Evolves into Solbruin':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<18).slice().sort((a,b)=>Number(a.level)-Number(b.level)).map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+(m.custom?' ★':'')+'</td><td>'+chip(m.type||'Normal')+'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch"><button type="button" id="normalArt" aria-pressed="true">Normal</button><button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button></div></div>';
 root.innerHTML='<div class="solcub-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves'].map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#004</span><h2>Solcub</h2><div class="types">'+chip('Fire')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'+info('Height',p.height_m+' m (1′8″)')+info('Weight',p.weight_kg+' kg (20.9 lbs)')
  +info('Evolution Stage','1 of 3')+info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences, including shiny form.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2><div class="effect-columns">'+matchups+'</div><p class="muted">Pure Fire typing. Individual abilities may modify interactions; Flash Fire grants immunity to damaging Fire-type moves after activation conditions are met.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution+'<p class="muted">Evolution is automatic under Everwild rules. Cumulative experience is retained after evolving.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'+abilityCards+'</div><p class="muted">An individual Solcub has either Flash Fire or Solar Power, never both. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar"><div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div><strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +1 Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 18 → Solbruin (automatic)')+'<p class="muted">Cumulative experience is retained when evolving. These totals represent required EXP, not EXP awarded for defeating Solcub.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2><p class="muted">Only moves learned as Solcub (before evolving at Level 18).</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th><th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div>'
  +(custom?'<div class="custom-move"><h3>★ Ember Claw — Original Everwild Move</h3><div class="table-scroll"><table class="moves"><tbody>'
    +[['Type',custom.type],['Category',custom.category],['Power',custom.power],['Accuracy',custom.accuracy+'%'],['PP',custom.pp],['Additional Effect',custom.burn_chance_percent+'% chance to burn'],['Contact Move',custom.contact?'Yes':'No']].map(row=>'<tr><th>'+escape(row[0])+'</th><td>'+escape(row[1])+'</td></tr>').join('')
    +'</tbody></table></div><p><strong>Move Description:</strong> '+escape(custom.description)+'</p></div>':'')
  +'</section><div class="panel"><div class="nav"><a href="pokemon.html?id=3">← Wolvage</a><a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=5">Solbruin →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{if(isShiny&&!shiny)return;img.src=isShiny?shiny:normal;img.alt='Solcub '+(isShiny?'shiny':'normal')+' artwork';normalBtn.setAttribute('aria-pressed',String(!isShiny));shinyBtn.setAttribute('aria-pressed',String(isShiny));normalBtn.style.fontWeight=isShiny?'normal':'bold';shinyBtn.style.fontWeight=isShiny?'bold':'normal'};
  img.onerror=()=>{if(img.getAttribute('src')!==normal)show(false)};
  normalBtn.addEventListener('click',()=>show(false));shinyBtn.addEventListener('click',()=>show(true));show(false);
 }
}

function solbruinProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),
       shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'',
       ember=(p.custom_moves||[]).find(m=>m.name==='Ember Claw');
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const pill=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const pills=arr=>arr.map(pill).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=4"><strong>#004 Solcub</strong><span>Base form</span></a><strong>→ Level 18 →</strong>'
  +'<a href="pokemon.html?id=5"><strong>#005 Solbruin</strong><span>Stage 2</span></a><strong>→ Level 36 →</strong>'
  +'<a href="pokemon.html?id=6"><strong>#006 Solursus</strong><span>Final evolution</span></a></div>';
 const matchups=[
  ['Offensive — Fire-Type Attacks',[
   ['Super Effective',['Grass','Ice','Bug','Steel'],'2×'],
   ['Not Very Effective',['Fire','Water','Rock','Dragon'],'½×'],
   ['No Effect',[],'—'],
   ['All Other Types',[],'1×']]],
  ['Defensive — Damage Received',[
   ['Weaknesses',['Water','Ground','Rock'],'2×'],
   ['Resistances',['Fire','Grass','Ice','Bug','Steel','Fairy'],'½×'],
   ['Immunities',[],'—'],
   ['All Other Types',[],'1×']]]
 ];
 const matchupHtml=matchups.map(group=>'<div><h3>'+escape(group[0])+'</h3><div class="effect-grid">'
  +group[1].map(m=>'<div class="effect-item"><strong>'+escape(m[0])+'</strong><div>'
   +(m[1].length?pills(m[1]):m[0]==='All Other Types'?'Neutral':'None')
   +'</div><span class="effect-multiplier">'+escape(m[2])+'</span></div>').join('')
  +'</div></div>').join('');
 const abilityHtml=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const experienceHtml=(p.experience_table||[]).map(x=>
  '<tr><td>'+escape(x.level)+'</td><td>'+Number(x.total_exp).toLocaleString('en-US')
  +'</td><td>'+(x.exp_to_next==null?'Evolves into Solursus':Number(x.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const movesHtml=(p.moves||[]).filter(m=>Number(m.level)>=18&&Number(m.level)<36)
   .slice().sort((a,b)=>Number(a.level)-Number(b.level)).map(m=>
   '<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+pill(m.type||'Normal')
   +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false"'+(!shiny?' disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile solbruin-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves'].map(x=>
   '<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#005</span><h2>Solbruin</h2>'
  +'<div class="types">'+pill('Fire')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (2′11″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (83.8 lbs)')
  +info('Evolution Stage','2 of 3')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences, including shiny form.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchupHtml+'</div>'
  +'<p class="muted">These matchups reflect pure Fire typing. Abilities, including Flash Fire, can modify interactions.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution+'</section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityHtml+'</div><p class="muted">Each Solbruin has either Flash Fire or Solar Power, never both. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div>'
   +'</div><strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +2 Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 36 → Solursus')
  +'<p class="muted">Cumulative EXP carries over from Solcub and is retained when evolving into Solursus. '
  +'These totals are required experience, not experience awarded for defeating Solbruin.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+experienceHtml+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'
  +'<p class="muted">Only moves learned as Solbruin (Levels 18–35) are listed. '
  +'Previously learned moves from Solcub are retained; no new evolution move at Level 18.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+movesHtml+'</tbody></table></div>'
  +(ember?'<div class="custom-move"><h3>★ Ember Claw — Previously Learned Custom Move</h3>'
    +'<p class="muted">Learned by Solcub at Level 4; retained through evolution. Not a new Level 18 move.</p>'
    +'<div class="table-scroll"><table class="moves"><tbody>'
    +[['Type',ember.type],['Category',ember.category],['Power',ember.power],
      ['Accuracy',ember.accuracy+'%'],['PP',ember.pp],
      ['Additional Effect',ember.burn_chance_percent+'% chance to burn'],
      ['Contact Move',ember.contact?'Yes':'No']].map(row=>
      '<tr><th>'+escape(row[0])+'</th><td>'+escape(row[1])+'</td></tr>').join('')
    +'</tbody></table></div><p><strong>Move Description:</strong> '+escape(ember.description)+'</p></div>':'')
  +'</section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=4">← Solcub</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=6">Solursus →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Solbruin '+(isShiny?'shiny':'normal')+' artwork';
   normalBtn.setAttribute('aria-pressed',String(!isShiny));
   shinyBtn.setAttribute('aria-pressed',String(isShiny));
   normalBtn.style.fontWeight=isShiny?'normal':'bold';
   shinyBtn.style.fontWeight=isShiny?'bold':'normal';
  };
  img.onerror=()=>{if(img.getAttribute('src')!==normal)show(false)};
  normalBtn.addEventListener('click',()=>show(false));
  shinyBtn.addEventListener('click',()=>show(true));
  show(false);
 }
}
function solursusProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),
       shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'',
       ember=(p.custom_moves||[]).find(m=>m.name==='Ember Claw');
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const pill=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const pills=arr=>arr.map(pill).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=4"><strong>#004 Solcub</strong><span>Base form</span></a><strong>→ Level 18 →</strong>'
  +'<a href="pokemon.html?id=5"><strong>#005 Solbruin</strong><span>Stage 2</span></a><strong>→ Level 36 →</strong>'
  +'<a href="pokemon.html?id=6"><strong>#006 Solursus</strong><span>Final evolution</span></a></div>';
 const matchups=[
  ['Offensive — Fire-Type Attacks',[
   ['Super Effective',['Grass','Ice','Bug','Steel'],'2×'],
   ['Not Very Effective',['Fire','Water','Rock','Dragon'],'½×'],
   ['No Effect',[],'—'],
   ['All Other Types',[],'1×']]],
  ['Defensive — Damage Received',[
   ['Weaknesses',['Water','Ground','Rock'],'2×'],
   ['Resistances',['Fire','Grass','Ice','Bug','Steel','Fairy'],'½×'],
   ['Immunities',[],'—'],
   ['All Other Types',[],'1×']]]
 ];
 const matchupHtml=matchups.map(group=>'<div><h3>'+escape(group[0])+'</h3><div class="effect-grid">'
  +group[1].map(m=>'<div class="effect-item"><strong>'+escape(m[0])+'</strong><div>'
   +(m[1].length?pills(m[1]):m[0]==='All Other Types'?'Neutral':'None')
   +'</div><span class="effect-multiplier">'+escape(m[2])+'</span></div>').join('')
  +'</div></div>').join('');
 const abilityHtml=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const experienceHtml=(p.experience_table||[]).map(x=>
  '<tr><td>'+escape(x.level)+'</td><td>'+Number(x.total_exp).toLocaleString('en-US')
  +'</td><td>'+(x.exp_to_next==null?'Maximum Level':Number(x.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const movesHtml=(p.moves||[]).filter(m=>Number(m.level)>=36&&Number(m.level)<=100)
   .slice().sort((a,b)=>Number(a.level)-Number(b.level)).map(m=>
   '<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+pill(m.type||'Normal')
   +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false"'+(!shiny?' disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile solursus-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves'].map(x=>
   '<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#006</span><h2>Solursus</h2>'
  +'<div class="types">'+pill('Fire')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (5′11″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (396.8 lbs)')
  +info('Evolution Stage','3 of 3 — Final')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences, including shiny form.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchupHtml+'</div>'
  +'<p class="muted">These matchups reflect pure Fire typing. Abilities, including Flash Fire, can modify interactions.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution+'</section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityHtml+'</div><p class="muted">Each Solursus has either Flash Fire or Solar Power, never both. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div>'
   +'</div><strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +3 Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Final evolution')+info('Maximum Level',p.max_level)
  +'<p class="muted">Cumulative EXP carries over from Solcub and Solbruin; Solursus is the final evolutionary stage. '
  +'These totals are required experience, not experience awarded for defeating Solursus.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+experienceHtml+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'
  +'<p class="muted">Only moves learned as Solursus (Levels 36–100) are listed. '
  +'Previously learned moves from Solcub and Solbruin are retained; no new evolution move at Level 36.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+movesHtml+'</tbody></table></div>'
  +(ember?'<div class="custom-move"><h3>★ Ember Claw — Previously Learned Custom Move</h3>'
    +'<p class="muted">Learned by Solcub at Level 4; retained through evolution. Not a new Level 36 move.</p>'
    +'<div class="table-scroll"><table class="moves"><tbody>'
    +[['Type',ember.type],['Category',ember.category],['Power',ember.power],
      ['Accuracy',ember.accuracy+'%'],['PP',ember.pp],
      ['Additional Effect',ember.burn_chance_percent+'% chance to burn'],
      ['Contact Move',ember.contact?'Yes':'No']].map(row=>
      '<tr><th>'+escape(row[0])+'</th><td>'+escape(row[1])+'</td></tr>').join('')
    +'</tbody></table></div><p><strong>Move Description:</strong> '+escape(ember.description)+'</p></div>':'')
  +'</section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=5">← Solbruin</a>'
  +'<a href="index.html">Back to Pokédex</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Solursus '+(isShiny?'shiny':'normal')+' artwork';
   normalBtn.setAttribute('aria-pressed',String(!isShiny));
   shinyBtn.setAttribute('aria-pressed',String(isShiny));
   normalBtn.style.fontWeight=isShiny?'normal':'bold';
   shinyBtn.style.fontWeight=isShiny?'bold':'normal';
  };
  img.onerror=()=>{if(img.getAttribute('src')!==normal)show(false)};
  normalBtn.addEventListener('click',()=>show(false));
  shinyBtn.addEventListener('click',()=>show(true));
  show(false);
 }
}
function profile(pokemon){let id=Number(new URLSearchParams(location.search).get('id')||1),p=pokemon.find(x=>x.number===id);if(!p){$('#profile').innerHTML='<div class="panel">Pokémon not found. <a href="index.html">Return to Pokédex</a>.</div>';return}if(p.number===4){solcubProfile(p,pokemon);return}if(p.number===5){solbruinProfile(p,pokemon);return}if(p.number===6){solursusProfile(p,pokemon);return}document.title=p.name+' | Everwild Pokédex';$('#title').textContent=num(p.number)+' '+p.name;let s=p.base_stats||{},moves=p.moves||[],idx=pokemon.indexOf(p);let sections='<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves'].map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>';let evolution=[1,2,3].includes(p.number)?'<div class="evo"><a href="pokemon.html?id=1"><strong>#001 Wolvyn</strong><br>Base form</a><strong>→ Level 17 →</strong><a href="pokemon.html?id=2"><strong>#002 Wolvigor</strong><br>Stage 2</a><strong>→ Level 35 →</strong><a href="pokemon.html?id=3"><strong>#003 Wolvage</strong><br>Final evolution</a></div>':'<p class="muted">Evolution details will be displayed as each species is reviewed.</p>';let abilityDescriptions={Defiant:'Raises Attack by two stages when an opposing effect lowers one of its stats.',Guts:'Increases physical Attack by 50% while affected by a non-volatile status condition; ignores the usual Attack reduction from burns.'};let abilities=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>'<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(abilityDescriptions[a.name]||'Ability effect information coming soon.')+'</p><p class="muted">Ability '+(i+1)+'</p></div>').join('')||'<p>Information Coming Soon</p>';let rows=moves.filter(m=>p.number!==2||(Number(m.level)>=17&&Number(m.level)<35)).sort((a,b)=>(Number(a.level)||0)-(Number(b.level)||0)).map(m=>'<tr><td>'+escape(m.level??'—')+'</td><td>'+escape(m.name)+'</td></tr>').join('');$('#profile').innerHTML=sections+'<section class="panel hero">'+([1,2,3].includes(p.number)?'<div>'+artHTML(p)+'<div class="shiny-switch" style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button type="button" id="normalArt" aria-pressed="true">Normal</button><button type="button" id="shinyArt" aria-pressed="false" '+(p.number!==1&&!p.images?.shiny?'disabled title="Approved shiny artwork awaiting upload"':'')+'>✨ Shiny</button></div></div>':artHTML(p))+'<div><span class="number">'+num(p.number)+'</span><h2>'+escape(p.name)+'</h2><div class="types">'+badges(p)+'</div><p>'+escape(p.category||'Classification Coming Soon')+'</p><p>'+escape(p.pokedex_entry||'Information Coming Soon')+'</p><p><strong>Height:</strong> '+escape(p.height_m??'—')+' m · <strong>Weight:</strong> '+escape(p.weight_kg??'—')+' kg</p><p class="muted">Stage '+escape(p.stage??'—')+'</p>'+([1,2,3].includes(p.number)?'<p><strong>Gender Ratio:</strong> Male '+escape(p.gender_ratio?.male)+'% · Female '+escape(p.gender_ratio?.female)+'%</p><p class="muted">No gender-based appearance differences, including shiny forms.</p><p><strong>Catch Rate:</strong> '+escape(p.catch_rate)+' <span class="muted">(capture value, not a percentage)</span></p>':'')+'</div></section><section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'+(p.type1==='Normal'&&!p.type2?'<div class="ability-grid"><div class="ability"><h3>Weaknesses</h3><p><span class="type" style="--type:#e3b1a5">Fighting</span> <strong>×2 damage</strong></p></div><div class="ability"><h3>Immunities</h3><p><span class="type" style="--type:#d0c9e6">Ghost</span> <strong>×0 damage</strong></p></div></div><p class="muted">No resistances. All other attacking types deal normal (×1) damage.</p>':'<p class="muted">Detailed matchups coming soon.</p>')+'</section><section id="evolution" class="panel"><h2 class="section-title">Evolution</h2>'+evolution+'</section><section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'+abilities+'</div><p class="muted">An individual Pokémon has one of these abilities, not both.</p></section><section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'+stats.map(([k,label])=>'<div class="stat"><span>'+label+'</span><div class="bar"><div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[k])||0)/255*100))+'%"></div></div><strong>'+escape(s[k]??'—')+'</strong></div>').join('')+'<p><strong>Base Stat Total: '+(Object.keys(s).length?bst(p):'To be determined')+'</strong></p>'+(p.number===1?'<p><strong>EV Yield:</strong> +1 Attack EV</p>':p.number===2?'<p><strong>EV Yield:</strong> +2 Attack EVs</p>':'')+'</section>'+(p.number===2?'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2><p><strong>Growth Rate:</strong> '+escape(p.experience_growth_rate)+'</p><p><strong>Evolution:</strong> Level 35 → Wolvage (automatic)</p><p><strong>Cumulative EXP:</strong> Retained through evolution</p><p><strong>Base EXP Yield:</strong> '+escape(p.base_exp_yield)+'</p><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody>'+p.experience_table.map(x=>'<tr><td>'+x.level+'</td><td>'+x.total_exp.toLocaleString('en-US')+'</td><td>'+(x.exp_to_next==null?'Evolves into Wolvage':x.exp_to_next.toLocaleString('en-US'))+'</td></tr>').join('')+'</tbody></table></section>':'')+(p.number===3?'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2><p><strong>Growth Rate:</strong> Medium Slow</p><p><strong>Evolution:</strong> Final stage (from Wolvigor at Level 35)</p><p><strong>Cumulative EXP:</strong> Retained through evolution</p><p><strong>Base EXP Yield:</strong> '+escape(p.base_exp_yield)+'</p><p class="muted">Cumulative EXP is the total required to reach each level, not EXP awarded for defeating Wolvage.</p><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody>'+p.experience_table.map(x=>'<tr><td>'+x.level+'</td><td>'+x.total_exp.toLocaleString('en-US')+'</td><td>'+(x.exp_to_next==null?'Maximum Level':x.exp_to_next.toLocaleString('en-US'))+'</td></tr>').join('')+'</tbody></table></section>':'')+(p.number===1?'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2><p><strong>Growth Rate:</strong> Medium Slow</p><p><strong>Evolution:</strong> Level 17 → Wolvigor (automatic)</p><p><strong>Base EXP Yield:</strong> 62</p><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody><tr><td>1</td><td>0</td><td>9</td></tr><tr><td>2</td><td>9</td><td>48</td></tr><tr><td>3</td><td>57</td><td>39</td></tr><tr><td>4</td><td>96</td><td>39</td></tr><tr><td>5</td><td>135</td><td>44</td></tr><tr><td>6</td><td>179</td><td>57</td></tr><tr><td>7</td><td>236</td><td>78</td></tr><tr><td>8</td><td>314</td><td>105</td></tr><tr><td>9</td><td>419</td><td>141</td></tr><tr><td>10</td><td>560</td><td>182</td></tr><tr><td>11</td><td>742</td><td>231</td></tr><tr><td>12</td><td>973</td><td>288</td></tr><tr><td>13</td><td>1,261</td><td>351</td></tr><tr><td>14</td><td>1,612</td><td>423</td></tr><tr><td>15</td><td>2,035</td><td>500</td></tr><tr><td>16</td><td>2,535</td><td>585</td></tr><tr><td>17</td><td>3,120</td><td>Evolves into Wolvigor</td></tr></tbody></table></section>':'')+'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(rows?'<table class="moves"><thead><tr><th>Level</th><th>Move</th></tr></thead><tbody>'+rows+'</tbody></table>':'<p>Information Coming Soon</p>')+'</section><div class="panel"><div class="nav">'+(idx>0?'<a href="pokemon.html?id='+pokemon[idx-1].number+'">← '+escape(pokemon[idx-1].name)+'</a>':'')+'<a href="index.html">Back to Pokédex</a>'+(idx<pokemon.length-1?'<a href="pokemon.html?id='+pokemon[idx+1].number+'">'+escape(pokemon[idx+1].name)+' →</a>':'')+'</div></div>';if([1,2,3].includes(p.number)){const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');if(img&&normalBtn&&shinyBtn){const normal=img.getAttribute('src');const shinyFile=p.images?.shiny||(p.number===1?'#001-Wolvyn (Shiny).png':'');const shiny=shinyFile?'https://raw.githubusercontent.com/Rzyin1/pokemon-everwild/main/'+shinyFile.split('/').map(encodeURIComponent).join('/'):'';const show=isShiny=>{if(isShiny&&!shiny)return;img.src=isShiny?shiny:normal;img.alt=p.name+(isShiny?' shiny':' normal')+' artwork';normalBtn.setAttribute('aria-pressed',String(!isShiny));shinyBtn.setAttribute('aria-pressed',String(isShiny));normalBtn.style.fontWeight=isShiny?'normal':'bold';shinyBtn.style.fontWeight=isShiny?'bold':'normal'};img.onerror=()=>{if(img.getAttribute('src')!==normal)show(false)};normalBtn.addEventListener('click',()=>show(false));shinyBtn.addEventListener('click',()=>show(true));shinyBtn.disabled=!shiny;show(false)}}}load().then(p=>document.body.dataset.page==='profile'?profile(p):home(p)).catch(e=>{let root=$('#profile')||$('#dex');root.innerHTML='<div class="panel">Unable to load Pokédex information. Please refresh the page.</div>';console.error(e)})})();