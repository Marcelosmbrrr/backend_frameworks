import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
// Custom
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class UsersService {
  // Dependency Injection
  constructor(
    private readonly prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) { }

  async create({ name, email, role_id }: CreateUserDto) {
    await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        role_id: role_id,
        password: await bcrypt.hash('123123', 10),
      },
    });
  }

  async findAll(limit: number, offset: number, search: string) {
    const users = await this.prismaService.user.findMany({
      skip: offset,
      take: limit,
      include: {
        role: true,
      },
    });

    return users;
  }

  async findOne(id: number) {
    const users = await this.prismaService.user.findMany({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });

    return users;
  }

  async update(id: number, { name, email, role_id }: UpdateUserDto) {
    await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        role_id: role_id,
        password: await bcrypt.hash('123123', 10),
      },
    });
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    return 'Upload-file';
  }

  async remove(id: number) {
    await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
