<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia';

const bookStore = useBooksStore()

const { favoriteBooks } = storeToRefs(bookStore)
</script>

<template>
  <nav class="mainnav">
    <RouterLink to="/" class="mainnav-link" exact-active-class="mainnav-link--active">Books</RouterLink>
    <RouterLink to="/favorites" class="mainnav-link" exact-active-class="mainnav-link--active">Favorites <span
        class="mainnav-number">{{ favoriteBooks.length
        }}</span></RouterLink>
  </nav>
</template>