import { Model } from "objection";

abstract class BaseModel extends Model {
  created_at!: string;
  updated_at!: string;

  $beforeInsert(): void {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updated_at = new Date().toISOString();
  }
}

export { BaseModel };
