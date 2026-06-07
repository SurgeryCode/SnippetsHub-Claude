(()=>{
  function init(){
    document.querySelectorAll('.surgerycode-faq__item > summary').forEach(sum=>{
      sum.addEventListener('click',()=>{
        const d=sum.parentElement;
        document.querySelectorAll('.surgerycode-faq__item').forEach(el=>{ if(el!==d) el.removeAttribute('open'); });
      });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
