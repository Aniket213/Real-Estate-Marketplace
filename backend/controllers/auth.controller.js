import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signin = async (req, res)=>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newuser = new User({username, email, password: hashedpassword});
    try{
        await newuser.save();
        res.status(201).json('User Created Successfully');
    } catch(err){
        res.status(500).json(err.message);        // if there is duplicate entry then it will give error
    }
    
};