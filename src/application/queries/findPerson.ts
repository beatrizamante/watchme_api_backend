import {
  DatabaseError,
  InvalidPersonError,
} from "../../domain/applicationErrors.ts";
import { PersonModel } from "../../infrastructure/database/models/PersonModel.ts";

export const findPersonById = (id: number) => {
  try {
    const person = PersonModel.query().findById(id);

    if (!person)
      throw new InvalidPersonError({ message: "This person doesn't exist" });

    return person;
  } catch (error) {
    throw new DatabaseError({
      message: `There was an error retrieving this person: ${error}`,
    });
  }
};

export const findPersonWithUserId = async (id: number, user_id: number) => {
  try {
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
