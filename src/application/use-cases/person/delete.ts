import { InvalidPersonError } from "../../../domain/applicationErrors.ts";
import { PersonInterface } from "../../../domain/PersonRepository.ts";
import {
  findPersonById,
  findPersonWithUserId,
} from "../../queries/findPerson.ts";

type DeletePersonParams = {
  personId: number;
  userId: number;
  personRepository: PersonInterface;
};

export const deletePerson = async ({
  personId,
  userId,
  personRepository,
}: DeletePersonParams) => {
  const validPerson = await findPersonWithUserId(personId, userId);

  if (!validPerson)
    throw new InvalidPersonError({
      message: "This person doesn't exist for this user",
    });

  return await personRepository.delete(validPerson);
};
