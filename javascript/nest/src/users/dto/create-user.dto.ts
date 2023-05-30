import { IsInt, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 255)
  name: string;
  @IsEmail()
  email: string;
  @IsInt()
  roleId: number;
  photo: string;
  email_verified_at: string;
  password: string;
  password_confirmation: string;
}
