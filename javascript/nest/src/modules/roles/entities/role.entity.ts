import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
