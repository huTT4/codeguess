<script setup lang="ts">
import { useMainStore } from '../stores/main.store'
import Loader from '../components/Loader.vue'
import { onMounted } from 'vue'
import { useTitleStore } from '../stores/title.store'

const store = useMainStore()

const getLevel = (type: string): number => {
  const item = store.my_levels.find((item) => item.type === type)
  if (item) return item.num
  else return 1
}

onMounted(useTitleStore().default)
</script>

<template>
  <div class="flex flex-col items-center gap-50 pb-75">
    <div class="text-center">
      <h1 class="text-6xl">CodeGuess</h1>
      <h2 class="text-orange-400 tracking-widest">
        Do you understand the code ?
      </h2>
    </div>

    <Loader v-if="store.isLoading" />

    <div v-else class="flex flex-col gap-5 max-w-lg items-center">
      <h3 class="text-3xl">Language selection:</h3>
      <ul class="flex flex-wrap gap-2.5 justify-center items-end">
        <li v-for="item in store.items" :key="item.type">
          <router-link
            class="block px-3 py-1 border border-neutral-700 rounded-md cursor-pointer bg-[#373737] capitalize hover:text-orange-400 hover:scale-110 transition"
            :to="`/levels?lang=${item.type}&level=${getLevel(item.type)}`"
            >{{ item.lang }}</router-link
          >
        </li>
        <span class="opacity-50 text-sm"
          >other languages are still in development...</span
        >
      </ul>
    </div>
  </div>
</template>
