import { ModelObject, RelationMappings } from "objection";
import { BaseModel } from "./BaseModel.js";
import { UserModel } from "./UserModel.ts";

class VideoModel extends BaseModel {
  static tableName = "videos";

  id!: number;
  user_id!: number;
  path!: string;

  static relationMappings: RelationMappings = {
    user: {
      relation: BaseModel.HasManyRelation,
      modelClass: UserModel,
      join: {
        from: "videos.user_id",
        to: "user.id",
      },
    },
  };
}

export { VideoModel };
export type VideoSchema = ModelObject<VideoModel>;
