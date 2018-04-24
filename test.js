window.addEventListener("click",(e)=>{
  let parent = document.createElement("div");
  parent.innerText = 'PORNHUB';
  parent.style.color  = "black";
  parent.style.position = "absolute";
  parent.style.fontSize="80px";
  parent.style.zIndex="100";
  parent.style.display = "inline-block";
  setInterval(()=>{
    parent.style.top = `${Math.floor((Math.random() * window.innerHeight+window.pageYOffset) +window.pageYOffset)}px`;
    parent.style.left = `${Math.floor((Math.random() * window.innerWidth+window.pageXOffset) + window.pageXOffset)}px`;
    document.body.appendChild(parent);
  }
         ,500);
});
  

