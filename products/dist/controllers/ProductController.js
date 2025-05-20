"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSingleProductController = exports.GetAllProductController = exports.CreateProductController = void 0;
const TryCatch_1 = __importDefault(require("../error_hadler/TryCatch"));
const DataUrls_1 = __importDefault(require("../utils/DataUrls"));
const Cloudinary_1 = __importDefault(require("../utils/Cloudinary"));
const ProductModels_1 = __importDefault(require("../models/ProductModels"));
const sequelize_1 = require("sequelize");
const Redis_1 = __importDefault(require("../helper/Redis"));
exports.CreateProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "No file to upload",
        });
        return;
    }
    const fileBuffer = (0, DataUrls_1.default)(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({
            message: "Failed to generate buffer",
        });
        return;
    }
    const cloud = yield (0, Cloudinary_1.default)().v2.uploader.upload(fileBuffer.content, {
        folder: "blogs",
    });
    const product = yield ProductModels_1.default.create({
        title,
        description,
        image: cloud.secure_url,
        image_id: cloud.public_id
    });
    res.status(201).json({
        message: "product create successfully",
        product,
    });
}));
exports.GetAllProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title = "", description = "" } = req.query;
    const cachekey = `products:${title}:${description}`;
    const cached = yield Redis_1.default.get(cachekey);
    if (cached) {
        console.log('serving from redis cache');
        res.json(JSON.parse(cached));
        return;
    }
    const searchCondition = [];
    if (title) {
        searchCondition.push({ title: { [sequelize_1.Op.iLike]: `%${title}%` } });
    }
    if (description) {
        searchCondition.push({ description: { [sequelize_1.Op.iLike]: `%${description}%` } });
    }
    const whereClase = (searchCondition === null || searchCondition === void 0 ? void 0 : searchCondition.length) > 0 ? { [sequelize_1.Op.or]: searchCondition } : {};
    const products = yield ProductModels_1.default.findAll({ where: whereClase });
    yield Redis_1.default.set(cachekey, JSON.stringify(products), { EX: 3600 });
    res.status(200).json({
        success: true,
        message: "get all products",
        products,
    });
}));
exports.GetSingleProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cachkey = `product:${id}`;
    const cached = yield Redis_1.default.get(cachkey);
    if (cached) {
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
    const product = yield ProductModels_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            message: "no product ",
        });
        return;
    }
    yield Redis_1.default.set(cachkey, JSON.stringify(product), { EX: 3600 });
    res.status(200).json({
        success: true,
        message: "get all products",
        product,
    });
}));
