import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  // Dependency Injection
  constructor(private readonly authService: AuthService) {}

  @Post()
  signin(@Req() request: Request) {
    try {
      return this.authService.signin(request);
    } catch (e) {
      console.log(e);
    }
  }
}
