import { Gender, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  const superuserRole = await prisma.role.upsert({
    where: { name: 'Superuser' },
    update: {},
    create: {
      name: 'Superuser',
      description: 'Develop app',
      clearanceLevel: 0,
    },
  });
  const financeRole = await prisma.role.upsert({
    where: { name: 'Finance' },
    update: {},
    create: {
      name: 'Finance',
      description: 'Review payroll reports',
      clearanceLevel: 2,
    },
  });
  const plannerRole = await prisma.role.upsert({
    where: { name: 'Planner' },
    update: {},
    create: {
      name: 'Planner',
      description: 'Input production plans',
      clearanceLevel: 4,
    },
  });
  const fieldRole = await prisma.role.upsert({
    where: { name: 'Field' },
    update: {},
    create: {
      name: 'Field',
      description: 'Input details on production field',
      clearanceLevel: 6,
    },
  });

  const password = await hash('KataKunci2025', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      email: 'admin@email.com',
      firstName: 'Super',
      lastName: 'User',
      roleId: superuserRole.id,
      password: password,
      isActive: true,
    },
  });
  const planner = await prisma.user.upsert({
    where: { email: 'planner@email.com' },
    update: {},
    create: {
      email: 'planner@email.com',
      firstName: 'Planner',
      lastName: 'User',
      roleId: plannerRole.id,
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
      roleId: financeRole.id,
      password: password,
      createdBy: adminUser.id,
      isActive: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'field@email.com' },
    update: {},
    create: {
      email: 'field@email.com',
      firstName: 'Field',
      lastName: 'User',
      roleId: fieldRole.id,
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
        createdBy: planner.id,
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
        createdBy: planner.id,
        productColors: {
          create: colorIds.map((colorId) => ({
            color: { connect: { id: colorId } },
            order: order++,
          })),
        },
      },
    });
  }
  await prisma.size.upsert({
    where: { eu_gender: { eu: '38', gender: Gender.MEN } },
    update: {},
    create: { eu: '38', us: '5.5', uk: '5', jp: '24', gender: Gender.MEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '39', gender: Gender.MEN } },
    update: {},
    create: { eu: '39', us: '6.5', uk: '6', jp: '24.5', gender: Gender.MEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '40', gender: Gender.MEN } },
    update: {},
    create: { eu: '40', us: '7', uk: '6.5', jp: '25', gender: Gender.MEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '41', gender: Gender.MEN } },
    update: {},
    create: { eu: '41', us: '8', uk: '7', jp: '26', gender: Gender.MEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '42', gender: Gender.MEN } },
    update: {},
    create: { eu: '42', us: '8.5', uk: '7.5', jp: '26.5', gender: Gender.MEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '43', gender: Gender.MEN } },
    update: {},
    create: { eu: '43', us: '9.5', uk: '8.5', jp: '27.5', gender: Gender.MEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '44', gender: Gender.MEN } },
    update: {},
    create: { eu: '44', us: '10', uk: '9', jp: '28', gender: Gender.MEN },
  });

  await prisma.size.upsert({
    where: { eu_gender: { eu: '36', gender: Gender.WOMEN } },
    update: {},
    create: { eu: '36', us: '5.5', uk: '3', jp: '22.5', gender: Gender.WOMEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '37', gender: Gender.WOMEN } },
    update: {},
    create: { eu: '37', us: '6.5', uk: '4', jp: '23.5', gender: Gender.WOMEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '38', gender: Gender.WOMEN } },
    update: {},
    create: { eu: '38', us: '7', uk: '4.5', jp: '24', gender: Gender.WOMEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '39', gender: Gender.WOMEN } },
    update: {},
    create: { eu: '39', us: '8', uk: '5.5', jp: '25', gender: Gender.WOMEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '40', gender: Gender.WOMEN } },
    update: {},
    create: { eu: '40', us: '8.5', uk: '6', jp: '25.5', gender: Gender.WOMEN },
  });
  await prisma.size.upsert({
    where: { eu_gender: { eu: '41', gender: Gender.WOMEN } },
    update: {},
    create: { eu: '41', us: '9.5', uk: '7', jp: '26.5', gender: Gender.WOMEN },
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
