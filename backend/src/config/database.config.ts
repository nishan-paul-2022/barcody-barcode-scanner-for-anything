import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
});
