
import User from "../model/user.js";
import tokenSchema from "../model/token.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const ACCESS_SECREAT_KEY = process.env.ACCESS_SECREAT_KEY
const REFRESH_SECREAT_KEY = process.env.REFRESH_SECREAT_KEY

export const signupUser = async(req,res) =>{  // Taking user details
        try{
                const salt = await bcrypt.genSalt(5);
                const hashPassword = await bcrypt.hash(req.body.password,salt);
                let user = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashPassword,
                      });
                // const newUser = await new User(user);
                console.log(user)
                return res.status(200).json({msg:"Signup Successfull..."})
        }
        catch(e){
                console.error("Error in signupUser:", e);
                return res.status(500).json({ msg: "Error while signup" });
        }
}

export const loginUser = async(req,res) =>{  // Taking user details
        try{
            
                let user  = await User.findOne({email:req.body.email});
                if(!user)  return res.status(500).json({ msg: "Invalid Credentials" });
                let match  =await bcrypt.compare(req.body.password , user.password);

                // generating payload 
                if(match){
                        let accessToken = jwt.sign( user.toJSON(), ACCESS_SECREAT_KEY , {expiresIn: '15m'});   // keep user login info only 15 mins later new accesstoken is generated using refreshtoken 
                        let refreshToken = jwt.sign( user.toJSON(), REFRESH_SECREAT_KEY );
                        let token_ = await tokenSchema.create({
                                token: refreshToken,
                              });
                        // if refreshTOken exist in DB then i wll generate accesstoken again else not
                        return res.status(200).json({accessToken :accessToken , refreshToken:refreshToken , name:user.name, email:user.email});

                }
                else return res.status(500).json({ msg: "Password Incorrect" });
        }
        catch(e){

                return res.status(500).json({ msg: "Error while login in user.. Please try again" });
        }
}
