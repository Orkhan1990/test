import jwt from "jsonwebtoken";


export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log(token,"salam");
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorize!"})
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
          if(err){
            return res.status(403).json({success:false,message:"Forbidden!"})
          }
          req.user=user;
          next();
    })
}