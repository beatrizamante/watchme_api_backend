import { ModelObject, RelationMappings } from "objection";
import { BaseModel } from "./BaseModel.js";
import { UserModel } from "./UserModel.ts";

class ProfilePictureModel extends BaseModel {
  static tableName = "profile_pictures";

  id!: number;
  user_id!: number;
  path!: string;

  static relationMappings: RelationMappings = {
    user: {
      relation: BaseModel.HasManyRelation,
      modelClass: UserModel,
      join: {
        from: "profile_pictures.user_id",
        to: "user.id",
      },
    },
  };
}

export { ProfilePictureModel };
export type ProfilePictureSchema = ModelObject<ProfilePictureModel>;
