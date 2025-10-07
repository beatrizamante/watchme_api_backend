import { config } from "./config.js";
import { makeDatabase } from "./infrastructure/database/database.js";
import { makeServer } from "./interface/http/server.js";

const database = makeDatabase();

database
  .connect()
  .then(async () => {
    const server = await makeServer();

    const address = server.listen({ port: config.http.port });

    console.log(`Webserver listening at: ${address}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
