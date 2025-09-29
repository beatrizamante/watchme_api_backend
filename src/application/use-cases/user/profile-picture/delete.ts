import {
  ExternalServiceError,
  InvalidProfilePictureError,
} from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { ProfilePictureModel } from "../../../../infrastructure/database/models/ProfilePictureModel.ts";
import { managePath } from "../../../_lib/managePath.ts";

type DeleteProfilePictureParams = {
  profilePicture: ProfilePicture;
  profilePictureRepository: ProfileIPictureInterface;
};

export const deletePicture = async ({
  profilePicture,
  profilePictureRepository,
}: DeleteProfilePictureParams) => {
  const trx = await ProfilePictureModel.startTransaction();

  try {
    const isDeleted = profilePictureRepository.delete(profilePicture, trx);

    await managePath.delete(profilePicture.path);

    await trx.commit();

    return isDeleted;
  } catch (error) {
    await trx.rollback();

    throw new InvalidProfilePictureError({
      message: `Cannot create or update picture: ${error}`,
    });
  }
};
