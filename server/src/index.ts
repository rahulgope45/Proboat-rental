import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from 'express';
import {prisma} from './lib/prisma.js'
import authroutes from '../src/routes/auth.route.js'
import cookieParser from 'cookie-parser'

const PORT = 3000;
const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send("Proboat Started")
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authroutes)


app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`)
})