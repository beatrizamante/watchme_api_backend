import { VideoModel } from "../infrastructure/database/models/VideoModel.ts";
import { DatabaseError } from "./applicationErrors.ts";

export interface VideoInterface {
  findById: (id: number) => Promise<VideoModel | undefined | DatabaseError>;
  create: (video: VideoModel) => Promise<VideoModel | DatabaseError>;
  delete: (video: VideoModel) => Promise<number | DatabaseError>;
}
