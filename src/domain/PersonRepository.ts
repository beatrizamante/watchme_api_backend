import { PersonModel } from "../infrastructure/database/models/PersonModel.ts";
import { DatabaseError } from "./applicationErrors.ts";

export interface PersonInterface {
  findById: (id: number) => Promise<PersonModel | null | DatabaseError>;
  create: (person: PersonModel) => Promise<PersonModel | DatabaseError>;
  delete: (person: PersonModel) => Promise<number | DatabaseError>;
}
