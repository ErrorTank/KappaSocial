import React from "react";

const debounce=(fn,delay)=>{
    let action;
    return (arg)=>{
        clearTimeout(action);
        action=setTimeout(()=>{

            fn(arg);
        },delay)
    }
};
let highLight = (keyword, name) => {
    let start=name.toLowerCase().indexOf(keyword.toLowerCase());
    let end=start+keyword.length;
    let p1=name.slice(0,start),p2=name.slice(start,end),p3=name.slice(end,keyword.length);
    return (<span>{p1}<span className="h-light">{p2}</span>{p3}</span>)
};
const scrollToForm = (element,state) => {
    if (state) {
        $('html, body').animate({
            scrollTop: $(element).position().top
        }, 500);
    }
};
const ifFocusOutElement=(element,todo)=>{
  $(window).on("click",(e)=>{
      if(!$(e.target).parents(element).length){
          todo();
      }
  });
};
const animateCount=(count,fn)=>{
    let temp=0;
    let skip=Math.ceil(count/100);
    let interval=setInterval(()=>{
        temp=temp+skip;
        if(count-temp<skip){
            temp=count;
        }
        fn(temp);
        if(temp===count)
            clearInterval(interval);
    },10);
};
export{
    debounce,
    scrollToForm,
    ifFocusOutElement,
    animateCount,
    highLight
}