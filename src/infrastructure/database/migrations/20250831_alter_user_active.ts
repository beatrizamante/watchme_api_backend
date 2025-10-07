import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (t) => {
    t.boolean("active").notNullable().defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (t) => {
    t.dropColumn("active");
  });
}
