import type { Knex } from "knex";
import { BaseModel } from "../models/BaseModel.js";
import { Roles, UserModel } from "../models/UserModel.js";

export async function seed(knex: Knex): Promise<void> {
  BaseModel.knex(knex);

  const mockUsers = [
    {
      name: "Beatriz Amante",
      email: "beatriz@amante.com",
      password: "abc123",
      role: Roles.USER,
    },
    {
      name: "Beatriz Amante",
      email: "admin@amante.com",
      password: "admin",
      role: Roles.ADMIN,
    },
  ];

  await UserModel.query().insert(mockUsers);
}
