import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to Mongodb");
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.listen(8000, ()=>{
    console.log("Server is Running on port 8000!");
});

app.use('/backend/user', userRouter);
