import db from "../config/db";
import { User } from "./User";
import { Movie } from "./Movie";
import { Critic } from "./Critic";

Critic.belongsTo(User);
Critic.belongsTo(Movie);

User.hasMany(Critic);
Movie.hasMany(Critic);

await db.sync();