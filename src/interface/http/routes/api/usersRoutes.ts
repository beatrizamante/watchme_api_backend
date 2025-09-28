import type { FastifyInstance } from "fastify";
import { userController } from "../../controllers/userController.ts";

export function usersApiRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/users",
    {
      schema: {
        summary: "Find user",
        tags: ["Users"],
      },
    },
    userController.list
  );

  fastify.get(
    "/users",
    {
      schema: {
        summary: "Find user",
        tags: ["Users"],
        querystring: {
          type: "object",
          properties: {
            id: { type: "number" },
            username: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
    userController.find
  );

  fastify.post(
    "/users",
    {
      schema: {
        summary: "Create new user",
        tags: ["Users"],
        body: {
          type: "object",
          required: ["name", "stock", "price", "image_path"],
          properties: {
            email: { type: "string" },
            username: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    userController.create
  );

  fastify.patch(
    "/user",
    {
      schema: {
        summary: "Update user",
        tags: ["Users"],
      },
    },
    userController.update
  );
}
