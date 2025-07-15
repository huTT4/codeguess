<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'
import useInput from '../composables/useInput'
import type { Level } from '../stores/main.store'

interface Props {
  level: Level
  result: boolean
}

defineProps<Props>()

const emit = defineEmits(['click', 'get-inputs'])

const { inputs, handleInput } = useInput()

onMounted(() => emit('get-inputs', inputs.value))
onUpdated(() => emit('get-inputs', inputs.value))
</script>

<template>
  <div class="flex gap-1.5 justify-center w-full flex-wrap">
    <input
      v-for="(_, idx) in level?.answer.length"
      :key="idx"
      ref="inputs"
      type="text"
      maxlength="1"
      @input="handleInput"
      @click="$emit('click', idx)"
      :disabled="result"
      class="w-11 h-11 text-center text-lg font-medium bg-[#2b2b2b] border rounded-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
      :class="{
        'border-[#3b3b3b]': !result,
        'border-[#00ff08c9] border-2': result,
      }"
    />
  </div>
</template>
