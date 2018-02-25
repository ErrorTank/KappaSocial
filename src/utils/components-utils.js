import React from "react";
import moment from "moment";

const debounce=(fn,delay)=>{
    let action;
    return (arg)=>{
        clearTimeout(action);
        action=setTimeout(()=>{

            fn(arg);
        },delay)
    }
};

let formatTime=(stamp)=>{
    let now= new Date().getTime();
    let different=now-stamp;
    if((different/1000)/3600/24/4>12){
        return moment(stamp).format("ddd MMM D");
    }
    return moment(stamp).fromNow();
};

let highLight = (keyword, name) => {
    let ranges=[];
    let recursionHLight=(k,n)=>{

        let ck=k.toLowerCase();
        let cn=n.toLowerCase();
        let start=cn.indexOf(ck);
        if(start===-1){
            ranges.push((<span>{n.slice(0,n.length)}</span>));
            return;
        }
        let end=start+k.length-1;
        ranges.push((<span>{n.slice(0,start)}<span className="h-light">{n.slice(start,end+1)}</span></span>));
        n=n.slice(end+1,n.length);
        recursionHLight(k,n);
    };
    recursionHLight(keyword,name);
    return (<span>{ranges.map((elem,i)=><span key={i}>{elem}</span>)}</span>)
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
const getBase64=(file)=>new Promise((resolve)=>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        resolve({file,src:reader.result});
    };
});
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
    highLight,
    formatTime,
    getBase64
}