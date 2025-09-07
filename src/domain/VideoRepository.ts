import { Video } from "./Video.ts";

export interface VideoInterface {
  findById: (id: number) => Promise<Video | undefined>;
  create: (video: Video) => Promise<Video>;
  delete: (video: Video) => Promise<number>;
}
