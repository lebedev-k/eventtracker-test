import path from "node:path";
import express from "express";
import cors from "cors";
import { EventPayload } from "../types/event-payload.js";
import { validateEvents } from "./utils/validate-events.js";
import { database } from "./utils/database.js";
import { preflightCheck } from "./utils/preflight-check.js";

const app = express();

app.on("error", console.error);

// only available in prod build because I didn't feel like
// putting typescript transpiler into runtime just to
// transpile the script during development
app.use(
  "/tracker",
  express.static(path.join(import.meta.dirname, "assets", "tracker.js")),
);

app.post("/track", cors(), express.text(), (req, res, next) => {
  try {
    let receivedEvents: EventPayload[];

    try {
      receivedEvents = JSON.parse(req.body) as EventPayload[];
    } catch {
      res.status(422).send();

      next();
    }

    if (validateEvents(receivedEvents)) {
      database.client
        .db(process.env.MONGO_DATABASE_NAME)
        .collection("tracks")
        .insertMany(receivedEvents)
        .catch(console.error);

      res.status(200).send();

      next();
    } else {
      res.status(422).send();

      next();
    }
  } catch (e) {
    next(e);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send();
});

async function main() {
  preflightCheck();
  await database.init();

  console.log(
    `Starting listening for connections at port ${process.env.SERVER_PORT}`,
  );
  app.listen(process.env.SERVER_PORT);
}

main();
