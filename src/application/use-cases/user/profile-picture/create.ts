import {
  ExternalServiceError,
  InvalidProfilePictureError,
} from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { ProfilePictureModel } from "../../../../infrastructure/database/models/ProfilePictureModel.ts";
import { manageImagePath } from "../../../_lib/manageImagePath.ts";

type UpsertProfilePictureParams = {
  file: Buffer;
  user_id: number;
  profilePictureRepository: ProfileIPictureInterface;
};

export const upsertPicture = async ({
  file,
  user_id,
  profilePictureRepository,
}: UpsertProfilePictureParams) => {
  const trx = await ProfilePictureModel.startTransaction();
  let validPicture: ProfilePicture;

  try {
    const filename = crypto.randomUUID();
    const validPath = await manageImagePath.saveImage(file, filename);

    if (!validPath)
      throw new ExternalServiceError({
        message: "Cannot create picture path",
      });

    validPicture = new ProfilePicture({
      user_id,
      path: validPath,
    });

    const createdPic = await profilePictureRepository.upsert(validPicture, trx);

    await trx.commit();

    return createdPic;
  } catch (error) {
    await trx.rollback();

    throw new InvalidProfilePictureError({
      message: `Cannot create or update picture: ${error}`,
    });
  }
};
