import TryCatch from "../error_hadler/TryCatch";
import { Request, Response } from "express";
import getBuffer from "../utils/DataUrls";
import cloudinaryfile from "../utils/Cloudinary";
import Product from "../models/ProductModels";
import { Op } from "sequelize";
import RedisClient from "../helper/Redis";

export const CreateProductController = TryCatch(
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400).json({
        message: "No file to upload",
      });
      return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
      res.status(400).json({
        message: "Failed to generate buffer",
      });
      return;
    }
    const cloud = await cloudinaryfile().v2.uploader.upload(
      fileBuffer.content,
      {
        folder: "blogs",
      }
    );
    const product = await Product.create({
      title,
      description,
      image: cloud.secure_url,
      image_id:cloud.public_id
    });
    res.status(201).json({
      message: "product create successfully",
      product,
    });
  }
);

export const GetAllProductController = TryCatch(
  async (req: Request, res: Response):Promise<any> => {
    const {title="",description=""} = req.query;
    const cachekey = `products:${title}:${description}`;
    const cached = await RedisClient.get(cachekey);
    if(cached){
      console.log('serving from redis cache');
      res.json(JSON.parse(cached));
      return;
    }
    const searchCondition:any[] = [];
    if(title){
      searchCondition.push({title:{[Op.iLike]:`%${title}%`}})
    }
    if(description){
      searchCondition.push({description:{[Op.iLike]:`%${description}%`}})
    }
    const whereClase = searchCondition?.length>0?{[Op.or]:searchCondition}:{};
    const products = await Product.findAll({where:whereClase});
    await RedisClient.set(cachekey,JSON.stringify(products),{EX:3600});
    res.status(200).json({
      success: true,
      message: "get all products",
      products,
    });
  }
);

export const GetSingleProductController = TryCatch(
  async (req: Request, res: Response):Promise<any> => {
    const { id } = req.params;
    const cachkey = `product:${id}`;
    const cached = await RedisClient.get(cachkey);
    if(cached){
      console.log('single cache redis successfully!');
      res.json(JSON.parse(cached));
      return;
    }
// const { data } = await axios.get(
//     `${process.env.USER_SERVICE}/api/v1/user/${blog[0].author}` USER_SERVICE = YOUR MICROSERVICE USER URL
//   );
//   const responseData = { blog: blog[0], author: data };
//   await redisClient.set(cacheKey, JSON.stringify(responseData), { EX: 3600 });
//   res.json(responseData);
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({
      message: "no product ",
    });
    return;
  }
    await RedisClient.set(cachkey,JSON.stringify(product),{EX:3600});
    res.status(200).json({
      success: true,
      message: "get all products",
      product,
    });
  }
);
