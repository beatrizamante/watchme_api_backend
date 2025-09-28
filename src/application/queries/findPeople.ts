import { PersonModel } from "../../infrastructure/database/models/PersonModel.ts";

export const findPeople = async (user_id?: number) => {
  const query = PersonModel.query();
  if (user_id) query.where("user_id", user_id);

  return await query.select();
};
