import { Transaction } from "objection";
import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { Video } from "../../../domain/Video.ts";
import { VideoInterface } from "../../../domain/VideoRepository.ts";
import { VideoModel } from "../models/VideoModel.ts";

export class VideoRepository implements VideoInterface {
  async findById(id: number) {
    try {
      const video = await VideoModel.query().findById(id);

      return video;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching for the id: ${message}`,
      });
    }
  }
  async create(video: Video, trx: Transaction) {
    try {
      const createdVideo = await VideoModel.query(trx).insertAndFetch(video);

      return createdVideo;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the person: ${message}`,
      });
    }
  }

  async delete(id: number, trx: Transaction) {
    try {
      const deletedVideo = await VideoModel.query(trx).deleteById(id);

      return deletedVideo;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error deleting the person: ${message}`,
      });
    }
  }
}
