import { Router } from "express";
import CriticController from "../controllers/Critic.js";



const criticRouter = Router();

criticRouter.get("/critic/movie/:id", (request, response) =>
  CriticController.find_by_movie(request, response),
);

criticRouter.get("/critic/user/:id", (request, response) =>
  CriticController.find_by_user(request, response),
);

criticRouter.post("/critic", (request, response) =>
  CriticController.create(request, response),
);

criticRouter.put("/critic/:id", (request, response) =>
  CriticController.update(request, response),
);

criticRouter.delete("/critic/:id", (request, response) =>
  CriticController.delete(request, response),
);

export default criticRouter;
