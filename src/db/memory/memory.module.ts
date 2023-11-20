import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { config } from 'dotenv';

config();
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      url: `redis://${process.env.DB_REDIS_HOST}:${process.env.DB_REDIS_PORT}`,
      store: redisStore as any,
      ttl: Number(process.env.DB_REDIS_TTL) || 900,
    }),
  ],
  exports: [CacheModule],
})
export class MemoryModule {}
