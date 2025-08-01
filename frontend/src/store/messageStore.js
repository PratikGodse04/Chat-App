import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";
import { userAuthStore } from "./userAuthStore";

export const messageStore=create((set,get)=>({
    message:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    isMessageSending:false,

getUsers:async()=>{
        set({isUserLoading:true})
        try {
            const response=await axiosInstance.get("/users");
            set({users:response.data.filterUser})
            // toast.success("Response taken ")
            // console.log(users);
        } catch (error) {
            console.log("Error In fetching Request Users",error)
        }
        finally{
            set({isUserLoading:false})
        }
},

getMessages:async(userId)=>{
    set({isMessagesLoading:true})
  try {
    const response=await axiosInstance.get(`/${userId}`);
    set({message:response.data.msg})
    // console.log("response come from getMessage",response.data);
  } catch (error) {
    console.log("Errors in get Message Store",error)
  }
  finally{
    console.log("Finally Block Executed");
    set({isMessagesLoading:false})
  }
},

sendMessages:async(messageData)=>{
try {
  set({isMessageSending:true})
  const {selectedUser,message}=get();
    const response=await axiosInstance.post(`/send/${selectedUser._id}`,{text:messageData.text,image:messageData.image});
    console.log(response.data);

    set({message:[...message,response.data]})

    set({isMessageSending:false});
  } catch (error) {
    console.log("Error Found in the sendMessages Function",error)
  }
},

subscribeToMessage:()=>{
  const {selectedUser}=get();
  if(!selectedUser) return;

  const socket=userAuthStore.getState().socket;
  socket.on("newMessage",(newMessage)=>{
    set({message:[...get().message,newMessage]})
  })

},

unSubscribeMessages:()=>{
const socket=userAuthStore.getState().socket;
socket.off("newMessage");
},

setSelectedUser:(selectedUser)=>set({selectedUser})
}))




