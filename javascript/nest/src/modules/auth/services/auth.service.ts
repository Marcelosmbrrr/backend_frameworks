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
      include: {
        role: {
          include: {
            ModuleRole: true,
          },
        },
      },
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
      role: {
        id: user.roleId,
        privileges: user.role.ModuleRole,
      },
    };

    const token = await this.jwtService.signAsync(payload);

    if (!token) {
      throw new InternalServerErrorException();
    }

    res.cookie('access-token', token, { httpOnly: true });

    // Event to send email
    const event = new SignInEvent();
    event.name = user.name;
    event.email = user.email;
    event.datetime = new Date().toLocaleString();
    this.eventEmitter.emit('auth.signin', event);

    return res.status(200).send({
      message: 'Logged succefully!',
      user: payload,
    });
  }

  async authenticatedUserData(userId: number, res: Response) {
    const user = await this.prismaService.user.findUnique({
      include: {
        role: {
          include: {
            ModuleRole: true,
          },
        },
      },
      where: {
        id: userId,
      },
    });

    const payload = {
      id: user.id,
      role: {
        id: user.roleId,
        privileges: user.role.ModuleRole,
      },
    };

    return res.status(200).send({
      message: 'User data has been found.',
      user: payload,
    });
  }

  async authenticationCheck(request: Request) {
    const token = request.cookies['access-token'];

    if (!token) {
      throw new UnauthorizedException('Token is missing.');
    }

    try {
      // The token is entirely verified - with its time expiration
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Token is invalid.');
    }
  }

  async signUp(@Body() data: SignUpDTO) {
    const { name, email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new ConflictException('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const create = await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        roleId: 2,
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
  }
}
