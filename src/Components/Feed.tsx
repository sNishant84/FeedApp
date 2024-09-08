import React,{FC, useContext, useEffect, useState} from 'react'
import { feedData } from '../Data/data'
import { POST_HEADING } from './constant'
import FeedCard from './FeedCard';
import {Login} from "./Login"
import Modal from './Modal'
import Post from './Post'
import SignUp from './SignUp'

const Feed:FC=():JSX.Element=> {
    
const [openModal,setModalOpen]=useState<boolean>(false);
const [clickedElement,setClickedElement]=useState<string>('signup');
console.log("clicked",clickedElement)

  return (
   <div className='bg-[#191920] h-screen font-sans overflow-scroll relative'> 
    <div className='flex justify-center my-5'>
      <div className='max-w-[714px] p-[14px]'>
        <div>
            <h1 className='text-[28px] text-white'>Hello Jane</h1>
            <p className='text-base text-[#7F8084] font-normal mt-1 max-w-[80%]'>{POST_HEADING}</p>
        </div>
        <Post setModalOpen={setModalOpen} />
        <FeedCard feedData={feedData} setModalOpen={setModalOpen}  />
      </div>
    </div>
    {openModal && <div className='flex justify-center fixed top-0 right-0 bottom-0 left-0 w-[100%] h-[100%] z-1 backdrop-blur-[3px] transition-opacity duration-300'>
     <Modal setModalOpen={setModalOpen} setClickedElement={setClickedElement} Children={clickedElement ==='signup' ? <SignUp setClickedElement={setClickedElement} setModalOpen={setModalOpen} /> : <Login setClickedElement={setClickedElement} setModalOpen={setModalOpen} />} />
    </div>}
    </div>
  )
}

export default Feed