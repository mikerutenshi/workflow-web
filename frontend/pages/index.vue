<template>
  <v-main>
    <v-container fluid fill-height>
      <v-row justify="center" align="center">
        <v-col md="6">
          <AuthProfileCard />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'app.title',
});
</script>
