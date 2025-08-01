import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'
import { messageStore } from '../store/messageStore';
import toast from 'react-hot-toast';

export default function MessageInput({handleCount}) {

  const [text,setText]=useState("");
  const [imagePreview,setImagePreview]=useState(null);
  const fileInputRef=useRef(null)
  const {sendMessages,isMessageSending}=messageStore();


  const handleChange=(e)=>{
    const file=e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }

    const reader=new FileReader();

    reader.onloadend=()=>{
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file);
  };
 const removeImage=()=>{
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value="";
  };
  const handleSendMessage=async(e)=>{
      e.preventDefault();
      if(!text.trim && !imagePreview) return;

      try {
        await sendMessages({
          text:text.trim(),
          image:imagePreview,
        });

        setText("");
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value="";
        handleCount();
      } catch (error) {
        console.log("Failed to send Message");
      }

  }

  
  return (
    <div className='p-4 w-100'>
      {imagePreview && (

        <div className='mb-3 d-flex align-items-center gap-2'>

          <div className='position-relative'>

            <img src={imagePreview} alt="Preview" className='border rounded' style={{width: "80px", height: "80px", borderColor: "#3f3f46", overflow: "hidden",objectFit: 'cover'}}/>

             <button
             className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                style={{
                top: '6px',
                right: '6px',
                width: '20px',
               height: '20px',
               backgroundColor: '#e5e7eb', // Replace with actual value for bg-base-300
      }}
    >
      <i class="bi bi-x" style={{fontSize:"1rem"}} onClick={removeImage}></i>
      </button>

          </div>

        </div>
        
        )}

        <form onSubmit={handleSendMessage} className='d-flex align-items-center gap-2 w-100'>
          <div className='flex-1 d-flex gap-2 w-100'>

            <input type="text" className='w-100 input input-bordered  ps-2' placeholder='Type a message... ' value={text} onChange={(e)=>setText(e.target.value)} />

           <input type="file" accept='image/*' className='d-none' ref={fileInputRef} onChange={handleChange}/>

           <button
           type='button' className={`hidden sm-flex btn btn-circle ${imagePreview ? "text-success":"text-secondary"}`}
           onClick={()=>fileInputRef.current?.click()}
           >
           <i class="bi bi-image"></i>
           </button>

          </div>

          <button className='btn btn-sm btn-circle' disabled={!text.trim() && !imagePreview}>
{
  isMessageSending? <div className="spinner-border text-primary fs-3" role="status">
  <span className="sr-only"></span>
</div> :<i className="bi bi-send"></i>
}
          </button>
        </form>
    </div>
  )
}
