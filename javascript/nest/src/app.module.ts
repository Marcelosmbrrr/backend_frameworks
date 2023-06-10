import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // https://docs.nestjs.com/techniques/configuration
import { EventEmitterModule } from '@nestjs/event-emitter'; // https://docs.nestjs.com/techniques/events#events
import { APP_INTERCEPTOR } from '@nestjs/core';
// Custom
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';

@Module({
  imports: [
    DashboardModule,
    UsersModule,
    RolesModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }
