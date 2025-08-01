import React from 'react';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../store/userAuthStore';

export default function Navbar() {

  const {logout,authUser}=userAuthStore();

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#6f42c1", paddingLeft: "20px", paddingRight: "20px" }}>
      <div className="container-fluid">

        {/* Left Side */}
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-chat-heart-fill" style={{color:"white", fontSize: "20px" }}></i>
          <Link className="navbar-brand text-white fw-bold" to="/">Chatty</Link>
         
        </div>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div className="d-flex gap-2">
             <button className="btn btn-sm text-white" style={{ fontSize: "14px" }}>
            <i className="bi bi-gear-fill me-1"></i>Settings
          </button>
            {authUser && 
            <><Link to="/profile" className="btn btn-sm text-white">
              <i className="bi bi-person-circle me-1"></i>Profile
            </Link>
            <button className="btn text-white btn-sm" onClick={()=>{logout()}}>
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
            </>}
          </div>
        </div>
      </div>
    </nav>
  );
}
