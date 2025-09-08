import { ExternalServiceError } from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { managateProfilePicturePath } from "./manageProfilePicturePath.ts";

type CreateProfilePictureParams = {
  file: Buffer;
  profilePicture: ProfilePicture;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createPicture = ({
  file,
  profilePicture,
  profilePictureRepository,
}: CreateProfilePictureParams) => {
  const validPath = managateProfilePicturePath.saveImage(
    file,
    String(profilePicture.id)
  );

  if (!validPath)
    throw new ExternalServiceError({ message: "Cannot create picture path" });
  const validPicture = new ProfilePicture(profilePicture);

  return profilePictureRepository.create(validPicture);
};
