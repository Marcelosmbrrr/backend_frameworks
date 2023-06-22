import { Length, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
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
