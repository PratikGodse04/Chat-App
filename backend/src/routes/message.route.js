import express from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { getAllmsg, getAllUser, sendMessage } from "../controller/message.controller.js";

const router=express.Router();

router.get("/users",authentication,getAllUser);
router.get("/:id",authentication,getAllmsg);
router.post("/send/:id",authentication,sendMessage);

export default router;
