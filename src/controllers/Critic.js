import { validate } from "uuid";

import { Critic } from "../models/Critic.js";

class CriticController {
  async find_by_movie(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    const critics = await Critic.findAll({ where: { MovieId: id } });

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

    const critics = await Critic.findAll({ where: { UserId: id } });

    if (!critics) {
      return response.status(404).json({ message: "Critics not found" });
    }

    return response.json(critics);
  }


  async create(request, response) {
    const { review, rating } = request.body;

    const critic = await Critic.create({
        review,
        rating
    });

    return response.status(201).json(critic);
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
