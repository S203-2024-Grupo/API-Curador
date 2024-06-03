import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "../config/db.js";

export const Movie = db.define("Movie", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: uuidv4,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await db.sync();
