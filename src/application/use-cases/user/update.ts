import { ExternalServiceError } from "../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../domain/ProfilePictureRepository.ts";
import { managateProfilePicturePath } from "./profile-picture/manageProfilePicturePath.ts";

type DeleteProfilePictureParams = {
  file: Buffer;
  profilePicture: ProfilePicture;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createPicture = async ({
  file,
  profilePicture,
  profilePictureRepository,
}: DeleteProfilePictureParams) => {
  const updatedImage = await managateProfilePicturePath.replaceImage(
    file,
    String(profilePicture.id),
    profilePicture.path
  );

  if (!updatedImage)
    throw new ExternalServiceError({ message: "Cannot delete picture path" });

  //TODO - Transaction inside profile picture, where the path is only deleted if the whole transaction is finished
  const validPicture = new ProfilePicture({
    ...profilePicture,
    path: updatedImage,
  });

  return profilePictureRepository.update(validPicture);
};
