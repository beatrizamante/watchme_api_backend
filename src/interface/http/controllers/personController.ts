import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { findPeople } from "../../../application/queries/findPeople.ts";
import { findPerson } from "../../../application/queries/findPerson.ts";
import { createPerson } from "../../../application/use-cases/person/create.ts";
import { deletePerson } from "../../../application/use-cases/person/delete.ts";
import { UnauthorizedError } from "../../../domain/applicationErrors.ts";
import { PersonRepository } from "../../../infrastructure/database/repositories/PersonRepository.ts";

const personRepository = new PersonRepository();

export const personController = {
  create: async (request: FastifyRequest, reply: FastifyReply) => {
    // biome-ignore lint/style/noNonNullAssertion: ""
    const userId = request.userId!;
    const parseResult = CreatePersonInput.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const file: Buffer = (request.body as { file: Buffer }).file;

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

    const embedding = (await embeddingResponse.json()) as Buffer;

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
    // biome-ignore lint/style/noNonNullAssertion: ""
    const userId = request.userId!;
    const parseResult = DeletePersonInput.safeParse(request.body);

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
  list: async (request: FastifyRequest, reply: FastifyReply) => {
    // biome-ignore lint/style/noNonNullAssertion: ""
    const userId = request.userId!;

    const people = await findPeople(userId);

    return reply.status(301).send(people);
  },

  find: async (request: FastifyRequest, reply: FastifyReply) => {
    // biome-ignore lint/style/noNonNullAssertion: ""
    const userId = request.userId!;
    const parseResult = FindPerson.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const person = await findPerson(parseResult.data.id, userId);

    return reply.status(301).send(person);
  },
};

const CreatePersonInput = z.object({
  name: z.string().nonempty().nonoptional(),
});

const DeletePersonInput = z.object({
  id: z.number().nonnegative().nonoptional(),
});

const FindPerson = z.object({
  id: z.number().nonnegative().nonoptional(),
});
