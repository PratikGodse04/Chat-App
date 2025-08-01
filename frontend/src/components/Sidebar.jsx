import { useEffect, useState } from 'react';
import { messageStore } from '../store/messageStore';
import image from "../../public/images/userProfile.jpg";
import Loading from './Loading';
import ImageModal from './ImageModal';
import { userAuthStore } from '../store/userAuthStore';


export default function Sidebar() {
  const [showModal,setShowModal]=useState(false);
  const [url,setUrl]=useState(null);
  const [name,setName]=useState("");
  const {
    users,
    getUsers,
    isUserLoading,
    selectedUser,
    setSelectedUser,
  } = messageStore();

  const {onlineUsers}=userAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <Loading/>

  return (
    <aside
      className="h-100 d-flex flex-column border-end border-secondary"
      style={{ width: "20rem", transition: "width 0.2s ease"}}
    >
      {/* Header */}
      <div className="border-bottom border-secondary w-100 p-4">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <i className="bi bi-people fw-bold fs-5" style={{ width: "24px", height: "24px",fontWeight:"800" }}></i>
          <span className="fw-bold d-none d-lg-block">Contacts</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-100 py-3 px-2 d-flex flex-column align-items-center ">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-100 d-flex align-items-center  justify-content-center  gap-3 px-3 py-2 mb-2 rounded border-0 text-start ${
              selectedUser?._id === user._id ? "bg-light" : "bg-transparent"
            }`}
            style={{
              transition: "background 0.2s ease",
              cursor: "pointer",
            }}
          >
            <div className="position-relative">
              <img
                src={user.profilePic || image}
                alt={user.fullName}
                className="rounded-circle"
                style={{
                  objectFit: "cover",
                  width: "3rem",
                  height: "3rem",
                }}
                onClick={()=>{setShowModal(true); setUrl(user.profilePic || image); setName(user.fullName)}}
              />
            </div>

            
            <div className="d-none d-lg-block flex-grow-1 text-truncate">
              <div className=" text-truncate" style={{fontWeight:"600"}}>{user.fullName}</div>
              <div style={{ color: "#74c0fc", fontSize: "0.875rem" }}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
      {showModal &&
            
      <ImageModal imageUrl={url} onClose={()=>{setShowModal(false)}} name={name}/>}
    </aside>
  );
}
