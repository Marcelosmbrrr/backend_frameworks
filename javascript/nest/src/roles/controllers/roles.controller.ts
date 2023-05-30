import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('roles')
export class RolesController {
  // Dependency Injection
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return this.rolesService.create(createRoleDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  findAll() {
    try {
      return this.rolesService.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.rolesService.findOne(+id);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.rolesService.update(+id, updateRoleDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.rolesService.remove(+id);
    } catch (e) {
      console.log(e);
    }
  }
}
