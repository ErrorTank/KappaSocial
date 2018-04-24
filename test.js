window.addEventListener("click",(e)=>{
  let parent = e.target.parentElement;
  parent.style.transition = 'all 0.5s ease';
  parent.style.position = "absolute";
  parent.style.top = "1000px";
});
  
