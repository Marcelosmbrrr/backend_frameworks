import { Length } from "class-validator";

export class CreateRoleDto {
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
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
