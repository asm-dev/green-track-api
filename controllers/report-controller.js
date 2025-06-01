import { invalidateCache } from "../middlewares/cache-middleware.js";
import Report from "../models/report-model.js";

export const getAll = async (req, res) => {
  const reports = await Report.findAll();
  res.json(reports);
};

export const getActive = async (req, res) => {
  const reports = await Report.findAll({ where: { status: "active" } });
  res.json(reports);
};

export const create = async (req, res) => {
  const report = await Report.create(req.body);
  await invalidateCache(["/reports/active"]);
  res.status(201).json(report);
};

export const update = async (req, res) => {
  const report = await Report.findByPk(req.params.id);
  if (!report) return res.sendStatus(404);
  await report.update(req.body);
  await invalidateCache(["/reports/active"]);
  res.json(report);
};

export const remove = async (req, res) => {
  const report = await Report.findByPk(req.params.id);
  if (!report) return res.sendStatus(404);
  await report.destroy();
  await invalidateCache(["/reports/active"]);
  res.sendStatus(204);
};
