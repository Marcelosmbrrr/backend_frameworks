import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function init() {
  await prisma.module.createMany({
    data: [{ name: 'Users' }, { name: 'Roles' }],
  });

  await prisma.role.createMany({
    data: [{ name: 'Admin' }, { name: 'Common' }],
  });

  await prisma.moduleRole.createMany({
    data: [
      { roleId: 1, moduleId: 1, read: true, write: true },
      { roleId: 1, moduleId: 2, read: true, write: true },
      { roleId: 2, moduleId: 1, read: true, write: false },
      { roleId: 2, moduleId: 2, read: true, write: false },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'Administrator',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('123123', 10),
        roleId: 1,
        email_verified_at: new Date(),
      },
      {
        name: 'Fredo Corleone',
        email: 'fredo@gmail.com',
        password: await bcrypt.hash('123123', 10),
        roleId: 2,
        email_verified_at: new Date(),
      },
    ],
  });
}

// execute the main function
init()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
