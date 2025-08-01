import jwt from "jsonwebtoken"
// import User from "../models/user.model"

export const authentication=async(req,res,next)=>{
try{
   const token =req.cookies.jwt;
   if(!token){
    return res.status(400).json({
        success:false,
        message:"Please Login First"
    })
   }

   const payload=jwt.verify(token,process.env.JWT_SECRECT);

   if(!payload){
    return res.status(400).json({
        sucess:false,
        message:"This is Protected route"
    })
   }

   req.payload=payload;
   next();
}
catch(err){
    console.log("Error Occured in Token",err)
    return res.status(500).json({
        success:false,
        message:"Internal server Error"
    })
}
}