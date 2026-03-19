import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from 'express';


const PORT = 3000;
const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send("Proboat Started")
});

app.use(express.json());



app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`)
})