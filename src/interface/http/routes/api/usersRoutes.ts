import type { FastifyInstance } from "fastify";
import { userController } from "../../controllers/userController.ts";
import { authentication } from "../../middleware/auth.ts";

export function usersApiRoutes(fastify: FastifyInstance) {
  fastify.addHook("preValidation", authentication.isAuthenticated);

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
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          required: ["email", "username", "password"],
          properties: {
            email: { type: "string", format: "email" },
            username: { type: "string" },
            password: { type: "string", minLength: 6 },
            profilePicture: {
              type: "string",
              format: "binary",
              description: "User profile picture",
            },
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
        body: {},
      },
    },
    userController.update
  );
}
