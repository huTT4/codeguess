import { computed, watch } from 'vue'
import { useMainStore } from '../stores/main.store'
import { useRouter, type RouteLocation } from 'vue-router'

export default function useLevelState(
  route: RouteLocation,
  mounted: (mount?: boolean) => void
) {
  const router = useRouter()
  const store = useMainStore()

  const lang = computed(() => String(route.query.lang))
  const level = computed(() => Number(route.query.level))
  const item = computed(() => store.items.find((i) => i.type === lang.value))

  const firstLevel = computed(() => route.fullPath.replace(/[0-9]/g, '') + 1)
  const nextLevel = computed(
    () => route.fullPath.replace(/[0-9]/g, '') + (level.value + 1)
  )

  const levels = computed(() => item.value?.levels.length || 0)
  const currentLevel = computed(() =>
    item.value?.levels.find((l) => l.num === level.value)
  )
  const isCorrectLevel = computed(() => {
    const isCorrect = level.value >= 1 && level.value <= levels.value
    if (isCorrect) return isCorrect
    else {
      router.push('/not-found')
      return false
    }
  })
  const isCorrectLang = computed(() => {
    const isCorrect = !!store.items.find((i) => i.type === lang.value)
    if (isCorrect) return isCorrect
    else {
      router.push('/not-found')
      return false
    }
  })

  watch(level, () => {
    if (isCorrectLevel.value && isCorrectLang.value)
      store.confirmLevel(lang.value, level.value)
    mounted()
  })
  watch(lang, () => mounted())

  const prevLevel = computed(() => {
    if (level.value === 1) return firstLevel.value
    else return route.fullPath.replace(/[0-9]/g, '') + (level.value - 1)
  })
  const skipLevel = computed(() => {
    if (level.value === levels.value) return firstLevel.value
    else return nextLevel.value
  })

  const handleBack = () => {
    if (level.value === 1) store.confirmLevel(String(lang.value), 1)
    else store.confirmLevel(String(lang.value), level.value - 1)
  }

  const handleSkip = () => {
    if (level.value === levels.value) store.confirmLevel(String(lang.value), 1)
    else store.confirmLevel(String(lang.value), level.value + 1)
  }

  return {
    lang,
    level,
    item,
    firstLevel,
    nextLevel,
    isCorrectLevel,
    isCorrectLang,
    levels,
    currentLevel,
    prevLevel,
    skipLevel,
    handleBack,
    handleSkip,
  }
}
