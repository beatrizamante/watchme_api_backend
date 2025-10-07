declare module "fastify" {
  interface FastifyReply {
    locals: {
      userId?: number | null;
    };
  }

  interface FastifyRequest {
    userId?: number | null;
  }
}
