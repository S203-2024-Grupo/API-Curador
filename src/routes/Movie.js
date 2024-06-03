import { Router } from "express";

import MovieController from "../controllers/Movie.js";

const movieRouter = Router();

movieRouter.get("/movie", (request, response) =>
  MovieController.list(request, response),
);

movieRouter.get("/movie/:id", (request, response) =>
  MovieController.find(request, response),
);

movieRouter.post("/movie", (request, response) =>
  MovieController.create(request, response),
);

movieRouter.put("/movie/:id", (request, response) =>
  MovieController.update(request, response),
);

movieRouter.delete("/movie/:id", (request, response) =>
  MovieController.delete(request, response),
);

export default movieRouter;
