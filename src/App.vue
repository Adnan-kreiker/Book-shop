<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigation from '@/components/AppNavigation.vue'
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
            <AppNavigation />
          </div>
        </div>
      </div>
    </header>
    <RouterView />
  </main>
</template>