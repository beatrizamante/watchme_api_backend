import type { FastifyInstance } from "fastify";
import { videoController } from "../../controllers/videoController.ts";

export function videosApiRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/videos",
    {
      schema: {
        summary: "Find videos",
        tags: ["Videos"],
      },
    },
    videoController.list
  );

  fastify.get(
    "/video",
    {
      schema: {
        summary: "Find video",
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
        summary: "Create new video",
        tags: ["Videos"],
        body: {
          type: "object",
          required: ["name", "stock", "price", "image_path"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            stock: { type: "integer" },
            price: { type: "integer" },
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
      },
    },
    videoController.delete
  );
}
