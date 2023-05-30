import { IsInt, IsEmail, Length, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Length(3, 255)
  name: string;
  @IsEmail()
  email: string;
  @IsInt()
  roleId: number;
  photo: string;
  @IsOptional()
  password: string;
  @IsOptional()
  password_confirmation: string;
}
