<script lang="ts" setup>
import { computed } from 'vue'
import type { Item, Level } from '../stores/main.store'

interface Props {
  item: Item
  currentLevel: Level
  level: number
  levels: number
}

const props = defineProps<Props>()

const progress = computed(() => {
  return (props.level / props.levels) * 100
})

const progressBg = computed(() => {
  if (progress.value <= 30) return '#E75A5A'
  else if (progress.value < 70) return '#F99415'
  else return '#73BA3C'
})
</script>

<template>
  <div class="flex items-center justify-between max-w-md w-full">
    <h1 class="text-lg">{{ item?.lang }}</h1>
    <span class="text-lg"> {{ currentLevel?.num }} level / {{ levels }} </span>
  </div>
  <div
    class="relative w-full h-1.5 border border-opacity-30 border-[#252525] bg-[#2b2b2b] rounded-md max-w-md"
  >
    <div
      :style="{ width: progress + '%', background: progressBg }"
      class="absolute top-0 bottom-0 left-0 flex items-center justify-center text-white rounded-md transition-all duration-500"
    ></div>
  </div>
</template>
