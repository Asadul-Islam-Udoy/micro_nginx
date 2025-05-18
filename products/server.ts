import app from './app';
import {Request,Response} from 'express';
import dotenv from 'dotenv';
import { DBConnection } from './config/DbConnection';
import RedisClient from './helper/Redis';
dotenv.config({path:'.env'});
///database call
DBConnection();
///redis called
RedisClient;


app.get('/products',(req:Request,res:Response)=>{
   res.send('<h1>Hello Products</h1>');
});
app.get('/',(req:Request,res:Response)=>{
  res.send('<h1>Hello ss Products</h1>') 
});
const PORT = process.env.PORT || 5007
app.listen(PORT,()=>{
  console.log(`product running http://localhost:${PORT}`);
});