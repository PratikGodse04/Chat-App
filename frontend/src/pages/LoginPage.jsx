import React, { useState } from 'react';
import { userAuthStore } from '../store/userAuthStore';
import { Link } from "react-router-dom";
import '../index.css';

export default function LoginPage() {

  const { login } = userAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChnages = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ShowPass = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    // Your validation logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className='min-vh-100 d-flex align-items-center bg-primary bg-gradient text-white'>
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
          
          {/* Left Side - Form */}
          <div className='col-12 col-md-6 mb-4'>
            <div className="d-flex flex-column align-items-center">
              <div className="signup-container w-100" style={{ maxWidth: "400px" }}>
                <h3 className="text-center mb-4 fw-bold">Login</h3>
                <div className='text-center fs-2'>
                  <i className="bi bi-chat-dots-fill"></i>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
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
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={ShowPass} style={{ cursor: "pointer" }}></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name='password'
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={onChnages}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid text-center">
                    <button type="submit" className="btn btn-warning mb-2">Login</button>
                    <small>
                      Don't have an account?{' '}
                      <Link to="/signup" style={{ color: "yellow" }}>Create an Account →</Link>
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className='col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0'>
            <img
              src="../../public/images/signupImage.png"
              alt="Image is not found"
              style={{ height: "100%", maxHeight: "590px", borderRadius: "5px", width: "100%", objectFit: "cover" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
