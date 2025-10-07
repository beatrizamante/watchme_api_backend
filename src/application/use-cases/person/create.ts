import { Person } from "../../../domain/Person.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";

type CreatePersonParams = {
  person: Person;
  personRepository: PersonInterface;
};

export const createPerson = ({
  person,
  personRepository,
}: CreatePersonParams) => {
  const validPerson = new Person(person);

  return personRepository.create(validPerson);
};
