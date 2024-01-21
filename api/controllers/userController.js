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


export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
        return res.status(401).json({success:false,message:"You can delete only your account!"})
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        return res.status(200).json({message:"User delete successfuly"});
        
    } catch (error) {
        next(error)
    }
}

export const getUserListings=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
        return res.status(401).json({status:false,message:"You can only view your own listing!"})
    }
    try {
         const userListings= await Listing.find({userRef:req.params.id});
         res.status(200).json(userListings);
        
    } catch (error) {
        next(error)
    }
}