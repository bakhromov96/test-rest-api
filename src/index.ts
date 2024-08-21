import Fastify from "fastify";
import skinportRoutes from "./routes/skinport";
import userRoutes from "./routes/user";
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
const fastify = Fastify();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

fastify.register(skinportRoutes);
fastify.register(userRoutes, client);

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
