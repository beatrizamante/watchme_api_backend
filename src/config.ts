import "dotenv/config";

import { Env, EnvType } from "./_lib/env.ts";

const env = Env.string("ENVIRONMENT", "development") as EnvType;

const loggerConfig = {
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
};

const http = {
  port: Env.number("PORT", 3000),
  host: Env.string("HOST", "0.0.0.0"),
  baseUrl: Env.string("SERVER_BASE_URL", "http://localhost:3000"),
  logger: {
    development: loggerConfig,
    production: true,
    test: false,
  },
};

const config = { env, http };

type Config = typeof config;

export { config };
export type { Config };
