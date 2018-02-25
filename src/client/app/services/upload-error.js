
let error="";
let errListener=null;

export const uploadError= {
    getError:()=>error,
    setError:(msg)=>{
        error=msg;
        errListener();
        errListener=null;
        return new Promise((res)=>res())
    },
    onError:handle=>{
        errListener=handle

    },
    removeErr:()=>{
        error="";
        errListener();
        errListener=null;
    }
};
