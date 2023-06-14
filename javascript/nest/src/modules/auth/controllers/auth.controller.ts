import { Controller, Post, Get, Res, Req, Body, Query } from '@nestjs/common';
import { Response, Request } from 'express';
// Custom
import { AuthService } from '../services/auth.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Dependency Injection
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  async signIn(@Body() signInDTO: SignInDTO, @Res() response: Response) {
    const data = await this.authService.signIn(signInDTO, response);

    return response.status(200).send({
      message: 'Sucessful authentication.',
      ...data,
    });
  }

  @Get('refresh-data')
  async refreshAndVerifyAuthentication(
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.authService.refreshAndVerifyAuthentication(
      request,
      response,
    );

    return response.status(200).send({
      message: 'User data has been loaded.',
      ...data,
    });
  }

  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDTO, @Res() response: Response) {
    await this.authService.signUp(signUpDTO);
    return response.status(201).send({ message: 'Successful registration!' });
  }

  @Post('signout')
  async signOut(@Res() response: Response) {
    return response.status(200).send({ message: 'Session has been expired.' });
  }
}
