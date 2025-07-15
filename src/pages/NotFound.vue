<script setup lang="ts">
import { onMounted } from 'vue'
import Error from '../components/Error.vue'
import { useTitleStore } from '../stores/title.store'

onMounted(useTitleStore().error)
</script>

<template>
  <Error>There is no such page :)</Error>
</template>
