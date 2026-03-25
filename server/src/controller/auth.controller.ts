import {prisma} from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { genrateToken } from '../lib/utils.js';
import type { Request, Response } from 'express';

interface User {
    username : string;
    email: string;
    password: string;
    profilepic:string;
}

//Signup contoller
export const signup = async (req:Request,res:Response):Promise<void> => {

    try {
        const {username,email,password,profilepic} = req.body as User
        if(!username || !email || !password){
            res.status(401).json({message:"Please Enter All The Credentials"})
        }

        if(password.length < 6){
            res.status(401).json({message:"Please Enter A Password with more than 6 digit"})
        }

        //checking user exists or not

        const user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(user){
            res.status(401).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newuser = await prisma.users.create({
            data: {
                username,
                email,
                password:hashedpassword,
                profilepic
            }
        })

        if(newuser){
            res.status(201).json({
                message: "User created successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(501).json({
                message: "Internal Server Error"
            })
    }

}


//Login controller

//Logout controller

//checkme

