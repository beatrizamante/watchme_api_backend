import { InvalidVideoError } from "../../../domain/applicationErrors.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";

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

  return await videoRepository.delete(validVideo);
};
