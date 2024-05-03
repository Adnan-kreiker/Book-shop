<script setup lang="ts">
const selectedPublisher = defineModel({
  type: String,
  default: '-',
})

const props = defineProps<{
  bookPublishers: string[]
}>()
</script>

<template>
  <form action="#" class="column column-33">
    <label for="by-publisher">Filter by Publisher</label>
    <select v-model="selectedPublisher" id="by-publisher">
      <option value="-">-</option>
      <option v-for="publisher in props.bookPublishers" :value="publisher" :key="publisher">{{ publisher }}</option>
    </select>
  </form>
</template>
