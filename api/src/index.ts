import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import { employeeRouter } from "./routes/employee";
import { tagRouter } from "./routes/tag";
import { officeRouter } from "./routes/office";
import config from "./config";
import runSeed from "./db/seed";

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    // await runSeed();

    app.use(bodyParser.json());
    app.use("/employees", employeeRouter);
    app.use("/tags", tagRouter);
    app.use("/offices", officeRouter);

    app.all("*", (req: Request, res: Response) => {
      res.status(404).json({
        error: "Not found",
        message: `${req.originalUrl} not found on this server`,
      });
    });

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

startServer();
