<script setup lang="ts">
import { onMounted } from 'vue'
import { useTitleStore } from '../stores/title.store'

onMounted(useTitleStore().error)
</script>

<template>
  <Error></Error>
  <div class="text-4xl pb-50 flex flex-col items-center gap-5">
    <span class="text-red-400 text-7xl">404</span>
    <p>There is no such page :)</p>
    <router-link
      class="w-fit cursor-pointer bg-[#2b2b2b] py-1.5 px-4.5 mt-3 rounded-md hover:text-orange-400 hover:scale-110 transition"
      to="/"
      >To Home</router-link
    >
  </div>
</template>
