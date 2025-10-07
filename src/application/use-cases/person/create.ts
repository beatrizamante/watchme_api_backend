import { Person } from "../../../domain/Person.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";

type Dependencies = {
  personRepository: PersonInterface;
};

type CreatePersonParams = {
  person: Person;
};

export const makeCreatePerson =
  ({ personRepository }: Dependencies) =>
  async ({ person }: CreatePersonParams) => {
    const validPerson = new Person(person);

    return await personRepository.create(validPerson);
  };

export type CreatePerson = ReturnType<typeof makeCreatePerson>;
