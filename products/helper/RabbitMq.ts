
import amqp from 'amqplib';
import RedisClient from './Redis';
import Product from '../models/ProductModels';
import dotenv from 'dotenv';
dotenv.config({path:'.env'})
interface CacheInvallidationMessage{
    action:string,
    keys:string[]
}

export const StartCacheConsumer =async()=>{
    console.log(process.env.Rabbitmq_Host,process.env.Rabbitmq_Username,process.env.Rabbitmq_Password)
    try{
       const connection = await amqp.connect({
         protocol:"amqp",
         hostname:process.env.Rabbitmq_Host,
         port:5672,
         username: process.env.Rabbitmq_Username,
         password: process.env.Rabbitmq_Password,
       });
       const channel = await connection.createChannel();
       const queueName = "cache-invalidation";
       await channel.assertQueue(queueName,{durable:false});
       console.log('Product service cache consume started');
       channel.consume(queueName,(msg)=>{
        if(msg){
            try{
             const content = JSON.parse(msg.content.toString()) as CacheInvallidationMessage;
             console.log('product servics recived cache invalidation message',content);
             if(content.action === 'invalidateCache'){
                content.keys.forEach(async(pattern) => {
                  const keys =  await RedisClient.keys(pattern); 
                  if(keys.length>0){
                    await RedisClient.del(keys);
                    console.log(`product service invalidation ${keys.length} cache keys matching${pattern}`);
                    const title = "";
                    const description = "";
                    const cachkey = `products:${title}:${description}`;
                    const products = await Product.findAll();
                    await RedisClient.set(cachkey,JSON.stringify(products),{EX:3600});
                    console.log("cache with key",cachkey)
                  }  
                });
             }
             channel.ack(msg);
            }
            catch(err:any){
                console.log("❌error processing cache invalidation in product serices",err)
             channel.nack(msg,false,true)
            }
        }
       })
    }
    catch(err:any){
        console.log('❌ Failed to start rabbitmq consume',err)
    }
}