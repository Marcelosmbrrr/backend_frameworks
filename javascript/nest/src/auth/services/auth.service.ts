import { Injectable, Req, Body } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  // Dependency Injection
  constructor(private readonly prismaService: PrismaService) {}

  signin(@Body() signInDTO: SignInDTO) {
    const { email, password } = SignInDTO;
    return 'Sign in';
  }

  signup(@Body() signUpDTO: SignUpDTO) {
    const { name, email, roleId, password, password_confirmation } = SignUpDTO;
    return 'Sign up';
  }

  signout(@Req() request: Request) {
    return 'Sign out';
  }
}
