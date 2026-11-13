(function(){
  var d=document.documentElement;
  d.classList.add('js');

  document.querySelectorAll('.portrait img').forEach(function(img){
    var box=img.closest('.portrait');
    if(!box) return;
    function ok(){
      img.hidden=false;
      box.classList.remove('is-placeholder');
      box.classList.add('has-photo');
      if(!img.getAttribute('alt')) img.setAttribute('alt','Yeonggyu Lee');
      box.removeAttribute('role');
      box.removeAttribute('aria-label');
    }
    function miss(){
      img.hidden=true;
      img.removeAttribute('src');
      box.classList.add('is-placeholder');
      box.classList.remove('has-photo');
    }
    img.addEventListener('load', ok);
    img.addEventListener('error', miss);
    if(img.complete){
      if(img.naturalWidth>0) ok();
      else miss();
    }
  });

  var els=[].slice.call(document.querySelectorAll('.reveal'));
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  document.querySelectorAll('.stagger').forEach(function(g){[].forEach.call(g.children,function(c,i){c.style.setProperty('--i',i)})});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

(function(){
  var shots=[].slice.call(document.querySelectorAll('img.shot'));
  if(!shots.length) return;

  var box=document.createElement('div');
  box.className='lightbox';
  box.hidden=true;
  box.tabIndex=-1;
  box.setAttribute('role','dialog');
  box.setAttribute('aria-modal','true');
  box.setAttribute('aria-label', document.documentElement.lang==='ko' ? '확대된 화면' : 'Expanded screenshot');
  var pic=document.createElement('img');
  box.appendChild(pic);
  document.body.appendChild(box);

  function close(){
    if(box.hidden) return;
    box.hidden=true;
    pic.removeAttribute('src');
    pic.alt='';
    document.body.style.overflow='';
  }
  function open(src, alt){
    pic.src=src;
    pic.alt=alt||'';
    box.hidden=false;
    document.body.style.overflow='hidden';
  }

  box.addEventListener('click', close);
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') close();
  });

  shots.forEach(function(img){
    function go(e){
      e.preventDefault();
      e.stopPropagation();
      open(img.currentSrc||img.src, img.getAttribute('alt')||'');
    }
    img.addEventListener('click', go);
    img.addEventListener('keydown', function(e){
      if(e.key==='Enter'||e.key===' ') go(e);
    });
  });
})();
