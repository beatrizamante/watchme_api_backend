import { Transaction } from "objection";
import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { ProfileIPictureInterface } from "../../../domain/ProfilePictureRepository.ts";
import { ProfilePictureModel } from "../models/ProfilePictureModel.ts";

export class ProfilePictureRepository implements ProfileIPictureInterface {
  async findByUserId(user_id: number) {
    try {
      const profilePicture = await ProfilePictureModel.query()
        .where("user_id", user_id)
        .first();

      return profilePicture ?? undefined;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching the picture id: ${message}`,
      });
    }
  }

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
  }

  async delete(profilePicture: ProfilePictureModel): Promise<number> {
    try {
      const deletedProfilePicture =
        await ProfilePictureModel.query().deleteById(profilePicture.id);

      return deletedProfilePicture;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error on the database: ${message}`,
      });
    }
  }
}
