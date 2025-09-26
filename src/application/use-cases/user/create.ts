import { InvalidUserError } from "../../../domain/applicationErrors.ts";
import { ProfileIPictureInterface } from "../../../domain/ProfilePictureRepository.ts";
import { User } from "../../../domain/User.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";
import { UserModel } from "../../../infrastructure/database/models/UserModel.ts";
import { upsertPicture } from "./profile-picture/create.ts";

type CreateUserParams = {
  user: User;
  file: Buffer;
  userRepository: UserInterface;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createUser = async ({
  user,
  file,
  userRepository,
  profilePictureRepository,
}: CreateUserParams) => {
  const trx = await UserModel.startTransaction();

  try {
    const validUser = new User(user);

    const newUser = await userRepository.create(validUser, trx);

    if (!newUser.id)
      throw new InvalidUserError({ message: "Couldn't create user" });

    const validPicture = await upsertPicture({
      file,
      user_id: newUser.id,
      profilePictureRepository,
    });

    await trx.commit();

    return { validPicture, newUser };
  } catch (error) {
    await trx.rollback();

    throw new InvalidUserError({ message: `Could not create user: ${error}` });
  }
};
