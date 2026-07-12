import Decimal from 'decimal.js-light';
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

export function cleanRupiahToNumber(value: string | null): number | null {
  if (value === null || value.length == 0) {
    return null;
  }

  const cleaned = value.replace(/[^\d]/g, '');
  return cleaned ? Number(cleaned) : 0;
}

export function renderGender(gender: Gender): string {
  const title = GENDERS[gender];
  return title ?? 'N/A';
}

export function parseGender(title: string): Gender {
  const entry = Object.entries(GENDERS).find(([_, value]) => value === title);
  return entry ? (entry[0] as Gender) : Gender.Kids;
}

// export function formatLocalDate(utcDate: string) {
//   return utcDate ? new Date(utcDate).toLocaleDateString() : '-';
// }

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
      const sign = num >= 0 ? '+' : '-';
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

export const percentageMask: MaskInputOptions = {
  number: { locale: 'us', fraction: 2 },
  postProcess: (val) => (val ? `${val} %` : ''),
};

export function formatDiscount(numeric: string) {
  return `${numeric}%`;
}

export function convertPercentToDecimal(numerator: string): string {
  return (parseFloat(numerator) / 100).toFixed(4);
}

export function convertDecimalToPercent(decimal: string): string {
  return (parseFloat(decimal) * 100).toFixed(2);
}

export function calculatePrice(
  base: number | null,
  offset?: number | null,
  multiplier?: string | null,
  discounts?: string[] | null,
): number | undefined {
  if (!base) return undefined;
  const finalOffset = offset ?? 0;
  const finalMultiplier = multiplier ? new Decimal(multiplier) : new Decimal(1);
  var result = finalMultiplier.times(base + finalOffset).toNumber();

  discounts?.forEach((disc) => {
    result = result - new Decimal(disc).times(result).toNumber();
  });

  result = Math.ceil(result / 10000) * 10000 - 100;

  return result;
}

export function computeDiscounted(initialPrice: number, discounts: string[]) {
  let result = initialPrice;

  discounts?.forEach((disc) => {
    result = result - new Decimal(disc).times(result).toNumber();
  });

  return result;
}
