import { IsInt, IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsInt()
  roleId: number;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  password_confirmation: string;
}
