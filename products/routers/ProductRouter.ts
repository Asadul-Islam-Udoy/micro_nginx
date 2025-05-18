import express from 'express';
import { CreateProductController, GetAllProductController, GetSingleProductController } from '../controllers/ProductController';
import uploadfile from '../middleware/multer';
const router = express.Router();

router.post('/create',uploadfile,CreateProductController);
router.get('/get/all',GetAllProductController);
router.get('/get/single/:id',GetSingleProductController);

export default router