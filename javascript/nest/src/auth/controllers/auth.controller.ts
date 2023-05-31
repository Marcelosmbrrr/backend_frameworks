import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Dependency Injection
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  signIn(@Body() signInDTO: SignInDTO, @Res() response: Response) {
    return 'signin';
    //return this.authService.signIn(signInDTO, response);
  }

  @Post('signup')
  signUp(@Body() signUpDTO: SignUpDTO, @Res() response: Response) {
    return this.authService.signUp(signUpDTO, response);
  }

  @Post('signout')
  signOut(@Req() request: Request, @Res() response: Response) {
    return this.authService.signOut(request, response);
  }
}
