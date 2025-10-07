import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("people", (t) => {
    t.increments("id");
    t.integer("user_id").notNullable();
    t.string("name").notNullable();
    t.specificType("embedding", "bytea").notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("people");
}
