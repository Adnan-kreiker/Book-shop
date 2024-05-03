<script setup lang="ts">
import { useBooksStore, BaseURL } from '@/stores/books'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const booksStore = useBooksStore()

const { selectedBook } = storeToRefs(booksStore)


const router = useRouter()

function handleNavigateToHome() {
  booksStore.selectedBookISBN = null

  router.push({ name: 'home' })
}
</script>

<template>
  <div v-if="selectedBook" class="container">
    <h1>
      {{ selectedBook.title }}<br />
      <small>{{ selectedBook.subtitle }}</small>
    </h1>
    <section class="row">
      <div class="column column-67">
        <h3>Abstract</h3>
        <p>
          {{ selectedBook.abstract }}
        </p>

        <h4>Details</h4>
        <ul>
          <li><strong>Author:</strong>{{ selectedBook.author }}</li>
          <li><strong>Publisher:</strong> {{ selectedBook.publisher }}</li>
          <li><strong>Pages:</strong> {{ selectedBook.numPages }}</li>
        </ul>

          <button class="button button-outline" @click="handleNavigateToHome">
            Back
          </button>
      </div>
      <div class="column column-33">
        <img :src="`${BaseURL}covers/${selectedBook.isbn}.png`" alt="" />
      </div>
    </section>
  </div>
</template>
