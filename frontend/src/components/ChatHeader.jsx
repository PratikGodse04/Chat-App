import React from 'react'
import { messageStore } from '../store/messageStore'
import image from "../../public/images/userProfile.jpg"
import { userAuthStore } from '../store/userAuthStore';

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = messageStore();
  const {onlineUsers}=userAuthStore();

  return (
    <div className=' border-bottom border-secondary d-flex align-items-center justify-content-between' style={{padding:"0.9rem"}}>

      {/* Left Section: Avatar + Name */}
      <div className='d-flex align-items-center gap-3'>

        {/* Avatar */}
        <div className='rounded-circle overflow-hidden' style={{ width: "40px", height: "40px" }}>
          <img
            src={selectedUser.profilePic || image}
            alt="User"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* User Info */}
        <div>
          <h6 className='mb-0 fw-medium ' >{selectedUser.fullName}</h6>
          <small className='text-primary'>{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</small>
        </div>

      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className='btn btn-link p-0 text-dark'
        style={{ fontSize: '1.2rem' }}
      >
        <i className="bi bi-x"></i>
      </button>

    </div>
  );
}
