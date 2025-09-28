import {
  DatabaseError,
  InvalidVideoError,
} from "../../domain/applicationErrors.ts";
import { UserModel } from "../../infrastructure/database/models/UserModel.ts";
import { VideoModel } from "../../infrastructure/database/models/VideoModel.ts";
import { Roles } from "../../interfaces/roles.ts";

export const findVideo = async (id: number, user_id: number) => {
  try {
    const user = await UserModel.query().findById(user_id);
    const video = VideoModel.query().findById(id);

    if (!video && user?.role !== Roles.ADMIN)
      throw new InvalidVideoError({ message: "This video doesn't exist" });

    return video;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this video: ${error}`,
    });
  }
};
