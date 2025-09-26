import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createPerson } from "../../../application/use-cases/person/create.ts";
import { deletePerson } from "../../../application/use-cases/person/delete.ts";
import { PersonRepository } from "../../../infrastructure/database/repositories/PersonRepository.ts";

const personRepository = new PersonRepository();

export const personController = {
  create: async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = CreatePersonInput.safeParse(request.body);
    const userId = request.userId;

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const file = (request.body as any).file;

    const embeddingResponse = await fetch("http://localhost:5000/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file }),
    });

    if (!embeddingResponse.ok) {
      return reply
        .status(502)
        .send({ error: "Failed to get embedding Morgan" });
    }

    const embedding = await embeddingResponse.json();

    const result = await createPerson({
      person: {
        name: parseResult.data.name,
        user_id: userId,
        embedding,
      },
      personRepository,
    });

    return reply.status(201).send(result);
  },
  delete: async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = DeletePersonInput.safeParse(request.body);
    const userId = request.userId;

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const result = await deletePerson({
      personId: parseResult.data.id,
      userId,
      personRepository,
    });

    return reply.status(201).send(result);
  },
  list: async (request: FastifyRequest, reply: FastifyReply) => {},
  find: async (request: FastifyRequest, reply: FastifyReply) => {},
};

const CreatePersonInput = z.object({
  name: z.string().nonempty().nonoptional(),
});

const DeletePersonInput = z.object({
  id: z.number().nonnegative().nonoptional(),
});
