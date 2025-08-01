import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { userAuthStore } from './store/userAuthStore';
import Loader from './components/Loader';
import {Toaster} from "react-hot-toast"
import TestingPage from './pages/TestingPage';


export default function App() {
  const {authUser,checkAuth,isCheckingAuth,isUpdatingProfile}=userAuthStore();

  useEffect(()=>{
    checkAuth();
  },[isCheckingAuth,isUpdatingProfile]);

  return (
   <>
  <Router>
     <Navbar/>
   {isCheckingAuth && <Loader/>}
    <Routes>
     
     <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}/>
     <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to ="/"/>}/>
     <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to ="/"/>}/>
     <Route path="/setting" element={<SettingPage/>}/>
     <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
     <Route path="/test" element={<TestingPage/>}/>
 


    </Routes>
  </Router>
  <Toaster/>
   </>
    
  )
}
