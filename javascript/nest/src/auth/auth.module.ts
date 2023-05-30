import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Custom
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { jwtConstants } from './constans';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
