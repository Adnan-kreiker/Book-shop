<script setup lang="ts">
import type { BookWithFavorite } from '@/stores/books';

const props = defineProps<{
  books: BookWithFavorite[]
  isLoading: boolean
}>()

const emits = defineEmits<{
  (event: 'toggleFavorite', id: string): void
  (event: 'navigateToDetail', id: string): void
}>()
</script>

<template>
  <table v-if="!props.isLoading && props.books.length">
    <thead>
      <tr>
        <th class="first-col">&nbsp;</th>
        <th>Title</th>
        <th>ISBN</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>
          <button @click="emits('toggleFavorite', book.isbn)" class="button button-clear fav-btn">
            <svg v-if="book.isFavorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="fav">
              <path
                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="fav">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </td>
        <td>{{ book.title }}</td>
        <td>{{ book.isbn }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.publisher }}</td>
        <td>
          <button class="button" @click="emits('navigateToDetail', book.isbn)">
            Detail
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else class="empty-state">No books found!</p>
</template>

<style scoped>
.empty-state {
  text-align: center;
  font-size: 3.5rem;
  color: #666;
}
</style>
