import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.utils.js";
import cloudinary from '../lib/cloudinary.js';

export const signup=async(req,res)=>{
    try{
          const {email,fullName,password}=req.body;
          if(password.length < 6){
            return res.status(400).json({
                message:"Password must be 6 characters"
            })
          }
          if(!email || !fullName){
            return res.status(400).json({
                message:"Check email and password"
            })
          };

          const user=await User.findOne({email});
          if(user){
            return res.status(400).json({
                message:"Please Login User Already exist"
            })
          }

          const hashpass=await bcrypt.hash(password,10);

          const response=await User.create({email,fullName,password:hashpass});

          if(!response){
            return res.status(400).json({
                success:false,
                message:"Please Try Again 😵‍💫 !"
            })
          }
         
          generateToken(response._id,res);
          return res.status(201).json({
            user_id:response._id,
            fullName:response.fullName,
            profilePic:response.profilePic

          })
        
    }
    catch(err){
      console.log("Error Occured",err)
        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}

export const login=async(req,res)=>{
  try{
         const {email,password}=req.body;
         if(!email || !password){
          return res.status(400).json({
            success:false,
            message:"Please Fill All !"
          })
         }

         const response=await User.findOne({email});

         if(!response){
          return res.status(400).json({
            success:false,
            message:"Invalid Credentials"
          })
         }

         if( await bcrypt.compare(password,response.password)){
          generateToken(response._id,res)
         return res.status(200).json({
          message:"Login SucessFull !",
            user_id:response._id,
            fullName:response.fullName,
            profilePic:response.profilePic
         })
         }
        
          return res.status(400).json({
            sucess:false,
            message:"Invalid credentials"
          })
         
  }
  catch(err){
    console.log("Error Occurred in the login controller",err)
    return res.status(500).json({
      message:"Internal server Error "
    })
  }
}

export const logout=async(req,res)=>{

  try{
     res.cookie("jwt","",{maxAge:1});
     return res.status(200).json({
      message:"Logout Sucessfully"
     })
  }
  catch(err){
    console.log("Error in the controller",err);
    return res.status(500).json({
      success:false,
      message:"Internal SErver Error"
    })
  }
}


export const updateProfile=async(req,res)=>{

  try{
      const user_id=req.payload.userId;
      const {profilePic}=req.body;
      
      if(!profilePic){
        return res.status(400).json({
          success:false,
          message:"Profile pic is required"
        })
      }
     
      const updateResponse = await cloudinary.uploader.upload(profilePic);
      console.log("response update",updateResponse)
      if(!updateResponse){
        return res.status(400).json({
          message:"Profile Pic not Send"
        })
      }
      const response=await User.findByIdAndUpdate(user_id,{profilePic:updateResponse.secure_url},{new:true});

      if(!response){
       return res.status(400).json({
        message:"Error to update profil pic"
      });
    }

    return res.status(200).json({
      success:true,
      updateUser:response
    })
  }
  catch(err){
    console.log("error in updateProfile",err);
   return res.status(500).json({
    message:"Internal Server Error"
   })
  }

}

export const Check=async(req,res)=>{
  try {
    const userID=req.payload.userId;

    const response=await User.findById(userID);

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error Found in Check Controller");
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}