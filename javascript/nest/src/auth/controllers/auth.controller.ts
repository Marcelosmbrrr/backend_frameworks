import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Dependency Injection
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signInDTO: SignInDTO) {
    try {
      return this.authService.signin(signInDTO);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('signup')
  signup(@Body() signUpDTO: SignUpDTO) {
    try {
      return this.authService.signup(signUpDTO);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('signout')
  signout(@Req() request: Request) {
    try {
      return this.authService.signout(request);
    } catch (e) {
      console.log(e);
    }
  }
}
