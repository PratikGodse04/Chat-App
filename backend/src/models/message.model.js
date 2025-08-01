import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    text:{
        type:String,

    },
    image:{
        type:String
    }
},
{timestamps:true});

const Message= mongoose.model("message",MessageSchema)

export default Message;