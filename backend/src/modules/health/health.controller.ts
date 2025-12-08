import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () =>
        this.microservice.pingCheck('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.getRedisHost(),
            port: this.getRedisPort(),
          },
        }),
    ]);
  }

  @Get('db')
  @HealthCheck()
  checkDb() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  @Get('redis')
  @HealthCheck()
  checkRedis() {
    return this.health.check([
      () =>
        this.microservice.pingCheck('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.getRedisHost(),
            port: this.getRedisPort(),
          },
        }),
    ]);
  }

  private getRedisHost(): string {
    const url = this.configService.get<string>('REDIS_URL');
    if (!url) return 'localhost';
    try {
      if (!url.startsWith('redis://')) return url; // Handle host-only string
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return 'localhost';
    }
  }

  private getRedisPort(): number {
    const url = this.configService.get<string>('REDIS_URL');
    if (!url) return 6379;
    try {
      if (!url.startsWith('redis://')) return 6379;
      const parsed = new URL(url);
      return Number(parsed.port) || 6379;
    } catch {
      return 6379;
    }
  }
}
