<template>
  <v-form class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <ActionPickDate v-model="form.date" readonly></ActionPickDate>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :label="$t('label.order_no')"
              v-model="form.orderNo"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :label="$t('label.product')"
              v-model="form.sku"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title></v-card-title>
              <v-card-subtitle>{{ $t('label.sizes') }}</v-card-subtitle>
              <v-card-text>
                <v-chip-group class="my-2">
                  <v-chip
                    v-for="size in form.sizes"
                    :key="size.eu"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                    disabled
                  >
                    {{ `${size.eu} | ${size.quantity}` }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
</style>

<script setup lang="ts">
import { useQuery } from 'villus';
import { GetWorkDocument } from '~/api/generated/types';

const props = defineProps({
  workId: {
    type: String,
  },
});

const route = useRoute();
const workId = ref((route.params.id as string) || props.workId);

const form = reactive({
  date: '',
  orderNo: '',
  sku: '',
  sizes: [
    {
      eu: '',
      quantity: 0,
    },
  ],
});

if (workId.value) {
  useQuery({
    query: GetWorkDocument,
    variables: { id: workId.value },
    tags: [CACHE_WORK],
    onData(data) {
      const work = data.getWork;
      form.date = work.date;
      form.orderNo = work.orderNo;
      form.sku = work.product.sku;
      form.sizes = work.sizes.map((item) => ({
        eu: item.size.eu,
        quantity: item.quantity,
      }));
    },
  });
}
</script>
