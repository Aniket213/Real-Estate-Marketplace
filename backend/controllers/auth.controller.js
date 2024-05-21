import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";

export const signin = async (req, res, next)=>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newuser = new User({username, email, password: hashedpassword});
    try{
        await newuser.save();
        res.status(201).json('User Created Successfully');
    } catch(err){
        next(error);       // if there is duplicate entry then it will give error
    }
    
};