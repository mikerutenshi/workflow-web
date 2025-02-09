<template>
  <v-app>
    <v-main>
      <v-container fluid class="pn-container">
        <v-row class="flex-column" align="center">
          <v-col cols="4">
            <AuthUsersTable />
          </v-col>
          <v-col cols="4" class="mt-8" align="center">
            <AuthProfileCard v-if="authStore.user" />
            <AuthSignInForm v-else />
          </v-col>
        </v-row>
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

.translucent-background
  background-color: rgba(255, 255, 255, 0.8)
</style>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>
