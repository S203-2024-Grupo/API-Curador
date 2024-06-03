import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";


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

await db.sync();

