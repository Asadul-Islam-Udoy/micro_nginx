"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const DbConnection_1 = require("./config/DbConnection");
const Redis_1 = __importDefault(require("./helper/Redis"));
dotenv_1.default.config({ path: '.env' });
///database call
(0, DbConnection_1.DBConnection)();
///redis called
Redis_1.default;
app_1.default.get('/products', (req, res) => {
    res.send('<h1>Hello Products</h1>');
});
app_1.default.get('/', (req, res) => {
    res.send('<h1>Hello ss Products</h1>');
});
const PORT = process.env.PORT || 5007;
app_1.default.listen(PORT, () => {
    console.log(`product running http://localhost:${PORT}`);
});
