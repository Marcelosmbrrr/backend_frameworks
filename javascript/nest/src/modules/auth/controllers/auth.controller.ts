import { Controller, Post, Get, Req, Res, Body, Query } from '@nestjs/common';
import { Request, Response } from 'express';
// Custom
import { AuthService } from '../services/auth.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Dependency Injection
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  async signIn(@Body() signInDTO: SignInDTO, @Res() response: Response) {
    return this.authService.signIn(signInDTO, response);
  }

  @Get('check-authentication')
  async checkAuthentication(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    await this.authService.authenticationCheck(request);
    return response.status(200).send({ message: 'User is authorized.' });
  }

  @Get('authenticated-user-data')
  async authenticatedUserData(
    @Res() response: Response,
    @Query('userId') userId: number,
  ) {
    return this.authService.authenticatedUserData(Number(userId), response);
  }

  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDTO, @Res() response: Response) {
    await this.authService.signUp(signUpDTO);
    return response.status(200).send({ message: 'Successful registration!' });
  }

  @Post('signout')
  async signOut(@Req() request: Request, @Res() response: Response) {
    response.clearCookie('access-token');
    return response.status(200).send({ message: 'Session has been expired.' });
  }
}
