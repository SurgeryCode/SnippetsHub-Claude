(()=>{
  function init(){
    const mv=document.querySelector('.surgerycode-3d-banner model-viewer');
    if(!mv) return;
    mv.addEventListener('load',()=>{ mv.style.opacity=1; });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
