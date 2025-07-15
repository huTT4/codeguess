import { computed, ref } from 'vue'

export default function useInput() {
  const inputValues = ref<string[]>([])
  const inputs = ref<HTMLInputElement[]>([])
  const currentInputIndex = ref(0)

  const movingKeys = ['ArrowRight', 'ArrowLeft', 'Tab', 'Home', 'End']
  const validKeys = [
    ...`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?;"' []`,
  ]

  const isFilled = computed(() => inputValues.value.every((val) => val !== ''))
  const result = ref(false)

  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement
    const value = input.value

    if (!validKeys.includes(value)) input.value = ''
  }

  const handeKeydown = (e: KeyboardEvent) => {
    focusMoving(e)

    if (validKeys.includes(e.key)) {
      if (currentInputIndex.value < inputs.value.length) {
        inputs.value[currentInputIndex.value].value = e.key
        focusNextInput()
        checkFilled()
      }
      e.preventDefault()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (currentInputIndex.value > 0) {
        if (!inputs.value[currentInputIndex.value].value) {
          focusPrevInput()
        }
        inputs.value[currentInputIndex.value].value = ''
      } else {
        inputs.value[0].value = ''
      }
      e.preventDefault()
    }
  }

  const focusNextInput = () => {
    if (currentInputIndex.value < inputs.value.length - 1) {
      currentInputIndex.value++
      inputs.value[currentInputIndex.value].focus()
    }
  }

  const focusPrevInput = () => {
    if (currentInputIndex.value > 0) {
      currentInputIndex.value--
      inputs.value[currentInputIndex.value].focus()
    }
  }

  const focusMoving = (e: KeyboardEvent) => {
    if (movingKeys.includes(e.key)) {
      if (e.key === 'ArrowRight' || e.key === 'Tab') focusNextInput()
      else if (e.key === 'ArrowLeft') focusPrevInput()

      if (e.key === 'Home') {
        currentInputIndex.value = 0
        inputs.value[currentInputIndex.value].focus()
      } else if (e.key === 'End') {
        currentInputIndex.value = inputs.value.length - 1
        inputs.value[currentInputIndex.value].focus()
      }

      e.preventDefault()
    }
  }

  const checkFilled = () =>
    (inputValues.value = inputs.value.map((inp) => inp.value))

  const mounted = (mount: boolean = false) => {
    window.addEventListener('keydown', handeKeydown)
    if (mount) setTimeout(() => inputs.value[0].focus(), 175)
    else inputs.value[0].focus()
  }

  const unmounted = () => {
    window.removeEventListener('keydown', handeKeydown)
  }

  return {
    inputs,
    currentInputIndex,
    inputValues,
    isFilled,
    result,
    handleInput,
    mounted,
    unmounted,
  }
}
