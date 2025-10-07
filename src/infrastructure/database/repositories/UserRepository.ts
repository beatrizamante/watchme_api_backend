import { UserModel } from "../models/UserModel.ts";

export const UserRepository = {
  async findById(id: number) {
    try {
      const user = await UserModel.query().findById(id);

      if (!user)
        return {
          code: "NOT_FOUND",
          message: "User not found",
        };

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async findByUsername(username: string) {
    try {
      const user = await UserModel.query().findOne({ username });

      if (!user)
        return {
          code: "NOT_FOUND",
          message: "User not found",
        };

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async findByEmail(email: string) {
    try {
      const user = await UserModel.query().findOne({ email });

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";
      return { code: "DATABASE_ERROR", message };
    }
  },

  async create(user: UserModel) {
    try {
      const createdUser = await UserModel.query().insertAndFetch(user);

      return createdUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async update(user: UserModel) {
    try {
      const updatedUser = await UserModel.query().patchAndFetchById(
        user.id,
        user
      );

      return updatedUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },
};
