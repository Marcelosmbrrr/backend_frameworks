import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Dependency Injection
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  signin(@Body() signInDTO: SignInDTO, @Res() response) {
    return this.authService.signin(signInDTO, response);
  }

  @Post('signup')
  signup(@Body() signUpDTO: SignUpDTO, @Res() response) {
    return this.authService.signup(signUpDTO, response);
  }

  @Post('signout')
  signout(@Req() request, @Res() response) {
    return this.authService.signout(request, response);
  }
}
