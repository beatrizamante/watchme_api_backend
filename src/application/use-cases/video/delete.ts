import { InvalidVideoError } from "../../../domain/applicationErrors.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { VideoModel } from "../../../infrastructure/database/models/VideoModel.ts";
import { manageVideoPath } from "../../_lib/manageVideoPath.ts";

type DeleteVideoParams = {
  videoId: number;
  videoRepository: VideoInterface;
};

export const deleteVideo = async ({
  videoId,
  videoRepository,
}: DeleteVideoParams) => {
  const trx = await VideoModel.startTransaction();

  try {
    const validVideo = await videoRepository.findById(videoId);

    if (!validVideo)
      throw new InvalidVideoError({ message: "This video doesn't exist" });

    const deleted = await videoRepository.delete(videoId, trx);

    await manageVideoPath.deleteVideo(validVideo.path);

    await trx.commit();

    return deleted;
  } catch (error) {
    await trx.rollback();

    throw new InvalidVideoError({ message: `Cannot delete video: ${error}` });
  }
};
