import jwt from "jsonwebtoken";

import dotenv from 'dotenv'
dotenv.config()
export const authenticateToken =(req , res , next)=>{
      const authHeader =   req.headers['authorization'];
      const token = authHeader;
      if(token == null){
        return res.status(401).json({msg:"token is missing"})
      }
      jwt.verify(token ,process.env.ACCESS_SECREAT_KEY  , (error,user)=>{
        if(error) return res.status(403).json({msg:"Invalid Toekn"})

        req.user = user;
   
        next();
      } )
}