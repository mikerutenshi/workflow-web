import { Gender, type Job } from '~/api/generated/types';

function renderJobs(jobs: Job[]): string {
  return jobs
    .map((key) => {
      return key in JOBS ? JOBS[key] : 'N/A';
    })
    .join(', ');
}

function renderJob(job: Job): string {
  return job in JOBS ? JOBS[job] : 'N/A';
}

function formatRupiah(amount: number | null | undefined): string {
  if (amount === undefined) return '-';
  if (amount === null) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
function parseRupiah(rupiah: string): number {
  // Hapus semua karakter kecuali digit dan koma
  const cleaned = rupiah.replace(/[^0-9,]/g, '').replace(',', '.'); // Ganti koma dengan titik untuk desimal
  return parseFloat(cleaned);
}

function renderGender(gender: Gender): string {
  const title = GENDERS[gender];
  return title ?? 'N/A';
}

function parseGender(title: string): Gender {
  const entry = Object.entries(GENDERS).find(([_, value]) => value === title);
  return entry ? (entry[0] as Gender) : Gender.Kids;
}

function formatLocalDate(utcDate: string) {
  return utcDate ? new Date(utcDate).toLocaleDateString() : '-';
}

export {
  renderJob,
  renderJobs,
  formatRupiah,
  parseRupiah,
  renderGender,
  parseGender,
  formatLocalDate,
};
