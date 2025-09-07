import { User } from "./User.ts";
export interface UserInterface {
  findById: (id: number) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (user: User) => Promise<User>;
  update: (user: User) => Promise<User>;
}
