import TryCatch from "../error_hadler/TryCatch";
import {Request,Response} from 'express';

export const CreateUserController = TryCatch(async(req:Request,res:Response)=>{
    const {username,email,password} = req.body;
    console.log(req.body)
});


export const GetAllUserController = TryCatch(async(req:Request,res:Response)=>{
    console.log('all user')
});


export const GetSingleUserController = TryCatch(async(req:Request,res:Response)=>{
    console.log('single user')
});