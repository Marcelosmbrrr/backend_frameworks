import { IsEmail, IsString, Matches, Length, IsInt } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignUpDTO {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Matches('password')
  password_confirmation: string;
}
