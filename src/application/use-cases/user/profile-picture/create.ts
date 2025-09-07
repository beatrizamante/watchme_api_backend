import { ExternalServiceError } from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { managateProfilePicturePath } from "./manageProfilePicturePath.ts";

type CreateProfilePictureParams = {
  profilePicture: ProfilePicture;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createPicture = ({
  profilePicture,
  profilePictureRepository,
}: CreateProfilePictureParams) => {
  const validPath = managateProfilePicturePath(profilePicture);

  if (!validPath)
    throw new ExternalServiceError({ message: "Cannot create picture path" });
  const validPicture = new ProfilePicture(profilePicture);

  return profilePictureRepository.create(validPicture);
};
