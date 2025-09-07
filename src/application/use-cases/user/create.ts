import { ProfilePicture } from "../../../domain/ProfilePicture.ts";
import { ProfileIPictureInterface } from "../../../domain/ProfilePictureRepository.ts";
import { User } from "../../../domain/User.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";

type CreateUserParams = {
  user: User;
  profile_picture: ProfilePicture;
  userRepository: UserInterface;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createPerson = ({
  user,
  profile_picture,
  userRepository,
  profilePictureRepository,
}: CreateUserParams) => {
  const validUser = new User(user);

  //TODO - Also add a Transaction to user

  return userRepository.create(validUser);
};
