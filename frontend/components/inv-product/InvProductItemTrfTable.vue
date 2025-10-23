<template>
  <v-row v-if="invTrfsError || deleteError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invTrfsError || deleteError) }}
      </v-alert>
    </v-col>
  </v-row>

  <!-- <v-row class="flex-grow-0">
    <v-col>
      <v-text-field
        v-model="search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        hide-details
        single-line
      ></v-text-field>
    </v-col>
  </v-row> -->

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="invTrfsData?.getInvTrfItemTrfs"
        :search="search"
        :loading="isFetchingInvTrfs"
        item-value="id"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.invTrf.trfDate="{ item }">
          {{
            item.invTrf
              ? adapter.format(item.invTrf.trfDate, 'fullDateTime12h')
              : ''
          }}
        </template>

        <template v-slot:item.invTrfItemSizes="{ item }">
          <v-table density="compact">
            <tbody>
              <tr v-for="i in item.invTrfItemSizes" :key="i.size.id">
                <td>{{ i.size.eu }}</td>
                <td>{{ i.quantity }}</td>
              </tr>
              <tr>
                <td><i>Total</i></td>
                <td>
                  <i>
                    {{
                      item.invTrfItemSizes.reduce(
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

        <template v-slot:item.actions="{ item }">
          <v-btn
            v-if="item.progress === Progress.Pending"
            color="primary"
            :icon="mdiDeleteOutline"
            variant="text"
            :loading="isDeleting"
            @click="executeDelete({ id: item.id })"
          ></v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="snack.isVisible = false"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { mdiDeleteOutline, mdiFileDocumentRemoveOutline } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteInvTrfItemDocument,
  GetInvTrfItemTrfsDocument,
  Progress,
  type InvProductDto,
} from '~/api/generated/types';

const { t } = useI18n();
const adapter = useDate();

const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');
const props = defineProps({
  invProductDto: {
    type: Object as PropType<InvProductDto | null>,
    required: true,
  },
});
const emit = defineEmits(['refresh-table']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const invId = props.invProductDto?.invId;
const productId = props.invProductDto?.productId;

const {
  execute: executeFetch,
  data: invTrfsData,
  isFetching: isFetchingInvTrfs,
  error: invTrfsError,
} = useQuery({
  variables: invId && productId ? { invId, productId } : undefined,
  query: GetInvTrfItemTrfsDocument,
  tags: [CACHE_INV_TRFS_PER_ITEM],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteInvTrfItemDocument, {
  clearCacheTags: [CACHE_INV_TRFS_PER_ITEM, CACHE_INV_PRODUCTS],
  onData() {
    snack.message = t('status.deleted');
    snack.isVisible = true;
    executeFetch();
    emit('refresh-table');
  },
});

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.trf_date'), key: 'invTrf.trfDate' },
  { title: t('label.trf_no'), key: 'invTrf.trfNo' },
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.sizes'), key: 'invTrfItemSizes', minWidth: '120' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
</script>
