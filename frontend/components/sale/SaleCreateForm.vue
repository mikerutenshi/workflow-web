  <template><v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError || updateError || deleteError) }}
          </v-alert>
        </v-col>
      </v-row>
      <ActionPickDate
        v-model="trfDate.value.value"
        :error-messages="trfDate.errorMessage.value"
        :readonly="props.isReadonly"
      ></ActionPickDate>

      <v-text-field
        :label="$t('label.trf_no')"
        :error-messages="trfNo.errorMessage.value"
        v-model="trfNo.value.value"
        :readonly="props.isReadonly"
      />
</template>

<script setup lang="ts"></script>
