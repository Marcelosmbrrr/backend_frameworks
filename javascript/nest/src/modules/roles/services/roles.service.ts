import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
// Custom
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class RolesService {
  // Dependency Injection
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateRoleDto) {
    const { name, privileges } = data;
    return 'This action adds a new role';
  }

  async findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, data: UpdateRoleDto) {
    const { name, privileges } = data;
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
