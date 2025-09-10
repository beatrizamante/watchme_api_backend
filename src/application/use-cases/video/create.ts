import { ExternalServiceError } from "../../../domain/applicationErrors.ts";
import { Video } from "../../../domain/Video.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { manageVideoPath } from "../../_lib/manageVideoPath.ts";

type CreateVideoParams = {
  video: Video;
  videoRepository: VideoInterface;
};

export const createVideo = ({ video, videoRepository }: CreateVideoParams) => {
  const validPath = manageVideoPath(video);

  if (!validPath)
    throw new ExternalServiceError({ message: "Cannot create path " });

  const validVideo = new Video({
    ...video,
    path: validPath,
  });

  return videoRepository.create(validVideo);
};
