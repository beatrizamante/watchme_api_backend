import type { FastifyInstance } from "fastify";
import { videoController } from "../../controllers/videoController.ts";
import { authentication } from "../../middleware/auth.ts";

export function videosApiRoutes(fastify: FastifyInstance) {
  fastify.addHook("preValidation", authentication.isAuthenticated);

  fastify.get(
    "/videos",
    {
      schema: {
        summary: "List all videos in the user's account",
        tags: ["Videos"],
      },
    },
    videoController.list
  );

  fastify.get(
    "/video",
    {
      schema: {
        summary: "Find a specific video",
        tags: ["Videos"],
        querystring: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    videoController.find
  );

  fastify.post(
    "/video",
    {
      schema: {
        summary: "Create a new video",
        tags: ["Videos"],
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          properties: {
            video: {
              type: "string",
              format: "binary",
              description: "Video file",
            },
          },
        },
      },
    },
    videoController.create
  );

  fastify.delete(
    "/video",
    {
      schema: {
        summary: "Delete video",
        tags: ["Videos"],
        querystring: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    videoController.delete
  );
}
