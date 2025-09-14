<script setup lang="ts">
import { mdiClose, mdiMagnify, mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetLaborCostsDocument } from '~/api/generated/types';

const pageNo = ref(1);
const itemsPerPage = ref(10);

const { execute, data, isFetching, error } = useQuery({
  query: GetLaborCostsDocument,
  tags: [CACHE_PRODUCT_GROUPS],
});

const { t } = useI18n();

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
  { title: t('label.product_group'), key: 'skuNumeric' },
  {
    title: t('label.product_category'),
    key: 'productCategory.name',
  },
  { title: t('label.gender'), key: 'productCategory.gender' },
  {
    title: t('label.labor_costs'),
    align: 'center',
    children: [
      { title: t('jobs.draw_upper'), key: 'drawUpper' },
      { title: t('jobs.draw_lining'), key: 'drawLining' },
      { title: t('jobs.stitch_upper'), key: 'stitchUpper' },
      { title: t('jobs.stitch_outsole'), key: 'stitchOutsole' },
      { title: t('jobs.stitch_insole'), key: 'stitchInsole' },
      { title: t('jobs.last'), key: 'last' },
    ],
  },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const dialog = ref(false);
const activator = ref(undefined);
</script>
