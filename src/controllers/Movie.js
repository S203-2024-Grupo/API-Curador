import { validate } from "uuid";

import { Movie } from "../models/Movie.js";

class MovieController {
  async list(_, response) {
    const movies = await Movie.findAll();

    return response.json(movies);
  }

  async find(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      return response.status(404).json({ message: "Movie not found" });
    }

    return response.json(movie);
  }

  async create(request, response) {
    const { name, description, score, genre, director } = request.body;

    const movie = await Movie.create({
      name,
      description,
      score,
      genre,
      director,
    });

    return response.status(201).json(movie);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, score, genre, director } = request.body;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      await Movie.update(
        { name, description, score, genre, director },
        { where: { id } },
      );

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "Movie not found" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      await Movie.destroy({ where: { id } });

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "Movie not found" });
    }
  }
}

export default new MovieController();
