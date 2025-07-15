import { defineStore } from 'pinia'

const LS_NAME = 'my-title'
export const useTitleStore = defineStore('title', {
  state: () => ({
    title: localStorage.getItem(LS_NAME) || '',
  }),
  actions: {
    change(lang: string, level: number) {
      let title = ''
      if (lang && level) title = `${lang} ${level} Level – CodeGuess`
      else title = this.title
      document.title = title
      localStorage.setItem(LS_NAME, title)
    },
    default() {
      document.title = 'CodeGuess – Do you understand the code ?'
    },
    error() {
      document.title = 'CodeGuess – 404 Not Found'
    },
  },
})
