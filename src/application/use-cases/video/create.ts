import { Video } from "../../../domain/Video.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { saveVideoPath } from "./saveVideoPath.ts";

type CreateVideoParams = {
  video: Video;
  videoRepository: VideoInterface;
};

export const createVideo = ({ video, videoRepository }: CreateVideoParams) => {
  const validPath = saveVideoPath(video);
  const validVideo = new Video({
    ...video,
    path: validPath,
  });

  return videoRepository.create(validVideo);
};
