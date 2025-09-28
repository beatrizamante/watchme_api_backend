import { UserModel } from "../../infrastructure/database/models/UserModel.ts";
export const findUsers = async (active?: boolean) => {
  const query = UserModel.query();
  if (active) {
    query.where("active", active);
  }
  return await query.select();
};
