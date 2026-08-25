<template>
  <v-row v-if="errorInvTxs" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorInvTxs) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-card-text>
    <v-data-table
      :headers="headers"
      :items="dataInvTxs?.getInvTxs"
      :search="search"
      :loading="isFetchingInvTxs"
      item-value="id"
      hover
      :page="pageNo"
      :items-per-page="itemsPerPage"
    >
      <template #loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>

      <template v-slot:item.txDate="{ item }">
        {{ adapter.format(item.txDate, 'fullDateTime12h') }}
      </template>

      <template v-slot:item.progress="{ item }">
        {{ $t(`progress.${item.progress}`) }}
      </template>

      <template v-slot:item.type="{ item }">
        {{ $t(`tx_type.${item.type}`) }}
      </template>

      <template v-slot:item.invTxSizes="{ item }">
        <v-table density="compact">
          <tbody>
            <tr v-for="i in item.invTxSizes" :key="i.size.id">
              <td>{{ i.size.eu }}</td>
              <td>{{ i.quantity }}</td>
            </tr>
            <tr>
              <td><i>Total</i></td>
              <td>
                <i>
                  {{
                    item.invTxSizes.reduce(
                      (sum, size) => sum + size.quantity,
                      0,
                    )
                  }}
                </i>
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>

      <template v-slot:item.actions="{ item }"> </template>
    </v-data-table>
  </v-card-text>
</template>

<script setup lang="ts">
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import { GetInvTxsDocument, type InvProductDto } from '~/api/generated/types';

const { t } = useI18n();
const adapter = useDate();

const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');
const props = defineProps({
  invProductDto: {
    type: [Object, null] as PropType<InvProductDto | null>,
    required: true,
  },
});
const emit = defineEmits(['refresh-table']);
const invId = props.invProductDto?.invId;
const productId = props.invProductDto?.productId;

const {
  execute: fetchInvTxs,
  data: dataInvTxs,
  isFetching: isFetchingInvTxs,
  error: errorInvTxs,
} = useQuery({
  variables: invId && productId ? { invId, productId } : undefined,
  query: GetInvTxsDocument,
  cachePolicy: 'network-only',
  tags: [CACHE_INV_TXS],
});
const headers = [
  { title: t('label.tx_no'), key: 'txNo' },
  { title: t('label.tx_date'), key: 'txDate' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.type'), key: 'type' },
  { title: t('label.sizes'), key: 'invTxSizes', minWidth: '120' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
] as const;
</script>
