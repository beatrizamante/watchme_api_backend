import Knex from "knex";
import { config } from "../../config.js";
import { BaseModel } from "./models/BaseModel.js";

type EnvType = keyof typeof config.db;

const makeDatabase = () => {
  const env = config.env as EnvType;
  const knex = Knex.knex({
    ...config.db[env],
    debug: true,
  });

  BaseModel.knex(knex);

  return {
    connection: knex,

    async connect() {
      await knex.raw("SELECT 1");
      console.log("Database connected successfully.");
    },

    async disconnect() {
      await knex.destroy();
      console.log("Database disconnected successfully.");
    },
  };
};

export { makeDatabase };
