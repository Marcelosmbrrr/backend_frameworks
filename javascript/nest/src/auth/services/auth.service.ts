import {
  Injectable,
  Req,
  Body,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async signin(@Body() data: SignInDTO, response: Response) {
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
      throw new BadRequestException('Wrong credentials');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      email_verified_at: user.email_verified_at,
      role: user.roleId,
      created_at: user.created_at,
    };

    const token = await this.jwtService.signAsync(payload);

    if (!token) {
      throw new InternalServerErrorException();
    }

    response.cookie('personal_token', token);

    // Job - Send login notification email

    response.send({ message: 'Logged Succefully!' });
  }

  async signup(@Body() data: SignUpDTO, response: Response) {
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

    return response.send({ message: 'Successful registration!' });
  }

  async signout(@Req() request: Request, response: Response) {
    response.clearCookie('personal_token');
    // Job - send notification email
    return response.send({ message: 'Session has been expired.' });
  }
}
