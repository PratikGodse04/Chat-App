import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from '../lib/cloudinary.js';
import { getRecieverSocketId,io } from "./socket.js";

export const getAllUser=async(req,res)=>{
    try{
        const loggedInUser=req.payload.userId;
        
        const filterUser=await User.find({_id:{$ne:loggedInUser}}).select("-password");
        return res.status(200).json(({
            success:true,
            message:"All Are fetched",
            filterUser
        }))
    }
    catch(err){
        console.log("Error in the Get Controller",err);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export const getAllmsg=async(req,res)=>{
    try{
        const {id}=req.params;
        const myId=req.payload.userId;

        if(!id || !myId){
            return res.status(400).json({
                success:false,
                message:"Id required"
            })
        }

        const response=await Message.find({$or:[{senderId:myId,reciverId:id},{senderId:id,reciverId:myId}]});
        if(!response){
            return res.status(400).json({
                success:false,
                message:"No response"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All messages Fetched",
            msg:response
        })
    }
    catch(err){
        console.log("error found in msg controller",err);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export const sendMessage=async(req,res)=>{
    try{
         const reciverId=req.params.id;
         const senderId=req.payload.userId
         const {text,image}=req.body;
         
         let imageUrl;
         if(image){
            const uploadresponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadresponse.secure_url;
         }

         const response=await Message.create({reciverId,senderId,text,image:imageUrl});

         //here we add a real time functionality by using socket.io

         const reciverSocketId=getRecieverSocketId(reciverId);
         if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",response)
         }
         
         if(!response){
            return res.status(400).json({
                message:"Unstable connection please trey again"
            })
         }

         return res.status(201).json({
            success:true,
            message:"Message created",
            response
         })
    }
    catch(err){
        console.log("Error found in the sendMessage",err);
        return res.status(400).json({
            success:false,
            message:"Internal server error"
        })
    }
}