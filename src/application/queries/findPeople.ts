import { InvalidPersonError } from "../../domain/applicationErrors.ts";
import { PersonModel } from "../../infrastructure/database/models/PersonModel.ts";
import { UserModel } from "../../infrastructure/database/models/UserModel.ts";
import { Roles } from "../../interfaces/roles.ts";

export const findPeople = async (user_id: number) => {
  const user = await UserModel.query().findById(user_id);

  if (user?.role === Roles.ADMIN) {
    const person = await PersonModel.query().select();

    if (!person)
      throw new InvalidPersonError({
        message: "This person doesn't exist for this user",
      });

    return person;
  }

  return await PersonModel.query().where("user_id", user_id);
};
