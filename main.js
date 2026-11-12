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
