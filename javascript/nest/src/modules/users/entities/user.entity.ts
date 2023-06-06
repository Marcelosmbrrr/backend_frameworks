import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  email_verified_at: Date;
  name: string;
  image: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  roleId: number;
}
