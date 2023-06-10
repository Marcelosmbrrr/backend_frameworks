import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common';
// Custom
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('roles')
@UseGuards(RoleGuard)
export class RolesController {
  // Dependency Injection
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
    @Res() response: Response,
  ) {
    this.rolesService.create(createRoleDto);

    return response.status(201).send({
      message: 'Role successful created!',
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(
    @Query('limit') limit,
    @Query('offset') offset,
    @Res() response: Response,
  ) {
    const roles = await this.rolesService.findAll(
      Number(limit),
      Number(offset),
    );

    response.send(200).send({
      data: roles,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const role = this.rolesService.findOne(+id);

    response.send(200).send({
      data: role,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() response: Response,
  ) {
    this.rolesService.update(+id, updateRoleDto);

    response.send(200).send({
      message: 'Role has been updated!',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    this.rolesService.remove(+id);

    response.send(200).send({
      message: 'Role has been deleted!',
    });
  }
}
