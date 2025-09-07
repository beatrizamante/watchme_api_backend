import { Person } from "./Person.ts";

export interface PersonInterface {
  findById: (id: number) => Promise<Person | undefined>;
  create: (person: Person) => Promise<Person>;
  delete: (person: Person) => Promise<number>;
}
