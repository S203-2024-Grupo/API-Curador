import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import { User } from "./User.js";
import { Movie } from "./Movie.js";


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

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  movie_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

Critic.belongsTo(User, {
  foreignKey: 'user_id', 
  as: 'user', 
});

User.hasMany(Critic, {
  foreignKey: 'user_id',
  as: 'critics', 
});


Critic.belongsTo(Movie, {
  foreignKey: 'movieId', 
  as: 'movie', 
});


Movie.hasMany(Critic, {
  foreignKey: 'movieId',
  as: 'critics', 
});

await db.sync();


