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
      { role_id: 1, module_id: 1, read: true, write: true },
      { role_id: 1, module_id: 2, read: true, write: true },
      { role_id: 2, module_id: 1, read: true, write: false },
      { role_id: 2, module_id: 2, read: true, write: false },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'Administrator',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('123123', 10),
        role_id: 1,
        active: true,
      },
      {
        name: 'Fredo Corleone',
        email: 'fredo@gmail.com',
        password: await bcrypt.hash('123123', 10),
        role_id: 2,
        active: true,
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
