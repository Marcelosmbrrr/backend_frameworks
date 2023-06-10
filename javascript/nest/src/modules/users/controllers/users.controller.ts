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
@UseGuards(RoleGuard)
export class UsersController {
  // Dependency Injection
  constructor(private readonly usersService: UsersService) { }

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
  @Get()
  async findAll(
    @Query('limit') limit,
    @Query('offset') offset,
    @Res() response: Response,
  ) {
    const users = await this.usersService.findAll(
      Number(limit),
      Number(offset),
    );

    response.send(200).send({
      data: users,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const user = this.usersService.findOne(+id);

    response.send(200).send({
      data: user,
    });
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    this.usersService.remove(+id);

    response.send(200).send({
      message: 'User has been deleted!',
    });
  }
}
