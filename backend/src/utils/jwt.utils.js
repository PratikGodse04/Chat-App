import jwt from "jsonwebtoken";

export const generateToken=async(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRECT,{expiresIn:"7d"});

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true, //prevent xss attack cross site scripting attacks
        // sameSite:strict ,//csrf attack
        secure:process.env.NODE_ENV !=="development"
    });

    return token;
}