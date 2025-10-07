import { InvalidPersonError } from "../../../domain/applicationErrors.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";
import { findPersonById } from "../../queries/findPerson.ts";

type DeletePersonParams = {
  personId: number;
  personRepository: PersonInterface;
};

export const adminDeletePerson = async ({
  personId,
  personRepository,
}: DeletePersonParams) => {
  const validPerson = await findPersonById(personId);

  if (!validPerson)
    throw new InvalidPersonError({
      message: "This person doesn't exist for this user",
    });

  return await personRepository.delete(validPerson);
};
