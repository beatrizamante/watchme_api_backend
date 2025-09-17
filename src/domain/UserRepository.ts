import { Transaction } from "objection";
import { User } from "./User.ts";
export interface UserInterface {
  findById: (id: number) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (user: User, trx: Transaction) => Promise<User>;
  update: (user: User, trx: Transaction) => Promise<User>;
}
