import redis from './redisClient.js'

// Delete one or more keys by pattern
export const clearCache = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length) {
      await redis.del(keys);
      console.log(`🧹 Cleared ${keys.length} cache entries for pattern: ${pattern}`);
    }
  } catch (err) {
    console.error('Redis clearCache error:', err);
  }
};