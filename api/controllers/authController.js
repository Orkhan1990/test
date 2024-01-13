import User from "../models/user.model.js";
import {errorHandler} from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signIn=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
         const user=await User.findOne({email});
         if(!user){
          return  res.status(404).json({message:"Email not correct!",success:false})
         }

         const comparePassword=await bcrypt.compare(password,user.password);
         if(!comparePassword){
            return res.status(404).json({message:"Password not match!",success:false})
         }
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
         res.cookie("access_token",token,{httpOnly:true})
         const{password:pass,...rest}=user._doc
         res.status(201).json({rest,token})

        
    } catch (error) {
         res.status(500).json({message:error.message,success:false});
    }
}

export const signUp=async(req,res,next)=>{
    try {
        console.log(req.body);
        const {username,email,password}=req.body;
        const user=await User.findOne({email});
        console.log(user);
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
          res.status(500).json({message:"User is exist",success:false});
        
    } catch (error) {
          next(error)
    }
}