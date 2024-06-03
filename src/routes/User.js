import { Router } from "express";

import UserController from "../controllers/User.js";

const userRouter = Router();

userRouter.get("/user", (request, response) =>
  UserController.list(request, response),
);

userRouter.get("/user/:id", (request, response) =>
  UserController.find(request, response),
);

userRouter.post("/user", (request, response) =>
  UserController.create(request, response),
);

userRouter.post("/user/login/", (request, response) =>
  UserController.login(request, response),
);

userRouter.put("/user/:id", (request, response) =>
  UserController.update(request, response),
);

userRouter.delete("/user/:id", (request, response) =>
  UserController.delete(request, response),
);

export default userRouter;
