import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/errorHandler.js";



export const signIn=(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

export const signUp=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        const user=await User.find({email})
        if(!user){
            const hashPassword=await bcrypt.hash(password,10)
            const newUser=new User({
                username,
                email,
                password:hashPassword
            });
            await newUser.save();
            res.status(201).json("User created successfuly!!!")
        }
        next(errorHandler(500,"User is exist"))
        
    } catch (error) {
          next(error)
    }
}