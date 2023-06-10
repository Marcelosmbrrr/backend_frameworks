import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RoleEntity implements Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;

  // For serialization with ClassSerializerInterceptor
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  deleted_at: Date;
}
