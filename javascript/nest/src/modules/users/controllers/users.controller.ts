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
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';
// Custom
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('users')
export class UsersController {
  // Dependency Injection
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RoleGuard)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    this.usersService.create(createUserDto);

    return response.status(201).send({
      message: 'User successful created!',
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(RoleGuard)
  @Get()
  async findAll(@Query('limit') limit, @Query('offset') offset) {
    const users = await this.usersService.findAll(
      Number(limit),
      Number(offset),
    );

    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);

    return user;
  }

  @UseGuards(RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    this.usersService.update(+id, updateUserDto);

    response.send(200).send({
      message: 'User has been updated!',
    });
  }

  @UseGuards(RoleGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    this.usersService.uploadImage(+id, file);

    response.send(200).send({
      message: 'User image has been updated!',
    });
  }

  @UseGuards(RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    this.usersService.remove(+id);

    response.send(200).send({
      message: 'User has been deleted!',
    });
  }
}
