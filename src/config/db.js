import { Sequelize } from "sequelize";

const db = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:@${process.env.DB_URL}:5432/s203`,
  {logging: false}
);

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db;
