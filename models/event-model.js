import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Event = sequelize.define("Event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Event;
