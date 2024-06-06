import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";

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

async function syncDb() {
  await _db.default.sync();
}

syncDb().catch(console.error);


// await db.sync();