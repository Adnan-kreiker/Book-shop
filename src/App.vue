<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigation from '@/components/AppNavigation.vue'
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia';

const bookStore = useBooksStore()

const { favoriteBooks } = storeToRefs(bookStore)
</script>

<template>
  <main>
    <header class="header">
      <div class="container">
        <div class="row">
          <div class="column">
            <p class="logo">IT.Book.Library</p>
          </div>
          <div class="column">
            <AppNavigation :favorite-books />
          </div>
        </div>
      </div>
    </header>
    <RouterView />
  </main>
</template>