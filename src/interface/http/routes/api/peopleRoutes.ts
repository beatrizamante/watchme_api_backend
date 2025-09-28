import type { FastifyInstance } from "fastify";
import { personController } from "../../controllers/personController.ts";

export function peopleApiRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/people",
    {
      schema: {
        summary: "Find people",
        tags: ["People"],
      },
    },
    personController.list
  );

  fastify.get(
    "/person",
    {
      schema: {
        summary: "Find person",
        tags: ["People"],
        querystring: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    personController.find
  );

  fastify.post(
    "/person",
    {
      schema: {
        summary: "Create new person",
        tags: ["Person"],
        body: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
          },
        },
      },
    },
    personController.create
  );

  fastify.delete(
    "/person",
    {
      schema: {
        summary: "Delete person",
        tags: ["People"],
      },
    },
    personController.delete
  );
}
