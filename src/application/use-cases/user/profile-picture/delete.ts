import { ExternalServiceError } from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { manageImagePath } from "../../../_lib/manageImagePath.ts";

type DeleteProfilePictureParams = {
  profilePicture: ProfilePicture;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createPicture = ({
  profilePicture,
  profilePictureRepository,
}: DeleteProfilePictureParams) => {
  const deletePath = manageImagePath.deleteImage(profilePicture.path);

  if (!deletePath)
    throw new ExternalServiceError({ message: "Cannot delete picture path" });

  //TODO - Transaction inside profile picture, where the path is only deleted if the whole transaction is finished
  const validPicture = new ProfilePicture(profilePicture);

  return profilePictureRepository.create(validPicture);
};
