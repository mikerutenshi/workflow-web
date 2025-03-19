<template>
  <v-app>
    <v-main class="pn-container">
      <slot />
    </v-main>
  </v-app>
</template>

<style lang="sass">
@use "vuetify/lib/styles/settings/_variables"  as *
.pn-container
  @include pn-cover-image(url("@/assets/images/elden.jpg"))
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  padding: $spacer * 4 // from vuetify
</style>
