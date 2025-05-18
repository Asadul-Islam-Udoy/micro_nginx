import express from 'express';
import { CreateUserController, GetAllUserController, GetSingleUserController } from '../controllers/UserController';
const router = express.Router();

router.post('/create',CreateUserController);
router.get('/get/all',GetAllUserController);
router.get('/get/single/:id',GetSingleUserController);

export default router