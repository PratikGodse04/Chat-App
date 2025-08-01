import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE="development" ? "http://localhost:5001/api":"/api";

export const userAuthStore = create(persist(
  (set, get) => ({
    authUser: null,
    isSignup: false,
    isLoginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    onlineUsers:[],

    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/check");
        set({ authUser: res.data });
        get().connectSocket();
        console.log("Online Users ",get().onlineUsers);
      } catch (error) {
        console.log("error from checkAuth", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signup: async (data) => {
      try {
        const res = await axiosInstance.post("/signup", data);
        set({ authUser: res.data });
        toast.success("User Signup Successfully");
        get().connectSocket();
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
      }
    },

    logout: async () => {
      try {
        await axiosInstance.post("/logout");
        set({ authUser: null });
        toast.success("User Logout");
        get().disConnectSocket();
      } catch (error) {
        toast.error(error.message || "Logout failed");
      }
    },

    login: async (data) => {
      try {
        const response = await axiosInstance.post("/login", data);
        set({ authUser: response.data });
        get().checkAuth();
        toast.success("Login Successful");
       try{
         get().connectSocket();
       }
       catch(err){
        toast.error("Socket Connection Failed");
       }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    },

    updateProfilePic: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        console.log(data);
        const response = await axiosInstance.put("/update-profile", data);
        console.log(response.data);
        set({ authUser: response.data });
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error.message || "Update failed");
      } finally {
        set({ isUpdatingProfile: false });
      }
    },

    connectSocket: () => {
      const { authUser, socket } = get();
      if (!authUser || socket?.connected) return;

      const newSocket = io(BASE_URL, {
        withCredentials: true,
        query:{
          userId:authUser._id,
        }
      });

      newSocket.on("connect", () => {
        console.log("📡 Socket connected:", newSocket.id);
      });

      set({ socket: newSocket });

      newSocket.on("getOnlineUsers",(userIds)=>{
         set({onlineUsers:userIds});
         console.log(userIds);
      })

    },

    disConnectSocket: () => {
      const { socket } = get();
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
        set({ socket: null });
      }
    }

  }),
  {
    name: "auth-storage",
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => key !== "socket")
      ),
  }
));
