import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/v1/health (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect((res) => {
        // Status might be 503 if services are down, which is expected behavior
        if (res.status !== 200 && res.status !== 503) {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('details');
      });
  });

  it('/api/v1/health/db (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/health/db')
      .expect((res) => {
        if (res.status !== 200 && res.status !== 503) {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('details');
        // If successful, details should have database
        if (res.status === 200) {
          expect(res.body).toHaveProperty('details.database');
        }
      });
  });

  it('/api/v1/health/redis (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/health/redis')
      .expect((res) => {
        if (res.status !== 200 && res.status !== 503) {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('details');
        if (res.status === 200) {
          expect(res.body).toHaveProperty('details.redis');
        }
      });
  });
});
