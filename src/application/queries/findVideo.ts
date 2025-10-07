import {
  DatabaseError,
  InvalidVideoError,
} from "../../domain/applicationErrors.ts";
import { VideoModel } from "../../infrastructure/database/models/VideoModel.ts";

export const findVideoById = (id: number) => {
  try {
    const video = VideoModel.query().findById(id);

    if (!video)
      throw new InvalidVideoError({ message: "This video doesn't exist" });

    return video;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this video: ${error}`,
    });
  }
};

export const findVideoWithUserId = async (id: number, user_id: number) => {
  try {
    const person = await VideoModel.query().findOne({ id, user_id });

    if (!person)
      throw new InvalidVideoError({
        message: "This video doesn't exist for this user",
      });

    return person;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this video: ${error}`,
    });
  }
};
