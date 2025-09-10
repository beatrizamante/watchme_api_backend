import {
  ExternalServiceError,
  InvalidVideoError,
} from "../../../domain/applicationErrors.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { manageVideoPath } from "../../_lib/manageVideoPath.ts";

type DeleteVideoParams = {
  videoId: number;
  videoRepository: VideoInterface;
};

export const deleteVideo = async ({
  videoId,
  videoRepository,
}: DeleteVideoParams) => {
  const validVideo = await videoRepository.findById(videoId);

  if (!validVideo)
    throw new InvalidVideoError({ message: "This video doesn't exist" });

  const deleteVideo = manageVideoPath(validVideo);

  if (!deleteVideo)
    throw new ExternalServiceError({ message: "Cannot delete path " });

  return await videoRepository.delete(validVideo);
};
