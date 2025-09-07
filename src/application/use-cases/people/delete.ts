import { InvalidPersonError } from "../../../domain/applicationErrors.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";

type DeletePersonParams = {
  personId: number;
  personRepository: PersonInterface;
};

export const deletePerson = async ({
  personId,
  personRepository,
}: DeletePersonParams) => {
  const validPerson = await personRepository.findById(personId);

  if (!validPerson)
    throw new InvalidPersonError({ message: "This person doesn't exist" });

  return await personRepository.delete(validPerson);
};
