import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path:'.env'})
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
   {
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    dialect:"postgres",
    logging:false
   }
);
export const DBConnection = async()=>{
    try{
    await sequelize.authenticate();
    console.log('database connection successfully');
    await sequelize.sync({ force: false });
    }
    catch(err:any){
        console.log(err.message)
    }
}
export default sequelize;