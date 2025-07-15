import { onMounted, onUnmounted, watch, type ComputedRef } from 'vue'
import { useTitleStore } from '../stores/title.store'
import type { RouteLocation } from 'vue-router'
import type { Item } from '../stores/main.store'

export default function useTitle(
  item: ComputedRef<Item | undefined>,
  level: ComputedRef<number>,
  route: RouteLocation,
  isCorrectLevel: ComputedRef<boolean>,
  isCorrectLang: ComputedRef<boolean>,
  mounted: (mount?: boolean) => void,
  unmounted: () => void
) {
  const title = useTitleStore()
  const changeTitle = () => title.change(String(item.value?.lang), level.value)

  watch(route, () => {
    if (!isCorrectLevel.value || !isCorrectLang.value) title.error()
    else changeTitle()
  })

  onMounted(() => {
    changeTitle()
    mounted(true)
  })

  onUnmounted(unmounted)
}
