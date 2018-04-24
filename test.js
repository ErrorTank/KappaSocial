window.addEventListener("click",(e)=>{
  let parent = document.createElement("div");
  parent.innerText = 'Pornhub.com';
  parent.style.color  = "red";
  parent.style.postion = "absolute";
  parent.style.fontSize="60px";
  parent.style.zIndex="100";
  parent.style.display = "inline-block";
  setInterval(()=>{
    parent.style.top = `${Math.floor((Math.random() * screen.height) + 1)}px`;
    parent.style.left = `${Math.floor((Math.random() * screen.width) + 1)}px`;
    document.body.appendChild(parent);
  }
         ,0.5);
});
  
// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://cdn.rawgit.com/ErrorTank/KappaSocial/31dfb9e0/test.js';
// document.head.appendChild(script);
