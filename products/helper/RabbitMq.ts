
import amqp from 'amqplib';
import RedisClient from './Redis';
import Product from '../models/ProductModels';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

interface CacheInvallidationMessage{
    action:string,
    keys:string[]
}
const RABBITMQ_HOST = process.env.Rabbitmq_Host || 'rabbitmq';
const RABBITMQ_PORT = 5672;
const RABBITMQ_USERNAME = process.env.Rabbitmq_Username;
const RABBITMQ_PASSWORD = process.env.Rabbitmq_Password;

export const StartCacheConsumer = async () => {
  let connection;
  let retries = 10;
  while (retries) {
    try {
      connection = await amqp.connect({
        protocol: 'amqp',
        hostname: RABBITMQ_HOST,
        port: RABBITMQ_PORT,
        username: RABBITMQ_USERNAME,
        password: RABBITMQ_PASSWORD,
      });
      console.log('✅ Connected to RabbitMQ');
      break;
    } catch (err) {
      retries--;
      console.log(`RabbitMQ connection failed, retries left: ${retries}. Waiting 5 seconds...`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  if (!connection) {
    throw new Error('❌ Could not connect to RabbitMQ after retries');
  }

  const channel = await connection.createChannel();
  const queueName = "cache-invalidation";
  await channel.assertQueue(queueName,{durable:false});
  console.log("start radditmq consume start");
  channel.consume(queueName,(msg)=>{
  if(msg){
      try{
       const content = JSON.parse(msg.content.toString()) as CacheInvallidationMessage;
       console.log(`product services recived invalid massages`,content);
       if(content.action == 'invalidateCache'){
        content.keys.forEach(async(pattern) => {
           const keys = await RedisClient.keys(pattern);
           if(keys.length>0){
             await RedisClient.del(keys);
             console.log(`product services recived${keys.length} matching${pattern}`);
             const title = '';
             const description = '';
             const cacheKey = `products:${title}:${description}`;
             const products = await Product.findAll();
             await RedisClient.set(cacheKey,JSON.stringify(products),{EX:3600});
             console.log('cache redis system')
           } 
        });
       }
       channel.ack(msg)
    }
    catch(err:any){
     console.log('invalid cache error');
     channel.nack(msg,false,true)
    }
  }
  })
  // return channel;
};
