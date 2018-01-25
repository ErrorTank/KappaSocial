const debounce=(fn1,fn2,delay)=>{
    let action;
    return (arg)=>{
        fn1(arg);
        clearTimeout(action);
        action=setTimeout(()=>{
            fn2(arg);
        },delay)
    }
};
const debounce2=(fn,delay)=>{
    let action;
    return (arg)=>{
        clearTimeout(action);
        action=setTimeout(()=>{
            fn(arg);
        },delay)
    }
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
    debounce2,
    scrollToForm,
    ifFocusOutElement,
    animateCount
}