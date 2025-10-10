import redis from '../utils/redisClient.js'

export const cache = (keyPrefix) => async (req, res, next) => {
  const key = `${keyPrefix}:${req.originalUrl}`;

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log('🟢 Cache HIT →', key);
      return res.json(JSON.parse(cached));
    }
    console.log('🔴 Cache MISS →', key);

    // Intercept response to cache later
    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      await redis.setEx(key, 60 * 5, JSON.stringify(data)); // cache 5 minutes
      originalJson(data);
    };
    next();
  } catch (err) {
    console.error('Redis cache error:', err);
    next(); 
  }
};

