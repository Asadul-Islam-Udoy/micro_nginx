"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.post('/create', multer_1.default, ProductController_1.CreateProductController);
router.get('/get/all', ProductController_1.GetAllProductController);
router.get('/get/single/:id', ProductController_1.GetSingleProductController);
exports.default = router;
