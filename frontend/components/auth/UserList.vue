<template>
  <div v-if="data">
    <v-data-table :headers="headers" :items="data.getUsers"</v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup lang="ts">
import { useQuery } from "villus";
import { ref } from "vue";

const getUsers = `getUsers {
  id
  email
  firstName
  lastName
  roleId
  createdAt
  role {
    name
  }
}`;
const { data } = useQuery({
  query: `
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
  `,
});

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Email', key: 'email' },
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Role', key: 'role.name' }, // Access nested property
]);
</script>
