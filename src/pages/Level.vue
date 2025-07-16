<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '../stores/main.store'
import { computed, watch } from 'vue'
import Codepanel from '../components/Codepanel.vue'
import Progressbar from '../components/Progressbar.vue'
import useInput from '../composables/useInput'
import Inputs from '../components/Inputs.vue'
import useTitle from '../composables/useTitle'
import useLevelState from '../composables/useLevelState'
import Control from '../components/Control.vue'
import Loader from '../components/Loader.vue'

const router = useRouter()
const route = useRoute()
const store = useMainStore()

const isCorrectValue = computed(
  () => inputValues.value.join('') === currentLevel.value?.answer
)

const {
  inputs,
  currentInputIndex,
  inputValues,
  isFilled,
  result,
  mounted,
  unmounted,
} = useInput()

const {
  lang,
  level,
  item,
  firstLevel,
  nextLevel,
  levels,
  currentLevel,
  isCorrectLevel,
  isCorrectLang,
  prevLevel,
  skipLevel,
  handleBack,
  handleSkip,
} = useLevelState(route, mounted)

useTitle(item, level, route, isCorrectLevel, isCorrectLang, mounted, unmounted)

// checking correct characters for answer
watch(inputValues, () => {
  if (isFilled.value) {
    if (isCorrectValue.value) {
      const next = level.value === levels.value ? 1 : level.value + 1
      store.confirmLevel(String(lang.value), next)
      result.value = true
      unmounted()
      setTimeout(() => (result.value = false), 400)
      setTimeout(() => {
        inputs.value.forEach((inp) => (inp.value = ''))
        currentInputIndex.value = 0
        if (levels.value) {
          if (level.value + 1 > levels.value) {
            router.push(firstLevel.value)
          } else {
            router.push(nextLevel.value)
          }
        }
      }, 500)
    }
  }
})

// inputs processing
const handleClick = (idx: number) => (currentInputIndex.value = idx)
const getInputs = (currentInputs: HTMLInputElement[]) =>
  (inputs.value = currentInputs)
</script>

<template>
  <template v-if="store.isLoading">
    <Loader />
  </template>
  <template v-else>
    <div class="flex flex-col items-center">
      <Control
        :level="level"
        :prev-level="prevLevel"
        :skip-level="skipLevel"
        :handle-back="handleBack"
        :handle-skip="handleSkip"
      />

      <Progressbar
        v-if="levels && item && currentLevel"
        :item="item"
        :current-level="currentLevel"
        :level="level"
        :levels="levels"
      />

      <Codepanel v-if="currentLevel" :level="currentLevel" :lang="lang" />
      <Inputs
        v-if="currentLevel"
        :level="currentLevel"
        :result="result"
        @click="handleClick"
        @get-inputs="getInputs"
      />
    </div>
  </template>
</template>
