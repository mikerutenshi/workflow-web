import { Prisma } from '@/generated/client';
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

export function calculatePrice(
  base: number | null,
  offset?: number | null,
  multiplier?: Prisma.Decimal | null,
  discounts?: Prisma.Decimal[] | null,
): number | undefined {
  if (!base) return undefined;
  const finalOffset = offset ?? 0;
  const finalMultiplier = multiplier ? multiplier : new Prisma.Decimal(1);
  var result = finalMultiplier.times(base + finalOffset).toNumber();

  discounts?.forEach((disc) => {
    result = result - disc.times(result).toNumber();
  });

  result = Math.ceil(result / 10000) * 10000 - 100;

  return result;
}
