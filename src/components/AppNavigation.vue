<script setup lang="ts">
import type { BookWithFavorite } from '@/stores/books';

const props = defineProps<{
  favoriteBooks: BookWithFavorite[]
}>()
</script>

<template>
  <nav class="mainnav">
    <RouterLink data-testid="home-link" to="/" class="mainnav-link" exact-active-class="mainnav-link--active">Books
    </RouterLink>
    <RouterLink data-testid="favorites-link" to="/favorites" class="mainnav-link"
      exact-active-class="mainnav-link--active">
      Favorites <span class="mainnav-number">{{ props.favoriteBooks.length
        }}</span></RouterLink>
  </nav>
</template>