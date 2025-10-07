import { InvalidUserError } from "../../domain/applicationErrors.ts";
import { UserModel } from "../../infrastructure/database/models/UserModel.ts";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository.ts";

type FindUser = {
  filter: {
    id?: number;
    username?: string;
    email?: string;
  };
  userRepository: UserRepository;
};
export const findUser = async ({ filter }: FindUser) => {
  const { id, username, email } = filter;

  const query = UserModel.query();
  if (id !== undefined) {
    query.where("id", id);
  } else if (username !== undefined) {
    query.where("username", username);
  } else if (email !== undefined) {
    query.where("email", email);
  } else {
    throw new InvalidUserError({ message: "No filter provided" });
  }

  const foundUser = await query.first();

  if (!foundUser) {
    throw new InvalidUserError({ message: "This user doesn't exist" });
  }

  return foundUser;
};
