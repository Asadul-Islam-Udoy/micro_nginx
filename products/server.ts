import app from './app';
import {Request,Response} from 'express';

app.get('/products',(req:Request,res:Response)=>{
   res.send('<h1>Hello Products</h1>') 
});
app.get('/',(req:Request,res:Response)=>{
  res.send('<h1>Hello ss Products</h1>') 
});
const PORT = process.env.PORT || 5003
app.listen(PORT,()=>{
  console.log(`authentication running http://localhost:${PORT}`);
});