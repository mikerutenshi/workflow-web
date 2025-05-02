const JOB_OPTIONS = [
  { id: 'DRAW_UPPER', title: 'Upper Drawer' },
  { id: 'DRAW_LINING', title: 'Lining Drawer' },
  { id: 'STITCH_UPPER', title: 'Upper Stitcher' },
  { id: 'STITCH_OUTSOLE', title: 'Outsole Stitcher' },
  { id: 'STITCH_INSOLE', title: 'Insole Stitcher' },
  { id: 'LAST', title: 'Laster' },
];

enum JOB {
  DRAW_UPPER = 'DRAW_UPPER',
  DRAW_LINING = 'DRAW_LINING',
  STITCH_UPPER = 'STITCH_UPPER',
  STITCH_OUTSOLE = 'STITCH_OUTSOLE',
  STITCH_INSOLE = 'STITCH_INSOLE',
  LAST = 'LAST',
}

export { JOB, JOB_OPTIONS };
