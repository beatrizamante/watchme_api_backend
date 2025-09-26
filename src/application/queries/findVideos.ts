import { VideoModel } from "../../infrastructure/database/models/VideoModel.ts";

export const findVideos = () => {
  return VideoModel.query().select();
};

export const findVideosForUser = (user_id: number) => {
  return VideoModel.query().where("user_id", user_id);
};
