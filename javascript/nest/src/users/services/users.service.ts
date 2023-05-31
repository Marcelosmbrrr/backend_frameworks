import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
// Custom
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(data: CreateUserDto) {

    const { name, email, roleId, password, password_confirmation } = data;

     // Job - Send verification email
     
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, data: UpdateUserDto) {
    const { name, email, roleId, password, password_confirmation } = data;
    return `This action updates a #${id} user`;
  }

  async uploadImage(id: number, file: Express.Multer.File){
    console.log(file);
    return "Upload file";
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}