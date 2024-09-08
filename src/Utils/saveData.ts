import { SignUpFormType } from "../Components/types";

export const saveData=(data:SignUpFormType)=>{
    const key=data.email;
    const encodedData=btoa(JSON.stringify(data));
    localStorage.setItem(key,encodedData);
    let login=localStorage.getItem('isLoggedIn')
    if(login){
        localStorage.removeItem('isLoggedIn')
        localStorage.setItem('isLoggedIn','true')
    }
    
}