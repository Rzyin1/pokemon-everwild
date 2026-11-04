(()=>{'use strict';const DATA='data/pokedex.json';const TYPES={Normal:'#deded1',Fire:'#f7c5a0',Water:'#b8d9f6',Grass:'#b9dfb0',Electric:'#f6e69d',Ice:'#c2eaf1',Fighting:'#e3b1a5',Dark:'#c3b9ce',Psychic:'#f4b9d2',Poison:'#d4b4df',Ground:'#e5d3ac',Rock:'#d8ceae',Flying:'#c9d7f1',Bug:'#d9e5a4',Ghost:'#d0c9e6',Steel:'#cfd9df',Dragon:'#b9c5f3',Fairy:'#f6d2e8'};const $=s=>document.querySelector(s);const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const num=n=>'#'+String(n).padStart(3,'0');const stats=[['hp','HP'],['attack','Attack'],['defense','Defense'],['special_attack','Sp. Attack'],['special_defense','Sp. Defense'],['speed','Speed']];const legacy={1:'Fierce Chibi Wolf Pokémon Card.png',2:'002-Wolvigor.png',3:'003-Wolvage.png',4:'004-Solcub.png',5:'#005 Solbruin.png',6:'#006 Solursus.png',7:'#007 Ripplet.png',8:'#008 Ripplash.png',9:'#009 Riptorrent.png',10:'#010 Foliko.png',11:'#011 Folisk.png',12:'#012 Foliraptor.png',13:'#013 Kivolt.png',14:'#015 Kivarion.png',15:'#014 Kivarra.png',16:'#016 Arctix.png',17:'#017 Arctivar.png',18:'#018 Arctivale.png',19:'019_Joeyjab.png',20:'020_Rookick.png',21:'021_Kangarush.png'};const refreshedArtwork={"025 Ravisp.png":"47efd1a5fbbe","025 Ravisp (Shiny).png":"95abcc33a27d","026 Ravraith.png":"3a86a5eebc75","026 Ravraith (Shiny).png":"5769f9d0b5f2","027 Ravantom.png":"497d438b2c8b","027 Ravantom (Shiny).png":"7b484198113c","031 Cairnuff.png":"35ec69e1d981","031 Cairnuff (Shiny).png":"bf88405316ba","032 Cairnram.png":"404dac83cdc8","032 Cairnram (Shiny).png":"5f28fade324b","033 Cairnox.png":"01ce30091c9b","033 Cairnox (Shiny).png":"9d37d5f40b5d","034 Hornit.png":"6df7cc5d6bb5","034 Hornit (Shiny).png":"d7847b942630","035 Hornsteel.png":"5e743f86b4d1","035 Hornsteel (Shiny).png":"41ac88772219","036 Hornforge.png":"c94f2921a579","036 Hornforge (Shiny).png":"74be38e61162","037 Venlet's.png":"528af584061d","037 Venlet's (Shiny).png":"80a634c76a4f","038 Venodon.png":"f09a1aaa343b","038 Venodon (Shiny).png":"19f191e120d1","039 Venodread.png":"8c6bc5613248","039 Venodread (Shiny).png":"4d1a25f7274c","040 Falclet.png":"977aabb8b4d4","040 Falclet (Shiny).png":"b861b7b26bb9","041 Falcrest.png":"eb5baad42ffc","041 Falcrest (Shiny).png":"d6128df01073","042 Falcorion.png":"532676e8faf7","042 Falcorion (Shiny).png":"9a8c7eff77f6","043 Odonlet.png":"52298ece333f","043 Odonlet (Shiny).png":"b3aa7d84d2c0","044 Odonair.png":"50eb44c1ef4e","044 Odonair (Shiny).png":"0a5f110d9ca9","045 Odonarch.png":"4543cfdc5b39","045 Odonarch (Shiny).png":"4854aabdc9dc","046 Duskup.png":"7535c583b2e9","046 Duskup (Shiny).png":"7d01a73962bd","047 Duskmane.png":"29601e0547c8","047 Duskmane (Shiny).png":"07f9cff8806c","048 Duskhowl.png":"da6fe95efff2","048 Duskhowl (Shiny).png":"0e17f56764fd","049 Komodra.png":"8eadcbce4297","049 Komodra (Shiny).png":"50dea6c8ef58","050 Komodran.png":"23ed5806b8ce","050 Komodran (Shiny).png":"085b2e195665","051 Komodralis.png":"a717a0c598e0","051 Komodralis (Shiny).png":"71002d860a4e","052 Fawnlit.png":"68400f2674a1","052 Fawnlit (Shiny).png":"d8fff6b45b54","053 Deerelle.png":"25e6dd313436","053 Deerelle (Shiny).png":"79a563188f54","054 Ceryndor.png":"4e6ec5d0b13d","054 Ceryndor (Shiny).png":"939e6701d8c1"};function art(p){const source=p.images?.solo||p.images?.standard||p.images?.artwork||legacy[p.number]||p.images?.concept||'';if(!source)return '';if(/^https?:\/\//i.test(source))return source;const encoded=source.split('/').map(encodeURIComponent).join('/');return encoded+(refreshedArtwork[source]?'?v='+refreshedArtwork[source]:'')}function artHTML(p){let path=art(p);return '<div class="artwork" style="--art:'+escape(TYPES[p.type1]||'#e9eee3')+'">'+(path?'<img src="'+escape(path)+'" alt="'+escape(p.name)+' artwork" loading="lazy" onerror="this.remove();this.parentElement.insertAdjacentHTML(\'beforeend\',\'<span class=&quot;placeholder&quot;>Artwork Coming Soon</span>\')">':'<span class="placeholder">Artwork Coming Soon</span>')+'</div>'}function badges(p){return [p.type1,p.type2].filter(Boolean).map(t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>').join('')}function bst(p){return stats.reduce((n,[k])=>n+(Number(p.base_stats?.[k])||0),0)}function card(p){return '<a class="poke-card" href="pokemon.html?id='+p.number+'">'+artHTML(p)+'<div class="card-body"><span class="number">'+num(p.number)+'</span><h2>'+escape(p.name)+'</h2><div class="types">'+badges(p)+'</div><div class="details"><span>'+escape(p.height_m??'—')+' m · '+escape(p.weight_kg??'—')+' kg</span><span>Stage '+escape(p.stage??'—')+'</span></div></div></a>'}async function load(){let r=await fetch(DATA,{cache:'no-store'});if(!r.ok)throw Error('Pokédex data unavailable');let d=await r.json();if(!Array.isArray(d.pokemon))throw Error('Invalid Pokédex data');return d.pokemon.slice().sort((a,b)=>a.number-b.number)}function home(pokemon){let root=$('#dex'),search=$('#search'),type=$('#typeFilter'),stage=$('#stageFilter'),sort=$('#sort');let names=[...new Set(pokemon.flatMap(p=>[p.type1,p.type2].filter(Boolean)))].sort();type.innerHTML='<option value="">All types</option>'+names.map(t=>'<option>'+escape(t)+'</option>').join('');let state={};try{state=JSON.parse(sessionStorage.getItem('everwild-return')||'{}')}catch{}search.value=state.search||'';type.value=state.type||'';stage.value=state.stage||'';sort.value=state.sort||'number';let limit=state.limit||24;function filtered(){let q=search.value.trim().toLowerCase();let arr=pokemon.filter(p=>(!q||p.name.toLowerCase().includes(q)||String(p.number).includes(q))&&(!type.value||[p.type1,p.type2].includes(type.value))&&(!stage.value||String(p.stage)===stage.value));let key=sort.value,reverse=key.startsWith('-');if(reverse)key=key.slice(1);arr.sort((a,b)=>{let v=key==='name'?a.name.localeCompare(b.name):key==='number'?a.number-b.number:key==='bst'?bst(a)-bst(b):(Number(a.base_stats?.[key])||0)-(Number(b.base_stats?.[key])||0);return reverse?-v:v});return arr}function render(){let arr=filtered(),shown=arr.slice(0,limit);root.innerHTML=shown.map(card).join('')||'<div class="panel">No Pokémon found. Try clearing your search or filters.</div>';$('#count').textContent='Showing '+shown.length+' of '+arr.length+' Pokémon';$('#progress').style.width=(arr.length?shown.length/arr.length*100:0)+'%';$('#loadMore').hidden=shown.length>=arr.length;sessionStorage.setItem('everwild-return',JSON.stringify({search:search.value,type:type.value,stage:stage.value,sort:sort.value,limit,scroll:window.scrollY}))}for(let el of [search,type,stage,sort])el.addEventListener(el===search?'input':'change',()=>{limit=24;render()});$('#reset').onclick=()=>{search.value='';type.value='';stage.value='';sort.value='number';limit=24;render()};$('#loadMore').onclick=()=>{limit+=24;render()};root.addEventListener('click',e=>{if(e.target.closest('a'))sessionStorage.setItem('everwild-return',JSON.stringify({search:search.value,type:type.value,stage:stage.value,sort:sort.value,limit,scroll:window.scrollY}))});render();if(state.scroll){requestAnimationFrame(()=>window.scrollTo(0,state.scroll))}}function solcubProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},custom=(p.custom_moves||[]).find(m=>m.name==='Ember Claw'),normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';$('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo"><a href="pokemon.html?id=4"><strong>#004 Solcub</strong><span>Base form</span></a><strong>→ Level 19 →</strong><a href="pokemon.html?id=5"><strong>#005 Solbruin</strong><span>Stage 2</span></a><strong>→ Level 39 →</strong><a href="pokemon.html?id=6"><strong>#006 Solursus</strong><span>Final evolution</span></a></div>';
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
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<Number(p.evolution_levels.to_stage_2)).slice().sort((a,b)=>Number(a.level)-Number(b.level)).map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+(m.custom?' ★':'')+'</td><td>'+chip(m.type||'Normal')+'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
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
  +info('Evolution','Level 19 → Solbruin (automatic)')+'<p class="muted">Cumulative experience is retained when evolving. These totals represent required EXP, not EXP awarded for defeating Solcub.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+'<p class="muted">Only moves learned as Solcub (before evolving at Level 19).</p>'
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
  +'<a href="pokemon.html?id=4"><strong>#004 Solcub</strong><span>Base form</span></a><strong>→ Level 19 →</strong>'
  +'<a href="pokemon.html?id=5"><strong>#005 Solbruin</strong><span>Stage 2</span></a><strong>→ Level 39 →</strong>'
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
 const movesHtml=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_1)&&Number(m.level)<Number(p.evolution_levels.to_stage_3))
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
  +info('Evolution','Level 39 → Solursus')
  +'<p class="muted">Cumulative EXP carries over from Solcub and is retained when evolving into Solursus. '
  +'These totals are required experience, not experience awarded for defeating Solbruin.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+experienceHtml+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Solbruin (Levels 19–38) are listed. '
  +'Previously learned moves from Solcub are retained; no new evolution move at Level 18.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+movesHtml+'</tbody></table></div>'
  +(ember?'<div class="custom-move"><h3>★ Ember Claw — Previously Learned Custom Move</h3>'
    +'<p class="muted">Learned by Solcub at Level 4; retained through evolution. Not a new Level 19 move.</p>'
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
  +'<a href="pokemon.html?id=4"><strong>#004 Solcub</strong><span>Base form</span></a><strong>→ Level 19 →</strong>'
  +'<a href="pokemon.html?id=5"><strong>#005 Solbruin</strong><span>Stage 2</span></a><strong>→ Level 39 →</strong>'
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
 const movesHtml=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_2)&&Number(m.level)<=100)
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
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Solursus (Levels 39–100) are listed. '
  +'Previously learned moves from Solcub and Solbruin are retained; no new evolution move at Level 39.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+movesHtml+'</tbody></table></div>'
  +(ember?'<div class="custom-move"><h3>★ Ember Claw — Previously Learned Custom Move</h3>'
    +'<p class="muted">Learned by Solcub at Level 4; retained through evolution. Not a new Level 39 move.</p>'
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

function rippletProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=7"><strong>#007 Ripplet</strong><span>Base form</span></a>'
  +'<strong>→ Level 22 →</strong>'
  +'<a href="pokemon.html?id=8"><strong>#008 Ripplash</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 41 →</strong>'
  +'<a href="pokemon.html?id=9"><strong>#009 Riptorrent</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Water-Type Attacks',[
   ['Super Effective','Fire, Ground, Rock','2×',['Fire','Ground','Rock']],
   ['Not Very Effective','Water, Grass, Dragon','½×',['Water','Grass','Dragon']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Electric, Grass','2×',['Electric','Grass']],
   ['Resistances','Fire, Water, Ice, Steel','½×',['Fire','Water','Ice','Steel']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Ripplash':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<Number(p.evolution_levels.to_stage_2)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile ripplet-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#007</span><h2>Ripplet</h2>'
  +'<div class="types">'+chip('Water')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (1′4″)')+info('Weight',p.weight_kg+' kg (9.9 lbs)')
  +info('Evolution Stage','1 of 3')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Water typing. Water Absorb additionally grants immunity to applicable Water-type moves.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Ripplet has either Torrent or Water Absorb, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +1 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 22 → Ripplash (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Ripplet.'
  +' All accumulated EXP carries over when Ripplet evolves into Ripplash.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Ripplet (Levels 1–21). Mud Shot at Level 20 is retained in the draft moveset and requires review after the Level 22 evolution change.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=6">← Solursus</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=8">Ripplash →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Ripplet '+(isShiny?'shiny':'normal')+' artwork';
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
function ripplashProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=7"><strong>#007 Ripplet</strong><span>Base form</span></a>'
  +'<strong>→ Level 22 →</strong>'
  +'<a href="pokemon.html?id=8"><strong>#008 Ripplash</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 41 →</strong>'
  +'<a href="pokemon.html?id=9"><strong>#009 Riptorrent</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Water-Type Attacks',[
   ['Super Effective','Fire, Ground, Rock','2×',['Fire','Ground','Rock']],
   ['Not Very Effective','Water, Grass, Dragon','½×',['Water','Grass','Dragon']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Electric, Grass','2×',['Electric','Grass']],
   ['Resistances','Fire, Water, Ice, Steel','½×',['Fire','Water','Ice','Steel']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Riptorrent':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_1)&&Number(m.level)<Number(p.evolution_levels.to_stage_3)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile ripplash-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#008</span><h2>Ripplash</h2>'
  +'<div class="types">'+chip('Water')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (2′11″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (48.5 lbs)')
  +info('Evolution Stage','2 of 3 — Middle')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Water typing. Water Absorb additionally grants immunity to applicable Water-type moves.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Ripplash has either Torrent or Water Absorb, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +2 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 41 → Riptorrent (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Ripplash.'
  +' All accumulated EXP carries over from Ripplet and is retained when Ripplash evolves into Riptorrent.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Ripplash (Levels 22–40). Torrent Break remains assigned to Riptorrent at Level 40, pending timing review for its Level 41 evolution.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=7">← Ripplet</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=9">Riptorrent →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Ripplash '+(isShiny?'shiny':'normal')+' artwork';
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
function riptorrentProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'',signature=(p.custom_moves||[]).find(m=>m.name==='Torrent Break');
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=7"><strong>#007 Ripplet</strong><span>Base form</span></a>'
  +'<strong>→ Level 22 →</strong>'
  +'<a href="pokemon.html?id=8"><strong>#008 Ripplash</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 41 →</strong>'
  +'<a href="pokemon.html?id=9"><strong>#009 Riptorrent</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Water-Type Attacks',[
   ['Super Effective','Fire, Ground, Rock','2×',['Fire','Ground','Rock']],
   ['Not Very Effective','Water, Grass, Dragon','½×',['Water','Grass','Dragon']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Electric, Grass','2×',['Electric','Grass']],
   ['Resistances','Fire, Water, Ice, Steel','½×',['Fire','Water','Ice','Steel']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Maximum Level':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_2)&&Number(m.level)<=100).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+(m.signature?' ★':'')+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile riptorrent-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves','Signature']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#009</span><h2>Riptorrent</h2>'
  +'<div class="types">'+chip('Water')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (5′11″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (187.4 lbs)')
  +info('Evolution Stage','3 of 3 — Final')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Water typing. Water Absorb additionally grants immunity to applicable Water-type moves.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Riptorrent has either Torrent or Water Absorb, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +3 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Final evolution from Ripplash at Level 41')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Riptorrent.'
  +' All accumulated EXP carries over from Ripplet through Ripplash to Riptorrent.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Riptorrent (Levels 41–100). Torrent Break ★ is its original Everwild signature move at Level 40.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<section id="signature" class="panel"><h2 class="section-title">★ Torrent Break — Everwild Signature Move</h2>'
 +(signature?'<div class="table-scroll"><table class="moves"><tbody>'
 +[['Name',signature.name],['Type',signature.type],['Category',signature.category],
 ['Power',signature.power],['Accuracy',signature.accuracy+'%'],['PP',signature.pp],
 ['Additional Effect',signature.effect],['Learned At','Level '+signature.learned_at_level],
 ['Signature Move','Yes'],['Primary User',signature.primary_user]]
 .map(row=>'<tr><th>'+escape(row[0])+'</th><td>'+escape(row[1])+'</td></tr>').join('')
 +'</tbody></table></div>'
 +'<p><strong>Move Description:</strong> '+escape(signature.description)+'</p>'
 +'<p><strong>Battle Mechanics:</strong> Special Water-type damage uses Special Attack against Special Defense. STAB and Water-type effectiveness apply; Torrent can boost the move. After a successful hit, it has a 30% chance to lower the target’s Speed by one stage. Riptorrent learns it at Level 40; earlier evolutions do not.</p>'
 :'<p>Signature move information coming soon.</p>')+'</section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=7">← Ripplash</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=10">Foliko →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Riptorrent '+(isShiny?'shiny':'normal')+' artwork';
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
function folikoProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=10"><strong>#010 Foliko</strong><span>Base form</span></a>'
  +'<strong>→ Level 17 →</strong>'
  +'<a href="pokemon.html?id=11"><strong>#011 Folisk</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 36 →</strong>'
  +'<a href="pokemon.html?id=12"><strong>#012 Foliraptor</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Grass-Type Attacks',[
   ['Super Effective','Water, Ground, Rock','2×',['Water','Ground','Rock']],
   ['Not Very Effective','Fire, Grass, Poison, Flying, Bug, Dragon, Steel','½×',['Fire','Grass','Poison','Flying','Bug','Dragon','Steel']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Fire, Ice, Poison, Flying, Bug','2×',['Fire','Ice','Poison','Flying','Bug']],
   ['Resistances','Water, Electric, Grass, Ground','½×',['Water','Electric','Grass','Ground']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Folisk':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<Number(p.evolution_levels.to_stage_2)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile foliko-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#010</span><h2>Foliko</h2>'
  +'<div class="types">'+chip('Water')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (1′4″)')+info('Weight',p.weight_kg+' kg (15.0 lbs)')
  +info('Evolution Stage','1 of 3')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Grass typing, with no defensive immunities from typing.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Foliko has either Overgrow or Infiltrator, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +1 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 17 → Folisk (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Foliko.'
  +' All accumulated EXP carries over when Foliko evolves into Folisk.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Foliko (Levels 1–16). Leech Seed at Level 16 remains in Folisk’s draft moveset; timing review is needed for the Level 17 evolution.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=9">← Riptorrent</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=11">Folisk →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Foliko '+(isShiny?'shiny':'normal')+' artwork';
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
function foliskProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=10"><strong>#010 Foliko</strong><span>Base form</span></a>'
  +'<strong>→ Level 17 →</strong>'
  +'<a href="pokemon.html?id=11"><strong>#011 Folisk</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 36 →</strong>'
  +'<a href="pokemon.html?id=12"><strong>#012 Foliraptor</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Grass-Type Attacks',[
   ['Super Effective','Water, Ground, Rock','2×',['Water','Ground','Rock']],
   ['Not Very Effective','Fire, Grass, Poison, Flying, Bug, Dragon, Steel','½×',['Fire','Grass','Poison','Flying','Bug','Dragon','Steel']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Fire, Ice, Poison, Flying, Bug','2×',['Fire','Ice','Poison','Flying','Bug']],
   ['Resistances','Water, Electric, Grass, Ground','½×',['Water','Electric','Grass','Ground']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Foliraptor':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_1)&&Number(m.level)<Number(p.evolution_levels.to_stage_3)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile folisk-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#011</span><h2>Folisk</h2>'
  +'<div class="types">'+chip('Grass')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (2′4″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (31.3 lbs)')
  +info('Evolution Stage','2 of 3 — Middle')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Grass typing, with no defensive immunities from typing.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Folisk has either Overgrow or Infiltrator, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +2 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 36 → Foliraptor (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Folisk.'
  +' All accumulated EXP carries over from Foliko and is retained when Folisk evolves into Foliraptor.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Folisk (Levels 17–35). Leech Seed remains assigned to Folisk at Level 16 in the draft; its timing needs review because Folisk now evolves at Level 17. No separate evolution-exclusive move is added. Leaf Storm at Level 32 remains in Foliraptor’s draft moveset; timing review is needed for the Level 36 evolution.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=10">← Foliko</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=12">Foliraptor →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Folisk '+(isShiny?'shiny':'normal')+' artwork';
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
function foliraptorProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=10"><strong>#010 Foliko</strong><span>Base form</span></a>'
  +'<strong>→ Level 17 →</strong>'
  +'<a href="pokemon.html?id=11"><strong>#011 Folisk</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 36 →</strong>'
  +'<a href="pokemon.html?id=12"><strong>#012 Foliraptor</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Grass-Type Attacks',[
   ['Super Effective','Water, Ground, Rock','2×',['Water','Ground','Rock']],
   ['Not Very Effective','Fire, Grass, Poison, Flying, Bug, Dragon, Steel','½×',['Fire','Grass','Poison','Flying','Bug','Dragon','Steel']],
   ['No Effect','None','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Fire, Ice, Poison, Flying, Bug','2×',['Fire','Ice','Poison','Flying','Bug']],
   ['Resistances','Water, Electric, Grass, Ground','½×',['Water','Electric','Grass','Ground']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Maximum Level':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_2)&&Number(m.level)<=100).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile foliraptor-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#012</span><h2>Foliraptor</h2>'
  +'<div class="types">'+chip('Grass')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',Number(p.height_m).toFixed(1)+' m (3′3″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (54.2 lbs)')
  +info('Evolution Stage','3 of 3 — Final')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Grass typing, with no defensive immunities from typing.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Foliraptor has either Overgrow or Infiltrator, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +3 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Final stage; evolves from Folisk at Level 36')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Foliraptor.'
  +' All accumulated EXP carries over from Foliko and Folisk into Foliraptor. Maximum Level 100.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Foliraptor (Levels 36–100) are listed. Leaf Storm is currently assigned at Level 32; its timing needs review for the Level 36 evolution, and no additional evolution-exclusive move is assigned.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=11">← Folisk</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=13">Kivolt →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Foliraptor '+(isShiny?'shiny':'normal')+' artwork';
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
function kivoltProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=13"><strong>#013 Kivolt</strong><span>Base form</span></a>'
  +'<strong>→ Level 18 →</strong>'
  +'<a href="pokemon.html?id=14"><strong>#014 Kivarra</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 38 →</strong>'
  +'<a href="pokemon.html?id=15"><strong>#015 Kivarion</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Electric-Type Attacks',[
   ['Super Effective','Water, Flying','2×',['Water','Flying']],
   ['Not Very Effective','Electric, Grass, Dragon','½×',['Electric','Grass','Dragon']],
   ['No Effect','Ground','0×',['Ground']],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Ground','2×',['Ground']],
   ['Resistances','Electric, Flying, Steel','½×',['Electric','Flying','Steel']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Kivarra':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<Number(p.evolution_levels.to_stage_2)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile kivolt-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#013</span><h2>Kivolt</h2>'
  +'<div class="types">'+chip('Electric')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (1′8″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (26.5 lbs)')
  +info('Evolution Stage','1 of 3')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Electric typing. Ground attacks deal 2× damage defensively; Electric attacks have no effect on Ground targets. Motor Drive grants an additional immunity to applicable Electric-type moves and increases Speed when activated.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Kivolt has either Static or Motor Drive, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +1 Speed</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 18 → Kivarra (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Kivolt.'
  +' All accumulated EXP carries over when Kivolt evolves into Kivarra.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Kivolt (Levels 1–17). Bite at Level 19 belongs to Kivarra. No additional evolution-exclusive move is learned at Level 18.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=12">← Foliraptor</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=14">Kivarra →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Kivolt '+(isShiny?'shiny':'normal')+' artwork';
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
function kivarraProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=13"><strong>#013 Kivolt</strong><span>Base form</span></a>'
  +'<strong>→ Level 18 →</strong>'
  +'<a href="pokemon.html?id=14"><strong>#014 Kivarra</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 38 →</strong>'
  +'<a href="pokemon.html?id=15"><strong>#015 Kivarion</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Electric-Type Attacks',[
   ['Super Effective','Water, Flying','2×',['Water','Flying']],
   ['Not Very Effective','Electric, Grass, Dragon','½×',['Electric','Grass','Dragon']],
   ['No Effect','Ground','0×',['Ground']],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Ground','2×',['Ground']],
   ['Resistances','Electric, Flying, Steel','½×',['Electric','Flying','Steel']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Kivarion':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_1)&&Number(m.level)<Number(p.evolution_levels.to_stage_3)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile kivarra-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#014</span><h2>Kivarra</h2>'
  +'<div class="types">'+chip('Electric')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (2′11″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (70.5 lbs)')
  +info('Evolution Stage','2 of 3 — Middle')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Electric typing. Ground attacks deal 2× damage defensively; Electric attacks have no effect on Ground targets. Motor Drive grants an additional immunity to applicable Electric-type moves and increases Speed when activated.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Kivarra has either Static or Motor Drive, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +2 Speed</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 38 → Kivarion (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Kivarra.'
  +' All accumulated EXP carries over from Kivolt through Kivarra and into Kivarion.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Kivarra (Levels 18–37) are listed. Extreme Speed at Level 36 remains in Kivarion’s draft moveset, pending timing review for its Level 38 evolution. No additional evolution-exclusive move is learned at Level 18.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=13">← Kivolt</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=15">Kivarion →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Kivarra '+(isShiny?'shiny':'normal')+' artwork';
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
function kivarionProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=13"><strong>#013 Kivolt</strong><span>Base form</span></a>'
  +'<strong>→ Level 18 →</strong>'
  +'<a href="pokemon.html?id=14"><strong>#014 Kivarra</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 38 →</strong>'
  +'<a href="pokemon.html?id=15"><strong>#015 Kivarion</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Electric-Type Attacks',[
   ['Super Effective','Water, Flying','2×',['Water','Flying']],
   ['Not Very Effective','Electric, Grass, Dragon','½×',['Electric','Grass','Dragon']],
   ['No Effect','Ground','0×',['Ground']],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Ground','2×',['Ground']],
   ['Resistances','Electric, Flying, Steel','½×',['Electric','Flying','Steel']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Maximum Level':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_2)&&Number(m.level)<=100).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile kivarion-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#015</span><h2>Kivarion</h2>'
  +'<div class="types">'+chip('Electric')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (4′7″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (143.3 lbs)')
  +info('Evolution Stage','3 of 3 — Final')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Electric typing. Ground attacks deal 2× damage defensively; Electric attacks have no effect on Ground targets. Motor Drive grants an additional immunity to applicable Electric-type moves and increases Speed when activated.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Kivarion has either Static or Motor Drive, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +3 Speed</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Final evolution from Kivarra at Level 38')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Kivarion.'
  +' All accumulated EXP carries over from Kivolt and Kivarra into Kivarion through evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Kivarion (Levels 38–100) are listed. Extreme Speed remains assigned at Level 36; timing review is needed for the Level 38 evolution, with no additional evolution-exclusive move.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=14">← Kivarra</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=16">Arctix →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Kivarion '+(isShiny?'shiny':'normal')+' artwork';
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
function arctixProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=16"><strong>#016 Arctix</strong><span>Base form</span></a>'
  +'<strong>→ Level 16 →</strong>'
  +'<a href="pokemon.html?id=17"><strong>#017 Arctivar</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 34 →</strong>'
  +'<a href="pokemon.html?id=18"><strong>#018 Arctivale</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Ice-Type Attacks',[
   ['Super Effective','Grass, Ground, Flying, Dragon','2×',['Grass','Ground','Flying','Dragon']],
   ['Not Very Effective','Fire, Water, Ice, Steel','½×',['Fire','Water','Ice','Steel']],
   ['No Effect','None from Ice typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Fire, Fighting, Rock, Steel','2×',['Fire','Fighting','Rock','Steel']],
   ['Resistances','Ice','½×',['Ice']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Arctivar':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<Number(p.evolution_levels.to_stage_2)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile arctix-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#016</span><h2>Arctix</h2>'
  +'<div class="types">'+chip('Ice')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (1′4″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (11.0 lbs)')
  +info('Evolution Stage','1 of 3')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Ice typing. Snow Cloak increases evasion during snow; Ice Body restores HP during snow. Neither ability changes Ice-type effectiveness.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Arctix has either Snow Cloak or Ice Body, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +1 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 16 → Arctivar (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Arctix.'
  +' All accumulated EXP carries over when Arctix evolves into Arctivar.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Arctix (Levels 1–15). Arctix evolves into Arctivar at Level 16, retaining previously learned moves.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=15">← Kivarion</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=17">Arctivar →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Arctix '+(isShiny?'shiny':'normal')+' artwork';
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
function arctivarProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=16"><strong>#016 Arctix</strong><span>Base form</span></a>'
  +'<strong>→ Level 16 →</strong>'
  +'<a href="pokemon.html?id=17"><strong>#017 Arctivar</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 34 →</strong>'
  +'<a href="pokemon.html?id=18"><strong>#018 Arctivale</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Ice-Type Attacks',[
   ['Super Effective','Grass, Ground, Flying, Dragon','2×',['Grass','Ground','Flying','Dragon']],
   ['Not Very Effective','Fire, Water, Ice, Steel','½×',['Fire','Water','Ice','Steel']],
   ['No Effect','None from Ice typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Fire, Fighting, Rock, Steel','2×',['Fire','Fighting','Rock','Steel']],
   ['Resistances','Ice','½×',['Ice']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Arctivale':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_1)&&Number(m.level)<Number(p.evolution_levels.to_stage_3)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile arctivar-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#017</span><h2>Arctivar</h2>'
  +'<div class="types">'+chip('Ice')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (2′7″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (35.3 lbs)')
  +info('Evolution Stage','2 of 3 — Middle')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Ice typing. Snow Cloak increases evasion during snow; Ice Body restores HP during snow. Neither ability changes Ice-type effectiveness.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Arctivar has either Snow Cloak or Ice Body, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +2 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 34 → Arctivale (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Arctivar.'
  +' All accumulated EXP carries over from Arctix and remains intact when Arctivar evolves into Arctivale.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Arctivar (Levels 16–33) are listed. Bite, Swift, Ice Shard, Freeze-Dry and Agility are learned at Levels 18, 21, 24, 27 and 30. Freeze-Dry is also super effective against Water-type Pokémon. Ice Beam remains assigned to Arctivale at Level 32 in the draft; its timing needs review because Arctivale now evolves at Level 34. No additional evolution-exclusive move is added.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=16">← Arctix</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=18">Arctivale →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Arctivar '+(isShiny?'shiny':'normal')+' artwork';
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
function arctivaleProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=16"><strong>#016 Arctix</strong><span>Base form</span></a>'
  +'<strong>→ Level 16 →</strong>'
  +'<a href="pokemon.html?id=17"><strong>#017 Arctivar</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 34 →</strong>'
  +'<a href="pokemon.html?id=18"><strong>#018 Arctivale</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Ice-Type Attacks',[
   ['Super Effective','Grass, Ground, Flying, Dragon','2×',['Grass','Ground','Flying','Dragon']],
   ['Not Very Effective','Fire, Water, Ice, Steel','½×',['Fire','Water','Ice','Steel']],
   ['No Effect','None from Ice typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Fire, Fighting, Rock, Steel','2×',['Fire','Fighting','Rock','Steel']],
   ['Resistances','Ice','½×',['Ice']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Maximum Level':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_2)&&Number(m.level)<=100).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile arctivale-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#018</span><h2>Arctivale</h2>'
  +'<div class="types">'+chip('Ice')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',Number(p.height_m).toFixed(1)+' m (4′3″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (92.6 lbs)')
  +info('Evolution Stage','3 of 3 — Final')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Ice typing. Snow Cloak increases evasion during snow; Ice Body restores HP during snow. Neither ability changes Ice-type effectiveness.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Arctivale has either Snow Cloak or Ice Body, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +3 Special Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Final evolution from Arctivar at Level 34')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Arctivale.'
  +' All accumulated EXP carries over from Arctix and Arctivar into Arctivale. Level 100 is the maximum level.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Arctivale (Levels 34–100) are listed. Ice Beam remains assigned at Level 32; timing review is needed for the Level 34 evolution, and no additional evolution-exclusive move is assigned. Blizzard bypasses accuracy checks during snow; Aurora Veil normally requires snow. Previously learned Snowscape can activate Snow Cloak and Ice Body.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=17">← Arctivar</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="index.html">Back to Pokédex listing →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Arctivale '+(isShiny?'shiny':'normal')+' artwork';
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
function joeyjabProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=19"><strong>#019 Joeyjab</strong><span>Base form</span></a>'
  +'<strong>→ Level 20 →</strong>'
  +'<a href="pokemon.html?id=20"><strong>#020 Rookick</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 40 →</strong>'
  +'<a href="pokemon.html?id=21"><strong>#021 Kangarush</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Fighting-Type Attacks',[
   ['Super Effective','Normal, Ice, Rock, Dark, Steel','2×',['Normal','Ice','Rock','Dark','Steel']],
   ['Not Very Effective','Poison, Flying, Psychic, Bug, Fairy','½×',['Poison','Flying','Psychic','Bug','Fairy']],
   ['No Effect','Ghost','0×',['Ghost']],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Flying, Psychic, Fairy','2×',['Flying','Psychic','Fairy']],
   ['Resistances','Bug, Rock, Dark','½×',['Bug','Rock','Dark']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.exp_to_next==null?'Evolves into Rookick':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)<Number(p.evolution_levels.to_stage_2)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile joeyjab-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#019</span><h2>Joeyjab</h2>'
  +'<div class="types">'+chip('Fighting')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (2′4″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (39.7 lbs)')
  +info('Evolution Stage','1 of 3')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Fighting typing. Fighting attacks deal no damage to Ghost-type opponents. Iron Fist boosts eligible punches without changing type effectiveness; Battle Armor prevents incoming critical hits without altering the type chart.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Joeyjab has either Iron Fist or Battle Armor, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +1 Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 20 → Rookick (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Joeyjab.'
  +' All accumulated EXP carries over when Joeyjab evolves into Rookick. Rookick later evolves into Kangarush at Level 40.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Joeyjab (Levels 1–19) are listed. Mach Punch benefits from Iron Fist; Arm Thrust does not. Joeyjab evolves at Level 20, retaining previously learned moves.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=18">← Arctivale</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=20">Rookick →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Joeyjab '+(isShiny?'shiny':'normal')+' artwork';
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
function rookickProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=19"><strong>#019 Joeyjab</strong><span>Base form</span></a>'
  +'<strong>→ Level 20 →</strong>'
  +'<a href="pokemon.html?id=20"><strong>#020 Rookick</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 40 →</strong>'
  +'<a href="pokemon.html?id=21"><strong>#021 Kangarush</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Fighting-Type Attacks',[
   ['Super Effective','Normal, Ice, Rock, Dark, Steel','2×',['Normal','Ice','Rock','Dark','Steel']],
   ['Not Very Effective','Poison, Flying, Psychic, Bug, Fairy','½×',['Poison','Flying','Psychic','Bug','Fairy']],
   ['No Effect','Ghost','0×',['Ghost']],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Flying, Psychic, Fairy','2×',['Flying','Psychic','Fairy']],
   ['Resistances','Bug, Rock, Dark','½×',['Bug','Rock','Dark']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.level===16?'Evolved from Joeyjab · ':'')+(row.exp_to_next==null?'Evolves into Kangarush':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_1)&&Number(m.level)<Number(p.evolution_levels.to_stage_3)).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile rookick-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#020</span><h2>Rookick</h2>'
  +'<div class="types">'+chip('Fighting')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (3′11″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (83.8 lbs)')
  +info('Evolution Stage','2 of 3 — Middle')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Fighting typing. Fighting attacks deal no damage to Ghost-type opponents. Iron Fist boosts eligible punches without changing type effectiveness; Battle Armor prevents incoming critical hits without altering the type chart.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Rookick has either Iron Fist or Battle Armor, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +2 Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Level 40 → Kangarush (automatic)')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Rookick.'
  +' At Level 20, Joeyjab evolves into Rookick with 5,460 accumulated EXP. At Level 40, Rookick evolves into Kangarush with 56,660 accumulated EXP. All experience and previously learned moves are retained.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Rookick (Levels 20–39) are listed. Bullet Punch at Level 22 and Drain Punch at Level 34 benefit from Iron Fist, as does Joeyjab’s previously learned Mach Punch. Level 40 Hammer Arm belongs to Kangarush, and no additional evolution-only move is learned at Levels 20 or 40.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=19">← Joeyjab</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="pokemon.html?id=21">Kangarush →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Rookick '+(isShiny?'shiny':'normal')+' artwork';
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
function kangarushProfile(p,pokemon){
 const root=$('#profile'),s=p.base_stats||{},normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const chip=t=>'<span class="type" style="--type:'+escape(TYPES[t]||'#dde6d9')+'">'+escape(t)+'</span>';
 const chips=items=>items.map(chip).join(' ');
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const evolution='<div class="evo">'
  +'<a href="pokemon.html?id=19"><strong>#019 Joeyjab</strong><span>Base form</span></a>'
  +'<strong>→ Level 20 →</strong>'
  +'<a href="pokemon.html?id=20"><strong>#020 Rookick</strong><span>Stage 2</span></a>'
  +'<strong>→ Level 40 →</strong>'
  +'<a href="pokemon.html?id=21"><strong>#021 Kangarush</strong><span>Final evolution</span></a></div>';
 const groups=[
  ['Offensive — Fighting-Type Attacks',[
   ['Super Effective','Normal, Ice, Rock, Dark, Steel','2×',['Normal','Ice','Rock','Dark','Steel']],
   ['Not Very Effective','Poison, Flying, Psychic, Bug, Fairy','½×',['Poison','Flying','Psychic','Bug','Fairy']],
   ['No Effect','Ghost','0×',['Ghost']],
   ['All Other Types','Neutral','1×',[]]]],
  ['Defensive — Damage Received',[
   ['Weaknesses','Flying, Psychic, Fairy','2×',['Flying','Psychic','Fairy']],
   ['Resistances','Bug, Rock, Dark','½×',['Bug','Rock','Dark']],
   ['Immunities','None from typing','—',[]],
   ['All Other Types','Neutral','1×',[]]]]
 ];
 const matchups=groups.map(g=>'<div><h3>'+escape(g[0])+'</h3><div class="effect-grid">'
  +g[1].map(x=>'<div class="effect-item"><strong>'+escape(x[0])+'</strong><div>'
   +(x[3].length?chips(x[3]):escape(x[1]))+'</div><span class="effect-multiplier">'
   +escape(x[2])+'</span></div>').join('')+'</div></div>').join('');
 const abilityCards=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>
  '<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(a.description||'Information Coming Soon')
  +'</p><p class="muted">Ability '+escape(a.slot||String.fromCharCode(65+i))+'</p></div>').join('');
 const levels=(p.experience_table||[]).map(row=>
  '<tr><td>'+escape(row.level)+'</td><td>'+Number(row.total_exp).toLocaleString('en-US')
  +'</td><td>'+(row.level===40?'Evolved from Rookick · ':'')+(row.exp_to_next==null?'Maximum Level':Number(row.exp_to_next).toLocaleString('en-US'))+'</td></tr>').join('');
 const moveRows=(p.moves||[]).filter(m=>Number(m.level)>=Number(p.evolution_levels.from_stage_2)&&Number(m.level)<=100).slice().sort((a,b)=>Number(a.level)-Number(b.level))
  .map(m=>'<tr><td>'+escape(m.level)+'</td><td>'+escape(m.name)+'</td><td>'+chip(m.type||'Normal')
  +'</td><td>'+escape(m.category||'—')+'</td></tr>').join('');
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile kangarush-profile">'
  +'<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves']
   .map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>'
  +'<section class="panel hero">'+heroArt+'<div><span class="number">#021</span><h2>Kangarush</h2>'
  +'<div class="types">'+chip('Fighting')+'</div>'
  +info('Classification',p.category)+info('Inspiration',p.inspiration)+info('Battle Role',p.battle_role)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',p.height_m+' m (6′3″)')+info('Weight',Number(p.weight_kg).toFixed(1)+' kg (202.8 lbs)')
  +info('Evolution Stage','3 of 3 — Final')
  +info('Gender Ratio','Male '+p.gender_ratio.male+'% · Female '+p.gender_ratio.female+'%')
  +'<p class="muted">No gender-based appearance differences; identical normal and shiny artwork for males and females.</p>'
  +info('Catch Rate',p.catch_rate+' (capture value, not a percentage)')
  +info('Maximum Level',p.max_level)+'</div></section>'
  +'<section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'
  +'<div class="effect-columns">'+matchups+'</div>'
  +'<p class="muted">Pure Fighting typing. Fighting attacks deal no damage to Ghost-type opponents. Iron Fist boosts eligible punches without changing type effectiveness; Battle Armor prevents incoming critical hits without altering the type chart.</p></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution follows Everwild’s global rules. Learned moves and cumulative experience are retained.</p></section>'
  +'<section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'
  +abilityCards+'</div><p class="muted">An individual Kangarush has either Iron Fist or Battle Armor, never both.'
  +' Each ability has an equal 50% assignment chance, and the assigned ability persists through evolution. No hidden ability.</p></section>'
  +'<section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'
  +stats.map(([key,label])=>'<div class="stat"><span>'+escape(label)+'</span><div class="bar">'
   +'<div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[key])||0)/255*100))+'%"></div></div>'
   +'<strong>'+escape(s[key]??'—')+'</strong></div>').join('')
  +'<p><strong>Base Stat Total: '+bst(p)+'</strong></p><p><strong>EV Yield:</strong> +3 Attack</p></section>'
  +'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2>'
  +info('Growth Rate',p.experience_growth_rate)+info('Base EXP Yield',p.base_exp_yield)
  +info('Evolution','Final evolution from Rookick at Level 40')
  +'<p class="muted">The table lists cumulative EXP requirements, not EXP rewarded for defeating Kangarush.'
  +' Joeyjab evolves into Rookick at Level 20 (5,460 cumulative EXP); Rookick evolves into Kangarush at Level 40 (56,660 cumulative EXP). Kangarush has no further evolution, and its Medium Slow EXP reaches 1,059,860 at the maximum Level 100. Previous moves, accumulated experience and selected ability carry through evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th>'
  +'<th>EXP to Next Level</th></tr></thead><tbody>'+levels+'</tbody></table></div></section>'
  +'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(p.move_timing_review_needed?'<p class="muted">Move timing review pending after the evolution-level update. Earlier draft move levels are preserved in the Pokédex data but not shown as level-up moves outside this evolution stage.</p>':'')+''
  +'<p class="muted">Only moves learned as Kangarush (Levels 40–100) are listed. Hammer Arm is learned at Level 40 when Rookick evolves, with no additional evolution-exclusive move. Iron Fist boosts eligible punches (Mach Punch, Bullet Punch, Drain Punch, Hammer Arm, Thunder Punch and Focus Punch), but not Blaze Kick, Close Combat or Giga Impact.'
  +' Previously learned moves remain available after evolution.</p>'
  +'<div class="table-scroll"><table class="moves"><thead><tr><th>Level</th><th>Move</th>'
  +'<th>Type</th><th>Category</th></tr></thead><tbody>'+moveRows+'</tbody></table></div></section>'
  +'<div class="panel"><div class="nav"><a href="pokemon.html?id=20">← Rookick</a>'
  +'<a href="index.html">Back to Pokédex</a><a href="index.html">Back to Pokédex listing →</a></div></div>'
  +'</div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt='Kangarush '+(isShiny?'shiny':'normal')+' artwork';
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
function designOnlyProfile(p,pokemon){
 const root=$('#profile'),normal=art(p),shiny=p.images?.shiny?art({images:{solo:p.images.shiny}}):'';
 document.title=p.name+' | Everwild Pokédex';
 $('#title').textContent=num(p.number)+' '+p.name;
 const info=(label,value)=>'<p><strong>'+escape(label)+':</strong> '+escape(value)+'</p>';
 const family=(p.evolution_line||[]).map(number=>pokemon.find(species=>species.number===number)).filter(Boolean);
 const familyStages=['First stage','Middle stage','Final stage'];
 const imperial={22:['1′4″','7.7 lbs'],23:['2′7″','22.0 lbs'],24:['4′3″','61.7 lbs'],25:['1′4″','5.5 lbs'],26:['2′11″','18.7 lbs'],27:['5′7″','52.9 lbs'],28:['1′4″','11.0 lbs'],29:['2′11″','61.7 lbs'],30:['5′11″','264.6 lbs'],31:['2′0″','39.7 lbs'],32:['3′11″','165.3 lbs'],33:['5′11″','396.8 lbs'],34:['1′4″','17.6 lbs'],35:['2′11″','92.6 lbs'],36:['5′3″','363.8 lbs'],37:['1′4″','9.9 lbs'],38:['3′3″','52.9 lbs'],39:['4′3″','121.3 lbs'],40:['1′4″','4.4 lbs'],41:['2′7″','19.8 lbs'],42:['4′3″','61.7 lbs'],43:['1′4″','5.5 lbs'],44:['2′7″','16.5 lbs'],45:['4′3″','44.1 lbs'],46:['1′8″','22.0 lbs'],47:['3′3″','70.5 lbs'],48:['4′11″','154.3 lbs'],49:['1′8″','26.5 lbs'],50:['3′3″','77.2 lbs'],51:['5′3″','187.4 lbs'],52:['2′0″','26.5 lbs'],53:['3′7″','83.8 lbs'],54:['5′7″','209.4 lbs']};
 const dimensions=imperial[p.number]||['—','—'];
 const prev=pokemon.find(species=>species.number===p.number-1),next=pokemon.find(species=>species.number===p.number+1);
 const evolution='<div class="evo">'+family.map((species,i)=>
  (i?'<strong>→ Level '+(i===1?family[0].evolution_levels.to_stage_2:family[1].evolution_levels.to_stage_3)+' →</strong>':'')+'<a href="pokemon.html?id='+species.number+'"><strong>'
  +num(species.number)+' '+escape(species.name)+'</strong><span>'+escape(familyStages[i]||'Evolution stage')+'</span></a>'
 ).join('')+'</div>';
 const heroArt='<div>'+artHTML(p)+'<div class="shiny-switch">'
  +'<button type="button" id="normalArt" aria-pressed="true">Normal</button>'
  +'<button type="button" id="shinyArt" aria-pressed="false" '+(!shiny?'disabled title="Shiny artwork not uploaded"':'')+'>✨ Shiny</button>'
  +'</div></div>';
 root.innerHTML='<div class="solcub-profile '+(p.type1==='Ghost'?'ghost-design-profile':p.type1==='Ground'?'ground-design-profile':p.type1==='Rock'?'rock-design-profile':p.type1==='Steel'?'steel-design-profile':'psychic-design-profile')+'">'
  +'<nav class="section-nav"><a href="#overview">Overview</a><a href="#evolution">Evolution</a><a href="#appearance">Appearance</a></nav>'
  +'<section id="overview" class="panel hero">'+heroArt+'<div>'
  +'<span class="number">'+num(p.number)+'</span><h2>'+escape(p.name)+'</h2>'
  +'<div class="types">'+[p.type1,p.type2].filter(Boolean).map(type=>
    '<span class="type" style="--type:'+escape(TYPES[type]||'#dde6d9')+'">'+escape(type)+'</span>'
   ).join(' ')+'</div>'
  +info('Classification',p.category)+info('Evolution Stage',(p.stage||'?')+' of 3 — '+(p.stage_label||'Unknown'))
  +info('Animal Inspiration',p.inspiration)
  +'<p>'+escape(p.pokedex_entry)+'</p>'
  +info('Height',Number(p.height_m).toFixed(1)+' m ('+dimensions[0]+')')
  +info('Weight',Number(p.weight_kg).toFixed(1)+' kg ('+dimensions[1]+')')
  +((p.type1==='Psychic'||p.gender_appearance_differences===false)?'<p class="muted">No visual gender differences; the same normal and shiny artwork is used for both genders.</p>':'')
  +'</div></section>'
  +'<section id="evolution" class="panel"><h2 class="section-title">Evolution Family</h2>'+evolution
  +'<p class="muted">Evolution levels are approved. Base stats, abilities, moves, and other battle mechanics will be determined later.</p></section>'
  +'<section id="appearance" class="panel"><h2 class="section-title">'+(p.type1==='Flying'?'Approved Artwork':p.appearance?'Approved Appearance':'Artwork & Shiny Palette')+'</h2>'
  +(p.appearance?'<p>'+escape(p.appearance)+'</p>':'')+(p.shiny_appearance?'<p><strong>Shiny Appearance:</strong> '+escape(p.shiny_appearance)+'</p>':'')+(p.type1==='Ghost'?'<p class="muted">These Pokémon are living ravens with supernatural Ghost-type powers.</p>':'')+(p.personality?'<p><strong>Personality:</strong> '+escape(p.personality)+'</p>':'')+(p.shiny_artwork_status?'<p class="muted">'+escape(p.shiny_artwork_status)+'</p>':'')+(p.artwork_status?'<p class="muted">'+escape(p.artwork_status)+'</p>':'')+'</section>'
  +'<div class="panel"><div class="nav">'
  +(prev?'<a href="pokemon.html?id='+prev.number+'">← '+escape(prev.name)+'</a>':'')
  +'<a href="index.html">Back to Pokédex</a>'
  +(next?'<a href="pokemon.html?id='+next.number+'">'+escape(next.name)+' →</a>':'')
  +'</div></div></div>';
 const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');
 if(img&&normalBtn&&shinyBtn){
  const show=isShiny=>{
   if(isShiny&&!shiny)return;
   img.src=isShiny?shiny:normal;
   img.alt=p.name+(isShiny?' shiny':' normal')+' artwork';
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
function profile(pokemon){let id=Number(new URLSearchParams(location.search).get('id')||1),p=pokemon.find(x=>x.number===id);if(!p){$('#profile').innerHTML='<div class="panel">Pokémon not found. <a href="index.html">Return to Pokédex</a>.</div>';return}if(p.number===4){solcubProfile(p,pokemon);return}if(p.number===5){solbruinProfile(p,pokemon);return}if(p.number===6){solursusProfile(p,pokemon);return}if(p.number===7){rippletProfile(p,pokemon);return}if(p.number===8){ripplashProfile(p,pokemon);return}if(p.number===9){riptorrentProfile(p,pokemon);return}if(p.number===10){folikoProfile(p,pokemon);return}if(p.number===11){foliskProfile(p,pokemon);return}if(p.number===12){foliraptorProfile(p,pokemon);return}if(p.number===13){kivoltProfile(p,pokemon);return}if(p.number===14){kivarraProfile(p,pokemon);return}if(p.number===15){kivarionProfile(p,pokemon);return}if(p.number===16){arctixProfile(p,pokemon);return}if(p.number===17){arctivarProfile(p,pokemon);return}if(p.number===18){arctivaleProfile(p,pokemon);return}if(p.number===19){joeyjabProfile(p,pokemon);return}if(p.number===20){rookickProfile(p,pokemon);return}if(p.number===21){kangarushProfile(p,pokemon);return}if([22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54].includes(p.number)){designOnlyProfile(p,pokemon);return}document.title=p.name+' | Everwild Pokédex';$('#title').textContent=num(p.number)+' '+p.name;let s=p.base_stats||{},moves=p.moves||[],idx=pokemon.indexOf(p);let sections='<nav class="section-nav">'+['Effectiveness','Evolution','Abilities','Stats','Experience','Moves'].map(x=>'<a href="#'+x.toLowerCase()+'">'+x+'</a>').join('')+'</nav>';let evolution=[1,2,3].includes(p.number)?'<div class="evo"><a href="pokemon.html?id=1"><strong>#001 Wolvyn</strong><br>Base form</a><strong>→ Level 16 →</strong><a href="pokemon.html?id=2"><strong>#002 Wolvigor</strong><br>Stage 2</a><strong>→ Level 34 →</strong><a href="pokemon.html?id=3"><strong>#003 Wolvage</strong><br>Final evolution</a></div>':'<p class="muted">Evolution details will be displayed as each species is reviewed.</p>';let abilityDescriptions={Defiant:'Raises Attack by two stages when an opposing effect lowers one of its stats.',Guts:'Increases physical Attack by 50% while affected by a non-volatile status condition; ignores the usual Attack reduction from burns.'};let abilities=(p.abilities||[]).filter(a=>a.slot!=='hidden').map((a,i)=>'<div class="ability"><h3>'+escape(a.name)+'</h3><p>'+escape(abilityDescriptions[a.name]||'Ability effect information coming soon.')+'</p><p class="muted">Ability '+(i+1)+'</p></div>').join('')||'<p>Information Coming Soon</p>';let rows=moves.filter(m=>p.number!==2||(Number(m.level)>=17&&Number(m.level)<35)).sort((a,b)=>(Number(a.level)||0)-(Number(b.level)||0)).map(m=>'<tr><td>'+escape(m.level??'—')+'</td><td>'+escape(m.name)+'</td></tr>').join('');$('#profile').innerHTML=sections+'<section class="panel hero">'+([1,2,3].includes(p.number)?'<div>'+artHTML(p)+'<div class="shiny-switch" style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button type="button" id="normalArt" aria-pressed="true">Normal</button><button type="button" id="shinyArt" aria-pressed="false" '+(p.number!==1&&!p.images?.shiny?'disabled title="Approved shiny artwork awaiting upload"':'')+'>✨ Shiny</button></div></div>':artHTML(p))+'<div><span class="number">'+num(p.number)+'</span><h2>'+escape(p.name)+'</h2><div class="types">'+badges(p)+'</div><p>'+escape(p.category||'Classification Coming Soon')+'</p><p>'+escape(p.pokedex_entry||'Information Coming Soon')+'</p><p><strong>Height:</strong> '+escape(p.height_m??'—')+' m · <strong>Weight:</strong> '+escape(p.weight_kg??'—')+' kg</p><p class="muted">Stage '+escape(p.stage??'—')+'</p>'+([1,2,3].includes(p.number)?'<p><strong>Gender Ratio:</strong> Male '+escape(p.gender_ratio?.male)+'% · Female '+escape(p.gender_ratio?.female)+'%</p><p class="muted">No gender-based appearance differences, including shiny forms.</p><p><strong>Catch Rate:</strong> '+escape(p.catch_rate)+' <span class="muted">(capture value, not a percentage)</span></p>':'')+'</div></section><section id="effectiveness" class="panel"><h2 class="section-title">Type Effectiveness</h2>'+(p.type1==='Normal'&&!p.type2?'<div class="ability-grid"><div class="ability"><h3>Weaknesses</h3><p><span class="type" style="--type:#e3b1a5">Fighting</span> <strong>×2 damage</strong></p></div><div class="ability"><h3>Immunities</h3><p><span class="type" style="--type:#d0c9e6">Ghost</span> <strong>×0 damage</strong></p></div></div><p class="muted">No resistances. All other attacking types deal normal (×1) damage.</p>':'<p class="muted">Detailed matchups coming soon.</p>')+'</section><section id="evolution" class="panel"><h2 class="section-title">Evolution</h2>'+evolution+'</section><section id="abilities" class="panel"><h2 class="section-title">Abilities</h2><div class="ability-grid">'+abilities+'</div><p class="muted">An individual Pokémon has one of these abilities, not both.</p></section><section id="stats" class="panel"><h2 class="section-title">Base Stats</h2>'+stats.map(([k,label])=>'<div class="stat"><span>'+label+'</span><div class="bar"><div class="fill" style="width:'+Math.max(0,Math.min(100,(Number(s[k])||0)/255*100))+'%"></div></div><strong>'+escape(s[k]??'—')+'</strong></div>').join('')+'<p><strong>Base Stat Total: '+(Object.keys(s).length?bst(p):'To be determined')+'</strong></p>'+(p.number===1?'<p><strong>EV Yield:</strong> +1 Attack EV</p>':p.number===2?'<p><strong>EV Yield:</strong> +2 Attack EVs</p>':'')+'</section>'+(p.number===2?'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2><p><strong>Growth Rate:</strong> '+escape(p.experience_growth_rate)+'</p><p><strong>Evolution:</strong> Level 34 → Wolvage (automatic)</p><p><strong>Cumulative EXP:</strong> Retained through evolution</p><p><strong>Base EXP Yield:</strong> '+escape(p.base_exp_yield)+'</p><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody>'+p.experience_table.map(x=>'<tr><td>'+x.level+'</td><td>'+x.total_exp.toLocaleString('en-US')+'</td><td>'+(x.exp_to_next==null?'Evolves into Wolvage':x.exp_to_next.toLocaleString('en-US'))+'</td></tr>').join('')+'</tbody></table></section>':'')+(p.number===3?'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2><p><strong>Growth Rate:</strong> Medium Slow</p><p><strong>Evolution:</strong> Final stage (from Wolvigor at Level 34)</p><p><strong>Cumulative EXP:</strong> Retained through evolution</p><p><strong>Base EXP Yield:</strong> '+escape(p.base_exp_yield)+'</p><p class="muted">Cumulative EXP is the total required to reach each level, not EXP awarded for defeating Wolvage.</p><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody>'+p.experience_table.map(x=>'<tr><td>'+x.level+'</td><td>'+x.total_exp.toLocaleString('en-US')+'</td><td>'+(x.exp_to_next==null?'Maximum Level':x.exp_to_next.toLocaleString('en-US'))+'</td></tr>').join('')+'</tbody></table></section>':'')+(p.number===1?'<section id="experience" class="panel"><h2 class="section-title">Experience Growth</h2><p><strong>Growth Rate:</strong> Medium Slow</p><p><strong>Evolution:</strong> Level 16 → Wolvigor (automatic)</p><p><strong>Base EXP Yield:</strong> 62</p><table class="moves"><thead><tr><th>Level</th><th>Total Cumulative EXP</th><th>EXP to Next Level</th></tr></thead><tbody><tr><td>1</td><td>0</td><td>9</td></tr><tr><td>2</td><td>9</td><td>48</td></tr><tr><td>3</td><td>57</td><td>39</td></tr><tr><td>4</td><td>96</td><td>39</td></tr><tr><td>5</td><td>135</td><td>44</td></tr><tr><td>6</td><td>179</td><td>57</td></tr><tr><td>7</td><td>236</td><td>78</td></tr><tr><td>8</td><td>314</td><td>105</td></tr><tr><td>9</td><td>419</td><td>141</td></tr><tr><td>10</td><td>560</td><td>182</td></tr><tr><td>11</td><td>742</td><td>231</td></tr><tr><td>12</td><td>973</td><td>288</td></tr><tr><td>13</td><td>1,261</td><td>351</td></tr><tr><td>14</td><td>1,612</td><td>423</td></tr><tr><td>15</td><td>2,035</td><td>500</td></tr><tr><td>16</td><td>2,535</td><td>Evolves into Wolvigor</td></tr></tbody></table></section>':'')+'<section id="moves" class="panel"><h2 class="section-title">Level-Up Moves</h2>'+(rows?'<table class="moves"><thead><tr><th>Level</th><th>Move</th></tr></thead><tbody>'+rows+'</tbody></table>':'<p>Information Coming Soon</p>')+'</section><div class="panel"><div class="nav">'+(idx>0?'<a href="pokemon.html?id='+pokemon[idx-1].number+'">← '+escape(pokemon[idx-1].name)+'</a>':'')+'<a href="index.html">Back to Pokédex</a>'+(idx<pokemon.length-1?'<a href="pokemon.html?id='+pokemon[idx+1].number+'">'+escape(pokemon[idx+1].name)+' →</a>':'')+'</div></div>';if([1,2,3].includes(p.number)){const img=$('#profile .hero .artwork img'),normalBtn=$('#normalArt'),shinyBtn=$('#shinyArt');if(img&&normalBtn&&shinyBtn){const normal=img.getAttribute('src');const shinyFile=p.images?.shiny||(p.number===1?'#001-Wolvyn (Shiny).png':'');const shiny=shinyFile?'https://raw.githubusercontent.com/Rzyin1/pokemon-everwild/main/'+shinyFile.split('/').map(encodeURIComponent).join('/'):'';const show=isShiny=>{if(isShiny&&!shiny)return;img.src=isShiny?shiny:normal;img.alt=p.name+(isShiny?' shiny':' normal')+' artwork';normalBtn.setAttribute('aria-pressed',String(!isShiny));shinyBtn.setAttribute('aria-pressed',String(isShiny));normalBtn.style.fontWeight=isShiny?'normal':'bold';shinyBtn.style.fontWeight=isShiny?'bold':'normal'};img.onerror=()=>{if(img.getAttribute('src')!==normal)show(false)};normalBtn.addEventListener('click',()=>show(false));shinyBtn.addEventListener('click',()=>show(true));shinyBtn.disabled=!shiny;show(false)}}}load().then(p=>document.body.dataset.page==='profile'?profile(p):home(p)).catch(e=>{let root=$('#profile')||$('#dex');root.innerHTML='<div class="panel">Unable to load Pokédex information. Please refresh the page.</div>';console.error(e)})})();