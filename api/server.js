import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World!"})
})
const port=process.env.PORT||9000;

mongoose.connect(process.env.MONGODB,{
    
})

app.listen(port,()=>{
    console.log(`Server is runing on port ${port}`);
})

