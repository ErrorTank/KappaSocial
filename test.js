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
  
// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://cdn.rawgit.com/ErrorTank/KappaSocial/31dfb9e0/test.js';
// document.head.appendChild(script);
