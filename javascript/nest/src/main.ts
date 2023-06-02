import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// Custom adds:
// Global Pipes - ValidationPipe - https://docs.nestjs.com/techniques/validation#auto-validation - execute defined dto validations automatically
// https://docs.nestjs.com/security/cors
// https://docs.nestjs.com/techniques/cookies
// https://docs.nestjs.com/security/helmet
// Hot reload: https://docs.nestjs.com/recipes/hot-reload

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet());
  await app.listen(8000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
