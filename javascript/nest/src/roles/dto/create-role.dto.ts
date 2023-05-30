export class CreateRoleDto {
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
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
