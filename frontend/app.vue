<template>
  <v-container fluid class="pn-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-container>
  <!-- <v-container fluid class="pn-container">
        <v-row class="flex-column" align="center">
          <v-col cols="4" align="center">
            <DashboardHome v-if="authStore.user" />
            <AuthSignInForm v-else />
          </v-col>
        </v-row>
      </v-container> -->
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
