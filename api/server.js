import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.router.js'
dotenv.config();


const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World!"})
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal Server Error!";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

const port=process.env.PORT||9000;

app.use("/api/v1/auth",authRouter)

mongoose.connect(process.env.MONGODB).then(()=>
    console.log("Database is connected")
).catch((err)=>{console.log(err)})

app.listen(port,()=>{
    console.log(`Server is runing on port ${port}`);
})

