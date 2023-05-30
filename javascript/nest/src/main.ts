import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// Entry point
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // https://docs.nestjs.com/techniques/validation#auto-validation - execute defined dto validations automatically
  app.enableCors(); // https://docs.nestjs.com/security/cors 
  app.use(cookieParser()); // https://docs.nestjs.com/techniques/cookies
  app.use(helmet()); // https://docs.nestjs.com/security/helmet 
  await app.listen(8000);
}

bootstrap();
