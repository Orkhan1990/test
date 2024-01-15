import User from "../models/user.model.js";
import bcrypt from "bcrypt";



export const updateProfile=async(req,res,next)=>{

    if(req.user.id!==req.params.id){
        return res.status(401).json({success:false,message:"You can only update you account!"})
    }
    const{username,email,password,imageUrl}=req.body;
    try {
           if(password){
            password=await bcrypt.hash(password,10);
           }

          const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username,
                email,
                password,
                imageUrl
            }
           },{new:true});

           const{password:pass,...rest}=updatedUser._doc;
           res.status(201).json(rest)
        
    } catch (error) {
         next(error)
    }
    
}