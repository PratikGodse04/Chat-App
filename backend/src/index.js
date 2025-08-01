import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server} from "./controller/socket.js"
import path from "path"


// const app=express();
dotenv.config();
const PORT=process.env.PORT;

const __dirname=path.resolve();

connectDB();
app.use(express.json({limit:"10mb"}))
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api",authRoute)
app.use("/api",messageRoute)

if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

server.listen(PORT,()=>{
    console.log("Server Running on port",PORT);
    
})
