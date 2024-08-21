import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Client } from "pg";
import { Params, Body } from "../types";
import UserService from "../services/user.service";

async function userRoutes(fastify: FastifyInstance, client: Client) {
  const userService = new UserService(client);

  fastify.post(
    "/users/:id/deduct",
    async (
      request: FastifyRequest<{ Params: Params; Body: Body }>,
      reply: FastifyReply
    ) => {
      const { id } = request.params;
      const { amount } = request.body;

      if (amount <= 0) {
        return reply.status(400).send({ error: "Invalid amount" });
      }

      try {
        const user = await userService.getUser(id);

        if (!user) {
          return reply.status(404).send({ error: "User not found" });
        }

        if (user.balance < amount) {
          return reply.status(400).send({ error: "Insufficient balance" });
        }

        await userService.deductBalance(id, amount);

        return reply.status(200).send({ success: true });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Failed to deduct balance" });
      }
    }
  );
}

export default userRoutes;
