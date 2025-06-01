import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
