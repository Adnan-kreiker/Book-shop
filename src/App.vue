<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <header class="header">
      <div class="container">
        <div class="row">
          <div class="column"><p class="logo">IT.Book.Library</p></div>
          <div class="column">
            <nav class="mainnav">
              <a href="index.html" class="mainnav-link mainnav-link--active"
                >Books</a
              >
              <a href="favorite.html" class="mainnav-link"
                >Favorites <span class="mainnav-number">2</span></a
              >
            </nav>
          </div>
        </div>
      </div>
    </header>
    <RouterView />
  </main>
</template>