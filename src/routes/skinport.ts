import { FastifyInstance } from "fastify";
import NodeCache from "node-cache";
import axios from "axios";
import { Item } from "../types";

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
/**
 * Assuming tradable_price is the same as suggested_price since it's more than min_price
 * and non_tradable_price is the same as min_price since it's minimum price used for this item
 */
async function skinportRoutes(fastify: FastifyInstance) {
  fastify.get("/items", async (request, reply) => {
    const page = (request.query as { page: number }).page || 1;
    const limit = (request.query as { limit: number }).limit || 100;
    const offset = (page - 1) * limit;

    const cachedItems: Item[] | undefined = cache.get("items");

    if (cachedItems) {
      const paginatedItems = cachedItems.slice(offset, offset + limit);
      return reply.send({
        total: cachedItems.length,
        page,
        limit,
        items: paginatedItems,
      });
    }

    try {
      const response: { data: Item[] } = await axios.get(
        "https://api.skinport.com/v1/items"
      );

      const items = response.data.map((item: Item) => ({
        ...item,
        tradable_price: item.suggested_price,
        non_tradable_price: item.min_price,
      }));

      cache.set("items", items);

      const paginatedItems = items.slice(offset, offset + limit);
      return reply.send({
        total: items.length,
        page,
        limit,
        items: paginatedItems,
      });
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ error: "Failed to fetch items" });
    }
  });
}

export default skinportRoutes;
