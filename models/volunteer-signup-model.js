import mongoose from "../config/mongo.js";

const VolunteerSignupSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  email: String,
});

const VolunteerSignup = mongoose.model(
  "VolunteerSignup",
  VolunteerSignupSchema
);
export default VolunteerSignup;
