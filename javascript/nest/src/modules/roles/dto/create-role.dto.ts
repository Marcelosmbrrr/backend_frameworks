import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Length(3, 100)
  name: string;

  modules: {
    users: {
      read: boolean;
      write: boolean;
    };
    roles: {
      read: boolean;
      write: boolean;
    };
  };
}
