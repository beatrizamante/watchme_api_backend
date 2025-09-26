import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod/v4";
import { createVideo } from "../../../application/use-cases/video/create.ts";
import { deleteVideo } from "../../../application/use-cases/video/delete.ts";
import { VideoRepository } from "../../../infrastructure/database/repositories/VideoRepository.ts";

const videoRepository = new VideoRepository();

export const videoController = {
  create: async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.userId;
    const video = (request.body as any).file;

    const result = await createVideo({
      video,
      userId,
      videoRepository,
    });

    return reply.status(201).send(result);
  },
  delete: async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = DeleteVideoInput.safeParse(request.body);
    const userId = request.userId;

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const result = await deleteVideo({
      videoId: parseResult.data.id,
      userId,
      videoRepository,
    });

    return reply.status(201).send(result);
  },
  list: async (request: FastifyRequest, reply: FastifyReply) => {},
  find: async (request: FastifyRequest, reply: FastifyReply) => {},
};

const DeleteVideoInput = z.object({
  id: z.number().nonnegative().nonoptional(),
});
