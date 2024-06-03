import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "../config/db.js";
import { Critic } from "./Critic.js";

export const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: uuidv4,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await db.sync();
