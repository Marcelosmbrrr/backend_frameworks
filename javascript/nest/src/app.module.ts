import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // https://docs.nestjs.com/techniques/configuration
import { EventEmitterModule } from '@nestjs/event-emitter'; // https://docs.nestjs.com/techniques/events#events
// Custom
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ChatModule } from './modules/chat/chat.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    DashboardModule,
    UsersModule,
    RolesModule,
    ChatModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
