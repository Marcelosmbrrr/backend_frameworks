import { IsEmail, Length, IsInt } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email: string;
  password: string;
}

export class SignUpDTO {
  @Length(3, 255)
  name: string;
  @IsEmail()
  email: string;
  @IsInt()
  roleId: number;
  password: string;
  password_confirmation: string;
}
