import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod/v4";
import { createUser } from "../../../application/use-cases/user/create.ts";
import { updateUser } from "../../../application/use-cases/user/update.ts";
import { ProfilePictureRepository } from "../../../infrastructure/database/repositories/ProfilePictureRepository.ts";
import { UserRepository } from "../../../infrastructure/database/repositories/UserRepository.ts";
import { Roles } from "../../../interfaces/roles.ts";

const userRepository = new UserRepository();
const profilePictureRepository = new ProfilePictureRepository();

export const userController = {
  create: async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = CreateUserInput.safeParse(request.body);
    const profilePicture = (request.body as any).file;

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const { username, email, password } = parseResult.data;

    const result = await createUser({
      user: {
        username,
        email,
        password,
        role: Roles.USER,
        active: true,
      },
      file: profilePicture,
      userRepository,
      profilePictureRepository,
    });

    return reply.status(201).send(result);
  },

  update: async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = UpdateUserInput.safeParse(request.body);
    const profilePicture = (request.body as any).file;
    const userId = request.userId;

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: parseResult.error.issues,
      });
    }

    const { username, email, password, role, active } = parseResult.data;

    if (!userId) {
      return reply
        .status(400)
        .send({ error: "User ID is required for update" });
    }

    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (role !== undefined) updateData.role = role;
    if (active !== undefined) updateData.active = active;

    const result = await updateUser({
      userId,
      user: updateData,
      file: profilePicture,
      userRepository,
      profilePictureRepository,
    });

    return reply.status(200).send(result);
  },
  list: async (request: FastifyRequest, reply: FastifyReply) => {},
  find: async (request: FastifyRequest, reply: FastifyReply) => {},
};

const CreateUserInput = z.object({
  username: z.string().nonempty().nonoptional(),
  email: z.email().nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional(),
});

const UpdateUserInput = z.object({
  username: z.string().nonempty().optional(),
  email: z.email().nonempty().optional(),
  password: z.string().nonempty().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  active: z.boolean().optional(),
});
