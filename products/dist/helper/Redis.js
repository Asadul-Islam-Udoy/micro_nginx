"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const RedisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
RedisClient.connect().then(() => {
    console.log('redis connection is successfully!');
}).catch(console.error);
exports.default = RedisClient;
