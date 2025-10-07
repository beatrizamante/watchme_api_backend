import { PersonModel } from "../models/PersonModel.ts";

export const PersonRepository = {
  async findById(id: number) {
    try {
      const person = await PersonModel.query().findById(id);

      if (!person)
        return {
          code: "NOT_FOUND",
          message: "Product not found",
        };

      return person;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },
  async create(person: PersonModel) {
    try {
      const createdPerson = await PersonModel.query().insertAndFetch(person);

      return createdPerson;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },

  async delete(person: PersonModel) {
    try {
      const deletedPerson = await PersonModel.query().deleteById(person.id);

      return deletedPerson;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Database error";

      return { code: "DATABASE_ERROR", message };
    }
  },
};
