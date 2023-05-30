import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Entry point
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // https://docs.nestjs.com/security/cors
  await app.listen(8000);
}

bootstrap();
