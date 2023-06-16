import { IsInt, IsString, Matches, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsInt()
  role_id: number;
}
