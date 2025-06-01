import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
