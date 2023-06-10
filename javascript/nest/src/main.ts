import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exception-filter/all-exceptions.filter';

// Custom adds:
// Global Pipes - ValidationPipe - https://docs.nestjs.com/techniques/validation#auto-validation - execute defined dto validations automatically
// Cors: https://docs.nestjs.com/security/cors
// Cookies: https://docs.nestjs.com/techniques/cookies
// Helmet: https://docs.nestjs.com/security/helmet
// Hot reload (webpack): https://docs.nestjs.com/recipes/hot-reload
// Exceptions handler:

declare const module: any;

async function bootstrap() {
  // App instance
  const app = await NestFactory.create(AppModule);

  // Adds
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  app.use(helmet());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Init server
  await app.listen(8000);
}

bootstrap();
