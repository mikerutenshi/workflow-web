import type { MaskInputOptions } from 'maska';
import type { CombinedError } from 'villus';
import { Gender, InvType, type Job } from '~/api/generated/types';

export function renderJobs(jobs: Job[]): string {
  return jobs
    .map((key) => {
      return key in JOBS ? JOBS[key] : 'N/A';
    })
    .join(', ');
}

export function renderJob(job: Job): string {
  return job in JOBS ? JOBS[job] : 'N/A';
}

export function renderInvType(type: InvType): string {
  return type in INV_TYPE ? INV_TYPE[type] : 'N/A';
}

export function formatRupiah(
  amount: number | null | undefined,
): string | undefined {
  if (amount === undefined || amount === null) return undefined;

  let result = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `Rp ${result}`;
}
// export function parseRupiah(rupiah: string): number | null {
//   if (rupiah === null) return null;
//   // Hapus semua karakter kecuali digit dan koma
//   const cleaned = rupiah.replace(/[^0-9,]/g, '');
//   const parsed = parseFloat(cleaned);
//   return !Number.isNaN(parsed) ? parsed : null;
// }

export function renderGender(gender: Gender): string {
  const title = GENDERS[gender];
  return title ?? 'N/A';
}

export function parseGender(title: string): Gender {
  const entry = Object.entries(GENDERS).find(([_, value]) => value === title);
  return entry ? (entry[0] as Gender) : Gender.Kids;
}

export function formatLocalDate(utcDate: string) {
  return utcDate ? new Date(utcDate).toLocaleDateString() : '-';
}

interface VillusError {
  message: string;
  graphQLErrors?: Array<{
    message: string;
    extensions?: {
      originalError?: {
        message?: string;
      };
    };
  }>;
}

export function extractGraphQlError(error?: CombinedError | null): string {
  if (!error) return '';

  return (
    error.graphqlErrors
      ?.flatMap(
        (e) =>
          (e.extensions?.originalError as { message?: string })?.message ||
          e.message,
      )
      .join(', ') || error.message
  );
}

export const priceMask: MaskInputOptions = {
  number: { locale: 'us' },
  postProcess: (val) => (val ? `Rp ${val}` : ''),
  reversed: true,
};

export const priceOffsetMask: MaskInputOptions = {
  number: { locale: 'us' },
  postProcess: (val: string) => {
    var result = val;

    if (val && val !== '-') {
      const numericVal = val.replace(/[^\d.-]/g, '');
      console.log(`numericval: ${numericVal}`);
      const num = parseInt(numericVal);
      const sign = num > 0 ? '+' : '-';
      const valUnsigned = val.replace('-', '');

      result = `${sign} Rp ${valUnsigned}`;
    }

    return result;
  },
  reversed: true,
};

export const multiplierMask: MaskInputOptions = {
  number: { locale: 'us', fraction: 2 },
  postProcess: (val) => (val ? `x ${val}` : ''),
};
// export function generateId(op: Operation, lastId: string | undefined): string {
//   const today = dayjs();
//   const format = 'YYMMDD';

//   if (op === Operation.Produce) {
//     return `${op}-${today.format(format)}-${lastId}`;
//   } else if (!lastId) {
//     return `${op}-${today.format(format)}-0001`;
//   } else if (lastId) {
//     const split = lastId.split('-');
//     const lastOp = split[0];
//     const lastDate = split[1];
//     const lastSequence = split[2];

//     if (lastOp === op) {
//       const lastDateObject = dayjs(lastDate, 'YYMMDD');

//       if (lastDateObject.isBefore(today, 'month')) {
//         return `${op}-${today.format(format)}-0001`;
//       } else {
//         return `${op}-${today.format(format)}-${(+lastSequence + 1).toString().padStart(4, '0')}`;
//       }
//     } else {
//       throw Error('Operations do not match');
//     }
//   } else {
//     throw Error('Incomplete ID generator parameter');
//   }
// }
