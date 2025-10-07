import {
  ExternalServiceError,
  InvalidProfilePictureError,
} from "../../../../domain/applicationErrors.ts";
import { ProfilePicture } from "../../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";
import { ProfilePictureModel } from "../../../../infrastructure/database/models/ProfilePictureModel.ts";
import { managePath } from "../../../_lib/managePath.ts";

type Dependencies = {
  profilePictureRepository: ProfileIPictureInterface;
};

type UpsertProfilePictureParams = {
  file: Buffer;
  user_id: number;
  currentPicture?: ProfilePicture;
};

export const makeUpsertPicture =
  ({ profilePictureRepository }: Dependencies) =>
  async ({ file, user_id, currentPicture }: UpsertProfilePictureParams) => {
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

      const createdPic = await profilePictureRepository.upsert(
        validPicture,
        trx
      );

      if (currentPicture) {
        await managePath.delete(currentPicture.path);
      }

      await trx.commit();

      return createdPic;
    } catch (error) {
      await trx.rollback();

      throw new InvalidProfilePictureError({
        message: `Cannot create or update picture: ${error}`,
      });
    }
  };

export type UpsertPicture = ReturnType<typeof makeUpsertPicture>;
