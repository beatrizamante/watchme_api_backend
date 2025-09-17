import { Transaction } from "objection";
import { ProfilePicture } from "./ProfilePicture.ts";

export interface ProfileIPictureInterface {
  findById: (id: number) => Promise<ProfilePicture | undefined>;
  upsert: (
    profilePicture: ProfilePicture,
    trx: Transaction
  ) => Promise<ProfilePicture>;
  delete: (profilePicture: ProfilePicture, trx: Transaction) => Promise<number>;
}
