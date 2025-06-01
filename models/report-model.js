import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Report = sequelize.define("Report", {
  description: DataTypes.STRING,
  location: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("active", "resolved"),
    defaultValue: "active",
  },
});

export default Report;
