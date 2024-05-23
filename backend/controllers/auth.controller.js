import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signin = async (req, res, next)=>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newuser = new User({username, email, password: hashedpassword});
    try{
        await newuser.save();
        res.status(201).json('User Created Successfully');
    } catch(err){
        next(err);       // if there is duplicate entry then it will give error
    }
    
};

export const login = async (req, res, next)=>{
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorhandler(404, 'User Not Found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorhandler(404, 'Wrong Credentials'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest); 
    } catch(err){
        next(err);
    }
};

export const google = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const genereatepassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedpassword = bcryptjs.hashSync(genereatepassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), 
                                email: req.body.email, 
                                password: hashedpassword,
                                avatar: req.body.photo});
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch(error) {
        next(error);
    }
};