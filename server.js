import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";
import "./models/event-model.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

try {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Servidor inicializado en el puerto: ${PORT}`);
  });
} catch (error) {
  console.error("No se ha podido iniciar el servidor. Error:", error);
}
