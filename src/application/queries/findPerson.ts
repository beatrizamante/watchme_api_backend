import {
  DatabaseError,
  InvalidPersonError,
  InvalidUserError,
} from "../../domain/applicationErrors.ts";
import { PersonModel } from "../../infrastructure/database/models/PersonModel.ts";
import { UserModel } from "../../infrastructure/database/models/UserModel.ts";

export const findPerson = async (id: number, user_id: number) => {
  try {
    const user = await UserModel.query().findById(user_id);

    if (!user)
      throw new InvalidUserError({
        message: "This user cannot access this resource",
      });

    if (user?.isAdmin()) {
      const person = await PersonModel.query().findById(id);

      if (!person)
        throw new InvalidPersonError({
          message: "This person doesn't exist",
        });

      return person;
    }

    const person = await PersonModel.query().findOne({ id, user_id });

    if (!person)
      throw new InvalidPersonError({
        message: "This person doesn't exist",
      });

    return person;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this person: ${error}`,
    });
  }
};
