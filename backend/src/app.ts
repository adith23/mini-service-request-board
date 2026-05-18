import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import routes from "./routes/index.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (config.env !== "test") {
  app.use(morgan(config.isProduction ? "combined" : "dev"));
}

app.use("/api", routes);

// Keep 404 and error handling last in the middleware chain.
app.use(notFound);
app.use(errorHandler);

export default app;
