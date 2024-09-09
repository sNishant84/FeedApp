import React,{FC, useEffect, useState} from 'react'
import { useAuth } from '../context/AuthProvider';
import { retrievedData } from '../Utils/retreiveData';
import { LoginErrorType, LoginFormType } from './types';
import { useNavigate } from "react-router-dom";

interface LoginProps{
    setClickedElement?:(val:string)=>void;
    setModalOpen?:(openModal:boolean)=>void;
}


export const Login =({setClickedElement,setModalOpen}:LoginProps):JSX.Element=>{

    const intialValues:LoginFormType={
        email: "",
        password: ""
    }

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<LoginFormType>(intialValues);
    const [errors,setErrorData]=useState<LoginErrorType | {}>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [type,setType]=useState<string>('password');
    const {isLogin,setLogin}=useAuth();
   

    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
       const {name,value}=event.target;
       setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
       if(!value && isSubmit){
        setErrorData({...errors,[name]:`${name} is Required`})
       }else{
        setErrorData({...errors,[name]:''})
       }
    }

    useEffect(()=>{
       if(isLogin){
        navigate('/')
       }
    },[])

    const validate = (values:LoginFormType) => {
        const errors = {} as LoginErrorType;
        if (!values.email) {
          errors.email = "Email is required!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      };

    const handleSubmit=(event:any)=>{
        event.preventDefault();
        let errors=validate(formData)
        setErrorData(errors);
        setIsSubmit(true);
        if(errors && Object.keys(errors).length === 0){
          const loginState=retrievedData(formData)
          if(loginState){
            setLogin(true);
            setModalOpen?.(false)
          }else{
            const errors = {} as LoginErrorType;
            errors.loginError="email or username doesn't exist";
            setErrorData(errors)
          }
        }
    }


    const handleType=()=>{
     if(type=='password'){
        setType('text');
     }else{
        setType('password')
     }
    }

  return(
    <div className='border-solid border-2 border-[#35373B] rounded-lg max-w-lg md:max-h-[480px] h-auto px-5 pt-9 pb-8 w-[460px]  bg-[#27292D] from-[#969696] to-[#343434]'>
    <div>
        <p className='uppercase text-[#6B6C70] text-sm text-center'>Welcome Back</p>
        <h1 className='text-[#fff] text-lg text-center'>Log into your account</h1>
    </div>
    <div className='mt-8'>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                <label className='text-sm text-[#C5C7CA] font-medium'>
                    Email Or Username
                </label>
                </div>
                <div>
                <input className={`bg-[#27292D] border-[1.5px] border-[#35373B] w-[100%] placeholder-[#7F8084] text-base p-2 rounded-[4px] mt-1 h-11 font-normal outline-none text-[#C5C7CA] ${(errors as LoginErrorType).email ? 'border-red-500' : '' }`}  name="email" onChange={handleChange} type="text" placeholder='Enter your email or password' autoComplete="off" />
                {<p className='text-[12px] h-2 text-red-500'>{(errors as LoginErrorType).email}</p>}
                </div>
            </div>
            <div className='mt-2'>
                <div className='flex justify-between'>
                <label className='text-sm text-[#C5C7CA] font-medium'>
                    Password
                </label>
                <span className='text-sm text-[#C5C7CA] font-medium'>Forgot Password?</span>
                </div>
                <div className='relative'>
                <input className={`bg-[#27292D] border-[1.5px] border-[#35373B] w-[100%] placeholder-[#7F8084] text-base p-2 rounded-[4px] mt-1 h-11 font-normal outline-none text-[#C5C7CA] ${(errors as LoginErrorType).password ? 'border-red-500' : '' }`} name="password" onChange={handleChange} type={type} placeholder='Enter your password' autoComplete="off" />
                <span className='absolute top-[18px] right-[8px] cursor-pointer' onClick={handleType}><img className="h-[20px] w-[20px]" src={type=='password' ? '/assets/Icon.svg' : '/assets/openEye.svg'} /></span>
                <p className='text-[12px]  h-2 text-red-500'>{(errors as LoginErrorType).password}</p>
                </div>
            </div>
            <p className="text-[12px] h-2 text-red-500">{(errors as LoginErrorType).loginError && `Username or email doesn't exist`}</p>
            <div>
               <button className='size-full bg-[#4A96FF] mt-4 p-2 text-base text-white rounded-[4px]' type="submit">Login Now</button>
            </div>
            <div className='text-sm font-medium text-[#7F8084] mt-3'>
               <p>Not Registered yet? <a onClick={()=>setClickedElement?.('signup')} className='text-[#fff] cursor-pointer'>Register &rarr;</a></p>
            </div>
        </form>
    </div>
 </div>
  )
}

export const LoginPage=():JSX.Element=> {
    
  return (
   <div className='bg-[#191920] h-screen grid font-sans place-content-center'>
    <div className='flex justify-center'>
        <img src="/assets/Logo.svg" alt='logo' />
    </div>
    <div className='mt-8'>
   <Login />
   </div>
    </div> 

  )
}

