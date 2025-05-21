<template>
  <v-menu :close-on-content-click="false">
    <template #activator="{ props: activatorProps }">
      <v-text-field
        v-bind="activatorProps"
        readonly
        :prepend-inner-icon="mdiCalendar"
        v-model="internalTextModel"
        :label="label"
        :error-messages="errorMessages"
      ></v-text-field>
    </template>
    <v-date-picker
      show-adjacent-months
      :multiple="multiple"
      v-model="internalValue"
      hide-header
    >
    </v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiCalendar } from '@mdi/js';
import dayjs, { Dayjs } from 'dayjs';
import { useDate } from 'vuetify';

const adapter = useDate();
const internalTextModel = ref('');

const modelValue = defineModel<string | string[]>({
  required: false,
  default: () => '',
});

const props = defineProps({
  multiple: {
    type: [Boolean, String] as PropType<boolean | 'range'>,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  errorMessages: {
    type: String,
    default: '',
  },
});

const internalValue = computed({
  get() {
    if (props.multiple) {
      // modelValue is array of date strings
      return Array.isArray(modelValue.value)
        ? modelValue.value.map((date) => dayjs(date))
        : [];
    } else {
      // modelValue is a single date string
      return modelValue.value ? dayjs(modelValue.value as string) : null;
    }
  },
  set(val) {
    if (props.multiple) {
      // val is array of Day.js objects
      modelValue.value = Array.isArray(val)
        ? val.map((d) => d.toISOString())
        : [];
    } else {
      // val is a Day.js object
      modelValue.value = val ? (val as Dayjs).toISOString() : '';
    }
  },
});

watch(
  modelValue,
  (newValue) => {
    if (props.multiple && Array.isArray(newValue)) {
      const start = newValue[0];
      const end = newValue[newValue.length - 1];

      internalTextModel.value = `${adapter.format(
        start,
        'fullDateWithWeekday'
      )} - ${adapter.format(end, 'fullDateWithWeekday')}`;
    } else if (typeof newValue === 'string') {
      internalTextModel.value =
        newValue !== '' ? adapter.format(newValue, 'fullDateWithWeekday') : '';
    }
  },
  { immediate: true }
);
</script>
