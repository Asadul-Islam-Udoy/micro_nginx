"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ProductRouter_1 = __importDefault(require("./routers/ProductRouter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
/// can access json data;
app.use(express_1.default.json());
///other browser access
app.use((0, cors_1.default)());
//access .env file
dotenv_1.default.config({ path: '.env' });
//file access
app.use(express_1.default.urlencoded({ extended: true }));
//file middleware
app.use('/images', express_1.default.static(path_1.default.join(__dirname, './public/images')));
app.use('/', ProductRouter_1.default);
exports.default = app;
