import { PersonModel } from "../models/PersonModel.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";
import { DatabaseError } from "../../../domain/applicationErrors.ts";
import { Person } from "../../../domain/Person.ts";

export class PersonRepository implements PersonInterface {
  async findById(id: number): Promise<Person | undefined> {
    try {
      const person = await PersonModel.query().findById(id);

      return person;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error searching for the id: ${message}`,
      });
    }
  }
  async create(person: Person): Promise<Person> {
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

  async delete(person: Person): Promise<number> {
    try {
      const deletedPerson = await PersonModel.query().deleteById(person.id!);

      return deletedPerson;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      throw new DatabaseError({
        message: `There was an error deleting the person: ${message}`,
      });
    }
  }
}
