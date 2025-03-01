import { PrismaClient } from '@prisma/client';
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
      clearanceLevel: 5,
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: "Regular user's role",
      clearanceLevel: 0,
    },
  });

  const password = await hash('KataKunci>2025', 10);
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

  const standardUser = await prisma.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Regular',
      roleId: userRole.id,
      password: password,
      createdBy: adminUser.id,
    },
  });

  const flatCategory = await prisma.productCategory.create({
    data: {
      name: 'Flat',
      gender: 'WOMEN',
    },
  });

  const someProductGroup = await prisma.productGroup.create({
    data: {
      skuNumeric: 12345,
      productCategoryId: flatCategory.id,
      name: null,
    },
  });

  const darkBrownColor = await prisma.color.upsert({
    where: { name: 'Dark Brown' },
    update: {},
    create: { name: 'Dark Brown', hexCode: '#654321' },
  });

  const lightBrownColor = await prisma.color.upsert({
    where: { name: 'light Brown' },
    update: {},
    create: { name: 'Light Brown', hexCode: '#b5651d' },
  });

  try {
    await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          sku: 'A12345-D.Brown/L.Brown',
          productGroupId: someProductGroup.id,
          createdBy: standardUser.id,
        },
      });

      await tx.productColors.upsert({
        where: {
          productId_colorId: {
            productId: newProduct.id,
            colorId: darkBrownColor.id,
          },
        },
        update: {},
        create: {
          productId: newProduct.id,
          colorId: darkBrownColor.id,
          order: 1,
        },
      });
      await tx.productColors.upsert({
        where: {
          productId_colorId: {
            productId: newProduct.id,
            colorId: lightBrownColor.id,
          },
        },
        update: {},
        create: {
          productId: newProduct.id,
          colorId: lightBrownColor.id,
          order: 2,
        },
      });
    });
  } catch (error) {
    console.error('Error creating Product and ProductColors: ', error);
  }

  await prisma.labourCost.create({
    data: {
      productGroupId: someProductGroup.id,
      skuNumeric: 12345,
      drawingUpper: 3000,
      drawingLining: 1000,
      stitchingUpper: 4500,
      stitchingOutsole: null,
      stitchingInsole: null,
      lasting: 5000,
      createdBy: standardUser.id,
    },
  });

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
