<template>
  <v-container
    class="h-100 d-flex flex-column align-center justify-center translucent-background"
  >
    <div class="d-flex flex-column align-center">
      <v-img :width="600" :src="construction" class="ma-4"></v-img>
      <p>Our website is under construction. Stay tuned!</p>
      -->
    </div>
  </v-container>
</template>

<style scoped lang="sass">
.translucent-background
  background-color:$translucent-background

.full-width
  width: 100%
</style>

<script setup lang="ts">
import { mdiHammer, mdiWrenchClock } from '@mdi/js';
import construction from '@/assets/images/under_construct.gif';

definePageMeta({
  title: 'app.title',
});
</script>
