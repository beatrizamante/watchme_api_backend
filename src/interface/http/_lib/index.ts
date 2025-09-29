import { FastifyRequest } from "fastify";
import { container } from "../../../application/_lib/container.ts";

type ScopedContainer = {};

export const createRequestScopedContainer = (request: FastifyRequest) => {
  const scopedContainer = container.createScope<ScopedContainer>();

  return scopedContainer.cradle;
};
