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
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    await this.usersService.create(createUserDto);

    return response.status(201).send({
      message: 'User successful created!',
    });
  }

  @Get()
  async findAll(
    @Query('search') search,
    @Query('limit') limit,
    @Query('offset') offset,
    @Res() response: Response,
  ) {
    const users = await this.usersService.findAll(
      Number(limit),
      Number(offset),
      search,
    );

    response.status(200).send({
      users: users,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const user = await this.usersService.findOne(+id);

    response.status(200).send({
      user: user,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    await this.usersService.update(+id, updateUserDto);

    response.status(200).send({
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
    await this.usersService.uploadImage(+id, file);

    response.status(200).send({
      message: 'User image has been updated!',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    await this.usersService.remove(+id);

    response.status(200).send({
      message: 'User has been deleted!',
    });
  }
}
