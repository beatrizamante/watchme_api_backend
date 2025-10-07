import type { FastifyInstance } from "fastify";
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
}
