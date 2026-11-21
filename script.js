function copyPrompt(btn){var box=btn.closest('.prompt-box');var t=box.querySelector('.prompt-text').innerText;function done(){btn.textContent='Copied';setTimeout(function(){btn.textContent='Copy prompt';},2000);}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback();});}else{fallback();}function fallback(){var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}}
var activeCat='all';
function applyFilters(){var input=document.getElementById('search');var q=input?input.value.trim().toLowerCase():'';if(!q&&activeCat!=='all'){activeCat='all';var ap=document.querySelectorAll('.filter-pills .pill');ap.forEach(function(p){p.classList.remove('active');});if(ap[0]){ap[0].classList.add('active');}}var cards=document.querySelectorAll('.guide-card');var n=0;cards.forEach(function(c){var ex=c.querySelector('.excerpt');var hay=((c.getAttribute('data-title')||'')+' '+(ex?ex.innerText:'')).toLowerCase();var okText=!q||hay.indexOf(q)>-1;var okCat=activeCat==='all'||c.getAttribute('data-cat')===activeCat;var ok=okText&&okCat;c.style.display=ok?'':'none';if(ok){n++;}});var msg=document.getElementById('search-count');if(msg){msg.textContent=n===0?'No guides found':n+' guides found';}var nr=document.getElementById('no-results');if(nr){nr.hidden=n!==0;}}
function filterGuides(){applyFilters();}
function filterCategory(cat,btn){activeCat=cat;var pills=document.querySelectorAll('.filter-pills .pill');pills.forEach(function(p){p.classList.remove('active');});if(btn){btn.classList.add('active');}applyFilters();}
function collectPrompts(){var t=[];document.querySelectorAll('.prompt-text').forEach(function(p){t.push(p.innerText.trim());});return t;}
function copyAllPrompts(btn){var all=collectPrompts().join('\n\n');var orig=btn.textContent;function done(){btn.textContent='Copied all';setTimeout(function(){btn.textContent=orig;},2000);}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(all).then(done,function(){btn.textContent='Copy failed, try again';});}else{var ta=document.createElement('textarea');ta.value=all;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}}
function downloadPrompts(btn){var all=collectPrompts().join('\n\n');var title=(document.title||'prompts').split('|')[0].trim().replace(/[^a-z0-9]+/gi,'-').toLowerCase().replace(/^-+|-+$/g,'');var blob=new Blob([all],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(title||'prompts')+'.txt';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);var orig=btn.textContent;btn.textContent='Downloaded';setTimeout(function(){btn.textContent=orig;},2000);}

(function(){var b=document.getElementById('toTop');if(!b){return;}function onScroll(){if(window.scrollY>400){b.classList.add('show');}else{b.classList.remove('show');}}window.addEventListener('scroll',onScroll);onScroll();b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});})();

(function(){
var track=document.getElementById('sliderTrack');if(!track){return;}
var slider=document.getElementById('showcaseSlider');
var dotsWrap=document.getElementById('sliderDots');
var counter=document.getElementById('sliderCounter');
var cards=track.querySelectorAll('.slide-card');
var total=cards.length;if(!total){return;}
var dots=[];var current=0;var timer=null;var resumeTimer=null;
function cardStep(){var c=cards[0];return c?c.offsetWidth+16:266;}
function update(){
var idx=Math.round(track.scrollLeft/cardStep());
if(idx<0){idx=0;}if(idx>total-1){idx=total-1;}
current=idx;
dots.forEach(function(d,j){d.classList.toggle('active',j===idx);d.setAttribute('aria-current',j===idx?'true':'false');});
if(counter){counter.textContent=(idx+1)+' / '+total;}
}
function goTo(i,behavior){current=((i%total)+total)%total;track.scrollTo({left:current*cardStep(),behavior:behavior||'smooth'});update();}
function stopAuto(){if(timer){clearInterval(timer);timer=null;}if(resumeTimer){clearTimeout(resumeTimer);resumeTimer=null;}}
function startAuto(){stopAuto();timer=setInterval(function(){goTo(current+1);},4000);}
function pauseThenResume(ms){stopAuto();if(resumeTimer){clearTimeout(resumeTimer);}resumeTimer=setTimeout(startAuto,ms||8000);}
window.sliderMove=function(dir){goTo(current+dir);pauseThenResume(10000);};
for(var i=0;i<total;i++){
(function(idx){
var b=document.createElement('button');
b.type='button';b.className='slider-dot';b.setAttribute('role','tab');
b.setAttribute('aria-label','Go to photo '+(idx+1));
b.addEventListener('click',function(){goTo(idx);pauseThenResume(10000);});
dotsWrap.appendChild(b);dots.push(b);
})(i);
}
track.addEventListener('scroll',function(){update();},{passive:true});
slider.addEventListener('mouseenter',stopAuto);
slider.addEventListener('mouseleave',startAuto);
slider.addEventListener('touchstart',stopAuto,{passive:true});
slider.addEventListener('touchend',function(){pauseThenResume(8000);},{passive:true});
var dragging=false,dragMoved=false,startX=0,startLeft=0;
track.addEventListener('mousedown',function(e){dragging=true;dragMoved=false;startX=e.clientX;startLeft=track.scrollLeft;track.style.scrollSnapType='none';track.classList.add('dragging');});
window.addEventListener('mousemove',function(e){if(!dragging){return;}var dx=e.clientX-startX;if(Math.abs(dx)>8){dragMoved=true;}track.scrollLeft=startLeft-dx;});
window.addEventListener('mouseup',function(){if(!dragging){return;}dragging=false;track.style.scrollSnapType='';track.classList.remove('dragging');update();});
track.addEventListener('click',function(e){if(dragMoved){e.preventDefault();e.stopPropagation();dragMoved=false;}},true);
update();
startAuto();
})();
