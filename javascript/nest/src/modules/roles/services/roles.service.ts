import { Injectable } from '@nestjs/common';
// Custom
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class RolesService {
  // Dependency Injection
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateRoleDto) {
    const { name, modules } = data;

    console.log(modules);

    /*
    await this.prismaService.role.create({
      data: {
        name: name,
      },
    });
    */
  }

  async findAll(limit: number, offset: number, search: string) {
    const roles = await this.prismaService.role.findMany({
      include: {
        modules: true,
      },
      skip: offset,
      take: limit,
    });

    return roles;
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });

    return role;
  }

  async update(id: number, data: UpdateRoleDto) {
    const { name, modules } = data;

    await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.role.delete({
      where: {
        id: id,
      },
    });
  }
}
