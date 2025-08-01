import React, { useState } from 'react';
import { userAuthStore } from '../store/userAuthStore';
import { Link } from 'react-router-dom';
import '../index.css';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const { signup } = userAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const onChnages = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ShowPass = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if(formData.fullName.trim().length==0) return toast.error("Full Name is required");
    if(formData.email.trim().length==0) return toast.error("Email Is required");
    if(formData.password.length==0) return toast.error("Password is Required");
    if(formData.password.length<=6) return toast.error("Password must be  characters")

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const SuccessStatus=validateForm();

    if(SuccessStatus===true){
       signup(formData)
    }
  };

  return (
    <div className="min-vh-100 bg-primary bg-gradient text-white d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          
          {/* Left (Form) */}
          <div className="col-12 col-md-6 mb-4">
            <h3 className="text-center mb-4 fw-bold">Signup</h3>
            <div className="text-center fs-2">
              <i className="bi bi-chat-dots-fill"></i>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Enter your full name"
                    onChange={onChnages}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={onChnages}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={ShowPass} style={{ cursor: 'pointer' }}></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={onChnages}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="d-grid text-center">
                <button type="submit" className="btn btn-warning">Signup</button>
                <small className="mt-2 d-block">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'yellow' }}>Go to Login →</Link>
                </small>
              </div>
            </form>
          </div>

          {/* Right (Image) */}
          <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
            <img
              src="../../public/images/signupImage.png"
              alt="Image not found"
              style={{ height: '100%', maxHeight: '590px', borderRadius: '5px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
