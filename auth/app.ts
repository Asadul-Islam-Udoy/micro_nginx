import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import UserRouter from './routers/UserRouter';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config({path:'.env'});


app.use('/users',UserRouter);
export default app; 