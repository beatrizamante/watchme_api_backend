import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { ProfilePictureModel } from "../models/ProfilePictureModel.ts";

export const ProfilePictureRepository = {
  async findById(id: number) {
    try {
      const profilePicture = await ProfilePictureModel.query().findById(id);

      return profilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching the picture id: ${message}`,
      });
    }
  },

  async create(profilePicture: ProfilePictureModel) {
    try {
      const createdProfilePicture =
        await ProfilePictureModel.query().insertAndFetch(profilePicture);

      return createdProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the picture: ${message}`,
      });
    }
  },

  async update(profilePicture: ProfilePictureModel) {
    try {
      const updatedProfilePicture =
        await ProfilePictureModel.query().patchAndFetch(profilePicture);

      return updatedProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error updating the picture: ${message}`,
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
