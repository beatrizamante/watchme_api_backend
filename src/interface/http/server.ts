import fastifyCookie from "@fastify/cookie";
import Fastify from "fastify";

import { config } from "../../config.ts";
import { errorPlugin } from "./error/errorHandler.ts";

const makeServer = async () => {
  const server = Fastify({ logger: config.http.logger[config.env] });

  server.register(fastifyCookie);
  server.register(errorPlugin);

  return server;
};

export { makeServer };
