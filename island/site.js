/* しおさい荘 共通JS: 客室データ、窓の絵、アイコン */
(function(){
  var ROOMS=[
    {id:'nagi',name:'凪',kana:'なぎ',base:16500,min:1,max:2,size:'8畳',view:'海'},
    {id:'shiosai',name:'潮騒',kana:'しおさい',base:19800,min:2,max:4,size:'12畳+縁側',view:'海・夕日'},
    {id:'matsukaze',name:'松風',kana:'まつかぜ',base:22000,min:2,max:3,size:'10畳(離れ)',view:'庭・松'}
  ];
  var FRAME='<path class="ink" fill="var(--wood)" d="M20 20h380v280H20z"/><path class="ink" fill="var(--paper)" d="M44 44h332v232H44z"/>';
  var SILL='<path class="ink" fill="var(--wood)" d="M10 296h400v14H10z"/>';
  var BARS='<path class="ink" fill="none" d="M210 44v232M44 120h332"/>';
  var WIN={
    nagi:FRAME+'<path fill="var(--band)" d="M44 160h332v116H44z"/>'
      +'<path class="ink3" fill="none" d="M44 160c40-10 70 10 110 0s70-10 110 0 70 10 112 0"/>'
      +'<path class="ink3" fill="none" d="M70 200c30-8 50 8 80 0M230 220c30-8 50 8 80 0M120 248c24-6 40 6 64 0"/>'
      +'<circle class="ink3" fill="var(--sand)" cx="300" cy="96" r="26"/>'
      +'<path class="ink3" fill="var(--roof)" d="M110 150h70l-10 14h-50z"/><path class="ink3" fill="var(--wall)" d="M126 132h34v18h-34z"/>'+BARS+SILL,
    shiosai:FRAME+'<path fill="var(--sand)" d="M44 44h332v116H44z" opacity=".55"/><path fill="var(--band)" d="M44 160h332v116H44z"/>'
      +'<path class="ink3" fill="var(--roof)" d="M120 160a40 40 0 0 1 80 0z"/>'
      +'<path class="ink3" fill="none" d="M44 160c40-10 70 10 110 0s70-10 110 0 70 10 112 0"/>'
      +'<path class="ink3" fill="none" d="M250 200c30-8 50 8 80 0M80 214c30-8 50 8 80 0M180 246c24-6 40 6 64 0"/>'
      +'<path class="ink3" fill="var(--leaf)" d="M270 160c8-22 34-30 52-16 14-6 34 4 40 16z"/>'
      +'<path class="ink" fill="none" d="M210 44v232"/>'
      +'<path class="ink" fill="var(--wood)" d="M10 268h400v42H10z"/><path class="ink3" fill="none" d="M10 282h400M70 268v42M150 268v42M230 268v42M310 268v42"/>',
    matsukaze:FRAME+'<path fill="var(--leaf2)" d="M44 200h332v76H44z" opacity=".85"/>'
      +'<path class="ink3" fill="none" d="M44 200h332"/>'
      +'<path class="ink3" fill="none" d="M70 236q20-8 40 0M290 246q20-8 40 0M330 214l8-10 6 9"/>'
      +'<g transform="translate(262 40) scale(.52)"><path class="ink" fill="var(--wood)" d="M96 380c-4-110 2-220 26-330l14 4c-18 112-24 222-20 326z"/><path class="ink" fill="var(--wood)" d="M112 210c-30-14-52-34-66-58l10-6c14 20 34 38 60 50z"/><path class="ink" fill="var(--leaf2)" d="M14 150c10-26 50-34 74-22 18-10 48-4 54 18-24 12-62 16-90 14-16 0-32-4-38-10z"/><path class="ink" fill="var(--leaf)" d="M60 96c12-30 56-38 84-24 22-10 56-2 64 24-26 14-70 18-102 14-20-2-38-6-46-14z"/><path class="ink" fill="var(--leaf)" d="M76 40c10-24 44-32 66-20 18-6 42 2 46 20-20 12-54 14-80 10-14-2-26-4-32-10z"/></g>'
      +'<path class="ink" fill="none" d="M210 44v232M44 120h332"/>'
      +'<path class="ink" fill="var(--wood)" d="M10 276h400v34H10z"/><path class="ink3" fill="none" d="M10 292h400"/>'
  };
  var ICON={
    wave:'<path d="M4 20c4-5 8-5 12 0s8 5 12 0 6-3 8-2"/><path d="M6 29c4-4 7-4 10 0s7 4 10 0"/>',
    drop:'<path d="M20 6c6 8 10 13 10 19a10 10 0 0 1-20 0c0-6 4-11 10-19z"/>',
    nosmoke:'<circle cx="20" cy="20" r="14"/><path d="M10 30L30 10M11 22h11M26 22h3"/>',
    engawa:'<path d="M5 17l15-9 15 9M9 17v14M31 17v14M4 31h32M8 31v5M32 31v5"/>',
    bed:'<path d="M4 31V10M4 23h32v8M36 23v-4a4 4 0 0 0-4-4H18v8"/><circle cx="11" cy="18" r="3"/>',
    bath:'<path d="M5 20h30v8a6 6 0 0 1-6 6H11a6 6 0 0 1-6-6z"/><path d="M14 14c-2-3 2-5 0-8M20 14c-2-3 2-5 0-8M26 14c-2-3 2-5 0-8"/>',
    house:'<path d="M6 20L20 7l14 13M10 18v16h20V18M17 34v-9h6v9"/>',
    terrace:'<path d="M6 18a14 14 0 0 1 28 0zM20 18v16M12 35h16"/>',
    desk:'<path d="M5 25h30M9 25v10M31 25v10M13 25v-10h14v10"/>',
    wifi:'<path d="M5 15a22 22 0 0 1 30 0M11 22a13 13 0 0 1 18 0M16 28a5 5 0 0 1 8 0"/><circle cx="20" cy="33" r="1.8" fill="currentColor"/>',
    bike:'<circle cx="10" cy="28" r="7"/><circle cx="30" cy="28" r="7"/><path d="M10 28l7-12h10l3 12M17 16l5 12H10M26 10h6"/>',
    fish:'<path d="M5 20c6-8 16-9 24 0-8 9-18 8-24 0zM29 20l7-7v14z"/><circle cx="13" cy="19" r="1.5" fill="currentColor"/>',
    yen:'<circle cx="20" cy="20" r="15"/><path d="M13 11l7 10 7-10M20 21v10M14 24h12M14 29h12"/>',
    boat:'<path d="M5 26h30l-4 8H9zM11 26v-8h18v8M16 18v-6h8v6"/>',
    door:'<path d="M9 5h22v31H9zM9 36h22M25 21v3"/>'
  };
  function svgIcon(n){return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICON[n]||'')+'</svg>'}
  function svgWin(id){return '<svg viewBox="0 0 420 320" aria-hidden="true">'+(WIN[id]||'')+'</svg>'}
  function fill(root){
    [].forEach.call((root||document).querySelectorAll('[data-win]'),function(e){e.innerHTML=svgWin(e.getAttribute('data-win'))});
    [].forEach.call((root||document).querySelectorAll('[data-ico]'),function(e){e.innerHTML=svgIcon(e.getAttribute('data-ico'))});
  }
  window.SHIO={rooms:ROOMS,fill:fill,win:svgWin,icon:svgIcon,
    room:function(id){for(var i=0;i<ROOMS.length;i++)if(ROOMS[i].id===id)return ROOMS[i];return null},
    yen:function(n){return n.toLocaleString('ja-JP')+'円'}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fill()});else fill();
})();
