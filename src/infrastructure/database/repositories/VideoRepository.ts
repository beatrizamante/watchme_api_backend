import { VideoModel } from "../models/VideoModel.ts";

export const VideoRepository = {
  async findById(id: number) {
    try {
      const video = await VideoModel.query().findById(id);

      if (!video)
        return {
          code: "NOT_FOUND",
          message: "Product not found",
        };

      return video;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },
  async create(video: VideoModel) {
    try {
      const createdVideo = await VideoModel.query().insertAndFetch(video);

      return createdVideo;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async delete(video: VideoModel) {
    try {
      const deletedVideo = await VideoModel.query().deleteById(video.id);

      return deletedVideo;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },
};
