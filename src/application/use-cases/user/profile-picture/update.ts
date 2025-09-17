import { ProfileIPictureInterface } from "../../../../domain/ProfilePictureRepository.ts";

type UpsertProfilePictureParams = {
  file: Buffer;
  user_id: number;
  profilePictureRepository: ProfileIPictureInterface;
};

export const updatePicture = () => {};
