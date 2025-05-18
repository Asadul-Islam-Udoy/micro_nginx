// config/cloudinary.ts
import cloudinary from "cloudinary";

 const cloudinaryfile =():any=>{
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      });
      return cloudinary
 }

 export default cloudinaryfile;
