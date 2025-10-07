import { ModelObject, RelationMappings } from "objection";
import { BaseModel } from "./BaseModel.js";
import { UserModel } from "./UserModel.ts";

class PersonModel extends BaseModel {
  static tableName = "people";

  id!: number;
  user_id!: number;
  name!: string;
  embedding!: Buffer;

  static relationMappings: RelationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "people.user_id",
        to: "user.id",
      },
    },
  };
}

export { PersonModel };
export type PersonSchema = ModelObject<PersonModel>;
