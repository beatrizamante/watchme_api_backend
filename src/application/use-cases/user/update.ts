import { ExternalServiceError } from "../../../domain/applicationErrors.ts";
import { User } from "../../../domain/User.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";
import { manageImagePath } from "../../_lib/managePath.ts";

type UpdateUserParams = {
  file?: Buffer;
  user: User;
  userRepository: UserInterface;
};

export const updateUser = async ({
  file,
  user,
  userRepository,
}: UpdateUserParams) => {
  let currentFile = await findProfilePicture();

  if (file) {
    const updatedImage = await manageImagePath.replaceImage(
      file,
      String(currentFile.id),
      currentFile.path
    );

    if (!updatedImage)
      throw new ExternalServiceError({ message: "Cannot delete picture path" });

    currentFile = updatedImage;
  }

  //TODO - Transaction inside profile picture, where the path is only deleted if the whole transaction is finished
  const updatedUser = new User({
    ...user,
    path: currentFile,
  });

  return await userRepository.update(updatedUser);
};
