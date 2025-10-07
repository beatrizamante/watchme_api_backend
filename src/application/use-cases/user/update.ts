import { InvalidUserError } from "../../../domain/applicationErrors.ts";
import { ProfileIPictureInterface } from "../../../domain/ProfilePictureRepository.ts";
import { User } from "../../../domain/User.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";
import { UserModel } from "../../../infrastructure/database/models/UserModel.ts";
import { upsertPicture } from "./profile-picture/create.ts";

type UpdateUserParams = {
  user: User;
  file?: Buffer;
  userRepository: UserInterface;
  profilePictureRepository: ProfileIPictureInterface;
};

export const updateUser = async ({
  user,
  file,
  userRepository,
  profilePictureRepository,
}: UpdateUserParams) => {
  const trx = await UserModel.startTransaction();

  try {
    const validUpdatedUser = new User(user);

    const updatedUser = await userRepository.update(validUpdatedUser, trx);

    if (!updatedUser.id)
      throw new InvalidUserError({ message: "Couldn't create user" });

    let validPicture = await profilePictureRepository.findByUserId(
      updatedUser.id
    );

    if (file) {
      validPicture = await upsertPicture({
        file,
        user_id: updatedUser.id,
        profilePictureRepository,
      });
    }

    await trx.commit();

    return { validPicture, updatedUser };
  } catch (error) {
    await trx.rollback();

    throw new InvalidUserError({ message: `Could not create user: ${error}` });
  }
};
