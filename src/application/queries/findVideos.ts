import { VideoModel } from "../../infrastructure/database/models/VideoModel.ts";

export const findVideos = async (user_id?: number) => {
  const query = VideoModel.query();
  if (user_id) query.where("user_id", user_id);
  return await query.select();
};
