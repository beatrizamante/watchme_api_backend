import { PersonModel } from "../../infrastructure/database/models/PersonModel.ts";

export const findPeople = () => {
  return PersonModel.query().select();
};

export const findPeopleForUser = (user_id: number) => {
  return PersonModel.query().where("user_id", user_id);
};
