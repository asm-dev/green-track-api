import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.connect().catch(console.error);

export default client;
