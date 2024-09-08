import React from 'react'
import { useAuth } from '../context/AuthProvider';
import {  FeedDataItems } from './types'

interface FeedCardProps{
    feedData:FeedDataItems[];
    setModalOpen:(val:boolean)=>void;
}


const FeedCard=({feedData,setModalOpen}:FeedCardProps):JSX.Element=> {
  
    const {isLogin}=useAuth()

    const handleClick=()=>{
        if(!isLogin){
            setModalOpen(true)
        }
        return
    }

  return (
    <div onClick={handleClick}>
     {feedData && feedData.length > 0 && feedData.map((feedValue:FeedDataItems)=>{
        return(
            <div className='flex flex-col gap-3 mt-3 cursor-pointer'>
            <div className='px-4 py-4 border-solid border-2 border-[#35373B] rounded-lg bg-[#35373B] flex flex-col gap-3 '>
                <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    <div>
                    <img src={feedValue.imgUrl} />
                    </div>
                    <div>
                        <p className='text-base text-[#C5C7CA]'>{feedValue.name}</p>
                        <p className='text-sm text-[#7F8084] font-medium'>{`${feedValue.timeStamp} mins ago`}{feedValue.isEdited && <span> • {`Edited`}</span>}</p>
                    </div>
                </div>
                <div>
                        <img src='/assets/DotsHorizontal.svg' alt='avatar' />
                    </div>
                    </div>
                <div className='border-solid border border-[#191920] rounded-lg bg-[#191920] flex gap-4 p-3 items-center'>
                    <div className='border-solid border w-12 h-12 border-[#27292D] bg-[#35373B] rounded-full text-center place-content-center min-w-[10%] sm:min-w-[0]'>{feedValue.emoji}</div>
                    <p className='text-base text-[#7F8084] max-w-[90%]'>{feedValue.postText}</p>
                </div>
                <div className='flex items-center gap-2'>
                <div>
                <img src='/FeedApp/assets/ChatBubble.svg' />
                </div>
                <p className='font-medium text-[#7F8084]'>{`${feedValue.commentsCount} comments`}</p>
                </div>
            </div>
        </div>
        )
     })}
    </div>
  )
}

export default FeedCard