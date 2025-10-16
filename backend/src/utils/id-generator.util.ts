import { Operation } from '@/models/operation.enum';
import dayjs from 'dayjs';

export function generateId(op: Operation, lastId: string | null): string {
  const today = dayjs();
  const format = 'YYMMDD';

  if (!lastId) {
    return `${op}-${today.format(format)}-0001`;
  } else {
    const split = lastId.split('-');
    const lastOp = split[0];
    const lastDate = split[1];
    const lastSequence = split[2];

    if (lastOp === op) {
      const lastDateObject = dayjs(lastDate, 'YYMMDD');

      if (lastDateObject.isBefore(today, 'month')) {
        return `${op}-${today.format(format)}-0001`;
      } else {
        return `${op}-${today.format(format)}-${+lastSequence + 1}`;
      }
    } else {
      throw Error('Operations do not match');
    }
  }
}
