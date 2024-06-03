import "dotenv/config.js";

import Express from "express";
import cors from "cors";

import routes from "./routes/index.js";

import "./config/db.js";

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(routes);

app.listen(3333, () =>
  console.log(
    `🚀 Server started at http://${process.env.NODE_ENV === "prod" ? process.env.PROD_URL : "localhost"}:3333`,
  ),
);
