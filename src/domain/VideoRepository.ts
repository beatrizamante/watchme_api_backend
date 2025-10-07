import { Transaction } from "objection";
import { Video } from "./Video.ts";

export interface VideoInterface {
  create: (video: Video, trx: Transaction) => Promise<Video>;
  delete: (id: number, trx: Transaction) => Promise<number>;
}
