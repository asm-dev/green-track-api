import redisClient from "../config/redis.js";

export const cache =
  (key, ttl = 1800) =>
  async (req, res, next) => {
    const cached = await redisClient.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      await redisClient.setEx(key, ttl, JSON.stringify(body));
      res.sendResponse(body);
    };

    next();
  };

export const invalidateCache = async (keys = []) => {
  for (const key of keys) {
    await redisClient.del(key);
  }
};
