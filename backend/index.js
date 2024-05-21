// mongodb+srv://aniket:aniket@mern-estate.t9fendj.mongodb.net/
//  for connecting mongodb with vs code
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to Mongodb");
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(cors());
app.use(express.json());
app.listen(8000, ()=>{
    console.log("Server is Running on port 8000!");
});

app.use('/backend/user', userRouter);
app.use('/backend/auth', authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});