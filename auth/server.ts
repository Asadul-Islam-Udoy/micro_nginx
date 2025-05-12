import app from './app';
import {Request,Response} from 'express';

app.get('/',(req:Request,res:Response)=>{
   res.send('<h1>hello authentication</h1>') 
});
const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
  console.log(`authentication running http://localhost:${PORT}`);
});