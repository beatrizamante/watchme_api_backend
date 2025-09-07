import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { Video } from "../../../domain/Video.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { VideoModel } from "../models/VideoModel.ts";

export class VideoRepository implements VideoInterface {
  async findById(id: number) {
    try {
      const video = await VideoModel.query().findById(id);

      return video;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching for the id: ${message}`,
      });
    }
  }
  async create(video: Video) {
    try {
      const createdVideo = await VideoModel.query().insertAndFetch(video);

      return createdVideo;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the person: ${message}`,
      });
    }
  }

  async delete(video: Video) {
    try {
      const deletedVideo = await VideoModel.query().deleteById(video.id!);

      return deletedVideo;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error deleting the person: ${message}`,
      });
    }
  }
}
