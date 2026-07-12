import { InvType, Prisma } from '@/generated/prisma/client';
import { Operation } from '@/models/operation.enum';
import dayjs from 'dayjs';

export function generateId(op: Operation, lastId: string | undefined): string {
  const today = dayjs();
  const format = 'YYMMDD';

  if (!lastId) {
    return `${op}-${today.format(format)}-0001`;
  } else if (lastId) {
    const split = lastId.split('-');
    const lastOp = split[0];
    const lastDate = split[1];
    const lastSequence = split[2];

    if (lastOp === op) {
      const lastDateObject = dayjs(lastDate, 'YYMMDD');

      if (lastDateObject.isBefore(today, 'month')) {
        return `${op}-${today.format(format)}-0001`;
      } else {
        return `${op}-${today.format(format)}-${(+lastSequence + 1).toString().padStart(4, '0')}`;
      }
    } else {
      throw Error('Operations do not match');
    }
  } else {
    throw Error('Incomplete ID generator parameter');
  }
}

export function computePrice(
  base: number | null,
  skuNumeric: string,
  sku: string,
  productCategoryId: number,
  invType: InvType,
  productDiscs: Prisma.Decimal[],
  offset?: number | null,
  multiplier?: Prisma.Decimal | null,
  discounts?: Prisma.Decimal[] | null,
): number | undefined {
  if (!base) return undefined;

  const idx = sku.indexOf(skuNumeric);
  const leather = idx >= 0 ? sku.slice(0, idx).toUpperCase() : '';

  const tier2 = ['P', 'K', 'G', 'MP', 'F', 'FP'];
  const tier3 = ['A', 'E', 'T'];
  let priceTierOffset = 0;

  if (productCategoryId == 2) {
    if (tier2.includes(leather)) {
      priceTierOffset = 10000;
    } else if (tier3.includes(leather)) {
      priceTierOffset = 50000;
    }
  } else if (productCategoryId == 1) {
    if (tier3.includes(leather)) {
      priceTierOffset = 20000;
    }
  }

  if (invType === InvType.CONSIGNMENT && tier3.includes(leather)) {
    priceTierOffset = priceTierOffset + 10000;
  }

  const finalOffset = offset ? priceTierOffset + offset : priceTierOffset;
  let finalMultiplier = multiplier ? multiplier : new Prisma.Decimal(1);

  if (productDiscs.some((disc) => disc.equals(new Prisma.Decimal(0.5)))) {
    finalMultiplier = finalMultiplier.add(0.15);
  }

  var result = finalMultiplier.times(base + finalOffset).toNumber();

  if (sku == 'K01903-D.Brown') {
    console.log(`base: ${base}`);
    console.log(`pricetieroffset: ${priceTierOffset}`);
    console.log(`finalOffset: ${finalOffset}`);
    //todo if discount is 50% multiplier = 185
  }

  discounts?.forEach((disc) => {
    result = result - disc.times(result).toNumber();
  });

  result = Math.ceil(result / 10000) * 10000 - 100;

  return result;
}
