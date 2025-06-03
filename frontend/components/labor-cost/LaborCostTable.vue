<template>
  <v-row v-if="error" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row class="flex-grow-0">
    <v-col>
      <v-text-field
        v-model="search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        hide-details
        single-line
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="data?.getLaborCosts"
        :search="search"
        :loading="isFetching"
        item-value="id"
        class="flex-grow-1"
        fixed-header
        :height="`calc(100vh - 240px)`"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.productCategory.gender="{ item }">
          {{ $t(renderGender(item.productCategory.gender)) }}
        </template>

        <template v-slot:item.drawUpper="{ item }">
          {{
            formatRupiah(
              item.laborCosts?.find((found) => found?.type === JOB.DRAW_UPPER)
                ?.cost
            ) ?? ''
          }}
        </template>

        <template v-slot:item.drawLining="{ item }">
          {{
            formatRupiah(
              item.laborCosts?.find((found) => found?.type === JOB.DRAW_LINING)
                ?.cost
            ) ?? ''
          }}
        </template>

        <template v-slot:item.stitchUpper="{ item }">
          {{
            formatRupiah(
              item.laborCosts?.find((found) => found?.type === JOB.STITCH_UPPER)
                ?.cost
            ) ?? ''
          }}
        </template>

        <template v-slot:item.stitchOutsole="{ item }">
          {{
            formatRupiah(
              item.laborCosts?.find(
                (found) => found?.type === JOB.STITCH_OUTSOLE
              )?.cost
            ) ?? ''
          }}
        </template>

        <template v-slot:item.stitchInsole="{ item }">
          {{
            formatRupiah(
              item.laborCosts?.find(
                (found) => found?.type === JOB.STITCH_INSOLE
              )?.cost
            ) ?? ''
          }}
        </template>

        <template v-slot:item.last="{ item }">
          {{
            formatRupiah(
              item.laborCosts?.find((found) => found?.type === JOB.LAST)?.cost
            ) ?? ''
          }}
        </template>

        <template v-slot:item.actions="{ item, index }">
          <!-- <v-menu variant="outlined">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="text">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <NuxtLink :to="`/labor-costs/update/${item.id}`">
                <v-list-item-title>Edit</v-list-item-title>
              </NuxtLink>
            </v-list-item>
          </v-list>
        </v-menu> -->
          <!-- <NuxtLink :to="$localePath(`/labor-costs/update/${item.id}`)"> -->
          <v-btn
            color="primary"
            :prepend-icon="mdiPencil"
            variant="text"
            @click="
              productGroupId = item.id;
              dialog = true;
            "
          ></v-btn>
          <!-- </NuxtLink> -->
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar>
        <v-btn :icon="mdiClose" @click="dialog = false"></v-btn>
        <v-toolbar-title>{{ $t('page.labor_cost_update') }}</v-toolbar-title>
      </v-toolbar>

      <v-container class="h-100 d-flex flex-column">
        <LaborCostUpdateForm
          :product-group-id="productGroupId"
          @close-dialog="
            dialog = false;
            execute();
          "
        ></LaborCostUpdateForm>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose, mdiMagnify, mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetLaborCostsDocument } from '~/api/generated/types';

// Add 34px to height to adjust the footer position
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
const productGroupId = ref('');
</script>
