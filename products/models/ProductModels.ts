import { DataType, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/DbConnection";

interface ProductAttributes {
  id?: number;
  title: string;
  description: string;
  image: string;
  image_id : string;
}
export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public image!: string;
  public image_id! : string;
  
}
Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  image_id: { type: DataTypes.STRING, allowNull: false },
},
 {
    sequelize,
    modelName:"Product",
    tableName:'products',
    timestamps:true
  }
);
export default Product;
