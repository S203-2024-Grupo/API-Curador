import { validate } from "uuid";
import { Critic } from "../models/Critic.js";
import { Movie } from "../models/Movie.js";

class CriticController {

  async find_by_movie(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    const critics = await Critic.findAll({ where: { movie_id: id } });

    if (!critics) {
      return response.status(404).json({ message: "Critics not found" });
    }

    return response.json(critics);
  }

  async find_by_user(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    const critics = await Critic.findAll({ where: { user_id: id } });

    if (!critics) {
      return response.status(404).json({ message: "Critics not found" });
    }

    return response.json(critics);
  }


  async create(request, response) {
    const { review, rating, movie_id } = request.body;

    try {
      if (!review || !rating || !movie_id) {
        throw new Error("Missing fields");
      }

      const payload = JSON.parse(request.user.user);
      
      const user_id = payload.id;

      const movie = await Movie.findOne({ where: { id: movie_id } });

      if (!movie) throw new Error("Movie not found");


      const critic = await Critic.create({
          review,
          rating,
          user_id: user_id,
          movie_id: movie_id,
      });
      return response.status(201).json(critic);
      
    } catch (error) {
      return response.status(400).json({ message: error.message });
      
    }

  }

  async update(request, response) {
    const { id } = request.params;
    const { review, rating } = request.body;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      await Critic.update(
        { review, rating },
        { where: { id } },
      );

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "Critic not found" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      await Critic.destroy({ where: { id } });

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "Critic not found" });
    }
  }
}

export default new CriticController();
