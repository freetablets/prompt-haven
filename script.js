function copyPrompt(btn){var box=btn.closest('.prompt-box');var t=box.querySelector('.prompt-text').innerText;function done(){btn.textContent='Copied';setTimeout(function(){btn.textContent='Copy prompt';},2000);}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback();});}else{fallback();}function fallback(){var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}}
function copyTextToClipboard(text,done){function fallback(){var ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,function(){fallback();});}else{fallback();}}
var activeCat='all';
var guidesExpanded=false;
var LOAD_LIMIT=12;
function setActivePill(cat){var pills=document.querySelectorAll('.filter-pills .pill');pills.forEach(function(p){p.classList.remove('active');});pills.forEach(function(p){var oc=p.getAttribute('onclick')||'';if(oc.indexOf("'"+cat+"'")>-1){p.classList.add('active');}});}
function applyFilters(){var input=document.getElementById('search');var q=input?input.value.trim().toLowerCase():'';var cards=document.querySelectorAll('.guide-card');var matches=[];cards.forEach(function(c){var ex=c.querySelector('.excerpt');var hay=((c.getAttribute('data-title')||'')+' '+(ex?ex.innerText:'')).toLowerCase();var okText=!q||hay.indexOf(q)>-1;var okCat=activeCat==='all'||c.getAttribute('data-cat')===activeCat;if(okText&&okCat){matches.push(c);}});var hasLoadMore=!!document.getElementById('loadMore');var limit=(hasLoadMore&&!q&&activeCat==='all'&&!guidesExpanded)?LOAD_LIMIT:matches.length;cards.forEach(function(c){var idx=matches.indexOf(c);c.style.display=(idx>-1&&idx<limit)?'':'none';});var n=matches.length;var msg=document.getElementById('search-count');if(msg){msg.textContent=n===0?'No guides found':n+' guides found';}var nr=document.getElementById('no-results');if(nr){nr.hidden=n!==0;}var cb=document.querySelector('.search-clear');if(cb){cb.hidden=!q;}var lm=document.getElementById('loadMore');if(lm){var wrap=lm.parentElement;var showMore=hasLoadMore&&!q&&activeCat==='all'&&matches.length>LOAD_LIMIT;wrap.style.display=showMore?'':'none';if(showMore){lm.textContent=guidesExpanded?'Show fewer guides':'Load more guides';}}}
function filterGuides(){var input=document.getElementById('search');if(input&&input.value.trim()){activeCat='all';setActivePill('all');}applyFilters();}
function filterCategory(cat,btn){var input=document.getElementById('search');if(input){input.value='';}activeCat=cat;var pills=document.querySelectorAll('.filter-pills .pill');pills.forEach(function(p){p.classList.remove('active');});if(btn){btn.classList.add('active');}applyFilters();}
function clearSearch(){var input=document.getElementById('search');if(input){input.value='';input.focus();}applyFilters();}
function toggleLoadMore(){guidesExpanded=!guidesExpanded;applyFilters();if(!guidesExpanded){var g=document.getElementById('guides');if(g&&g.scrollIntoView){g.scrollIntoView();}}}
function toggleNav(btn){var nav=btn.closest('.nav');if(!nav){return;}var open=nav.classList.toggle('nav-open');btn.setAttribute('aria-expanded',open?'true':'false');btn.setAttribute('aria-label',open?'Close menu':'Open menu');}
function closeNav(){var nav=document.querySelector('.nav');if(!nav){return;}nav.classList.remove('nav-open');var t=nav.querySelector('.nav-toggle');if(t){t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');}}
function initShare(){var url=encodeURIComponent(window.location.href);var title=encodeURIComponent(document.title);document.querySelectorAll('[data-share]').forEach(function(a){var kind=a.getAttribute('data-share');if(kind==='whatsapp'){a.href='https://wa.me/?text='+title+'%20'+url;}else if(kind==='facebook'){a.href='https://www.facebook.com/sharer/sharer.php?u='+url;}else if(kind==='x'){a.href='https://twitter.com/intent/tweet?text='+title+'&url='+url;}else if(kind==='telegram'){a.href='https://t.me/share/url?url='+url+'&text='+title;}});}
function copyPageLink(btn){copyTextToClipboard(window.location.href,function(){var o=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=o;},2000);});}
function copyGuideLink(btn){var u='';try{u=new URL(btn.getAttribute('data-url'),window.location.href).href;}catch(e){u=window.location.href;}copyTextToClipboard(u,function(){var o=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=o;},2000);});}
function collectPrompts(){var t=[];document.querySelectorAll('.prompt-text').forEach(function(p){t.push(p.innerText.trim());});return t;}
function copyAllPrompts(btn){var all=collectPrompts().join('\n\n');var orig=btn.textContent;function done(){btn.textContent='Copied all';setTimeout(function(){btn.textContent=orig;},2000);}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(all).then(done,function(){btn.textContent='Copy failed, try again';});}else{var ta=document.createElement('textarea');ta.value=all;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}}
function downloadPrompts(btn){var all=collectPrompts().join('\n\n');var title=(document.title||'prompts').split('|')[0].trim().replace(/[^a-z0-9]+/gi,'-').toLowerCase().replace(/^-+|-+$/g,'');var blob=new Blob([all],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(title||'prompts')+'.txt';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);var orig=btn.textContent;btn.textContent='Downloaded';setTimeout(function(){btn.textContent=orig;},2000);}

