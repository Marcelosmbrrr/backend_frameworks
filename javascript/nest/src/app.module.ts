import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // https://docs.nestjs.com/techniques/configuration
// Custom
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

// Root Module - the root module is the starting point Nest uses to build the application graph
// https://docs.nestjs.com/modules
@Module({
  imports: [UsersModule, RolesModule, AuthModule, ConfigModule.forRoot()], // Modules
  controllers: [AppController],
  providers: [AppService], // Services - dependencies
})
export class AppModule {}
