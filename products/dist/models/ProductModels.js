"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const DbConnection_1 = __importDefault(require("../config/DbConnection"));
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    image: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    image_id: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: DbConnection_1.default,
    modelName: "Product",
    tableName: 'products',
    timestamps: true
});
exports.default = Product;
