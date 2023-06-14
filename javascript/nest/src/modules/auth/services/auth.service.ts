import {
  Injectable,
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

    const token = await this.jwtService.signAsync({
      userId: user.id,
      roleId: user.roleId,
    });

    if (!token) {
      throw new InternalServerErrorException();
    }

    // Event to send email
    const event = new SignInEvent();
    event.name = user.name;
    event.email = user.email;
    event.datetime = new Date().toLocaleString();
    this.eventEmitter.emit('auth.signin', event);

    const payload = {
      user: {
        id: user.id,
        role: {
          id: user.roleId,
          privileges: user.role.ModuleRole,
        },
      },
      token: token,
    };

    return payload;
  }

  async refreshAndVerifyAuthentication(req: Request, res: Response) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const token_payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!token_payload) {
      throw new UnauthorizedException('Token is invalid.');
    }

    const user = await this.prismaService.user.findUnique({
      include: {
        role: {
          include: {
            ModuleRole: true,
          },
        },
      },
      where: {
        id: token_payload.userId,
      },
    });

    const payload = {
      user: {
        id: user.id,
        role: {
          id: user.roleId,
          privileges: user.role.ModuleRole,
        },
      },
    };

    return payload;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async signUp(data: SignUpDTO) {
    const { name, email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new ConflictException('Email already exists.');
    }

    if (user.email_verified_at === null) {
      throw new UnauthorizedException('Verify your e-mail.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        roleId: 2,
        password: hashedPassword,
      },
    });

    // Event to send email
    const event = new SignUpEvent();
    event.name = name;
    event.email = email;
    event.datetime = new Date().toLocaleString();
    this.eventEmitter.emit('auth.signup', event);
  }
}
