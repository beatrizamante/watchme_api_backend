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
  const foundUser = await UserModel.query().where(function () {
    if (id) {
      this.where("id", id);
    } else if (username) {
      this.where("username", username);
    } else if (email) {
      this.where("email", email);
    }
  });

  if (!foundUser) {
    throw new InvalidUserError({ message: "This user doesn't exist" });
  }

  return foundUser;
};
