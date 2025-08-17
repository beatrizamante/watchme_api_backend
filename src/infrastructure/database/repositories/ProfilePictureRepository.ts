import { ProfilePictureModel } from "../models/ProfilePictureModel.ts";

export const ProfilePictureRepository = {
  async findById(id: number) {
    try {
      const profilePicture = await ProfilePictureModel.query().findById(id);

      if (!profilePicture)
        return {
          code: "NOT_FOUND",
          message: "Product not found",
        };

      return profilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async create(profilePicture: ProfilePictureModel) {
    try {
      const createdProfilePicture =
        await ProfilePictureModel.query().insertAndFetch(profilePicture);

      return createdProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async update(profilePicture: ProfilePictureModel) {
    try {
      const updatedProfilePicture =
        await ProfilePictureModel.query().patchAndFetch(profilePicture);

      return updatedProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
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
