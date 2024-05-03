<script setup lang="ts">
import { useBookStore } from '@/stores/books'
import { storeToRefs } from 'pinia';
import BooksTable from '@/components/BooksTable.vue';
import BooksSearch from '@/components/BooksSearch.vue';
import BooksFilter from '@/components/BooksFilter.vue';

const bookStore = useBookStore()

bookStore.getBooks()

const { filteredBooks, bookPublishers, selectedPublisher, searchByBookTitle } = storeToRefs(bookStore)

</script>

<template>
  <div class="container">
    <h2>2 Books displayed</h2>
    <section class="row filter-search">
      <BooksSearch v-model="searchByBookTitle" />
      <BooksFilter v-model="selectedPublisher" :bookPublishers />
    </section>
    <section class="row">
      <div class="column">
        <BooksTable @toggleFavorite="bookStore.toggleFavorite" :books="filteredBooks"
          :isLoading="bookStore.isLoadingBooks" />
      </div>
    </section>
  </div>
</template>
