import { Injectable } from '@nestjs/common';
// Custom
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  // Dependency Injection
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    const roles = await this.prismaService.role.findMany({
      include: {
        user: true,
      },
    });

    return {
      users: {
        created: users.length,
        verified: users.filter((user) => user.active).length,
        deleted: users.filter((user) => user.deleted_at != null).length,
      },
      roles: {
        created: roles.length,
        used: roles.filter((role) => role.user.length > 0).length,
        deleted: roles.filter((role) => role.deleted_at != null).length,
      },
    };
  }
}
