import { ProfileIPictureInterface } from "../../../domain/ProfilePictureRepository.ts";
import { User } from "../../../domain/User.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";

type CreateUserParams = {
  user: User;
  file: Buffer;
  userRepository: UserInterface;
  profilePictureRepository: ProfileIPictureInterface;
};

export const createUser = ({
  user,
  file,
  userRepository,
  profilePictureRepository,
}: CreateUserParams) => {
  const validUser = new User(user);

  const profilePicture = file;

  return userRepository.create(validUser);
};
