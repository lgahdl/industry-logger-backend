import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { patchSelectQueryBuilder } from 'typeorm-global-scopes';

async function bootstrap() {
  patchSelectQueryBuilder();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
