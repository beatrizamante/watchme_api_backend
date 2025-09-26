import { UserModel } from "../../infrastructure/database/models/UserModel.ts";

export const findUsers = async () => {
  return await UserModel.query().select();
};

export const findActiveUsers = async (active: boolean) => {
  return await UserModel.query().where("active", active);
};
