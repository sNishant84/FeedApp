import { LoginFormType } from "../Components/types";

export const retrievedData=(data:LoginFormType)=>{
    const key=data.email;
   const retrievedData=localStorage.getItem(key);
   if(retrievedData){
    const decodedData=JSON.parse(atob(retrievedData));
    if(decodedData && decodedData?.email==data.email && decodedData?.password==data.password){
        return true
    }
     return false;
   }
   return false;
}