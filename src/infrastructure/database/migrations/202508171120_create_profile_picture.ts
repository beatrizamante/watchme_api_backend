import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("profile_pictures", (t) => {
    t.increments("id");
    t.integer("user_id").notNullable();
    t.string("path").notNullable().unique();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("profile_pictures");
}
