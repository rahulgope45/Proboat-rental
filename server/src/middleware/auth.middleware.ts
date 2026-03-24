import type { NextFunction, Request, Response } from 'express'
import {prisma} from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

interface MyJwtPayload {
   user : {
    id : number
   }
}

interface AuthRequest extends Request {
    user?: {id: number, email:string}
}

export const authMiddleware = async(

    req:AuthRequest,
    res:Response,
    next: NextFunction
) =>{

    try {
        
        const authHeaders = req.headers.authorization
        if(!authHeaders || !authHeaders.startsWith("Bearer")){
            return res.status(401).json({
                message: "No token provided"
            })
        }

        const token = authHeaders.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Failed to decode"})
        }
        if(!process.env.SECRET_KEY){
            throw new Error("JWT secret key is not defined")
        }
        const secret = process.env.SECRET_KEY;

        const decoded = jwt.verify(token, secret) as MyJwtPayload ;
        if(!decoded){{
            return res.send(401).json({message : "Failed to decode"});
        }}

        const user = await prisma.users.findUnique({
            where:{id : decoded.user.id},
            select:{id:true,email:true,password:true}
        })
        if(!user) return res.status(401).json({message:"User not found"});

        req.user = user;
        next();



    } catch (error) {
        console.log(error)
       res.status(500).json({message: "Internal server error"}) 
    }

}
