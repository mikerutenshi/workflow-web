import type { Gender, Job } from '~/api/generated/types';

function renderJobs(jobs: Job[]): string {
  let stringResult = '';
  const jobTitles = jobs.map((key) => {
    const job = JOBS.find((item) => item.id === key);
    return job?.title;
  });
  jobTitles.forEach((title) => {
    stringResult += `${title}, `;
  });

  return stringResult.slice(0, -2);
}

function renderJob(job: Job): string {
  const found = JOBS.find((item) => item.id === job);
  return found?.title ?? '';
}

function formatRupiah(amount: number | null | undefined): string {
  if (amount === undefined) return '';
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
  const found = GENDERS.find((item) => item.id === gender);
  return found?.title ?? '';
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
  formatLocalDate,
};
