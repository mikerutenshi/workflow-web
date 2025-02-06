<template>
  <v-app>
    <v-main>
      <v-container fluid class="pn-container">
        <AuthUserList />
        <!-- <AuthProfileCard /> -->
        <!-- <AuthSignInForm /> -->
        <!-- <AuthProfileCard v-if="authStore.user" /> -->
        <!-- <AuthSignInForm v-else /> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="sass">
@use "vuetify/lib/styles/settings/_variables"  as *
.pn-container
  +pn-cover-image(url("@/assets/images/elden.jpg"))
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  padding: $spacer * 4 // from vuetify
</style>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>
