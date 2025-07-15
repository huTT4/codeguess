<script setup lang="ts">
interface Props {
  level: number
  prevLevel: string
  skipLevel: string
  handleBack: Function
  handleSkip: Function
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-1 max-w-md w-full">
    <div class="flex justify-between items-center mb-3">
      <router-link
        class="w-fit cursor-pointer bg-[#2b2b2b] py-1.5 px-4.5 rounded-md hover:text-orange-400 hover:scale-110 transition"
        to="/"
        >To Home</router-link
      >
      <div class="flex justify-between items-center gap-2">
        <router-link
          class="w-fit bg-[#2b2b2b] py-1.5 px-4.5 rounded-md transition"
          :class="{
            'cursor-pointer hover:text-orange-400 hover:scale-110': level !== 1,
            'cursor-default hover:text-white hover:scale-100 opacity-50':
              level === 1,
          }"
          :to="prevLevel"
          @click="handleBack"
          >Back</router-link
        >
        <router-link
          class="w-fit cursor-pointer bg-[#2b2b2b] py-1.5 px-4.5 rounded-md hover:text-orange-400 hover:scale-110 transition"
          :to="skipLevel"
          @click="handleSkip"
          >Skip</router-link
        >
      </div>
    </div>
  </div>
</template>
