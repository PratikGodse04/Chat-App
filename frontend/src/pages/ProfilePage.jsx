import React, { useRef, useState } from 'react';
import '../index.css';
import { userAuthStore } from '../store/userAuthStore';
import {toast} from "react-hot-toast"

export default function ProfilePage() {
  const { authUser, updateProfilePic, isUpdatingProfile } = userAuthStore();
  const [selectImage, setSelectImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSize = file.size / (1024 * 1024);
    toast.success(fileSize.toFixed(2) + " MB");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectImage(base64Image);
      await updateProfilePic({ profilePic: base64Image });
    };
  };

  console.log("Auth user",authUser);
  // ✅ FIX: handle case where authUser is not yet loaded
  if (!authUser) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px' }}>
        <div className="card-body text-center position-relative">
          <h3>Profile</h3>

          {/* Profile Image */}
          <div className="position-relative d-inline-block">
            <img
              src={selectImage || authUser.profilePic || "../../public/images/userProfile.jpg"}
              alt="User"
              className="rounded-circle mb-3"
              style={{ width: '130px', height: '130px', objectFit: 'cover' }}
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

            <div
              className="position-absolute bg-white rounded-circle d-flex justify-content-center align-items-center"
              onClick={() => fileInputRef.current.click()}
              style={{
                bottom: '0',
                right: '0',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)'
              }}
            >
              <i className="bi bi-camera-fill text-dark"></i>
            </div>
          </div>

          <p>
            <small>{isUpdatingProfile ? "Uploading..." : "Click on camera to update profile picture"}</small>
          </p>

          <h4 className="card-title fw-bold mt-2">{authUser.fullName || "Pratik Godse"}</h4>
          <p className="card-text text-muted">{authUser.email || "johndoe@gmail.com"}</p>

          <div className="mt-4">
            <h6><b>Account Information</b></h6>
            <p className="mb-1 mt-2">
              <strong>Member Since:</strong> <span>{authUser.createdAt?.split("T")[0]}</span>
            </p>
            <p className="mb-0 mt-2">
              <strong>Status:</strong>{' '}
              <span className="badge bg-success">Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

