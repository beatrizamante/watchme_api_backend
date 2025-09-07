import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { UserInterface } from "../../../domain/UserRepository.ts";
import { UserModel } from "../models/UserModel.ts";

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

  async create(user: UserModel) {
    try {
      const createdUser = await UserModel.query().insertAndFetch(user);

      return createdUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the user: ${message}`,
      });
    }
  }

  async update(user: UserModel) {
    try {
      const updatedUser = await UserModel.query().patchAndFetchById(
        user.id,
        user
      );

      return updatedUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error updating the user: ${message}`,
      });
    }
  }
}
