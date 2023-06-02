import {
  Injectable,
  Req,
  Body,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
// Custom
import { PrismaService } from '../../../../prisma/prisma.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';
import { SignInEvent } from '../events/signin.event';
import { SignUpEvent } from '../events/signup.event';

@Injectable()
export class AuthService {
  // Dependency Injection
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) { }

  async signIn(@Body() data: SignInDTO, res: Response) {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException('Wrong password');
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

    res.cookie('access-token', token);

    // Event to send email
    const event = new SignInEvent();
    event.name = user.name;
    event.email = user.email;
    event.datetime = new Date().toLocaleString();
    this.eventEmitter.emit('auth.signin', event);

    return res
      .status(200)
      .send({ message: 'Logged Succefully!', token: token });
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

    // Event to send email
    const event = new SignUpEvent();
    event.name = user.name;
    event.email = user.email;
    event.datetime = new Date().toLocaleString();
    this.eventEmitter.emit('auth.signup', event);

    return res.status(200).send({ message: 'Successful registration!' });
  }

  async signOut(@Req() request: Request, res: Response) {
    res.clearCookie('access-token');
    return res.status(200).send({ message: 'Session has been expired.' });
  }
}
