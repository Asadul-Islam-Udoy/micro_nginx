import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRouter from './routers/ProductRouter';
import path from "path";
const app = express();
/// can access json data;
app.use(express.json());
///other browser access
app.use(cors());
//access .env file
dotenv.config({path:'.env'});
//file access
app.use(express.urlencoded({extended:true}));
//file middleware
app.use('/images',express.static(path.join(__dirname,'./public/images')));
app.use('/',ProductRouter);
export default app; 