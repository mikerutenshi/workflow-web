/**
 * Dev-only fixtures for the work-order print feature (the Print button on
 * /works). Kept out of prisma/seed.ts on purpose: these are demo work orders,
 * not baseline data, and should never be recreated by a db:push:reset.
 *
 *   npm run db:seed:print-demo            create (replacing any previous run)
 *   npm run db:seed:print-demo -- --clean remove them again
 *
 * Every row it creates is tagged with DEMO_TAG in `note`, which is how a re-run
 * finds and removes its own previous output without touching anything else.
 */
import { PrismaPg } from '@prisma/adapter-pg';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Job, PrismaClient } from '../src/generated/prisma/client';
import { Operation } from '../src/models/operation.enum';

// Same convention as getStartOfDay in src/utils/functions.util.ts: a work order
// is dated to local midnight in Jakarta, not on whatever machine runs this.
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');

if (process.env.NODE_ENV === 'production') {
  console.error(
    'Refusing to run: this seed is for development databases only.',
  );
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_TAG = '[print-demo]';
const ACTOR = 1; // admin@email.com

// Job declaration order, so "the first N job types" is deterministic.
const JOB_ORDER = [
  Job.DRAW_UPPER,
  Job.DRAW_LINING,
  Job.STITCH_UPPER,
  Job.STITCH_OUTSOLE,
  Job.STITCH_INSOLE,
  Job.LAST,
];

async function clean() {
  const { count } = await prisma.work.deleteMany({
    where: { note: { startsWith: DEMO_TAG } },
  });
  // Task and SizeToWork both cascade from Work.
  return count;
}

/**
 * A work order can hold at most one task per Job (Task is unique on
 * [workId, type]), so six tasks is the hard ceiling. But Task.laborCostId is
 * required and LaborCost is unique on [productGroupId, type] -- and no group in
 * the data carries all six types, which is exactly why real work orders top out
 * at five tasks. Fill the gaps for one group so the fullest strip is printable.
 */
async function unlockSixTasks() {
  const candidates = await prisma.productGroup.findMany({
    where: { productCategory: { gender: 'MEN' }, products: { some: {} } },
    include: { laborCosts: true, products: true },
  });
  const group = candidates
    .filter((g) => g.laborCosts.length >= 5)
    .sort((a, b) => b.products.length - a.products.length)[0];

  if (!group)
    throw new Error('No MEN product group with >= 5 labor costs found.');

  const missing = JOB_ORDER.filter(
    (job) => !group.laborCosts.some((cost) => cost.type === job),
  );
  for (const type of missing) {
    await prisma.laborCost.upsert({
      where: { productGroupId_type: { productGroupId: group.id, type } },
      update: {},
      create: { productGroupId: group.id, type, cost: 2500, createdBy: ACTOR },
    });
  }

  return { group, added: missing };
}

type Spec = {
  sizes: [string, number][];
  taskCount: number;
  assign: number[]; // indexes of tasks that get an artisan
  allDone?: boolean;
  note: string;
  useMainGroup?: boolean;
};

async function main() {
  const removed = await clean();
  if (removed)
    console.log(`Removed ${removed} work order(s) from a previous run.`);

  if (process.argv.includes('--clean')) {
    console.log('Clean only - nothing created.');
    return;
  }

  const { group, added } = await unlockSixTasks();
  if (added.length) {
    console.log(
      `Added labor cost ${added.join(', ')} to product group ${group.id} ` +
        `("${group.name}") so a six-task order is possible.`,
    );
  }

  // A second group gives the search box two distinct SKUs to tell apart.
  const otherProduct = await prisma.product.findFirst({
    where: {
      productGroupId: { not: group.id },
      productGroup: { laborCosts: { some: {} } },
    },
    include: { productGroup: { include: { laborCosts: true } } },
  });
  if (!otherProduct)
    throw new Error('No second product group with labor costs found.');

  const mainProduct = group.products[0]!;
  const menSizes = await prisma.size.findMany({
    where: { gender: 'MEN' },
    orderBy: { eu: 'asc' },
  });
  const artisans = await prisma.artisan.findMany({ orderBy: { id: 'asc' } });
  if (!artisans.length) throw new Error('No artisans to assign.');
  // The longest name in the data -- the one that proves the cell does not clip.
  const longestNamed =
    artisans.find(
      (a) => a.firstName === 'Dadang' && a.lastName === 'Saefudin',
    ) ?? artisans[0]!;

  const seven = menSizes
    .slice(0, 7)
    .map((s, i) => [s.eu, i + 1] as [string, number]);

  const specs: Spec[] = [
    {
      sizes: [['40', 10]],
      taskCount: 3,
      assign: [0],
      note: 'sparse strip: one size, one assigned name',
      useMainGroup: true,
    },
    {
      sizes: seven,
      taskCount: 6,
      assign: [],
      note: 'fullest strip: seven sizes, six tasks, none assigned',
      useMainGroup: true,
    },
    {
      sizes: [['41', 4]],
      taskCount: 3,
      assign: [0, 1, 2],
      allDone: true,
      note: 'every task done - must NOT appear on the printout',
      useMainGroup: true,
    },
    ...Array.from(
      { length: 8 },
      (_, i): Spec => ({
        sizes:
          i % 2
            ? [
                ['42', 3],
                ['43', 2],
              ]
            : [['39', 6]],
        taskCount: 3,
        assign: i % 3 === 0 ? [0] : [],
        note: `batch ${i % 2 ? 'beta' : 'alpha'} filler`,
        useMainGroup: i % 2 === 0,
      }),
    ),
  ];

  const perDate = new Map<string, number>();
  let printable = 0;

  for (const [index, spec] of specs.entries()) {
    const date = dayjs
      .tz()
      .subtract(index % 3, 'day')
      .startOf('day');
    const stamp = date.format('YYMMDD');
    const sequence = (perDate.get(stamp) ?? 0) + 1;
    perDate.set(stamp, sequence);

    const product = spec.useMainGroup ? mainProduct : otherProduct;
    const groupId = spec.useMainGroup ? group.id : otherProduct.productGroupId;
    const laborCosts = await prisma.laborCost.findMany({
      where: { productGroupId: groupId },
    });
    const types = JOB_ORDER.filter((job) =>
      laborCosts.some((cost) => cost.type === job),
    ).slice(0, spec.taskCount);

    if (types.length < spec.taskCount) {
      throw new Error(
        `Product group ${groupId} has only ${types.length} job types, need ${spec.taskCount}.`,
      );
    }

    const sizeRows = spec.sizes
      .map(([eu, quantity]) => {
        const size = menSizes.find((s) => s.eu === eu);
        return size ? { sizeId: size.id, quantity } : null;
      })
      .filter(
        (row): row is { sizeId: number; quantity: number } => row !== null,
      );

    await prisma.work.create({
      data: {
        date: date.toDate(),
        orderNo: `${Operation.Work}-${stamp}-${String(sequence).padStart(4, '0')}`,
        productId: product.id,
        note: `${DEMO_TAG} ${spec.note}`,
        createdBy: ACTOR,
        workSizes: { create: sizeRows },
        tasks: {
          create: types.map((type, taskIndex) => ({
            type,
            laborCostId: laborCosts.find((cost) => cost.type === type)!.id,
            artisanId:
              spec.allDone || spec.assign.includes(taskIndex)
                ? taskIndex === 0
                  ? longestNamed.id
                  : artisans[taskIndex % artisans.length]!.id
                : null,
            doneAt: spec.allDone ? date.toDate() : null,
            createdBy: ACTOR,
          })),
        },
      },
    });

    if (!spec.allDone) printable++;
  }

  console.log(
    `Created ${specs.length} work orders (${printable} printable, ` +
      `${specs.length - printable} excluded as complete).`,
  );
  console.log(
    `SKUs: "${mainProduct.sku}" and "${otherProduct.sku}" - ` +
      'type either into the search box to narrow the printout.',
  );
  console.log(`Dates: ${[...perDate.keys()].join(', ')} (YYMMDD).`);
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
