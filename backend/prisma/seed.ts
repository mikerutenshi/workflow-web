import { Gender, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: "Programmer's role",
      clearanceLevel: 0,
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: "Regular user's role",
      clearanceLevel: 5,
    },
  });

  const password = await hash('KataKunci2025', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      email: 'admin@email.com',
      firstName: 'Admin',
      lastName: 'Istrator',
      roleId: adminRole.id,
      password: password,
      isActive: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Regular',
      roleId: userRole.id,
      password: password,
      createdBy: adminUser.id,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'yomeifung@gmail.com' },
    update: {},
    create: {
      email: 'yomeifung@gmail.com',
      firstName: 'Mei Fung',
      lastName: 'Yo',
      roleId: userRole.id,
      password: password,
      createdBy: adminUser.id,
      isActive: true,
    },
  });

  let heelsCategory = await prisma.productCategory.findFirst({
    where: { name: 'Heels' },
  });

  if (!heelsCategory) {
    heelsCategory = await prisma.productCategory.create({
      data: {
        name: 'Heels',
        gender: Gender.WOMEN,
      },
    });
  }

  let productGroup603 = await prisma.productGroup.findFirst({
    where: { skuNumeric: '00603' },
  });

  if (!productGroup603) {
    productGroup603 = await prisma.productGroup.create({
      data: {
        skuNumeric: '00603',
        productCategoryId: heelsCategory.id,
        name: 'Aviana',
        createdBy: user.id,
      },
    });
  }

  const darkBrownColor = await prisma.color.upsert({
    where: { name: 'Dark Brown' },
    update: {},
    create: { name: 'Dark Brown', hexCode: '#654321' },
  });

  const lightBrownColor = await prisma.color.upsert({
    where: { name: 'Light Brown' },
    update: {},
    create: { name: 'Light Brown', hexCode: '#b5651d' },
  });

  let product603 = await prisma.product.findFirst({
    where: {
      sku: 'B00603-L.Brown/D.Brown',
    },
  });

  if (!product603) {
    let colorIds = [lightBrownColor.id, darkBrownColor.id];
    let order = 1;
    product603 = await prisma.product.create({
      data: {
        sku: 'B00603-L.Brown/D.Brown',
        productGroupId: productGroup603.id,
        createdBy: user.id,
        productColors: {
          create: colorIds.map((colorId) => ({
            color: { connect: { id: colorId } },
            order: order++,
          })),
        },
      },
    });
  }

  console.log('Seeding is complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
