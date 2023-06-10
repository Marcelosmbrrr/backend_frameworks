import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  email: string;
  email_verified_at: Date;
  name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  roleId: number;

  // For serialization with ClassSerializerInterceptor
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  password: string;

  @Exclude()
  deleted_at: Date;

  @Expose()
  get verified(): boolean {
    return this.email_verified_at === null ? false : true;
  }
}
