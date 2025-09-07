import { UserModel } from "../infrastructure/database/models/UserModel.ts";
export interface UserInterface {
  findById: (id: number) => Promise<UserModel | undefined>;
  findByUsername: (username: string) => Promise<UserModel | undefined>;
  findByEmail: (email: string) => Promise<UserModel | undefined>;
  create: (user: UserModel) => Promise<UserModel>;
  update: (user: UserModel) => Promise<UserModel>;
}