(function(){var b=document.getElementById('toTop');if(!b){return;}var footer=document.querySelector('footer.site');function onScroll(){var show=window.scrollY>800;if(show&&footer){var r=footer.getBoundingClientRect();if(r.top<window.innerHeight){show=false;}}b.classList.toggle('show',show);}window.addEventListener('scroll',onScroll,{passive:true});onScroll();b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});})();

document.querySelectorAll('.nav a.nlink').forEach(function(a){a.addEventListener('click',closeNav);});
initShare();
if(document.getElementById('search')){applyFilters();}

(function(){
var track=document.getElementById('sliderTrack');if(!track){return;}
var slider=document.getElementById('showcaseSlider');
var dotsWrap=document.getElementById('sliderDots');
var counter=document.getElementById('sliderCounter');
var cards=track.querySelectorAll('.slide-card');
var total=cards.length;if(!total){return;}
var dots=[];var current=0;var timer=null;var resumeTimer=null;
function cardStep(){var c=cards[0];return c?c.offsetWidth+16:266;}
function maxIdx(){var vis=Math.max(1,Math.floor(track.clientWidth/cardStep()));return Math.max(0,total-vis);}
function update(){
var idx=Math.round(track.scrollLeft/cardStep());
if(idx<0){idx=0;}if(idx>maxIdx()){idx=maxIdx();}
current=idx;
dots.forEach(function(d,j){d.classList.toggle('active',j===idx);d.setAttribute('aria-current',j===idx?'true':'false');});
if(counter){counter.textContent=(idx+1)+' / '+total;}
}
function goTo(i,behavior,wrap){if(i>maxIdx()){i=wrap?0:maxIdx();}if(i<0){i=wrap?maxIdx():0;}current=i;track.scrollTo({left:current*cardStep(),behavior:behavior||'smooth'});update();}
function stopAuto(){if(timer){clearInterval(timer);timer=null;}if(resumeTimer){clearTimeout(resumeTimer);resumeTimer=null;}}
function startAuto(){stopAuto();timer=setInterval(function(){goTo(current+1,undefined,true);},4000);}
function pauseThenResume(ms){stopAuto();if(resumeTimer){clearTimeout(resumeTimer);}resumeTimer=setTimeout(startAuto,ms||10000);}
window.sliderMove=function(dir){goTo(current+dir,undefined,true);pauseThenResume(10000);};
for(var i=0;i<total;i++){
(function(idx){
var b=document.createElement('button');
b.type='button';b.className='slider-dot';b.setAttribute('role','tab');
b.setAttribute('aria-label','Go to photo '+(idx+1));
b.addEventListener('click',function(){goTo(idx,undefined,false);pauseThenResume(10000);});
dotsWrap.appendChild(b);dots.push(b);
})(i);
}
track.addEventListener('scroll',function(){update();},{passive:true});
slider.addEventListener('mouseenter',stopAuto);
slider.addEventListener('mouseleave',startAuto);
slider.addEventListener('touchstart',stopAuto,{passive:true});
slider.addEventListener('touchend',function(){pauseThenResume(10000);},{passive:true});
var dragging=false,dragMoved=false,startX=0,startLeft=0;
track.addEventListener('mousedown',function(e){dragging=true;dragMoved=false;startX=e.clientX;startLeft=track.scrollLeft;track.style.scrollSnapType='none';track.classList.add('dragging');});
window.addEventListener('mousemove',function(e){if(!dragging){return;}var dx=e.clientX-startX;if(Math.abs(dx)>8){dragMoved=true;}track.scrollLeft=startLeft-dx;});
window.addEventListener('mouseup',function(){if(!dragging){return;}dragging=false;track.style.scrollSnapType='';track.classList.remove('dragging');update();});
track.addEventListener('click',function(e){if(dragMoved){e.preventDefault();e.stopPropagation();dragMoved=false;}},true);
update();
startAuto();
})();
