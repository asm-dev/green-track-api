import { invalidateCache } from "../middlewares/cache-middleware.js";
import Event from "../models/event-model.js";

export const getUpcoming = async (req, res) => {
  const now = new Date();
  const events = await Event.findAll({
    where: {
      date: {
        [Event.sequelize.Op.gt]: now,
      },
    },
    order: [["date", "ASC"]],
  });

  res.json(events);
};

export const create = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    await invalidateCache(["/events/upcoming"]);
    res.status(201).json(event);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Los datos no son válidos", details: err.message });
  }
};
