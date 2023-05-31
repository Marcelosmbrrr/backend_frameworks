import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // https://docs.nestjs.com/techniques/configuration
// Custom
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UsersModule, RolesModule, AuthModule, PrismaModule, ConfigModule.forRoot()], 
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule { }
