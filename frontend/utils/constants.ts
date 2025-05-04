const JOBS = [
  { id: 'DRAW_UPPER', title: 'jobs.draw_upper' },
  { id: 'DRAW_LINING', title: 'jobs.draw_lining' },
  { id: 'STITCH_UPPER', title: 'jobs.stitch_upper' },
  { id: 'STITCH_OUTSOLE', title: 'jobs.stitch_outsole' },
  { id: 'STITCH_INSOLE', title: 'jobs.stitch_insole' },
  { id: 'LAST', title: 'jobs.last' },
];

enum JOB {
  DRAW_UPPER = 'DRAW_UPPER',
  DRAW_LINING = 'DRAW_LINING',
  STITCH_UPPER = 'STITCH_UPPER',
  STITCH_OUTSOLE = 'STITCH_OUTSOLE',
  STITCH_INSOLE = 'STITCH_INSOLE',
  LAST = 'LAST',
}

export { JOB, JOBS };
