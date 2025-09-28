import {
  DatabaseError,
  InvalidPersonError,
} from "../../domain/applicationErrors.ts";
import { PersonModel } from "../../infrastructure/database/models/PersonModel.ts";
import { UserModel } from "../../infrastructure/database/models/UserModel.ts";
import { Roles } from "../../interfaces/roles.ts";

export const findPerson = async (id: number, user_id: number) => {
  try {
    const user = await UserModel.query().findById(user_id);

    if (user?.role === Roles.ADMIN) {
      const person = await PersonModel.query().findById(id);

      if (!person)
        throw new InvalidPersonError({
          message: "This person doesn't exist for this user",
        });

      return person;
    }

    const person = await PersonModel.query().findOne({ id, user_id });
    if (!person)
      throw new InvalidPersonError({
        message: "This person doesn't exist for this user",
      });

    return person;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this person: ${error}`,
    });
  }
};
