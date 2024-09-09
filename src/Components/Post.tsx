import React, { FC, useContext } from 'react'
import { useAuth } from '../context/AuthProvider';

interface PostProps{
    setModalOpen:(val:boolean)=>void
}

const Post=({setModalOpen}:PostProps):JSX.Element=>{

    const {isLogin}=useAuth();

    const handleClick=()=>{
        if(!isLogin){
            setModalOpen(true)
        }
        return
    }

  return (
    <>
    <div className='flex flex-col gap-3 mt-8 cursor-pointer' onClick={handleClick}>
            <div className='px-4 py-4 border-solid border-2 border-[#35373B] rounded-lg bg-[#35373B] flex flex-col gap-3 '>
                <h1 className='text-[#C5C7CA] text-lg'>Create Post</h1>
                <div className='border-solid border border-[#191920] rounded-lg flex gap-2 bg-[#191920] p-3 items-center'>
                    <div className='border-solid border w-8 h-8 md:w-12 md:h-12 border-[#27292D] bg-[#35373B] rounded-full text-center place-content-center'>💬</div>
                    <textarea className='text-base text-[#7F8084] w-[100%] border-none bg-[#191920] resize-none place-content-center outline-none p-2 cursor-pointer' placeholder={'How are you feeling today?'} />
                </div>
                <div className='flex justify-end'>
                    <button className='bg-[#4A96FF] text-base rounded-[4px] w-28 h-11 text-white'>Post</button>
                </div>
            </div>
        </div>
        </>
  )
}

export default Post
