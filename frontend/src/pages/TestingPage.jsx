import React, { useEffect } from 'react'
import { messageStore } from '../store/messageStore'
import toast from 'react-hot-toast';

export default function TestingPage() {
    const {getMessages}=messageStore();
    // let text="Hii I am From Server"
    let id="6862346aacfd5b687a617efd"

    const click=()=>{
       
       getMessages(id)

    }
    useEffect(()=>{
          // console.log("Users",users)
          toast.success("Testing Success")
    },[])
  return (
    <div>
      hello  i am a disco dancer
      <button onClick={click}> Check Api </button>
    </div>
  )
}
