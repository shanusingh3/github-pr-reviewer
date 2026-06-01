import IORedis from 'ioredis';

export const redis = new IORedis({
  host: 'redis',
  port: 6379,
  maxRetriesPerRequest: 1,
});