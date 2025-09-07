import { ProfilePicture } from "./ProfilePicture.ts";

export interface ProfileIPictureInterface {
  findById: (id: number) => Promise<ProfilePicture | undefined>;
  create: (profilePicture: ProfilePicture) => Promise<ProfilePicture>;
  update: (profilePicture: ProfilePicture) => Promise<ProfilePicture>;
  delete: (profilePicture: ProfilePicture) => Promise<number>;
}
