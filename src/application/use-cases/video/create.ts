import {
  ExternalServiceError,
  InvalidVideoError,
} from "../../../domain/applicationErrors.ts";
import { Video } from "../../../domain/Video.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { VideoModel } from "../../../infrastructure/database/models/VideoModel.ts";
import { managePath } from "../../_lib/managePath.ts";

type Dependencies = {
  videoRepository: VideoInterface;
};

type CreateVideoParams = {
  video: Buffer;
  userId: number;
};

export const makeCreateVideo =
  ({ videoRepository }: Dependencies) =>
  async ({ video, userId }: CreateVideoParams) => {
    const trx = await VideoModel.startTransaction();

    try {
      const fileName = crypto.randomUUID();
      const validPath = await managePath.save(video, fileName);

      if (!validPath)
        throw new ExternalServiceError({ message: "Cannot create path " });

      const validVideo = new Video({
        user_id: userId,
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

export type CreateVideo = ReturnType<typeof makeCreateVideo>;
