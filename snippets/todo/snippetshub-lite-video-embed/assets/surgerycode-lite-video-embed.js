(()=>{
  function buildIframe({provider,id,title}){
    const iframe=document.createElement('iframe');
    iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen','');
    iframe.setAttribute('title', title||'Video');
    iframe.loading='lazy';
    if(provider==='vimeo'){
      iframe.src=`https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1`;
    } else {
      iframe.src=`https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    }
    iframe.style.width='100%';
    iframe.style.height='100%';
    iframe.style.border='0';
    return iframe;
  }
  function init(){
    document.querySelectorAll('.surgerycode-lite-video').forEach(root=>{
      const btn=root.querySelector('.surgerycode-lite-video__poster');
      if(!btn) return;
      btn.addEventListener('click',()=>{
        const provider=root.getAttribute('data-provider')||'youtube';
        const id=root.getAttribute('data-video-id');
        const title=root.getAttribute('data-title')||'Video';
        if(!id) return;
        const iframe=buildIframe({provider,id,title});
        root.innerHTML='';
        root.appendChild(iframe);
      },{once:true});
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
