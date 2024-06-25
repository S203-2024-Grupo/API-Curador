import { validate } from "uuid";
import { Critic } from "../models/Critic.js";
import { Movie } from "../models/Movie.js";
import jwt from "jsonwebtoken";

function verfy_token(request){
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token
}
function userId_by_Token(token){
  return  JSON.parse(jwt.verify(token, process.env.PRIVATE_KEY).user).id;
}

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
    const token = verfy_token(request)
    const user_id = userId_by_Token(token)

    try {
      if (!review || !rating || !movie_id) {
        throw new Error("Missing fields");
      }

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
    const user_id = userId_by_Token(verfy_token(request))

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      const critic = await Critic.findOne({where:{id:id}})
      if(critic.user_id != user_id){
        return response.status(401).json({ message: "You cannot change other users' critics" })
      }

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
    const user_id = userId_by_Token(verfy_token(request))

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      const critic = await Critic.findOne({where:{id:id}})
      if(critic.user_id != user_id){
        return response.status(401).json({ message: "You cannot delete other users' critics" })
      }
      
      await Critic.destroy({ where: { id } });

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "Critic not found" });
    }
  }
}

export default new CriticController();
