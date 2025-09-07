import { UserModel } from "../infrastructure/database/models/UserModel.ts";
import { DatabaseError } from "./applicationErrors.ts";

export interface UserInterface {
  findById: (id: number) => Promise<UserModel | undefined | DatabaseError>;
  findByUsername: (
    username: string
  ) => Promise<UserModel | undefined | DatabaseError>;
  findByEmail: (
    email: string
  ) => Promise<UserModel | undefined | DatabaseError>;
  create: (user: UserModel) => Promise<UserModel | DatabaseError>;
  update: (user: UserModel) => Promise<UserModel | DatabaseError>;
}
