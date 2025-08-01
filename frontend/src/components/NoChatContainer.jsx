import React from 'react'

export default function NoChatContainer() {
  return (
    <div className='w-100 d-flex flex-grow-1 flex-column align-items-center justify-content-center p-5 bg-light bg-base-100 '>

        <div className='mx-auto text-center ' style={{maxWidth:"28rem"}}>

            <div className='d-flex justify-content-center gap-4 mb-4'>

                <div className='relative'>
                     <div className='d-flex align-items-center justify-content-center rounded' style={{width: "4rem", height: "4rem", borderRadius: "1rem", backgroundColor: "rgba(var(--bs-primary-rgb), 0.1)"}}>

                       <i className="bi bi-chat-left-dots-fill" style={{width:'2rem',height:"2rem"}}></i>

                     </div>

                </div>

            </div>

        </div>

        {/* Welcome Text */}
        <h2 className='fs-3 fw-bold'>Welcome To Chatty !</h2>
        <p className='text-dark opacity-50'>
            Select a conversation from Side bar to start a chatting
        </p>
     
    </div>
  )
}
