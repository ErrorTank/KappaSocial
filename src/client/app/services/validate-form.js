import validator from "validator";
let {isEmail}=validator;

const formValidator={
    isName:(name)=>name.length>=5 && name.length<=15,
    isEmail:(email)=>isEmail(email),
    isPassword:(pass)=>{
        pass=pass.toLowerCase();
        let validLength=pass.length>=6 && pass.length<=20;
        let validContent=!pass.match(/(\W|_)/g) && !!pass.match(/\d/g) && !!pass.match(/[a-z]/g);
        return validLength && validContent;
    }
};

export {formValidator};