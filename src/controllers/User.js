import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "uuid";

import { User } from "../models/User.js";

class UserController {
  async list(_, response) {
    const users = await User.findAll();

    return response.json(users);
  }

  async find(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.json(user);
  }

  async create(request, response) {
    const { username, email, password } = request.body;

    try {
      if (!username || !email || !password) {
        throw new Error("Missing fields");
      }

      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        throw new Error("Email already exists");
      }
      const hashedPassword = await hash(password, 10);
      
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
  
      return response.status(201).json(user);
      
    } catch (error) {
      return response.status(400).json({ message: error.message });
      
    }

  }

  async update(request, response) {
    const { id } = request.params;
    const { username, email } = request.body;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      await User.update({ username, email }, { where: { id } });

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "User not found" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!validate(id)) {
      return response.status(404).json({ message: "Invalid ID" });
    }

    try {
      await User.destroy({ where: { id } });

      return response.status(204).send();
    } catch (err) {
      return response.status(404).json({ message: "User not found" });
    }
  }

  async login(request, response) {
    const { email, password } = request.body;


    try {
      const user = await User.findOne({ where: { email } });


      if (!(await compare(password, user.password))) {
        return response.status(401).json({ message: "Senha incorreta" });
      }


      const token = jwt.sign(
        { user: JSON.stringify(user) },
        process.env.PRIVATE_KEY,
        { expiresIn: "7d" },
      );

      return response.json({ user, token });
    } catch (err) {
      return response.status(404).json({ message: "User not found" });
    }
  }
}

export default new UserController();