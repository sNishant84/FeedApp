import React,{ReactElement} from 'react'

interface ModalProps{
    Children:ReactElement;
    setModalOpen:(openModal:boolean)=>void;
    setClickedElement:(val:string)=>void;
}

const Modal=({Children,setModalOpen,setClickedElement}:ModalProps):JSX.Element=> {

    const handleClose=()=>{
        setModalOpen(false);
        setClickedElement('signup');
    }

  return (
    <div className='flex flex-col justify-center absolute border-solid border rounded-lg border-[#27292D] self-center '>
        <div className='absolute top-4 right-4'>
          <button onClick={handleClose} className='pt-1 pb-2 px-3 bg-[#131319] text-white rounded-full'>⨉</button>
        </div>
        <div>
          {Children}
        </div>
    </div>
  )
}

export default Modal