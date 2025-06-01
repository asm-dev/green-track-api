import VolunteerSignup from "../models/volunteer-signup-model.js";

export const getVolunteers = async (req, res) => {
  const volunteers = await VolunteerSignup.find({
    eventId: req.params.eventId,
  });
  res.json(volunteers);
};

export const signup = async (req, res) => {
  const newSignup = new VolunteerSignup(req.body);
  await newSignup.save();
  res.status(201).json(newSignup);
};
