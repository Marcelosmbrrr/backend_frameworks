import { Length } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @Length(3, 255)
  name: string;
  privileges: {
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
