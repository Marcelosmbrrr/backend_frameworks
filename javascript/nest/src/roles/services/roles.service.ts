import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  create(data: CreateRoleDto) {
    const { name, privileges } = data;
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, data: UpdateRoleDto) {
    const { name, privileges } = data;
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
