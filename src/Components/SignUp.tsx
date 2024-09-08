import React,{FC, useContext, useState} from 'react'
import { useAuth } from '../context/AuthProvider';
import { saveData } from '../Utils/saveData';
import { SignUpErrorType, SignUpFormType } from './types';

interface SignUpProps{
    setClickedElement:(val:string)=>void;
    setModalOpen:(openModal:boolean)=>void;
}

const SignUp=({setClickedElement,setModalOpen}:SignUpProps):JSX.Element=> {

    let intialValues={
        email: "",
        username:'',
        password: ""
    }
    
    const [formData, setFormData] = useState<SignUpFormType>(intialValues);
    const [errors,setErrorData]=useState<SignUpErrorType | {}>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [type,setType]=useState<string>('password');

    const {setLogin}=useAuth();
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if(!value && isSubmit){
         setErrorData({...errors,[name]:`${name} is Required`})
        }else{
         setErrorData({...errors,[name]:null})
        }
     }

     const validate = (values:SignUpFormType) => {
        const errors = {} as SignUpErrorType;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
          errors.email = "Email is required!";
        }else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
          }
          if (!values.username) {
            errors.username = "Username is required!";
          }
        if (!values.password) {
          errors.password = "Password is required";
        }else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
          }else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
          }
        return errors;
      };

      const handleType=()=>{
        if(type=='password'){
           setType('text');
        }else{
           setType('password')
        }
       }


    const handleSubmit=(event:any)=>{
        event.preventDefault();
        let errors=validate(formData)
        setErrorData(errors);
        setIsSubmit(true);
        if(errors && Object.keys(errors).length === 0){
          saveData(formData)
          setLogin(true);
         setModalOpen(false);   
        }
        
    }

  return (
   <div className='place-content-center'>
    <div className='border-solid border-2 border-[#35373B] rounded-lg max-w-lg max-h-md   px-6 py-8  w-[460px]  bg-[#27292D] from-[#969696] to-[#343434]'>
        <div>
            <p className='capitalize text-[#6B6C70] text-sm text-center'>Sign up</p>
            <h1 className='text-[#fff] text-lg text-center'>Create an account to continue</h1>
        </div>
        <div className='mt-8'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                    <label className='text-sm text-[#C5C7CA] font-medium'>
                        Email 
                    </label>
                    </div>
                    <div>
                    <input className={`bg-[#27292D] border-[1.5px] border-[#35373B] w-[100%] placeholder-[#7F8084] text-base p-2 rounded-[4px] mt-1 h-11 font-normal text-[#C5C7CA] outline-none ${(errors as SignUpErrorType).email ? 'border-red-500' : '' }`} name="email" onChange={handleChange} type="text" placeholder='Enter your email' autoComplete="off" />
                    {<p className=' h-2 text-[12px] text-red-500'>{(errors as SignUpErrorType).email}</p>}
                    </div>
                </div>
                <div className='mt-2'>
                    <div>
                    <label className='text-sm text-[#C5C7CA] font-medium'>
                        Username 
                    </label>
                    </div>
                    <div>
                    <input className={`bg-[#27292D] border-[1.5px] border-[#35373B] w-[100%] placeholder-[#7F8084] text-base p-2 rounded-[4px] mt-1 h-11 font-normal outline-none text-[#C5C7CA] ${(errors as SignUpErrorType).username ? 'border-red-500' : '' }`} name="username" onChange={handleChange} type="text" placeholder='Choose a preferred username' autoComplete="off" />
                    { <p className=' h-2 text-[12px] text-red-500'>{(errors as SignUpErrorType).username}</p>}
                    </div>
                </div>
                <div className='mt-2'>
                    <div>
                    <label className='text-sm text-[#C5C7CA] font-medium'>
                        Password
                    </label>
                    </div>
                    <div className='relative'>
                    <input className={`bg-[#27292D] border-[1.5px] border-[#35373B] w-[100%] placeholder-[#7F8084] text-base p-2 rounded-[4px] mt-1 h-11 font-normal outline-none text-[#C5C7CA] ${(errors as SignUpErrorType).password ? 'border-red-500' : '' }`} onChange={handleChange} name='password' type={type} placeholder='Choose a strong password' autoComplete="off" />
                    <span className='absolute top-[18px] right-[8px] cursor-pointer' onClick={handleType}><img className="h-[20px] w-[20px]" src={type=='password' ? '/assets/Icon.svg' : '/assets/openEye.svg'} /></span>
                    { <p className='h-2 text-[12px] text-red-500'>{(errors as SignUpErrorType).password}</p>}
                    </div>
                </div>
                <div>
                   <button className='size-full bg-[#4A96FF] mt-4 p-2 text-base text-white rounded-[4px]' type="submit">Continue</button>
                </div>
                <div className='text-sm font-medium text-[#7F8084] mt-3'>
                   <p>Already have an account? <a onClick={()=>setClickedElement('Login')} className='text-[#fff] cursor-pointer'>Login &rarr;</a></p>
                </div>
            </form>
        </div>
    </div>
    </div> 

  )
}

export default SignUp;