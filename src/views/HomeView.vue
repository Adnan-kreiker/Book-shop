<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia';
import BooksTable from '@/components/BooksTable.vue';
import BooksSearch from '@/components/BooksSearch.vue';
import BooksFilter from '@/components/BooksFilter.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const bookStore = useBooksStore()

bookStore.getBooks()

const { filteredBooks, bookPublishers, selectedPublisher, searchByBookTitle, numberOfFilteredBooks } = storeToRefs(bookStore)

const router = useRouter()

function handleNavigateToDetail(isbn: string) {
  bookStore.selectedBookISBN = isbn

  router.push({ name: 'details', params: { isbn } })
}

const booksToDisplay = computed(() => {
  if (!isFavoritePage.value) {
    return filteredBooks.value
  }

  return bookStore.filteredFavoriteBooks
})

const pageHeaderText = computed(() => {
  if (!isFavoritePage.value) {
    if (numberOfFilteredBooks.value === 1) return '1 Book displayed'

    return `${numberOfFilteredBooks.value} Books displayed`
  }

  if (bookStore.favoriteBooks.length === 1) return '1 Favorite on your list'

  return `${bookStore.favoriteBooks.length} Favorites on your list`
})

const isFavoritePage = computed(() => router.currentRoute.value.name === 'favorites')

</script>

<template>
  <div class="container">
    <RouterView />
    <h2>{{ pageHeaderText }}</h2>
    <section class="row filter-search">
      <BooksSearch v-model="searchByBookTitle" />
      <BooksFilter v-model="selectedPublisher" :bookPublishers />
    </section>
    <section class="row">
      <div class="column">
        <BooksTable @toggleFavorite="bookStore.toggleFavorite" @navigate-to-detail="handleNavigateToDetail"
          :books="booksToDisplay" :isLoading="bookStore.isLoadingBooks" />
      </div>
    </section>
  </div>
</template>
