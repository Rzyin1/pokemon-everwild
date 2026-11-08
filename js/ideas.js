'use strict';
const root=document.getElementById('reference');
const outline=document.getElementById('idea-contents');
const search=document.getElementById('ideas-search');
const controls=document.getElementById('status-options');
const counts={Confirmed:0,Pending:0,Removed:0};
const sections=[];
let filter='all';
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
const slug=text=>text.toLowerCase().replace(/^[0-9]+\.\s*/,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const cells=line=>line.slice(1,-1).split('|').map(v=>v.trim());
function inline(target,text){
  const pieces=text.split(/\*\*([^*]+)\*\*/g);
  pieces.forEach((piece,index)=>target.append(index%2?make('strong',null,piece):document.createTextNode(piece)));
}
function renderTable(block,parent){
  const rows=block.map(cells);
  if(rows.length<3)return;
  const headings=rows[0],statusIndex=headings.indexOf('Status');
  const wrapper=make('div','ideas-table-scroll'),table=make('table','ideas-table'),thead=make('thead'),headingRow=make('tr'),tbody=make('tbody');
  headings.forEach(value=>{const th=make('th',null,value);th.scope='col';headingRow.append(th);});
  thead.append(headingRow);table.append(thead);
  for(const row of rows.slice(2)){
    if(!row.some(Boolean))continue;
    const tr=make('tr'),status=statusIndex<0?'':row[statusIndex];
    tr.dataset.status=status;tr.dataset.search=row.join(' ').toLowerCase();
    if(status in counts)counts[status]++;
    row.forEach((value,index)=>{const td=make('td');if(index===statusIndex&&status)td.append(make('span','status-pill '+status,status));else inline(td,value);tr.append(td);});
    tbody.append(tr);
  }
  table.append(tbody);wrapper.append(table);parent.append(wrapper);
}
function render(markdown){
  const lines=markdown.replace(/\r/g,'').split('\n');
  root.replaceChildren();outline.replaceChildren();
  let current=null;
  function newSection(name){
    const id=slug(name);current=make('section','ideas-section');current.id=id;current.dataset.heading=name.toLowerCase();
    current.append(make('h2',null,name));root.append(current);sections.push(current);
    const link=make('a',null,name);link.href='#'+id;outline.append(link);
  }
  for(let i=0;i<lines.length;){
    const line=lines[i].trim();
    if(!line||line.startsWith('# ')){i++;continue;}
    if(line.startsWith('## ')){newSection(line.slice(3));i++;continue;}
    if(!current){i++;continue;}
    if(line.startsWith('### ')){current.append(make('h3',null,line.slice(4)));i++;continue;}
    if(line==='---'){current.append(make('hr'));i++;continue;}
    if(line.startsWith('|')){const block=[];while(i<lines.length&&lines[i].trim().startsWith('|'))block.push(lines[i++].trim());renderTable(block,current);continue;}
    if(/^\d+\. /.test(line)){
      const ol=make('ol');
      while(i<lines.length&&/^\d+\. /.test(lines[i].trim())){const li=make('li');inline(li,lines[i++].trim().replace(/^\d+\. /,''));ol.append(li);}
      current.append(ol);continue;
    }
    const paragraph=[];
    while(i<lines.length&&lines[i].trim()&&!lines[i].startsWith('#')&&!lines[i].trim().startsWith('|')&&!/^\d+\. /.test(lines[i].trim())&&lines[i].trim()!=='---')paragraph.push(lines[i++].trim());
    if(paragraph.length){const p=make('p');inline(p,paragraph.join(' '));current.append(p);}else i++;
  }
  Object.keys(counts).forEach(k=>document.getElementById(k.toLowerCase()+'-count').textContent=counts[k]);
  apply();
  // The section list loads asynchronously; honor direct anchor links after rendering.
  if(window.location.hash){
    const anchor=decodeURIComponent(window.location.hash.slice(1));
    const destination=document.getElementById(anchor);
    if(destination)requestAnimationFrame(()=>destination.scrollIntoView());
  }
}
function apply(){
  const query=search.value.trim().toLowerCase();
  let matched=0,sectionsVisible=0;
  for(const section of sections){
    let visibleRows=0,visibleStatuses=0;
    const hasTables=!!section.querySelector('table');
    for(const wrapper of section.querySelectorAll('.ideas-table-scroll')){
      let visible=0;
      for(const row of wrapper.querySelectorAll('tbody tr')){
        const fitsStatus=filter==='all'||row.dataset.status===filter;
        const fitsText=!query||row.dataset.search.includes(query)||section.dataset.heading.includes(query);
        const show=fitsStatus&&fitsText;
        row.hidden=!show;
        if(show){visible++;visibleRows++;if(row.dataset.status){matched++;visibleStatuses++;}}
      }
      wrapper.hidden=!visible;
    }
    const matchesSection=!query||section.textContent.toLowerCase().includes(query);
    const show=filter==='all'?(hasTables?visibleRows>0:matchesSection):(visibleStatuses>0);
    section.hidden=!show;if(show)sectionsVisible++;
  }
  document.getElementById('ideas-count').textContent=matched+' matching decisions · '+sectionsVisible+' sections';
  let empty=document.getElementById('ideas-empty');
  if(!sectionsVisible&&!empty){empty=make('p','no-results','No matching decisions. Try changing the search or status filter.');empty.id='ideas-empty';root.append(empty);}
  if(empty)empty.hidden=sectionsVisible>0;
}
controls.addEventListener('click',event=>{
  const button=event.target.closest('button[data-filter]');if(!button)return;
  filter=button.dataset.filter;
  controls.querySelectorAll('button').forEach(b=>{const active=b===button;b.classList.toggle('chosen',active);b.setAttribute('aria-pressed',String(active));});
  apply();
});
search.addEventListener('input',apply);
fetch('docs/master-game-design.md',{cache:'no-store'})
 .then(response=>{if(!response.ok)throw Error('Design document unavailable: '+response.status);return response.text();})
 .then(render)
 .catch(error=>{root.replaceChildren(make('p','no-results','Could not load the design document. Please try again.'));console.error(error);});