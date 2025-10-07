import { Transaction } from "objection";
import { Video } from "./Video.ts";

export interface VideoInterface {
  findById: (id: number) => Promise<Video | undefined>;
  create: (video: Video, trx: Transaction) => Promise<Video>;
  delete: (id: number, trx: Transaction) => Promise<number>;
}
