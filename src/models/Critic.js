import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "../config/db.js";

import { Movie } from "./Movie.js";
import { User } from "./User.js";

export const Critic = db.define("Critic", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: uuidv4,
  },

  review: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Critic.belongsTo(User);
Critic.belongsTo(Movie);

User.hasMany(Critic);
Movie.hasMany(Critic);

await db.sync();
