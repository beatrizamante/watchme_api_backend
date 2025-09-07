import { PersonModel } from "../models/PersonModel.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";
import { DatabaseError } from "../../../domain/applicationErrors.ts";

export class PersonRepository implements PersonInterface {
  async findById(id: number) {
    try {
      const person = await PersonModel.query().findById(id);

      if (!person) return null;

      return person;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching for the id: ${message}`,
      });
    }
  }
  async create(person: PersonModel) {
    try {
      const createdPerson = await PersonModel.query().insertAndFetch(person);

      return createdPerson;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error creating the person: ${message}`,
      });
    }
  }

  async delete(person: PersonModel) {
    try {
      const deletedPerson = await PersonModel.query().deleteById(person.id);

      return deletedPerson;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error deleting the person: ${message}`,
      });
    }
  }
}
