<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from './stores/main.store'

const store = useMainStore()

onMounted(store.loadItems)
</script>

<template>
  <router-view></router-view>
</template>
