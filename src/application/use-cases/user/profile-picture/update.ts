import {
  ExternalServiceError,
  InvalidProfilePictureError,
} from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { ProfilePictureModel } from "../../../../infrastructure/database/models/ProfilePictureModel.ts";
import { managePath } from "../../../_lib/managePath.ts";

type UpsertProfilePictureParams = {
  file: Buffer;
  user_id: number;
  profilePicture: ProfilePicture;
  profilePictureRepository: ProfileIPictureInterface;
};

export const updatePicture = async ({
  file,
  user_id,
  profilePicture,
  profilePictureRepository,
}: UpsertProfilePictureParams) => {
  const trx = await ProfilePictureModel.startTransaction();
  let validPicture: ProfilePicture;

  try {
    const filename = crypto.randomUUID();
    const validPath = await managePath.save(file, filename);

    if (!validPath)
      throw new ExternalServiceError({
        message: "Cannot create picture path",
      });

    validPicture = new ProfilePicture({
      user_id,
      path: validPath,
    });

    const updatedPic = await profilePictureRepository.upsert(validPicture, trx);

    await managePath.delete(profilePicture.path);

    await trx.commit();

    return updatedPic;
  } catch (error) {
    await trx.rollback();

    throw new InvalidProfilePictureError({
      message: `Cannot create or update picture: ${error}`,
    });
  }
};
