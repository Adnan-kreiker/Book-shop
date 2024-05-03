<script setup lang="ts">
import { useBookStore } from '@/stores/books'
import { storeToRefs } from 'pinia';
import BooksTable from '@/components/BooksTable.vue';

const bookStore = useBookStore()

bookStore.getBooks()

const { filteredBooks, bookPublishers, selectedPublisher } = storeToRefs(bookStore)

</script>

<template>
<div class="container">
  <h2>2 Books displayed</h2>
      <section class="row filter-search">
        <form action="#" class="column">
          <label for="search">Search by Title</label>
          <input v-model="bookStore.searchByBookTitle" type="text" id="search" />
        </form>

        <form action="#" class="column column-33">
          <label for="by-publisher">Filter by Publisher</label>
          <select v-model="selectedPublisher" id="by-publisher">
            <option value="-">-</option>
            <option v-for="publisher in bookPublishers" :value="publisher" :key="publisher">{{ publisher }}</option>
          </select>
        </form>

      </section>
      <section class="row">
        <div class="column">
          <BooksTable 
          @toggleFavorite="bookStore.toggleFavorite"
          :books="filteredBooks" 
          :isLoading="bookStore.isLoadingBooks"
          />
        </div>
      </section>
</div>
</template>
