import type { Job } from '~/api/generated/types';

export function renderJobs(jobs: Job[]): string {
  let stringResult = '';
  const jobTitles = jobs.map((key) => {
    const job = JOB_OPTIONS.find((item) => item.id === key);
    return job?.title;
  });
  jobTitles.forEach((title) => {
    stringResult += `${title}, `;
  });

  return stringResult.slice(0, -2);
}

export function renderJob(job: Job): string {
  const found = JOB_OPTIONS.find((item) => item.id === job);
  return found?.title ?? '';
}
