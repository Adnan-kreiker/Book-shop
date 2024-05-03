<script setup lang="ts">
const searchByBookTitle = defineModel({
  type: String,
  default: '',
})
</script>

<template>
  <form action="#" class="column">
    <label for="search">Search by Title</label>
    <input v-model="searchByBookTitle" type="text" id="search" />
  </form>
</template>
