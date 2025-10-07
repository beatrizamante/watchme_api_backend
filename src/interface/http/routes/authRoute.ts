import type { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController.ts";
import { authentication } from "../middleware/auth.ts";

export function authRoute(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    {
      schema: {
        summary: "Login a user",
        tags: ["Login"],
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          examples: [
            {
              email: "beatriz@amante.com",
              password: "abc123",
            },
          ],
        },
      },
    },
    authentication.login
  );

  fastify.post(
    "/logout",
    {
      schema: {
        summary: "Logout a user",
        tags: ["Login"],
      },
    },
    authentication.logout
  );

  fastify.post(
    "/register",
    {
      schema: {
        summary: "Register new user",
        tags: ["Login"],
        body: {
          type: "object",
          required: ["email", "username", "password"],
          properties: {
            email: { type: "string", format: "email" },
            username: { type: "string" },
            password: { type: "string", minLength: 6 },
          },
        },
        examples: [
          {
            email: "beatriz@amante.com",
            username: "beamante",
            password: "abc123",
          },
        ],
      },
    },
    userController.create
  );
}
