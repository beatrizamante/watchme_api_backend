import { Transaction } from "objection";
import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { ProfilePictureModel } from "../models/ProfilePictureModel.ts";

export const ProfilePictureRepository = {
  async findByUserId(user_id: number) {
    try {
      const profilePicture = await ProfilePictureModel.query().where(
        "user_id",
        user_id
      );

      return profilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching the picture id: ${message}`,
      });
    }
  },

  async upsert(profilePicture: ProfilePictureModel, trx: Transaction) {
    try {
      const createdProfilePicture = await ProfilePictureModel.query(
        trx
      ).upsertGraphAndFetch(profilePicture);

      return createdProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the picture: ${message}`,
      });
    }
  },

  async delete(profilePicture: ProfilePictureModel) {
    try {
      const deletedProfilePicture =
        await ProfilePictureModel.query().deleteById(profilePicture.id);

      return deletedProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },
};
