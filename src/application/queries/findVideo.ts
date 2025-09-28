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

    if (user?.role === Roles.ADMIN) {
      const video = await VideoModel.query().findById(id);

      if (!video)
        throw new InvalidVideoError({
          message: "This person doesn't exist for this user",
        });

      return video;
    }

    const video = VideoModel.query().findOne({ id, user_id });

    if (!video)
      throw new InvalidVideoError({ message: "This video doesn't exist" });

    return video;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this video: ${error}`,
    });
  }
};
