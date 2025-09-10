import { ExternalServiceError } from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { manageImagePath } from "../../../_lib/manageImagePath.ts";

type CreateProfilePictureParams = {
  file: Buffer;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createPicture = ({
  file,
  profilePictureRepository,
}: CreateProfilePictureParams) => {
  const validPath = manageImagePath.saveImage(file, String(profilePicture.id));

  if (!validPath)
    throw new ExternalServiceError({ message: "Cannot create picture path" });
  const validPicture = new ProfilePicture(profilePicture);

  return profilePictureRepository.create(validPicture);
};
