<template>
  <div v-if="data">
    <v-data-table
      :headers="headers"
      :items="data.getUsers"
      item-key="id"
      :search="search"
    >
      <template v-slot:item.createdAt="{ item }: { item: any }">
        {{ formatToLocalDate(item.createdAt) }}
      </template>
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Cari"
          class="ma-4"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="outlined"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup lang="ts">
import { useQuery } from "villus";
import { ref } from "vue";

const getUsers = `
  query {
    getUsers {
      id
      email
      firstName
      lastName
      roleId
      createdAt
      role {
        name
      }
    }
  }
`;
const { data } = useQuery({
  query: getUsers,
});

const search = ref("");

const headers = ref([
  { title: "ID", key: "id" },
  { title: "Email", key: "email" },
  { title: "First Name", key: "firstName" },
  { title: "Last Name", key: "lastName" },
  { title: "Created At", key: "createdAt" },
  { title: "Role", key: "role.name" }, // Access nested property
]);

function formatToLocalDate(isoString) {
  const date = new Date(isoString); // Parse ISO string into a Date object
  return new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 12-hour format
  }).format(date);
}
</script>
