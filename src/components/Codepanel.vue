<script lang="ts" setup>
import 'highlight.js/styles/a11y-dark.css'
import hljs from 'highlight.js/lib/core'
import type { Level } from '../stores/main.store'

import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

interface Props {
  level: Level
  lang: string
}

defineProps<Props>()
</script>

<template>
  <highlightjs
    class="mt-2 mb-5 max-w-md w-full rounded-md"
    :code="level.code"
    :language="lang"
  />
</template>
