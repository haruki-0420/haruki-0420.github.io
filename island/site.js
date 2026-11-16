/* しおさい荘 下層ページ共通: 波の帯、スクロール表示、スマホメニュー、カーソル */
(function(){
  var NS='http://www.w3.org/2000/svg';
  var root=document.documentElement;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mix=function(a,b,k){return a+(b-a)*k};
  var clamp=function(v){return v<0?0:v>1?1:v};
  var out=function(k){return 1-Math.pow(1-k,3)};

  // animated wave strips
  var LAYERS=[
    {dy:34,a:16,k:1.6,v:1.1,ph:0,fill:'var(--band2)'},
    {dy:60,a:11,k:2.3,v:.9,ph:2,span:[.08,.55]},
    {dy:80,a:14,k:1.4,v:1.2,ph:4,fill:'var(--paper)'},
    {dy:110,a:9,k:2.6,v:1,ph:1,span:[.45,.95]}
  ];
  var strips=[].slice.call(document.querySelectorAll('svg.strip')).map(function(svg){
    var paths=LAYERS.map(function(l){var p=document.createElementNS(NS,'path');p.style.fill=l.fill||'none';svg.appendChild(p);return p});
    var s={svg:svg,paths:paths,w:0,vis:true,flip:svg.hasAttribute('data-flip')};
    if('IntersectionObserver' in window){new IntersectionObserver(function(e){s.vis=e[0].isIntersecting}).observe(svg)}
    return s;
  });
  function sizeStrips(){strips.forEach(function(s){s.w=s.svg.clientWidth||1200;s.svg.setAttribute('viewBox','0 0 '+s.w+' 150')})}
  function yAt(l,x,t){
    var f=2*Math.PI/1100*l.k;
    return l.dy+l.a*Math.sin(f*x+t*l.v+l.ph)+l.a*.45*Math.sin(f*2.3*x-t*l.v*.7+l.ph*1.7);
  }
  function drawStrip(s,t){
    var x0=-20,x1=s.w+20;
    LAYERS.forEach(function(l,i){
      var a=x0,b=x1;
      if(l.span){a=mix(x0,x1,l.span[0]);b=mix(x0,x1,l.span[1])}
      var d='';
      for(var x=a;;x+=22){if(x>b)x=b;d+=(d?'L':'M')+x.toFixed(1)+' '+yAt(l,x,t).toFixed(1);if(x>=b)break}
      if(l.fill)d+='L'+b.toFixed(1)+' 400L'+a.toFixed(1)+' 400Z';
      s.paths[i].setAttribute('d',d);
    });
  }

  // reveal on scroll
  var rv=document.querySelectorAll('.rv');
  if(reduced||!('IntersectionObserver' in window)){[].forEach.call(rv,function(e){e.classList.add('on')})}
  else{
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});
    [].forEach.call(rv,function(e){io.observe(e)});
  }

  // mobile menu
  var btn=document.querySelector('.menu-btn'), nav=document.querySelector('.gnav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)})}

  // cursor
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var cur=document.getElementById('cur'), ping=document.getElementById('ping');
  var mx=-100,my=-100,cx=-100,cy=-100,down=false,over=false,pt=-1e9,px=0,py=0;
  if(fine&&cur){
    root.classList.add('fine');
    addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;over=!!e.target.closest('a,button,summary,select,input,textarea,label');if(cx<-50){cx=mx;cy=my}});
    addEventListener('pointerdown',function(e){down=true;px=e.clientX;py=e.clientY;pt=performance.now()});
    addEventListener('pointerup',function(){down=false});
  }

  var t0=performance.now(), last=t0;
  function loop(now){
    var t=reduced?0:(now-t0)/1000;
    strips.forEach(function(s){if(s.vis)drawStrip(s,t)});
    if(fine&&cur){
      var dt=Math.min(.05,(now-last)/1000), k=1-Math.exp(-dt*22);
      cx+=(mx-cx)*k; cy+=(my-cy)*k;
      cur.style.transform='translate('+cx.toFixed(1)+'px,'+cy.toFixed(1)+'px) scale('+(down?.7:over?1.35:1)+')';
      var pk=clamp((now-pt)/650);
      ping.style.transform='translate('+px+'px,'+py+'px) scale('+(1+out(pk)*1.9)+')';
      ping.style.opacity=pk>0&&pk<1?1-pk:0;
    }
    last=now;
    requestAnimationFrame(loop);
  }
  sizeStrips(); addEventListener('resize',sizeStrips);
  strips.forEach(function(s){drawStrip(s,0)});
  requestAnimationFrame(loop);
})();
