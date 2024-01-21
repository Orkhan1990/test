import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.router.js';
import userRouter from './routes/user.router.js';
import listingRouter from './routes/listing.router.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
dotenv.config();


const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World!"})
})
app.use((error,req,res,next)=>{
    const statusCode=error.statusCode||500;
    const message=error.message||"Internal Server Error!";
    console.log(message);
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

const port=process.env.PORT||9000;

app.use("/api/v1/auth",authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/listing',listingRouter);

mongoose.connect(process.env.MONGODB).then(()=>
    console.log("Database is connected")
).catch((err)=>{console.log(err)})

app.listen(port,()=>{
    console.log(`Server is runing on port ${port}`);
})

