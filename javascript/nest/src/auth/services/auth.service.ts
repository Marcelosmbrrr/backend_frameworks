import {
  Injectable,
  Req,
  Body,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
// Custom
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  // Dependency Injection
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(@Body() data: SignInDTO, res: Response) {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const comparePassword = await bcrypt.compare(hashedPassword, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.roleId,
      created_at: user.created_at,
    };

    const token = await this.jwtService.signAsync(payload);

    if (!token) {
      throw new InternalServerErrorException();
    }

    res.cookie('personal_token', token);

    // Job - Send login notification email

    return res.send({ message: 'Logged Succefully!' });
  }

  async signUp(@Body() data: SignUpDTO, res: Response) {
    const { name, email, roleId, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new ConflictException('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const create = await this.prismaService.user.create({
      data: {
        name,
        email,
        roleId,
        password: hashedPassword,
      },
    });

    if (!create) {
      throw new InternalServerErrorException(
        'Registration failed. Try again later.',
      );
    }

    // Job - Send verification email

    return res.send({ message: 'Successful registration!' });
  }

  async signOut(@Req() request: Request, res: Response) {

    res.clearCookie('personal_token');

    // Job - send notification email
    
    return res.send({ message: 'Session has been expired.' });
  }
}
