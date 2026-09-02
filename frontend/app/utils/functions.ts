import dayjs from 'dayjs';
import Decimal from 'decimal.js-light';
import type { MaskInputOptions } from 'maska';
import type { CombinedError } from 'villus';
import { Gender, InvType, Progress, type Job } from '~/api/generated/types';

// The date picker hands back midnight-local dates, but every backend range filter is an
// inclusive `lte`/BETWEEN against a timestamp column — so an un-normalized upper bound
// silently drops everything recorded after 00:00 on the final day of the range.
export function toDateRange(dates: string[] | string) {
  const list = Array.isArray(dates) ? dates : [dates];

  return {
    startDate: dayjs(list[0]).startOf('day').toISOString(),
    endDate: dayjs(list[list.length - 1])
      .endOf('day')
      .toISOString(),
  };
}

// Must be a real BCP-47 tag. maska hands this straight to Intl.NumberFormat,
// which silently falls back to the DEVICE locale for anything it cannot resolve.
// The previous value 'us' did exactly that: on an id-ID device '.' became the
// group separator, so maska stripped the decimal point out of everything typed
// and a 12.5% discount round-tripped as 1250%.
const MASK_LOCALE = 'en-US';

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

  let result = new Intl.NumberFormat(MASK_LOCALE, {
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
  number: { locale: MASK_LOCALE },
  postProcess: (val) => (val ? `Rp ${val}` : ''),
  reversed: true,
};

export const priceOffsetMask: MaskInputOptions = {
  number: { locale: MASK_LOCALE },
  postProcess: (val: string) => {
    var result = val;

    if (val && val !== '-') {
      const numericVal = val.replace(/[^\d.-]/g, '');
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
  number: { locale: MASK_LOCALE, fraction: 2 },
  postProcess: (val) => (val ? `x ${val}` : ''),
};

export const percentageMask: MaskInputOptions = {
  number: { locale: MASK_LOCALE, fraction: 2 },
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

export function computeDiscounted(initialPrice: number, discounts: string[]) {
  let result = initialPrice;

  discounts?.forEach((disc) => {
    result = result - new Decimal(disc).times(result).toNumber();
  });

  return result;
}

export function getProgresses(clearanceLevel: number = 99): Progress[] {
  const progresses = Object.values(Progress);
  if (clearanceLevel > Role.Planner) {
    return progresses.filter(
      (item) =>
        ![
          Progress.Canceled,
          Progress.Failed,
          Progress.OnHold,
          Progress.Pending,
        ].includes(item),
    );
  } else {
    return progresses.filter((p) => p !== Progress.Pending);
  }
}
