import express from "express";
import {Check, login, logout, signup, updateProfile} from "../controller/auth.controller.js"
import { authentication } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login)
router.post("/logout",authentication,logout);
router.put("/update-profile",authentication,updateProfile);
router.get("/check",authentication,Check);

export default router;