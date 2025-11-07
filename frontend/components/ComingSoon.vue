<template>
  <v-container
    class="h-100 d-flex flex-column align-center justify-center translucent-background"
  >
    <div class="d-flex flex-column align-center">
      <v-img :width="600" :src="construction" class="ma-4"></v-img>
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
import construction from '@/assets/images/under_construct.gif';
</script>
