import { Transaction } from "objection";
import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";
import { UserModel } from "../models/UserModel.ts";
import { User } from "../../../domain/User.ts";

export class UserRepository implements UserInterface {
  async findById(id: number) {
    try {
      const user = await UserModel.query().findById(id);

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching for the id: ${message}`,
      });
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await UserModel.query().findOne({ username });

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching for the username: ${message}`,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await UserModel.query().findOne({ email });

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";
      throw new DatabaseError({
        message: `There was an error searching for the email: ${message}`,
      });
    }
  }

  async create(user: User, trx: Transaction): Promise<User> {
    try {
      const createdUser = await UserModel.query(trx).insertAndFetch(user);

      return {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
        active: createdUser.active,
        role: createdUser.role,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the user: ${message}`,
      });
    }
  }

  async update(user: User, trx: Transaction): Promise<User> {
    try {
      if (!user.id)
        throw new DatabaseError({ message: "Cannot update inexistent user" });

      const updatedUser = await UserModel.query(trx).patchAndFetchById(
        user.id,
        user
      );

      if (!updatedUser) {
        throw new DatabaseError({ message: "User not found for update" });
      }

      if (updatedUser.role === undefined) {
        throw new DatabaseError({
          message: "User role is undefined after update",
        });
      }

      return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        password: updatedUser.password,
        active: updatedUser.active,
        role: updatedUser.role,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error updating the user: ${message}`,
      });
    }
  }
}
