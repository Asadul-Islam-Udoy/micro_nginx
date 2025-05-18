import {createClient} from 'redis';

const RedisClient = createClient({
    url:process.env.REDIS_URL
});
RedisClient.connect().then(()=>{
    console.log('redis connection is successfully!')
}).catch(console.error);


export default RedisClient;