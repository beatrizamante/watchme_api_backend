import { ExternalServiceError } from "../../../domain/applicationErrors.ts";
import { Video } from "../../../domain/Video.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { VideoModel } from "../../../infrastructure/database/models/VideoModel.ts";
import { manageVideoPath } from "../../_lib/manageVideoPath.ts";
import { InvalidVideoError } from "../../../domain/applicationErrors.ts";

type CreateVideoParams = {
  video: Buffer;
  user_id: number;
  videoRepository: VideoInterface;
};

export const createVideo = async ({
  video,
  user_id,
  videoRepository,
}: CreateVideoParams) => {
  const trx = await VideoModel.startTransaction();

  try {
    const fileName = crypto.randomUUID();
    const validPath = await manageVideoPath.saveVideo(video, fileName);

    if (!validPath)
      throw new ExternalServiceError({ message: "Cannot create path " });

    const validVideo = new Video({
      user_id,
      path: validPath,
    });
    const createdVideo = videoRepository.create(validVideo, trx);

    await trx.commit();

    return createdVideo;
  } catch (error) {
    await trx.rollback();

    throw new InvalidVideoError({
      message: `There was an error trying to create the video: ${error}`,
    });
  }
};
