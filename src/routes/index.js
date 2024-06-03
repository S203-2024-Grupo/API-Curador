import { Router } from "express";
import jwt from "jsonwebtoken";

import userRouter from "./User.js";
import movieRouter from "./Movie.js";
import criticRouter from "./Critic.js";

const routes = Router();

routes.use(userRouter);

routes.use((request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Token not provided" });
  }

  try {
    jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (err) {
    return response.status(401).json({ message: "Token invalid" });
  }

  next();
});

routes.use(movieRouter);
routes.use(criticRouter)

export default routes;
